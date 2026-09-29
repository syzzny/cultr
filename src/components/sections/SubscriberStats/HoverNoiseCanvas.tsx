'use client';

import { useEffect, useRef } from 'react';

type Palette = {
  a: [number, number, number];
  b: [number, number, number];
  c: [number, number, number];
  d: [number, number, number];
  e: [number, number, number];
};

type Props = {
  active: boolean; // 호버 중일 때만 true
  className?: string;
  colors?: Palette;
};

const DEFAULT_PALETTE: Palette = {
  a: [0.91, 0.36, 0.02],
  b: [0.91, 0.77, 0.42],
  c: [0.66, 0.85, 0.86],
  d: [0.16, 0.62, 0.56],
  e: [0.11, 0.21, 0.34],
};

const VERTEX_SHADER = `
attribute vec4 aVertexPosition;
varying vec2 vUv;
void main() {
  gl_Position = aVertexPosition;
  vUv = aVertexPosition.xy * 0.5 + 0.5;
}`;

const FRAGMENT_SHADER = `
precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;
uniform vec3 uColorD;
uniform vec3 uColorE;

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m; m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 st = gl_FragCoord.xy / uResolution.xy;
  st.x *= uResolution.x / uResolution.y;

  vec2 mouseOffset = (uMouse / uResolution) * 0.2;
  st += mouseOffset * 0.5;

  float n1 = snoise(st * 1.5 + uTime * 0.1);
  float n2 = snoise(st * 2.0 - uTime * 0.15 + n1);
  vec2 warpedSt = st + vec2(n1, n2) * 0.4;

  float d1 = length(warpedSt - vec2(0.2, 0.8));
  float d2 = length(warpedSt - vec2(0.8, 0.2));
  float d3 = length(warpedSt - vec2(0.5, 0.5));

  vec3 finalColor = mix(uColorA, uColorB, smoothstep(0.0, 1.2, d1));
  finalColor = mix(finalColor, uColorC, smoothstep(0.2, 1.5, d3));
  finalColor = mix(finalColor, uColorE, smoothstep(0.4, 2.0, d2));

  float cyanPop = snoise(st * 3.0 + uTime * 0.05);
  finalColor = mix(finalColor, uColorD, smoothstep(0.5, 1.0, cyanPop) * 0.5);

  float grain = random(vUv * (uTime * 0.001 + 100.0));
  float grainStrength = 0.18;
  vec3 grainyColor = finalColor + (grain - 0.5) * grainStrength;

  gl_FragColor = vec4(grainyColor, 1.0);
}`;

function loadShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
  }
  return shader;
}

export function HoverNoiseCanvas({ active, className, colors = DEFAULT_PALETTE }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);

    const program = gl.createProgram()!;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }

    const positionLoc = gl.getAttribLocation(program, 'aVertexPosition');
    const uTime = gl.getUniformLocation(program, 'uTime');
    const uResolution = gl.getUniformLocation(program, 'uResolution');
    const uMouse = gl.getUniformLocation(program, 'uMouse');
    const uColorA = gl.getUniformLocation(program, 'uColorA');
    const uColorB = gl.getUniformLocation(program, 'uColorB');
    const uColorC = gl.getUniformLocation(program, 'uColorC');
    const uColorD = gl.getUniformLocation(program, 'uColorD');
    const uColorE = gl.getUniformLocation(program, 'uColorE');

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0]),
      gl.STATIC_DRAW,
    );

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

    let raf = 0;
    const start = performance.now();

    const draw = (now: number) => {
      resize();
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(positionLoc);
      gl.uniform1f(uTime, (now - start) * 0.001);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform2f(uMouse, 0, 0);
      gl.uniform3f(uColorA, ...colors.a);
      gl.uniform3f(uColorB, ...colors.b);
      gl.uniform3f(uColorC, ...colors.c);
      gl.uniform3f(uColorD, ...colors.d);
      gl.uniform3f(uColorE, ...colors.e);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const loop = (now: number) => {
      draw(now);
      raf = requestAnimationFrame(loop);
    };

    if (active) {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(positionBuffer);
    };
  }, [active, colors]);

  return <canvas ref={canvasRef} className={className ?? 'absolute inset-0 h-full w-full'} aria-hidden="true" />;
}