"use client";

import { useEffect, useRef } from "react";

export default function WaveBackground() {
  const canvasRef = useRef(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dots = [];
    const spacing = 30;

    // Initialize dots based on canvas dimensions.
    const initDots = () => {
      dots = [];
      const rows = Math.ceil(canvas.height / spacing);
      const cols = Math.ceil(canvas.width / spacing);
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          dots.push({
            x: j * spacing,
            y: i * spacing,
            baseY: i * spacing,
          });
        }
      }
    };

    // Set canvas size and reinitialize dots on resize.
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initDots();
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Animation loop: for testing, we fill with red so it's obvious.
    const animate = () => {
      // Change this fill color for testing (red is easy to see)
      ctx.fillStyle = "#ff0000"; // Test color; later you can change to "#111"
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const time = Date.now() / 1000;
      dots.forEach((dot) => {
        const dx = dot.x - mousePositionRef.current.x;
        const dy = dot.y - mousePositionRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const wave = Math.sin(time + dot.x * 0.02) * 3;
        const mouseEffect = Math.max(0, 1 - distance / 200) * 30;
        dot.y = dot.baseY + wave + mouseEffect;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(
          0.2,
          1 - distance / 200
        )})`;
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Update mouse position on move.
    const handleMouseMove = (e) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup on unmount.
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <div
      className="canvas-background"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0, // Lower than your main content container
        pointerEvents: "none",
      }}
    >
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
