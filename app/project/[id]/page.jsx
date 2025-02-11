"use client";

import { useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { data } from "@/data/data"; // your data folder

const ProjectDetail = () => {
  const params = useParams();

  // Find project by id – remember that params.id is a string
  const project = data.projects.find(
    (p) => p.id === parseInt(params.id, 10)
  );

  // Reference to the canvas for animation
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set the canvas size to match the window dimensions
    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener("resize", setSize);

    let frame = 0;
    const animate = () => {
      frame++;
      // Create a fading trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw the grid with a wave effect
      ctx.strokeStyle = "rgba(75, 85, 99, 0.3)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < canvas.width; i += 30) {
        for (let j = 0; j < canvas.height; j += 30) {
          const wave = Math.sin(frame * 0.02 + (i + j) * 0.02) * 5;
          ctx.beginPath();
          ctx.moveTo(i, j + wave);
          ctx.lineTo(i + 30, j + wave);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(i + wave, j);
          ctx.lineTo(i + wave, j + 30);
          ctx.stroke();
        }
      }
      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", setSize);
    };
  }, []);

  if (!project) {
    return <div className="p-8 text-white">Project not found</div>;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Animated canvas background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-50" />

      {/* Foreground content */}
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-7xl font-light text-white tracking-wide">
              {project.title}
            </h1>
            <div className="space-y-6 text-gray-300">
              {project.description ? (
                <p className="text-lg">{project.description}</p>
              ) : (
                <p className="text-lg">No description available.</p>
              )}
              <p className="text-lg">Category: {project.tag}</p>
            </div>
            {/* Instead of using a button component, a styled link is provided */}
            {project.link && (
              <a
                href={project.link}
                className="inline-block border border-white text-white py-2 px-4 hover:bg-white hover:text-black transition-colors"
              >
                Launch Project
              </a>
            )}
          </div>
          <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
            <img
              src={project.imagePath}
              alt={project.title}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
