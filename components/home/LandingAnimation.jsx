"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRouter } from "next/navigation";

const LandingBanner = () => {
  const logoRef = useRef(null);
  const textRef = useRef(null);
  const containerRef = useRef(null);
  const backgroundRef = useRef(null);
  const router = useRouter();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [backgroundStyle, setBackgroundStyle] = useState("black");

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);
    gsap.defaults({ ease: "power3.inOut" });

    const tl = gsap.timeline();

    // Logo animation on page load
    tl.fromTo(
      logoRef.current,
      {
        scale: 0,
        opacity: 0,
        rotationY: 1080,
        z: 500,
      },
      {
        scale: 1,
        opacity: 1,
        rotationY: 0,
        z: 0,
        duration: 2.5,
        ease: "power4.out",
        onComplete: () => {
          gsap.to(logoRef.current, {
            rotationY: 360,
            duration: 8,
            repeat: -1,
            ease: "none",
          });
        },
      }
    );

    // Scroll-triggered animation (without redirection and with fixed end point)
    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom top", // Changed from "bottom+=100% top" to "bottom top"
      scrub: 1,
      pin: true,
      pinSpacing: false, // This prevents the extra space after scrolling
      onUpdate: (self) => {
        const progress = self.progress;

        gsap.to(logoRef.current, {
          scale: 1 + progress * 8,
          rotationY: 720 * progress,
          z: progress * 1000,
          opacity: 1 - progress * 0.9,
          ease: "power2.out",
        });

        gsap.to(textRef.current, {
          opacity: 1 - progress * 2,
          y: -80 * progress,
          ease: "power2.out",
        });
      },
    });

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      setMousePosition({ x: clientX, y: clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      st.kill();
      tl.kill();
      gsap.killTweensOf([
        logoRef.current,
        textRef.current,
        containerRef.current,
      ]);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [router]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const { x, y } = mousePosition;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const xRatio = x / width;
    const yRatio = y / height;

    setBackgroundStyle(
      `radial-gradient(circle at ${xRatio * 100}% ${
        yRatio * 100
      }%, rgb(108, 106, 106), #000000, #000000 50%)`
    );
  }, [mousePosition]);

  return (
    <>
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex flex-col justify-center items-center bg-black relative overflow-hidden"
        style={{ perspective: 1000 }}
      >
        <div ref={logoRef} className="mb-6 relative w-48 h-48">
          <Image
            src="/bais.png"
            alt="BAIS Logo"
            fill
            className="object-contain"
            priority
          />
        </div>

        <div ref={textRef} className="transform-style-preserve-3d">
          <div className="text-4xl font-bold text-white text-center">
            Artificial Intelligence Society
          </div>
        </div>

        <div
          ref={backgroundRef}
          className="absolute top-0 left-0 w-full h-full"
          style={{
            zIndex: -1,
            background: backgroundStyle,
            transition: "background 0.1s ease",
          }}
        ></div>

        <style jsx global>{`
          .transform-style-preserve-3d {
            transform-style: preserve-3d;
          }

          body {
            overflow-x: hidden;
            margin: 0;
            padding: 0;
          }
        `}</style>
      </motion.div>
    </>
  );
};

export default LandingBanner;
