"use client";
import { useRef, useEffect, useState } from 'react';
import { ReactLenis } from '@studio-freight/react-lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/Footer';
import "../../screensCss/c.css";
import { data } from "@/data/data";
import LiquidChrome from '@/components/LiquidChrome';

gsap.registerPlugin(ScrollTrigger);

const projects = data.projects;

// Scroll Progress Bar Component
const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      setProgress(scrolled);
      setVisible(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setVisible(false), 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        right: "10px",
        top: "50%",
        transform: "translateY(-50%)",
        width: "2.5px", // Width is set to 2.5px
        height: "100px",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        borderRadius: "1px",
        zIndex: 9999,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.3s ease-in-out",
      }}
    >
      <div
        style={{
          width: "100%",
          height: `${progress}%`,
          backgroundColor: "white",
          borderRadius: "1px",
        }}
      />
    </div>
  );
};

// Wrapper component for smooth scrolling
function SmoothScrollWrapper({ children }) {
  const onScroll = (e) => {
    ScrollTrigger.update();
  };

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.5,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      }}
      onScroll={onScroll}
    >
      {children}
    </ReactLenis>
  );
}

export default function ProjectsSection() {
  const projectRefs = useRef([]);
  const sectionRef = useRef(null);
  const marqueeRef1 = useRef(null); // For "PROJECTS"
  const marqueeRef2 = useRef(null); // For "Let's Dive In"

  // Add mouse move handler for tilt effect
  const handleMouseMove = (e, card) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPercent = (x / rect.width - 0.5) * 2; // -1 to 1
    const yPercent = (y / rect.height - 0.5) * 2; // -1 to 1

    gsap.to(card, {
      rotateY: xPercent * 5, // Adjust multiplier for more/less rotation
      rotateX: -yPercent * 5,
      transformPerspective: 1000,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = (card) => {
    gsap.to(card, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Infinite scroll effect for "PROJECTS"
      gsap.to(marqueeRef1.current, {
        xPercent: -100,
        ease: "none",
        duration: 800,
        repeat: -1,
      });

      // Infinite scroll effect for "Let's Dive In"
      gsap.to(marqueeRef2.current, {
        xPercent: 100,
        ease: "none",
        duration: 800,
        repeat: -1,
      });

      // Create a timeline for smoother orchestration
      const tl = gsap.timeline();

      // Animate the heading first
      tl.from(".section-header", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      // Project cards animation
      projectRefs.current.forEach((project, i) => {
        ScrollTrigger.create({
          trigger: project,
          start: "top bottom-=100",
          end: "top center",
          onEnter: () => {
            gsap.to(project, {
              scale: 1,
              opacity: 1,
              y: 0,
              duration: 1.2,
              ease: "power4.out",
              delay: i * 0.1,
            });
          },
          onLeave: () => {
            gsap.to(project, {
              scale: 1,
              opacity: 1,
              duration: 0.8,
              ease: "power2.in",
            });
          },
          onEnterBack: () => {
            gsap.to(project, {
              scale: 1,
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
            });
          },
          onLeaveBack: () => {
            gsap.to(project, {
              scale: 1,
              opacity: 1,
              duration: 0.8,
              ease: "power2.in",
            });
          },
        });

        // Set initial state
        gsap.set(project, {
          scale: 1,
          opacity: 1,
          y: 0,
        });
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.clearScrollMemory();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <SmoothScrollWrapper>
      <LiquidChrome className="liquid-chrome-bg" />
      {/* Scroll Progress Bar */}
      <ScrollProgress />
      <header className="header">
        <div className="logo-container">
          <Image
            src="/ais.png"
            alt="AI Society Logo"
            width={250}
            height={100}
            className="object-contain"
            priority
          />
        </div>
      </header>

      <section ref={sectionRef} className="min-h-screen text-white p-8 md:p-16">
        <div className="section-header mb-32 relative overflow-hidden pt-24">
          {/* First marquee - PROJECTS */}
          <div 
            ref={marqueeRef1}
            className="whitespace-nowrap"
            style={{ 
              width: "fit-content",
              transform: "translateX(0%)", 
            }}
          >
            <div className="flex">
              {[...Array(200)].map((_, i) => (
                <span 
                  key={i} 
                  className="text-6xl md:text-8xl lg:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 inline-block pr-8"
                >
                  PROJECTS
                </span>
              ))}
            </div>
          </div>
          
          {/* Second marquee - Let's Dive In */}
          <div 
            ref={marqueeRef2}
            className="whitespace-nowrap"
            style={{ 
              width: "fit-content",
              transform: "translateX(-64%)", // Start from the left
            }}
          >
            <div className="flex">
              {[...Array(200)].map((_, i) => (
                <span 
                  key={`dive-${i}`} 
                  className="text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 inline-block pr-8"
                >
                  Let's Dive In -
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <div
              key={project.title}
              ref={(el) => el && (projectRefs.current[i] = el)}
              className="group relative overflow-hidden rounded-lg transition-all duration-700 ease-out"
              onMouseMove={(e) => handleMouseMove(e, projectRefs.current[i])}
              onMouseLeave={() => handleMouseLeave(projectRefs.current[i])}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <Link href={`/project/${i + 1}`}>
                <div className="relative h-[500px]">
                  <Image 
                    src={project.imagePath}
                    alt={project.title}
                    fill
                    sizes="(max-width: 400px) 100vw, 50vw"
                    className="object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
                    priority={i < 2}
                    style={{ transformStyle: 'preserve-3d' }}
                  />
                </div>
              </Link>
              {/* Title and tag placed outside of the image */}
              <div className="mt-4 p-4">
                <h3 className="text-2xl md:text-3xl font-bold flex items-center transition-all duration-300">
                  <span className="transition-all duration-300 group-hover:translate-x-2">
                    {project.title}
                  </span>
                  <span className="ml-2 inline-block transition-all duration-300 transform opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0">
                    →
                  </span>
                </h3>
                <p className="text-lg md:text-xl font-light">{project.tag}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="footer min-h-screen flex items-center justify-center">
        <Footer />
      </section>
    </SmoothScrollWrapper>
  );
}
