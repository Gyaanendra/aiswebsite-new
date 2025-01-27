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
  const router = useRouter();
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.defaults({ ease: "power3.inOut" });

    const tl = gsap.timeline();

    // Initial logo animation
    tl.fromTo(
      logoRef.current,
      {
        scale: 0,
        opacity: 0,
        rotationY: 1080, // 3 full spins
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

    // Scroll-triggered animation
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom+=150% top", // Reduced scroll distance
      scrub: 1, // Smoother scrubbing
      pin: true,
      onUpdate: (self) => {
        const progress = self.progress;

        gsap.to(logoRef.current, {
          scale: 1 + progress * 12, // Reduced scaling
          rotationY: 720 * progress, // 2 full spins during scroll
          z: progress * 1000,
          opacity: 1 - progress * 0.9,
          ease: "power2.out",
        });

        gsap.to(textRef.current, {
          opacity: 1 - progress * 2, // Faster text fade
          y: -80 * progress,
          ease: "power2.out",
        });

        // Redirect earlier in the animation
        if (progress > 0.6 && !hasRedirected) {
          setHasRedirected(true);
          router.push("/aboutus");
        }
      },
    });
  }, [router, hasRedirected]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col justify-center items-center bg-black relative"
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

      <div ref={textRef} className="text-4xl font-bold text-white text-center">
        Artificial Intelligence Society
      </div>
    </motion.div>
  );
};

export default LandingBanner;
