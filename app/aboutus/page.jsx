"use client";
import React, { useRef, useState, useEffect } from "react";
import Card from "@/components/aboutus/Card";
import { ReactLenis } from "@studio-freight/react-lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useMotionValue } from "framer-motion";
import "../../screensCss/a.css";
import Footer from "@/components/Footer";
import TeamCards from "@/components/TeamCards";
import LiquidChrome from "@/components/LiquidChrome";

gsap.registerPlugin(ScrollTrigger);

// -------------------------
// Scroll Progress Component
// -------------------------
const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress as a percentage of the document
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      setProgress(scrolled);

      // Show the progress bar when scrolling
      setVisible(true);

      // Clear previous timeout and hide the bar after 500ms of inactivity
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setVisible(false);
      }, 500);
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
        width: "2.5px",          // Fixed narrow width
        height: "100px",       // Fixed small height
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
          height: `${progress}%`, // Fills the container based on scroll progress
          backgroundColor: "white",
          borderRadius: "1px",
        }}
      />
    </div>
  );
};

const Page = () => {
  const container = useRef(null);
  const overlayRef = useRef(null);
  const textRef = useRef(null);

  // (For potential future use—the motion values aren’t used in this snippet.)
  const pathLengths = [
    useMotionValue(0),
    useMotionValue(0),
    useMotionValue(0),
    useMotionValue(0),
    useMotionValue(0),
  ];

  // Arrays of 4 unique member names for each card
  const technicalTeamMembers = [
    ["Madhav Gupta", "Sanya Wadhawan", "Afjal Hussein", "Gyanendra Prakash"],
    [
      "Mayank Kumar",
      "Sukant Aryan",
      "Aniya Tyagi",
     
    ],
    ["Archit Ojha","Anvesh Mishra", "Palak Virk"],
    ["Dhruv Kumar", "Pragyan Pant", "Arisha Ali"],
  ];
  const communityTeamMembers = [
    [
      "Anshika Agrahari",
      "Shruti Pandey",
      "Raghav Karnatak",
      "Kaatyayani",
      "Samriddhi Sharma",
    ],
    [
      "Akshat Rathi",
      "Ananya Jha",
      "Vaibhav Gupta",
      "Rajyavardhan Singh Rathore",
    ],
    ["Navya Loshali", "Pari Sharma", "Rishit Khandewal", "Ritwick Kuchhal","Ravi Rajput","Prasiddhi Rawat","Rehan Ahmad"],
    [
      "Hemang Tripathi",
      "Riddhi Gandhi",
      "Utkarsh Gupta",
      "Subhangi Singh",
    ],
  ];

  // Define three different wave shapes for the foreground
  const waveShape1 =
    "M0,200 C240,0 480,400 720,200 C960,0 1200,400 1440,200 L1440,400 L0,400 Z";
  const waveShape2 =
    "M0,200 C240,100 480,300 720,200 C960,100 1200,300 1440,200 L1440,400 L0,400 Z";
  const waveShape3 =
    "M0,200 C240,300 480,100 720,200 C960,300 1200,100 1440,200 L1440,400 L0,400 Z";

  // Define three different wave shapes for the background (slightly offset vertically)
  const waveShapeBg1 =
    "M0,220 C240,20 480,380 720,220 C960,20 1200,380 1440,220 L1440,400 L0,400 Z";
  const waveShapeBg2 =
    "M0,220 C240,120 480,280 720,220 C960,120 1200,280 1440,220 L1440,400 L0,400 Z";
  const waveShapeBg3 =
    "M0,220 C240,320 480,120 720,220 C960,320 1200,120 1440,220 L1440,400 L0,400 Z";

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // ---------------------------
      // Desktop Animations (min-width: 769px)
      // ---------------------------
      mm.add("(min-width: 769px)", () => {
        const containerEl = container.current;
        const overlayEl = overlayRef.current;
        const textEl = textRef.current;
        const waveSection = document.querySelector(".wave-section");

        // Select the two wave paths by class name:
        const wavePathFg = document.querySelector(".wave-path-fg");
        const wavePathBg = document.querySelector(".wave-path-bg");

        // Set initial states for both waves (using strokeDash settings plus the starting path)
        gsap.set(wavePathFg, {
          strokeDasharray: 2000,
          strokeDashoffset: 2000,
          attr: { d: waveShape1 },
        });
        gsap.set(wavePathBg, {
          strokeDasharray: 2000,
          strokeDashoffset: 2000,
          attr: { d: waveShapeBg1 },
        });

        // Create a scroll-triggered timeline for the advanced wave animations
        const waveTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: waveSection,
            start: "top center",
            end: "bottom center",
            scrub: 1,
          },
        });

        // ----- Foreground wave animations -----
        waveTimeline
          .to(wavePathFg, { strokeDashoffset: 0, duration: 1, ease: "power2.out" }, 0)
          .to(
            wavePathFg,
            { attr: { d: waveShape2 }, duration: 1, ease: "power1.inOut" },
            0.3
          )
          .to(
            wavePathFg,
            { attr: { d: waveShape3 }, duration: 1, ease: "power1.inOut" },
            0.6
          )
          .to(
            wavePathFg,
            { attr: { d: waveShape1 }, duration: 1, ease: "power1.inOut" },
            0.9
          )
          .to(
            wavePathFg,
            { strokeWidth: 8, duration: 1, ease: "power1.inOut" },
            0.3
          )
          .to(
            wavePathFg,
            { stroke: "#e8e8e8", duration: 1, ease: "power1.inOut" },
            0.3
          )
          .to(
            wavePathFg,
            { strokeWidth: 4, duration: 1, ease: "power1.inOut" },
            0.9
          )
          .to(
            wavePathFg,
            { stroke: "#f5f5f5", duration: 1, ease: "power1.inOut" },
            0.9
          );

        // ----- Background wave animations -----
        waveTimeline
          .to(wavePathBg, { strokeDashoffset: 0, duration: 1, ease: "power2.out" }, 0)
          .to(
            wavePathBg,
            { attr: { d: waveShapeBg2 }, duration: 1, ease: "power1.inOut" },
            0.3
          )
          .to(
            wavePathBg,
            { attr: { d: waveShapeBg3 }, duration: 1, ease: "power1.inOut" },
            0.6
          )
          .to(
            wavePathBg,
            { attr: { d: waveShapeBg1 }, duration: 1, ease: "power1.inOut" },
            0.9
          )
          .to(
            wavePathBg,
            { strokeWidth: 4, duration: 1, ease: "power1.inOut" },
            0.3
          )
          .to(
            wavePathBg,
            { stroke: "#d3d3d3", duration: 1, ease: "power1.inOut" },
            0.3
          )
          .to(
            wavePathBg,
            { strokeWidth: 2, duration: 1, ease: "power1.inOut" },
            0.9
          )
          .to(
            wavePathBg,
            { stroke: "#ffffff", duration: 1, ease: "power1.inOut" },
            0.9
          );

        // Animate scroll-text in the wave section
        gsap.set(textEl, { opacity: 0, y: 20 });
        waveTimeline
          .to(textEl, { opacity: 1, y: 0, duration: 0.5 }, 0.2)
          .to(textEl, { opacity: 0, y: -40, duration: 0.5 }, 0.8);

        const totalScrollHeight = window.innerHeight * 2;

        gsap.to(containerEl, {
          backgroundColor: "#0a0a0a",
          ease: "none",
          scrollTrigger: {
            trigger: containerEl,
            start: "top top",
            end: `+=${totalScrollHeight * 1.5}`,
            scrub: 0.5,
          },
        });

        gsap.to(overlayEl, {
          backgroundPosition: "100% 0%",
          ease: "none",
          scrollTrigger: {
            trigger: containerEl,
            start: "top top",
            end: `+=${totalScrollHeight}`,
            scrub: 0.5,
          },
        });

        const firstHeader = containerEl.querySelector(".first-cards .cards-header");
        const secondHeader = containerEl.querySelector(".second-cards .cards-header");

        gsap.from(firstHeader, {
          opacity: 0,
          y: 30,
          duration: 1,
          scrollTrigger: {
            trigger: firstHeader,
            start: "top 80%",
            end: "top 60%",
            scrub: true,
          },
        });

        gsap.from(secondHeader, {
          opacity: 0,
          y: 30,
          duration: 1,
          scrollTrigger: {
            trigger: secondHeader,
            start: "top 80%",
            end: "top 60%",
            scrub: true,
          },
        });

        // FIRST CARD GROUP ANIMATION (Desktop)
        const firstGroup = containerEl.querySelector(".first-cards");
        const firstCards = firstGroup.querySelectorAll(".card");

        const positions1 = [14, 38, 62, 86];
        const rotations1 = [-15, -7.5, 7.5, 15];

        ScrollTrigger.create({
          trigger: firstGroup,
          start: "top top",
          end: `+=${totalScrollHeight}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        });

        firstCards.forEach((card, index) => {
          gsap.set(card, {
            left: "50%",
            xPercent: -50,
            rotation: 0,
            scale: 0.8,
            opacity: 0,
          });

          gsap.to(card, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            delay: index * 0.1,
            ease: "back.out(1.7)",
          });

          const spreadTL = gsap.timeline({
            scrollTrigger: {
              trigger: firstGroup,
              start: "top top",
              end: `+=${totalScrollHeight}`,
              scrub: 0.3,
            },
          });

          spreadTL
            .to(card, {
              left: `${positions1[index]}%`,
              rotation: rotations1[index],
              ease: "power2.out",
            })
            .to(
              card,
              {
                scale: 1.05,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                duration: 1,
              },
              "<"
            );

          // Flip animation for desktop cards remains unchanged
          const frontEl = card.querySelector(".flip-card-front");
          const backEl = card.querySelector(".flip-card-back");
          const contentEl = card.querySelector(".flip-card-inner");
          gsap.set(contentEl, { transformPerspective: 1000 });

          ScrollTrigger.create({
            trigger: card,
            start: "center center",
            end: "+=200%",
            scrub: 0.5,
            onEnter: () => animateFlip(frontEl, backEl, contentEl, index),
            onLeaveBack: () => resetFlip(frontEl, backEl, contentEl),
          });
        });

        // SECOND CARD GROUP ANIMATION (Desktop - Advanced)
        const secondGroup = containerEl.querySelector(".second-cards");
        const secondCards = secondGroup.querySelectorAll(".card");

        const positions2 = [86, 62, 38, 14]; // mirrored positions
        const rotations2 = [15, 7.5, -7.5, -15]; // mirrored rotations

        ScrollTrigger.create({
          trigger: secondGroup,
          start: "top top",
          end: `+=${totalScrollHeight}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        });

        secondCards.forEach((card, index) => {
          gsap.set(card, {
            left: "50%",
            xPercent: -50,
            rotation: 0,
            scale: 0.8,
            opacity: 0,
            y: 50,
          });

          gsap.to(card, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.5,
            delay: index * 0.1,
            ease: "back.out(1.7)",
          });

          const advancedTL = gsap.timeline({
            scrollTrigger: {
              trigger: secondGroup,
              start: "top top",
              end: `+=${totalScrollHeight}`,
              scrub: 0.3,
            },
          });

          advancedTL
            .to(
              card,
              {
                left: `${positions2[index]}%`,
                rotation: rotations2[index] + 10,
                skewX: 10,
                ease: "power2.out",
                duration: 0.8,
              },
              0
            )
            .to(
              card,
              {
                y: -30,
                ease: "back.out(1.5)",
                duration: 0.8,
              },
              0.2
            )
            .to(
              card,
              {
                scale: 1.2,
                boxShadow: "0 35px 70px -15px rgba(0, 0, 0, 0.7)",
                duration: 1,
              },
              0.2
            )
            .to(
              card,
              {
                rotation: rotations2[index],
                skewX: 0,
                ease: "elastic.out(1, 0.5)",
                duration: 1,
              },
              0.8
            );

          // Flip animation for desktop second group
          const frontEl = card.querySelector(".flip-card-front");
          const backEl = card.querySelector(".flip-card-back");
          const contentEl = card.querySelector(".flip-card-inner");
          gsap.set(contentEl, { transformPerspective: 1000 });

          ScrollTrigger.create({
            trigger: card,
            start: "center center",
            end: "+=200%",
            scrub: 0.5,
            onEnter: () => animateFlip(frontEl, backEl, contentEl, index),
            onLeaveBack: () => resetFlip(frontEl, backEl, contentEl),
          });
        });

        return () => {
          ScrollTrigger.getAll().forEach((trigger) => trigger.revert());
        };
      });

      // ---------------------------
      // Mobile Animations (max-width: 768px)
      // ---------------------------
      mm.add("(max-width: 768px)", () => {
        const containerEl = container.current;
        const overlayEl = overlayRef.current;
        const textEl = textRef.current;
        const waveSection = document.querySelector(".wave-section");

        // For mobile, select the wave paths and set their starting d attribute
        const wavePathFg = document.querySelector(".wave-path-fg");
        const wavePathBg = document.querySelector(".wave-path-bg");
        gsap.set(wavePathFg, { attr: { d: waveShape1 } });
        gsap.set(wavePathBg, { attr: { d: waveShapeBg1 } });

        // Animate the foreground wave morph on scroll (simpler version)
        gsap.to(wavePathFg, {
          attr: { d: waveShape2 },
          duration: 0.5,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: waveSection,
            start: "top 80%",
            end: "center center",
            scrub: 0.4,
          },
        });
        gsap.to(wavePathFg, {
          attr: { d: waveShape1 },
          duration: 0.5,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: waveSection,
            start: "center center",
            end: "bottom center",
            scrub: 0.4,
          },
        });

        // Animate the background wave morph on scroll (simpler version)
        gsap.to(wavePathBg, {
          attr: { d: waveShapeBg2 },
          duration: 0.5,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: waveSection,
            start: "top 80%",
            end: "center center",
            scrub: 0.4,
          },
        });
        gsap.to(wavePathBg, {
          attr: { d: waveShapeBg1 },
          duration: 0.5,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: waveSection,
            start: "center center",
            end: "bottom center",
            scrub: 0.4,
          },
        });

        gsap.to(textEl, {
          opacity: 1,
          y: 0,
          duration: 0.2,
          scrollTrigger: {
            trigger: waveSection,
            start: "top 80%",
            end: "center center",
            scrub: 0.4,
          },
        });

        gsap.to(textEl, {
          opacity: 0,
          y: -20,
          duration: 0.2,
          scrollTrigger: {
            trigger: waveSection,
            start: "center center",
            end: "bottom center",
            scrub: 0.4,
          },
        });

        gsap.to(containerEl, {
          backgroundColor: "#0a0a0a",
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerEl,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8,
          },
        });

        const firstHeader = containerEl.querySelector(".first-cards .cards-header");
        const secondHeader = containerEl.querySelector(".second-cards .cards-header");

        gsap.from(firstHeader, {
          opacity: 0,
          y: 30,
          duration: 0.4,
          scrollTrigger: {
            trigger: firstHeader,
            start: "top 85%",
            end: "top 65%",
            toggleActions: "play none none none",
          },
        });

        gsap.from(secondHeader, {
          opacity: 0,
          y: 30,
          duration: 0.4,
          scrollTrigger: {
            trigger: secondHeader,
            start: "top 85%",
            end: "top 65%",
            toggleActions: "play none none none",
          },
        });

        // FIRST CARD GROUP ANIMATION (Mobile) with Advanced Flip Animation
        const firstGroup = containerEl.querySelector(".first-cards");
        const firstCards = firstGroup.querySelectorAll(".card");
        firstCards.forEach((card, index) => {
          gsap.set(card, { opacity: 0, y: 30 });
          gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 30%",
              toggleActions: "play none none none",
            },
          });

          const frontEl = card.querySelector(".flip-card-front");
          const backEl = card.querySelector(".flip-card-back");
          const contentEl = card.querySelector(".flip-card-inner");

          // Create an advanced flip timeline for mobile that uses scroll progress
          const flipTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top center",
              end: "bottom center",
              scrub: 0.5,
            }
          });
          flipTimeline
            .to(card, {
              scale: 1.1,
              boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.5)",
              duration: 0.3,
              ease: "power3.out"
            })
            .to(contentEl, {
              rotationY: 90,
              duration: 0.3,
              ease: "power3.inOut"
            }, "-=0.2")
            .set([frontEl, backEl], { zIndex: index % 2 === 0 ? 50 : -50 })
            .to(contentEl, {
              rotationY: 180,
              duration: 0.3,
              ease: "power3.inOut"
            })
            .to(card, {
              scale: 1,
              boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
              duration: 0.3,
              ease: "power3.out"
            }, "+=0.1");
        });

        // SECOND CARD GROUP ANIMATION (Mobile) with Advanced Flip Animation and Additional Rotation
        const secondGroup = containerEl.querySelector(".second-cards");
        const secondCards = secondGroup.querySelectorAll(".card");
        secondCards.forEach((card, index) => {
          gsap.set(card, { opacity: 0, y: 30 });
          gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 30%",
              toggleActions: "play none none none",
            },
          });
          // Additional subtle rotation animation for second cards
          gsap.to(card, {
            rotation: 5,
            scale: 1.05,
            duration: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "top 70%",
              scrub: true,
            },
          });

          const frontEl = card.querySelector(".flip-card-front");
          const backEl = card.querySelector(".flip-card-back");
          const contentEl = card.querySelector(".flip-card-inner");

          // Create an advanced flip timeline for the second cards on mobile
          const flipTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top center",
              end: "bottom center",
              scrub: 0.5,
            }
          });
          flipTimeline
            .to(card, {
              scale: 1.1,
              rotation: 5,
              boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.5)",
              duration: 0.3,
              ease: "power3.out"
            })
            .to(contentEl, {
              rotationY: 90,
              duration: 0.3,
              ease: "power3.inOut"
            }, "-=0.2")
            .set([frontEl, backEl], { zIndex: index % 2 === 0 ? 50 : -50 })
            .to(contentEl, {
              rotationY: 180,
              duration: 0.3,
              ease: "power3.inOut"
            })
            .to(card, {
              scale: 1,
              rotation: 0,
              boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
              duration: 0.3,
              ease: "power3.out"
            }, "+=0.1");
        });

        return () => {
          ScrollTrigger.getAll().forEach((trigger) => trigger.revert());
        };
      });

      return () => mm.revert();
    },
    { scope: container }
  );

  // Desktop flip animation functions (used only on desktop in this example)
  const animateFlip = (front, back, content, index) => {
    gsap.to(content, {
      rotationY: 180,
      duration: 0.5,
      ease: "power4.out",
      overwrite: true,
    });

    gsap.to([front, back], {
      zIndex: index % 2 === 0 ? 50 : -50,
      duration: 0.5,
      ease: "power3.out",
    });
  };

  const resetFlip = (front, back, content) => {
    gsap.to(content, {
      rotationY: 0,
      duration: 0.3,
      ease: "power2.out",
    });

    gsap.to([front, back], { zIndex: 0, duration: 0.3 });
  };

  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }}>
      {/* LiquidChrome Background with Fixed Position and a Low z-index */}
      <LiquidChrome
        className="liquid-chrome-bg"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      />

      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Main page content */}
      <div ref={container} style={{ position: "relative", zIndex: 1 }}>
        <div
          className="holographic-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 2,
            mixBlendMode: "screen",
          }}
        />
        <header className="header">
          <img src="/ais.png" alt="Company Logo" className="logo" />
        </header>
        <div
          ref={overlayRef}
          className="gradient-overlay"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,10,10,0.8) 0%, rgba(10,10,10,0) 100%)",
          }}
        />
        <section className="hero min-h-screen flex flex-col items-center justify-center px-4 pt-24 md:pt-0">
          <div className="flex flex-col md:flex-row items-start justify-center w-full max-w-6xl mx-auto">
            <div className="flex-1 md:pr-10">
              <h1 className="text-4xl md:text-7xl font-bold leading-tight text-white text-left pt-20 md:pt-0 relative group">
                <span className="relative inline-block">
                  ABOUT US
                  <span className="absolute bottom-0 left-0 w-0 h-1 bg-white transition-all duration-300 group-hover:w-full"></span>
                </span>
              </h1>
              <p className="mt-10 text-xl text-white max-w-4xl">
                The AI Specialization Club (AIS) at Bennett University is dedicated to
                fostering a deep passion for Artificial Intelligence. The club engages in end-to-end project development, achieves victories in hackathons,
                conducts informative workshops, upskills members through guidance from
                senior student mentors as well as experienced faculty members. We actively
                participate in open-source development as well.
              </p>
            </div>
            <div className="flex-1 md:pl-10 mt-10 md:mt-0 md:pt-20">
              <h2 className="text-4xl md:text-7xl font-bold leading-tight text-white text-left pt-20 md:pt-0 relative group">
                <span className="relative inline-block">
                  What is AI Society?
                  <span className="absolute bottom-0 left-0 w-0 h-1 bg-white transition-all duration-300 group-hover:w-full"></span>
                </span>
              </h2>
              <p className="mt-10 text-xl text-white max-w-4xl">
                The Artificial Intelligence Society (AIS) at Bennett University is one of the most
                research-focused and collaborative student communities on campus. Our mission is to
                foster a deep understanding of AI and its applications by bringing together like-minded
                individuals who are eager to publish research, learn, share knowledge, and work on
                innovative projects. We believe in building together, mentoring juniors, and creating
                an inclusive environment where everyone can grow.
              </p>
            </div>
          </div>
        </section>
        <section className="wave-section min-h-[50vh] relative">
          <div
            ref={textRef}
            className="scroll-text text-white text-xl md:text-2xl font-medium text-center pointer-events-none"
            style={{
              position: "absolute",
              top: "80%",
              left: "50%",
              transform: "translateX(-50%) translateY(20px)",
              zIndex: 10,
              opacity: 0,
            }}
          >
            Keep scrolling to reveal teams&lt;3
          </div>
          <svg
            className="wave-svg w-full h-full"
            viewBox="0 0 1440 400"
            preserveAspectRatio="none"
          >
            {/* Background wave (lower stroke weight, different starting shape) */}
            <path
              className="wave-path wave-path-bg"
              d={waveShapeBg1}
              fill="none"
              stroke="#666666"
              strokeWidth="2"
              strokeDasharray="2000"
              strokeDashoffset="2000"
            />
            {/* Foreground wave */}
            <path
              className="wave-path wave-path-fg"
              d={waveShape1}
              fill="none"
              stroke="#888888"
              strokeWidth="4"
              strokeDasharray="2000"
              strokeDashoffset="2000"
            />
          </svg>
        </section>
        <section className="extra-team-info-section">
          <TeamCards />
        </section>
        <section className="first-cards cards-group relative min-h-screen px-4 md:px-0">
          <h2 className="cards-header text-white text-2xl md:text-3xl text-center mb-8 pt-8 md:pt-0">
            TECHNICAL TEAMS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:block gap-8 md:gap-4">
            {[...Array(4)].map((_, index) => (
              <Card
                key={`first-${index}`}
                id={`card-first-${index + 1}`}
                frontSrc="/back.png"
                frontAlt="Card Image"
                backSrc={["/RL.png", "/GENAI.png", "/NLP.png", "/CV.png"][index]}
                className="card mb-8 md:mb-0"
                memberNames={technicalTeamMembers[index]} // Pass array of 4 member names
              />
            ))}
          </div>
        </section>
        <section className="second-cards cards-group relative min-h-screen">
          <h2 className="cards-header text-white text-2xl md:text-3xl text-center mb-8 pt-8 md:pt-0">
            COMMUNITY OUTREACH
          </h2>
          {[...Array(4)].map((_, index) => (
            <Card
              key={`second-${index}`}
              id={`card-second-${index + 1}`}
              frontSrc="/back.png"
              frontAlt="Card Image"
              backSrc={["/DESIGN.png", "/MANAGEMENT.png", "/PR.png", "/MULTIMEDIA.png"][index]}
              className="card"
              memberNames={communityTeamMembers[index]} // Pass array of 4 member names
            />
          ))}
        </section>
       
        <section className="footer min-h-screen flex items-center justify-center bg-black">
          <Footer />
        </section>
      </div>
    </ReactLenis>
  );
};

export default Page;
