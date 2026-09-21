'use client';

import { useEffect, useRef } from 'react';

type Props = {
  mode: 'weekly' | 'monthly';
  className?: string;
};

const VERTEX_SHADER = `#version 300 es
in vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

const FRAGMENT_SHADER = `#version 300 es
precision highp float;

uniform vec2  u_resolution;
uniform float u_time;   // 초 단위
uniform int   u_mode;   // 0 = 1번 카드, 1 = 2번 카드

out vec4 outColor;

// 사이트 팔레트 (paper / charcoal)
const vec3 BG_COLOR   = vec3(0.953, 0.949, 0.933);
const vec3 LINE_COLOR = vec3(0.141);

// ───────── 공통: 가로세로 비율 ─────────
float aspect() {
  return u_resolution.x / u_resolution.y;
}

// ───────── 1번 카드: 메타볼 ─────────
vec3 renderPanel1(vec2 uv) {
  vec2 p = uv * 2.0 - 1.0;
  p.x *= aspect(); // 원이 찌그러지지 않게 보정

  float d = 0.0;
  for (float i = 0.0; i < 5.0; i++) {
    vec2 pos = 0.5 * vec2(sin(u_time * 0.7 + i * 1.2), cos(u_time * 0.5 + i * 0.8));
    pos.x *= aspect(); // 궤도도 가로로 넓게
    d += 0.08 / length(p - pos);
  }
  float m = smoothstep(0.48, 0.5, d);
  return mix(BG_COLOR, LINE_COLOR, m);
}

// ───────── 2번 카드: fbm 등고선 ─────────
float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

vec3 renderPanel2(vec2 uv) {
  vec2 q = uv;
  q.x *= aspect(); // 등고선이 늘어나지 않게 보정
  vec2 p = q * 10.0 + u_time * 0.2;
  float h = fbm(p);
  float grid = abs(fract(h * 10.0) - 0.5) / fwidth(h * 10.0);
  return mix(BG_COLOR, LINE_COLOR, (1.0 - smoothstep(0.0, 1.0, grid)) * 0.4);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  vec3 col = (u_mode == 0) ? renderPanel1(uv) : renderPanel2(uv);
  outColor = vec4(col, 1.0);
}`;

const STATIC_TIME_S = 60; // reduce-motion일 때 보여줄 정지 프레임

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function GenerativeCanvas({ mode, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl2');
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const loc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, 'u_resolution');
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uMode = gl.getUniformLocation(program, 'u_mode');

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.floor(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const draw = (timeS: number) => {
      resize();
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, timeS);
      gl.uniform1i(uMode, mode === 'weekly' ? 0 : 1);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    let raf = 0;
    let visible = true;
    const start = performance.now();

    const loop = (now: number) => {
      if (visible) draw((now - start) * 0.001);
      raf = requestAnimationFrame(loop);
    };

    if (reduceMotion) {
      draw(STATIC_TIME_S);
    } else {
      raf = requestAnimationFrame(loop);
    }

    const ro = new ResizeObserver(() => {
      if (reduceMotion) draw(STATIC_TIME_S);
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
  }, [mode]);

  return <canvas ref={canvasRef} className={className ?? 'block h-full w-full'} aria-hidden="true" />;
}