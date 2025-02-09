"use client";
import { useRef, useEffect } from 'react';
import { ReactLenis } from '@studio-freight/react-lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/Footer';
gsap.registerPlugin(ScrollTrigger);

const projects = [
  { 
    title: "Project 1", 
    imagePath: "/A4 - 6.png",
    tag: "AI & Robotics"
  },
  { 
    title: "Project 2", 
    imagePath: "/A4 - 5.png",
    tag: "Automotive Design"
  },
  { 
    title: "Project 3", 
    imagePath: "/A4 - 6.png",
    tag: "Sustainability"
  },
  { 
    title: "Project 4", 
    imagePath: "/A4 - 5.png",
    tag: "Urban Design"
  },
  { 
    title: "Project 5", 
    imagePath: "/A4 - 6.png",
    tag: "Technology"
  },
  { 
    title: "Project 6", 
    imagePath: "/A4 - 5.png",
    tag: "Quantum Computing"
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
  const marqueeRef1 = useRef(null);  // For "PROJECTS"
  const marqueeRef2 = useRef(null);  // For "Let's Dive In"

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
      <section ref={sectionRef} className="min-h-screen bg-black text-white p-8 md:p-16">
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
              onMouseMove={(e) => handleMouseMove(e, projectRefs.current[i])}
              onMouseLeave={() => handleMouseLeave(projectRefs.current[i])}
              style={{
                transformStyle: 'preserve-3d'
              }}
            >
              <Link href={`/projects/${i + 1}`}>
                <Image 
                  src={project.imagePath}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
                  priority={i < 2}
                  style={{
                    transformStyle: 'preserve-3d'
                  }}
                />
                <div className="relative z-20 p-6 h-full flex flex-col justify-end transform transition-transform duration-500">
                  <h3 className="text-2xl md:text-3xl font-bold transform transition-transform duration-500 group-hover:translate-x-2">
                    {project.title}
                  </h3>
                  <p className="text-lg md:text-xl font-light transform transition-transform duration-500 group-hover:translate-x-2">
                    {project.tag}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
      <section className="footer min-h-screen flex items-center justify-center bg-black">
          <Footer />
        </section>
    </SmoothScrollWrapper>
  );
}