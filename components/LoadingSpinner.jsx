// components/LoadingSpinner.jsx
"use client";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

const LoadingSpinner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const spinnerRef = useRef(null);
  const cubeRef = useRef(null);
  const animationRef = useRef(null);
  const fadeOutRef = useRef(null);

  useEffect(() => {
    if (!isVisible) return;

    animationRef.current = gsap.to(cubeRef.current, {
      rotationX: 360,
      rotationY: 360,
      duration: 4,
      repeat: -1,
      ease: "power1.inOut",
    });

    fadeOutRef.current = gsap.to(spinnerRef.current, {
      opacity: 0,
      duration: 0.5,
      delay: 1.5,
      onComplete: () => {
        setIsVisible(false); // Let React handle unmounting
      },
    });

    return () => {
      // Kill animations and clear refs
      animationRef.current?.kill();
      fadeOutRef.current?.kill();
      cubeRef.current = null;
      spinnerRef.current = null;
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      ref={spinnerRef}
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
    >
      <div
        ref={cubeRef}
        className="w-20 h-20 border-4 border-white/50 relative transform-style-preserve-3d"
      >
        <div className="absolute inset-0 border-4 border-white bg-white/10 transform -translate-z-10" />
        <div className="absolute inset-0 border-4 border-white bg-white/10 transform rotate-y-90 translate-z-10" />
        <div className="absolute inset-0 border-4 border-white bg-white/10 transform rotate-x-90 translate-z-10" />
      </div>
    </div>
  );
};

export default LoadingSpinner;
