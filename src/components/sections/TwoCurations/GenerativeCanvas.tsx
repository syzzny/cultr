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

// ───────── 1번 카드: 물결 간섭선 ─────────
vec3 renderPanel1(vec2 uv) {
  vec2 p = uv * 10.0;
  float d = sin(p.x * 0.5 + u_time) + sin(p.y * 0.5 + u_time * 0.8);
  vec2 dist = vec2(sin(d + u_time), cos(d + u_time)) * 0.1;
  float lines = sin((uv.x + dist.x) * 40.0) * sin((uv.y + dist.y) * 40.0);
  return mix(BG_COLOR, LINE_COLOR, smoothstep(0.1, 0.0, abs(lines)) * 0.3);
}

// ───────── 2번 카드: 쌍극자 필드 등고선 ─────────
vec3 renderPanel2(vec2 uv) {
  vec2 p = uv * 2.0 - 1.0;
  vec2 m1 = vec2(sin(u_time), cos(u_time)) * 0.5;
  vec2 m2 = -m1;
  vec2 v1 = p - m1;
  vec2 v2 = p - m2;
  float field = length(v1) / dot(v1, v1) - length(v2) / dot(v2, v2);
  float grid = abs(fract(field * 5.0) - 0.5) / fwidth(field * 5.0);
  return mix(BG_COLOR, LINE_COLOR, (1.0 - smoothstep(0.0, 1.2, grid)) * 0.5);
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
      gl.uniform1f(uTime, timeS * 0.4);
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