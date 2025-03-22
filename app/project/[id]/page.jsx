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
      ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
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
      {/* Added mt-24 to create extra top gap for the title */}
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24 mt-24 text-white">
        {/* Use grid-cols-1 for mobile and grid-cols-2 for medium screens and up */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-8 flex flex-col justify-center">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-wide">
              {project.title}
            </h1>
            <div className="space-y-6">
              {project.description ? (
                <p className="text-base sm:text-lg md:text-xl leading-relaxed">
                  {project.description}
                </p>
              ) : (
                <p className="text-base sm:text-lg md:text-xl leading-relaxed">
                  No description available.
                </p>
              )}
              <div className="flex flex-wrap gap-2">
                <h3 className="w-full text-lg font-bold">Tech Used</h3>
                {project.tags?.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 text-sm rounded-full bg-gray-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {project.contributors && (
                <div className="flex flex-wrap gap-2">
                  <span className="w-full text-lg font-bold">Contributors</span>
                  {project.contributors.map((contributor, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-sm rounded-full bg-gray-800"
                    >
                      {contributor}
                    </span>
                  ))}
                </div>
              )}
            </div>
            {/* Styled link instead of a button */}
            {project.link && (
              <div className="flex gap-4">
                <a
                  href={project.link}
                  className="inline-block border border-white text-white py-2 px-4 hover:bg-white hover:text-black transition-colors"
                >
                  Launch Project
                </a>
              </div>
            )}
          </div>
          <div className="relative flex items-center justify-center w-full rounded-lg overflow-hidden">
            {/* The aspect-video class ensures a 16:9 ratio while being responsive */}
            <div className="w-full aspect-video">
              <img
                src={project.imagePath}
                alt={project.title}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* GitHub Link Section */}
        {project.githubLink && (
          <div className="mt-16 flex justify-center">
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-gray-300 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              View on GitHub
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;
