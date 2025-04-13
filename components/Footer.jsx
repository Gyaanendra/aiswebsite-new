'use client';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { Github, Instagram, Linkedin, ArrowUp } from 'lucide-react';
import Image from 'next/image';

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

  // Sample team member data with working GitHub links.
  const teamMembers = [
    { name: 'Afjal', image: '/afjal.jpg', github: 'https://github.com/INSANE0777' },
    { name: 'Gyanendra', image: '/gyanendra.png', github: 'https://github.com/Gyaanendra' },
    { name: 'Anvesh', image: '/anvesh.png', github: 'https://github.com/mr-anvesh' },
    { name: 'Arisha', image: '/arisha.png', github: 'https://github.com/arisha-git' },
  ];

  // Leadership team data
  const leadershipTeam = [
    { name: 'Mann Acharya', role: 'Mentor /Ex-Chairperson', image: '/mann.png' },
    { name: 'Samaksh Tyagi', role: 'President', image: '/samaksh.jpg' },
    { name: 'Aviral Jain', role: 'Vice President', image: '/aviral.png' },
  ];

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

    // Update scroll up button visibility based solely on scrollY.
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowScrollTop(scrollY > 300);
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
          ease: 'power2.out',
        });
      }
    };

    const handleMouseLeave = () => {
      if (logoRef.current) {
        gsap.to(logoRef.current, {
          transform: 'perspective(1000px) rotateX(0) rotateY(0)',
          duration: 0.5,
          ease: 'power2.out',
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
          duration: 0.5, // Reduced from 1 to 0.5 seconds
          ease: "power2.out", // Changed from default to power2.out for snappier animation
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
            duration: 0.3, // Reduced from 0.5 to 0.3 seconds
            delay: index * 0.1, // Reduced delay between elements
            ease: "power2.out",
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
    <footer
      ref={footerRef}
      className="bg-transparent text-white p-8 relative overflow-hidden"
    >
      <div className="container mx-auto relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {/* Left Section */}
          <div className="space-y-6 md:pr-8">
            <div
              ref={logoRef}
              className="flex items-center space-x-4 transform-gpu transition-transform duration-300 cursor-pointer p-4"
            >
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
                <h2 ref={addToRefs} className="text-2xl font-bold text-white">
                  Artificial Intelligence Society
                </h2>
                <p ref={addToRefs} className="text-white font-medium">
                  Training Minds, One Epoch at a Time
                </p>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="space-y-6 md:pl-8 md:border-l md:border-gray-800">
            <h2 ref={addToRefs} className="text-2xl font-bold text-white">
              Contact Us
            </h2>
            <div className="space-y-4">
              <p ref={addToRefs} className="text-white font-medium">
                Bennett University
                <br />
                Greater Noida, India
              </p>

              {/* Social Media Links */}
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                {[
                  {
                    Icon: Github,
                    href: 'https://github.com/bennettai',
                    label: 'Github',
                  },
                  {
                    Icon: Instagram,
                    href: 'https://www.instagram.com/ais.bennett/',
                    label: 'Instagram',
                  },
                  {
                    Icon: Linkedin,
                    href: 'https://www.linkedin.com/company/bennett-artificial-intelligence-society/',
                    label: 'LinkedIn',
                  },
                ].map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    ref={addToRefs}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-white font-medium hover:text-white transition-all group relative"
                  >
                    <div className="relative">
                      <Icon className="w-5 h-5 transition-transform duration-300" />
                    </div>
                    <span className="relative z-10">{label}</span>
                  </a>
                ))}
              </div>

              {/* Contact Email */}
              <p ref={addToRefs} className="text-white font-medium">
                General enquiries:{' '}
                <a
                  href="mailto:ais@bennett.edu.in"
                  className="text-white font-medium hover:text-white transition-all hover:underline relative group"
                >
                  <span className="relative z-10">ais@bennett.edu.in</span>
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center space-y-2 relative">
          <p ref={addToRefs} className="text-white font-medium">
            © 2025 AI Society, Specialization Club of Bennett University Under SCSET BU
          </p>

          {/* Leadership Team Cards */}
          <h3 ref={addToRefs} className="text-xl font-bold mt-8 mb-4 text-white">
            Our Leadership
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
            {leadershipTeam.map((leader, index) => (
              <div
                key={index}
                ref={addToRefs}
                className="flex flex-col items-center p-4 bg-white/5 backdrop-blur-xl rounded-lg shadow-lg transform hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group border border-white/10"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm"></div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/5"></div>

                <div className="relative w-24 h-24 mb-4 z-10">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full border-2 border-white/20"
                  />
                </div>
                <h3 className="text-lg font-bold text-white z-10">{leader.name}</h3>
                <p className="text-white font-medium mt-1 z-10">{leader.role}</p>
              </div>
            ))}
          </div>
          
          {/* Developers Credits */}
          <div className="mt-12 pt-6 border-t border-gray-800">
            <div className="flex flex-row justify-end items-center gap-4 mt-4">
              <p ref={addToRefs} className="text-sm text-white font-bold mr-2">
                Developed by:
              </p>
              {teamMembers.map((member, index) => (
                <a
                  key={index}
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  ref={addToRefs}
                  className="relative group"
                >
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/30 hover:border-white transition-colors bg-white/10 backdrop-blur-sm">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={64}
                      height={64}
                      className="object-cover w-full h-full transition-transform group-hover:scale-110 brightness-100 contrast-125"
                    />
                  </div>
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 text-sm bg-gray-800/90 text-white font-bold rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {member.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
