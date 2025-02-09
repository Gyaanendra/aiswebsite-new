// components/global/InteractiveGradientWave.jsx
"use client";
import React, { useRef, useEffect } from "react";

const InteractiveGradientWave = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions to the full window size
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Store mouse coordinates (default at center)
    let mouseX = width / 2;
    let mouseY = height / 2;

    // Update mouse coordinates on move
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Update canvas size on window resize
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    let time = 0;
    let animationFrameId;

    const draw = () => {
      time += 0.01;

      // Create a vertical linear gradient (from pure black to a dark gray)
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, "#000000");
      gradient.addColorStop(1, "#1a1a1a");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw a sine wave whose amplitude and frequency vary with mouse position
      ctx.beginPath();
      // Adjust amplitude and frequency based on mouse coordinates:
      const amplitude = 20 + (mouseX / width) * 30; // More movement to the right increases amplitude
      const frequency = 0.02 + (mouseY / height) * 0.03; // More movement down increases frequency
      const waveVerticalPosition = height * 0.5;

      // Start the wave at the left edge
      ctx.moveTo(0, waveVerticalPosition);

      // Draw the wave along the x-axis
      for (let x = 0; x <= width; x++) {
        const y = amplitude * Math.sin(x * frequency + time) + waveVerticalPosition;
        ctx.lineTo(x, y);
      }

      // Close the shape at the bottom of the canvas
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();

      // Fill the wave shape with a semi‑transparent black so it blends with the gradient
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fill();

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    // Cleanup event listeners and animation frame on component unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        pointerEvents: "none", // Allow mouse events to pass through
      }}
    />
  );
};

export default InteractiveGradientWave;
