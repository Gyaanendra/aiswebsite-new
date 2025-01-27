"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleHover = (e) => {
      const target = e.target;
      setIsHovering(
        target.tagName === "A" ||
          target.tagName === "BUTTON" ||
          target.classList.contains("cursor-hover")
      );
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleHover);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleHover);
    };
  }, []);

  return (
    <>
      <div
        className={`fixed top-0 left-0 pointer-events-none z-50 transition-transform duration-100 ease-out ${
          isHovering ? "scale-150" : "scale-100"
        }`}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      >
        {/* Main cursor image */}
        <Image
          src="/c.png"
          width={64}
          height={64}
          className={`transition-all duration-300 ${
            isHovering ? "opacity-0" : "opacity-100"
          }`}
          alt="Cursor"
          priority
          style={{
            transform: "translate(-50%, -50%)",
            width: "4rem",
            height: "4rem",
          }}
        />
      </div>
      <div
        className="fixed top-0 left-0 pointer-events-none z-50 transition-all duration-300 ease-out"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      >
        {/* Hover state image */}
        <Image
          src="/c.png"
          width={32}
          height={32}
          className={`transition-all duration-200 ${
            isHovering ? "opacity-100" : "opacity-0"
          }`}
          alt="Hover Cursor"
          priority
          style={{
            transform: "translate(-50%, -50%)",
            width: "2rem",
            height: "2rem",
          }}
        />
      </div>
    </>
  );
};

export default CustomCursor;
