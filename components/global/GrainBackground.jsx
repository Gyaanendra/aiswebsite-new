// components/ui/GrainBackground.jsx
"use client";
import React from "react";

const GrainBackground = ({
  opacity = 0.15,
  intensity = 0.85,
  blendMode = "soft-light",
  className = "",
  style = {},
}) => {
  return (
    <>
      <div
        className={`grain-overlay fixed inset-0 w-full h-full pointer-events-none z-0 ${className}`}
        style={{
          opacity,
          mixBlendMode: blendMode,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='${intensity}' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          ...style,
        }}
      />

      <style jsx global>{`
        .grain-overlay {
          animation: grain 1.2s steps(6) infinite;
          will-change: transform;
          backface-visibility: hidden;
          perspective: 1000px;
          transform: translateZ(0);
        }

        @keyframes grain {
          0%,
          100% {
            transform: translate(0, 0);
          }
          10% {
            transform: translate(-3%, -3%);
          }
          20% {
            transform: translate(-5%, 1%);
          }
          30% {
            transform: translate(2%, -4%);
          }
          40% {
            transform: translate(-1%, 2%);
          }
          50% {
            transform: translate(-4%, 3%);
          }
          60% {
            transform: translate(5%, 0%);
          }
          70% {
            transform: translate(0%, 4%);
          }
          80% {
            transform: translate(3%, 1%);
          }
          90% {
            transform: translate(-2%, 2%);
          }
        }
      `}</style>
    </>
  );
};

export default GrainBackground;
