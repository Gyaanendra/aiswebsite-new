"use client";
import { useRef, useEffect } from "react";
import { ReactLenis } from "@studio-freight/react-lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import Footer from "../../components/Footer";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Synthetic Human",
    imagePath: "/ff.png",
  },
  {
    title: "Porsche: Dream Machine",
    imagePath: "/ff.png",
  },
  {
    title: "Virtual Ecosystem",
    imagePath: "/ff.png",
  },
  {
    title: "Neon Metropolis",
    imagePath: "/ff.png",
  },
  {
    title: "AI Revolution",
    imagePath: "/ff.png",
  },
  {
    title: "Quantum Interface",
    imagePath: "/ff.png",
  },
];

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      //infinite scroll effect for (PROJECTS)
      gsap.to(marqueeRef1.current, {
        xPercent: -100,
        ease: "none",
        duration: 800,
        repeat: -1,
      });

      //infinite scroll effect for (Let's Dive In)
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
        ease: "power3.out",
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
              scale: 0.95,
              opacity: 0.5,
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
              scale: 0.9,
              opacity: 0,
              y: 100,
              duration: 0.8,
              ease: "power2.in",
            });
          },
        });

        // Set initial state
        gsap.set(project, {
          scale: 0.9,
          opacity: 0,
          y: 100,
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
      <section
        ref={sectionRef}
        className="min-h-screen bg-black text-white p-8 md:p-16"
      >
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
              className="group relative overflow-hidden rounded-lg h-[500px] transition-all duration-700 ease-out"
            >
              <Image
                src={project.imagePath}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
                priority={i < 2}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-100 transition-opacity duration-500 z-10" />

              <div className="relative z-20 p-6 h-full flex flex-col justify-end transform transition-transform duration-500">
                <h3 className="text-2xl md:text-3xl font-bold transform transition-transform duration-500 group-hover:translate-x-2">
                  {project.title}
                </h3>
              </div>

              <div className="absolute inset-0 bg-gray-800/50 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
          ))}
        </div>
      </section>
      <section className="footer w-full flex items-center justify-center bg-black">
    <Footer />
</section>

    </SmoothScrollWrapper>
  );
}
