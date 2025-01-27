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
  const backgroundRef = useRef(null); // Ref for interactive background
  const router = useRouter();
  const [hasRedirected, setHasRedirected] = useState(false);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleTextAnimationComplete = () => {
    console.log("Text animation complete");
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

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    setMousePosition({ x: clientX, y: clientY });
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
        console.log("Scroll progress:", progress);

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
          y: -50 * progress,
          ease: "power3.out",
          overwrite: "auto",
        });

        if (progress > 0.5 && !hasRedirected) {
          console.log("Redirecting to About Us page...");
          setHasRedirected(true);
          router.push("/aboutus");
        }
      },
    });

    // Attach mouse move event listener
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [router, hasRedirected]);

  // Dynamically adjust the background gradient based on mouse position
  const getGradient = () => {
    const { x, y } = mousePosition;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const xRatio = x / width;
    const yRatio = y / height;

    // Adjusting the gradient position based on mouse coordinates
    return `radial-gradient(circle at ${xRatio * 100}% ${yRatio * 100}%, #636363, #000000, #000000)`;
  };

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
        style={{ zIndex: 10, opacity: 1 }}
      >
        <div className="text-4xl font-bold text-white text-center">
          Artificial Intelligence Society
        </div>
      </div>

      {/* Interactive Gradient Background with Grain Effect */}
      <div
        ref={backgroundRef}
        className="absolute top-0 left-0 w-full h-full"
        style={{
          zIndex: -1,
          background: getGradient(),
          transition: "background 0.1s ease", // Smooth transition for gradient changes
        }}
      >
        {/* Grain Effect Overlay */}
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: "url('/path/to/grain-texture.png')", // Add path to your grain texture image
            backgroundSize: "cover",
            opacity: 0.3, // Adjust opacity to control the intensity of the grain effect
            pointerEvents: "none", // Ensure it doesn't block interaction
          }}
        ></div>
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
