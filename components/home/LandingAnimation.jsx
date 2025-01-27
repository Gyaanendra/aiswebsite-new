"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRouter } from "next/navigation";


const LandingBanner = () => {
  const logoRef = useRef(null);
  const textRef = useRef(null);
  const containerRef = useRef(null);
  const router = useRouter();
  const redirected = useRef(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.defaults({ ease: "power3.inOut" });

    // Initial animations
    const tl = gsap.timeline();

    // Logo animation
    tl.fromTo(
      logoRef.current,
      {
        scale: 0,
        opacity: 0,
        rotationY: 90,
        transformOrigin: "50% 50%",
        z: 500,
      },
      {
        scale: 1,
        opacity: 1,
        rotationY: 0,
        z: 0,
        duration: 1.5,
        onComplete: () => {
          gsap.to(logoRef.current, {
            rotationY: 360,
            duration: 8,
            repeat: -1,
            ease: "none",
            transformOrigin: "50% 50%",
          });
        },
      }
    );

    // Text animation
    tl.fromTo(
      textRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "elastic.out(1, 0.3)",
        onComplete: () => {
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
        },
      },
      "-=0.8"
    );

    // Scroll animation with redirect
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
          opacity: 1 - progress,
          y: -100 * progress,
          ease: "power3.out",
          overwrite: "auto",
        });
      },
      onLeave: () => {
        if (!redirected.current) {
          redirected.current = true;
          // Smooth transition before redirect
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => router.push("/aboutus"),
          });
        }
      },
    });
  }, [router]);

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
      <h1
        ref={textRef}
        className="text-4xl font-bold text-white text-center transform-style-preserve-3d"
      >
        Artificial Intelligence Society
      </h1>

      <style jsx global>{`
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
      `}</style>
    </motion.div>
  );
};

export default LandingBanner;
