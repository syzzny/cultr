'use client';

import { useEffect, useRef } from 'react';

const VERTEX_SHADER = `
attribute vec2 a_position;
varying vec2 vUv;
void main() {
  vUv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision mediump float;
varying vec2 vUv;
uniform float u_time;
uniform float u_intensity;
uniform vec3 u_color;

void main() {
  vec2 p = vUv * 2.0 - 1.0;
  float d = length(p);
  float angle = atan(p.y, p.x);

  float f = 0.5 + 0.5 * sin(
    d * 10.0
    - u_time * 2.0
    + angle * 3.0
  );

  // 두 번째 레이어를 겹쳐서 결이 있는 소용돌이 질감을 만듦
  f += 0.5 + 0.5 * sin(d * 6.0 - u_time * 1.3 + angle * 5.0);
  f *= 0.5;

  // 가장자리로 갈수록 어두워지는 원형 비네트 (피그마처럼 테두리에서 페이드)
  float vignette = smoothstep(1.1, 0.2, d);

  vec3 col = mix(vec3(0.05), u_color, f * u_intensity * vignette);
  gl_FragColor = vec4(col, 1.0);
}
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
}

type SwirlCanvasProps = {
  color?: [number, number, number];
  intensity?: number;
  className?: string;
};

export function SwirlCanvas({
  color = [0.95, 0.95, 0.95], // 밝은 회색 (흑백 톤)
  intensity = 0.9,
  className,
}: SwirlCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);

    const program = gl.createProgram()!;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionLoc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, 'u_time');
    const uIntensity = gl.getUniformLocation(program, 'u_intensity');
    const uColor = gl.getUniformLocation(program, 'u_color');

    gl.uniform1f(uIntensity, intensity);
    gl.uniform3f(uColor, color[0], color[1], color[2]);

    let active = true;
    let rafId = 0;

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting;
    });
    intersectionObserver.observe(canvas);

    const render = (time: number) => {
      if (active) {
        gl.uniform1f(uTime, time * 0.001);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }
      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [color, intensity]);

  return <canvas ref={canvasRef} className={className} />;
}