"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

const LandingBanner = () => {
  const logoRef = useRef(null);
  const textRef = useRef(null);
  const containerRef = useRef(null);

  const handleTextAnimationComplete = () => {
    console.log("Text animation complete"); // Debugging
    gsap.to(textRef.current, {
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      css: {
        filter: "drop-shadow(0 0 12px rgba(255,255,255,0.9))",
        textShadow: "0 0 20px rgba(255,255,255,0.5)",
      },
    });
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.defaults({ ease: "power3.inOut" });

    const tl = gsap.timeline();

    tl.fromTo(
      logoRef.current,
      {
        scale: 0,
        opacity: 0,
        rotationY: 720,
        z: 500,
        transformOrigin: "50% 50%",
      },
      {
        scale: 1,
        opacity: 1,
        rotationY: 0,
        z: 0,
        duration: 2,
        ease: "power4.out",
        onComplete: () => {
          gsap.to(logoRef.current, {
            rotationY: 360,
            duration: 12,
            repeat: -1,
            ease: "none",
            transformOrigin: "50% 50%",
          });
        },
      }
    );

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom+=200% top",
      scrub: 1.5,
      pin: true,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.to(logoRef.current, {
          scale: 1 + progress * 15,
          rotationY: 180 * progress,
          z: progress * 1000,
          opacity: 1 - progress * 0.8,
          ease: "power3.out",
          overwrite: "auto",
        });
        gsap.to(textRef.current, {
          opacity: 1 - progress, // Fade out text as scroll progresses
          y: -50 * progress, // Reduce y movement
          ease: "power3.out",
          overwrite: "auto",
        });
      },
    });
  }, []);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex flex-col justify-center items-center bg-black relative overflow-visible"
      style={{ perspective: 1000 }}
    >
      <div
        ref={logoRef}
        className="mb-6 relative w-48 h-48 transform-style-preserve-3d"
      >
        <Image
          src="/bais.png"
          alt="BAIS Logo"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain transform-style-preserve-3d"
          priority
        />
      </div>

      <div
        ref={textRef}
        className="transform-style-preserve-3d"
        style={{ zIndex: 10, opacity: 1 }} // Fallback styles
      >
        <div className="text-4xl font-bold text-white text-center">
          Artificial Intelligence Society
        </div>
      </div>

      <style jsx global>{`
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
      `}</style>
    </motion.div>
  );
};

export default LandingBanner;
