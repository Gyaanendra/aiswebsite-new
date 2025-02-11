'use client';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { Github, Instagram, Linkedin, ArrowUp } from 'lucide-react';
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const textRefs = useRef([]);
  const logoRef = useRef(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Helper callback to add refs to the textRefs array without duplicates.
  const addToRefs = useCallback((el) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  }, []);

  useEffect(() => {
    // Determine if we're on a mobile screen.
    const isMobileScreen = window.innerWidth < 768;

    // Initialize Lenis for smooth scrolling.
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    const scrollFn = (time) => {
      lenis.raf(time);
      requestAnimationFrame(scrollFn);
    };
    requestAnimationFrame(scrollFn);

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);

    // 3D rotation effect for the logo.
    const handleMouseMove = (e) => {
      if (logoRef.current) {
        const rect = logoRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        gsap.to(logoRef.current, {
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          duration: 0.5,
          ease: 'power2.out'
        });
      }
    };

    const handleMouseLeave = () => {
      if (logoRef.current) {
        gsap.to(logoRef.current, {
          transform: 'perspective(1000px) rotateX(0) rotateY(0)',
          duration: 0.5,
          ease: 'power2.out'
        });
      }
    };

    // Add event listeners for the logo.
    const logo = logoRef.current;
    if (logo) {
      logo.addEventListener('mousemove', handleMouseMove);
      logo.addEventListener('mouseleave', handleMouseLeave);
    }

    // For mobile screens, immediately set the footer and text elements to visible.
    if (isMobileScreen) {
      gsap.set(footerRef.current, { opacity: 1, y: 0 });
      textRefs.current.forEach((el) => gsap.set(el, { opacity: 1, y: 0 }));
    } else {
      // GSAP animations for the footer (desktop).
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      textRefs.current.forEach((el, index) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: index * 0.2,
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }

    return () => {
      lenis.destroy();
      window.removeEventListener('scroll', handleScroll);
      if (logo) {
        logo.removeEventListener('mousemove', handleMouseMove);
        logo.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={footerRef} className="bg-black text-white p-8 relative overflow-hidden">
      <div className="container mx-auto relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {/* Left Section */}
          <div className="space-y-6 md:pr-8">
            <div ref={logoRef} className="flex items-center space-x-4 transform-gpu transition-transform duration-300 cursor-pointer p-4">
              {/* Enhanced AI Society Logo with 3D effect */}
              <div className="relative group">
                <Image
                  src="/bais.png"
                  alt="BAIS Logo"
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-lg transition-all duration-300 group-hover:shadow-lg group-hover:shadow-white/20"
                />
                <div className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div>
                <h2 ref={addToRefs} className="text-2xl font-bold">
                  Artificial Intelligence Society
                </h2>
                <p ref={addToRefs} className="text-gray-300">
                  Training Minds, One Epoch at a Time
                </p>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="space-y-6 md:pl-8 md:border-l md:border-gray-800">
            <h2 ref={addToRefs} className="text-2xl font-bold">
              Contact Us
            </h2>
            <div className="space-y-4">
              <p ref={addToRefs} className="text-gray-300">
                Bennett University
                <br />
                Greater Noida, India
              </p>

              {/* Social Media Links (Static, without animation) */}
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                {[
                  { Icon: Github, href: "https://github.com/bennettai", label: "Github" },
                  { Icon: Instagram, href: "https://www.instagram.com/ais.bennett/", label: "Instagram" },
                  { Icon: Linkedin, href: "https://www.linkedin.com/company/bennett-artificial-intelligence-society/", label: "LinkedIn" }
                ].map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    ref={addToRefs}
                    href={href}
                    className="flex items-center space-x-2 text-gray-400 hover:text-white transition-all group relative"
                  >
                    <div className="relative">
                      <Icon className="w-5 h-5 transition-transform duration-300" />
                    </div>
                    <span className="relative z-10">{label}</span>
                  </a>
                ))}
              </div>

              {/* Contact Email */}
              <p ref={addToRefs} className="text-gray-300">
                General enquiries:{' '}
                <a 
                  href="mailto:ais@bennett.edu.in" 
                  className="text-gray-400 hover:text-white transition-all hover:underline relative group"
                >
                  <span className="relative z-10">ais@bennett.edu.in</span>
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="mt-12 text-center space-y-2 relative">
          <p ref={addToRefs} className="text-gray-400">
            © 2025 AI Society, Specialization Club of Bennett University Under SCSET BU
          </p>
          <p
            ref={addToRefs}
            className="text-white hover:text-white transition-colors group cursor-pointer relative z-10"
          >
            Built by RL Team
            <span className="block h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </p>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-0 m-16 p-3 bg-gray-800 rounded-full shadow-lg hover:bg-gray-700 transition-all transform group ${
          showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300" />
        <span className="absolute inset-0 rounded-full bg-white/10 scale-0 group-hover:scale-150 transition-transform duration-500" />
      </button>
    </footer>
  );
};

export default Footer;
