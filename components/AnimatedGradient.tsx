// components/AnimatedGradient.tsx
'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedGradient() {
  const gradientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      smoothWheel: true,
      syncTouch: true,
    });

    // Connect Lenis to ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Gradient animation
    if (gradientRef.current) {
      gsap.to(gradientRef.current, {
        backgroundPosition: '100% 100%',
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          onUpdate: () => console.log('ScrollTrigger updating'), // Debugging
        },
      });
    }

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={gradientRef}
      className="fixed inset-0 z-[-1] pointer-events-none bg-gradient-to-br 
               from-purple-500/50 via-pink-500/50 to-red-500/50
               bg-[size:200%_200%] bg-[position:0%_0%] border-2 border-red-500" // Debugging border
    />
  );
}