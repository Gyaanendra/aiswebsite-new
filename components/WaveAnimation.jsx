"use client";
import { useEffect, useRef } from "react";

const WaveAnimation = () => {
  const svgRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!svgRef.current || !pathRef.current) return;
      const path = pathRef.current;
      const svg = svgRef.current;
      const scrollY = window.scrollY;
      const totalHeight = svg.clientHeight - window.innerHeight;
      const percentage = scrollY / totalHeight;
      const pathLength = path.getTotalLength();
      path.style.strokeDasharray = pathLength;
      path.style.strokeDashoffset = pathLength * (1 - percentage);
    };

    // Run on load
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <svg
      ref={svgRef}
      style={{
        position: "fixed",
        top: 0,
        left: -400,
        width: "100%",
        height: "200vh",
        pointerEvents: "none", // Allow clicks to pass through
        zIndex: 9999, // Ensure it's above everything else
      }}
      viewBox="0 0 1000 2000"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Wrap the path in a <g> element to rotate it */}
      <g transform="rotate(-30 0 0)">
        <path
          ref={pathRef}
          d="M0 0 C285 315 5.86278 448.291 144.223 631.238 C239.404 757.091 559.515 782.846 608.808 617.456 C658.101 452.067 497.627 367.073 406.298 426.797 C314.968 486.521 263.347 612.858 322.909 865.537 C384.086 1125.06 79.3992 1007.94 100 1261.99 C144.222 1807.35 819 1325 513 1142.5 C152.717 927.625 -45 1916.5 1191.5 1852"
          stroke="#FFFFFF" // White stroke
          strokeWidth="30"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};

export default WaveAnimation;
