/*
  jsrepo 1.35.1
  Installed from https://reactbits.dev/tailwind/
  12-2-2025
*/
"use client";
import { useRef, useEffect } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";

export const LiquidChrome = ({
  speed = 0.2,
  amplitude = 0.15,
  frequencyX = 2.5,
  frequencyY = 1.5,
  interactive = true,
  ...props
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const renderer = new Renderer({ antialias: true });
    const gl = renderer.gl;
    gl.clearColor(1, 1, 1, 1);

    // Vertex shader remains the same
    const vertexShader = `
      attribute vec2 position;
      attribute vec2 uv;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    // Updated fragment shader for professional black/white theme
    const fragmentShader = `
      precision highp float;
      uniform float uTime;
      uniform vec3 uResolution;
      uniform float uAmplitude;
      uniform float uFrequencyX;
      uniform float uFrequencyY;
      uniform vec2 uMouse;
      varying vec2 vUv;
  
      float noise(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
      }
  
      void main() {
        // Create base coordinates
        vec2 uv = (vUv - 0.5) * 2.0;
        uv.x *= uResolution.x / uResolution.y;
  
        // Create subtle wave pattern
        float wave = 0.0;
        for (float i = 1.0; i < 4.0; i++) {
          wave += uAmplitude * 0.5 / i * 
                 sin(i * uFrequencyX * uv.y + uTime * 0.5 + noise(uv * i) * 2.0) * 
                 sin(i * uFrequencyY * uv.x + uTime * 0.3);
        }
  
        // Add mouse interaction
        vec2 mouseDist = (vUv - uMouse);
        float dist = length(mouseDist);
        float ripple = sin(10.0 * dist - uTime * 2.0) * 0.03 * exp(-dist * 20.0);
        wave += ripple;
  
        // Create gradient from dark gray to light gray
        float gradient = smoothstep(0.3, 0.7, vUv.y) * 0.7; // Reduced max brightness
        
        // Add subtle noise texture
        float noiseTex = noise(vUv * 10.0 + uTime * 0.1) * 0.05;
        
        // Combine effects with reduced brightness range
        float value = clamp(gradient + wave * 0.15 + noiseTex, 0.1, 0.7); // Lowered max value
        
        // Add subtle vignette effect
        float vignette = 1.0 - smoothstep(0.7, 1.4, length(uv));
        value *= vignette;
  
        gl_FragColor = vec4(vec3(value), 1.0);
      }
    `;

    // Create program without uBaseColor uniform
    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: {
          value: new Float32Array([
            gl.canvas.width,
            gl.canvas.height,
            gl.canvas.width / gl.canvas.height,
          ]),
        },
        uAmplitude: { value: amplitude },
        uFrequencyX: { value: frequencyX },
        uFrequencyY: { value: frequencyY },
        uMouse: { value: new Float32Array([0, 0]) },
      },
    });
    const mesh = new Mesh(gl, { geometry, program });

    // Resize handler.
    function resize() {
      const scale = 1;
      renderer.setSize(
        container.offsetWidth * scale,
        container.offsetHeight * scale
      );
      const resUniform = program.uniforms.uResolution.value;
      resUniform[0] = gl.canvas.width;
      resUniform[1] = gl.canvas.height;
      resUniform[2] = gl.canvas.width / gl.canvas.height;
    }
    window.addEventListener("resize", resize);
    resize();

    // Mouse and touch move handlers for interactivity.
    function handleMouseMove(event) {
      const rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = 1 - (event.clientY - rect.top) / rect.height;
      const mouseUniform = program.uniforms.uMouse.value;
      mouseUniform[0] = x;
      mouseUniform[1] = y;
    }

    function handleTouchMove(event) {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        const rect = container.getBoundingClientRect();
        const x = (touch.clientX - rect.left) / rect.width;
        const y = 1 - (touch.clientY - rect.top) / rect.height;
        const mouseUniform = program.uniforms.uMouse.value;
        mouseUniform[0] = x;
        mouseUniform[1] = y;
      }
    }

    if (interactive) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("touchmove", handleTouchMove);
    }

    // Animation loop.
    let animationId;
    function update(t) {
      animationId = requestAnimationFrame(update);
      // Multiply time by speed to adjust the animation rate.
      program.uniforms.uTime.value = t * 0.001 * speed;
      renderer.render({ scene: mesh });
    }
    animationId = requestAnimationFrame(update);

    container.appendChild(gl.canvas);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      if (interactive) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("touchmove", handleTouchMove);
      }
      if (gl.canvas.parentElement) {
        gl.canvas.parentElement.removeChild(gl.canvas);
      }
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [speed, amplitude, frequencyX, frequencyY, interactive]); // Removed baseColor from dependencies

  return <div ref={containerRef} className="w-full h-full" {...props} />;
};

export default LiquidChrome;
