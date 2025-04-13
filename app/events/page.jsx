"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis } from "lenis/react";
import "../../screensCss/b.css";
import Footer from "@/components/Footer";
import LiquidChrome from "@/components/LiquidChrome";
import InteractiveBentoGallery from "@/components/interactive-bento-gallery";

// Card arrays for the main event cards
const leftImages = [
  { 
    src: "/AI 101.png", 
    alt: "AI 101", 
    
    overlayText:
      "An immersive kickoff event where freshers engaged in foundational AI concepts, hands-on coding sessions, and insightful talks, setting the stage for innovation and learning."
  },
  { 
    src: "/TECH ARENA.png", 
    alt: "TechArena 2025", 
     
    overlayText:
      "AIS proudly participated in TechArena 2025, presenting innovative projects and connecting with a vibrant community of tech enthusiasts and industry experts."
  },
  { 
    src: "/Workshop.png", 
    alt: "Workshop", 
  
    overlayText:
      "A deep dive into the fusion of XR and Generative AI, providing students with hands-on experience and practical insights into emerging technologies."
  }
];

const rightImages = [
  { 
    src: "/AI HUNT 2.0.png", 
    alt: "AI Hunt 2.0", 
   
    overlayText:
      "AI Hunt 2.0 was an exciting 48‑hour online cryptic treasure hunt, featuring a Gen AI workshop, an info session, and dynamic problem‑solving challenges that pushed the boundaries of AI exploration."
  },
  { 
    src: "/Project Showcase.png", 
    alt: "Project Showcase", 
   
    overlayText:
      "AIS shone at the Project Showcase, presenting over 10 groundbreaking projects, the most by any student body, that redefined innovation and creativity!"
  },
  { 
    src: "/Club Carnival.png", 
    alt: "Club Carnival", 
 
    overlayText:
      "Freshers Orientation and Club Carnival for the new batch of students. Included a variety of fun demos, games, and fun events."
  }
];

// Desktop cube images (used when NOT on mobile)
const leftCubeImages = [
  { src: "/RL.png", alt: "Left Cube Front" },
  { src: "/GENAI.png", alt: "Left Cube Back" },
  { src: "/NLP.png", alt: "Left Cube Right" },
  { src: "/CV.png", alt: "Left Cube Left" },
  { src: "/DESIGN.png", alt: "Left Cube Top" },
  { src: "/MULTIMEDIA.png", alt: "Left Cube Bottom" }
];

const rightCubeImages = [
  { src: "/MANAGEMENT.png", alt: "Right Cube Front" },
  { src: "/PR.png", alt: "Right Cube Back" },
  { src: "/DESIGN.png", alt: "Right Cube Right" },
  { src: "/MULTIMEDIA.png", alt: "Right Cube Left" },
  { src: "/GENAI.png", alt: "Right Cube Top" },
  { src: "/NLP.png", alt: "Right Cube Bottom" }
];

//
// Scroll Progress Bar Component
//
const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress percentage
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      setProgress(scrolled);

      // Show the progress bar when scrolling
      setVisible(true);
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
        width: "2.5px", // Set the width to 2.5px
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

//
// Events Page Component
//
export default function Events() {
  // State to check if we are on mobile
  const [isMobile, setIsMobile] = useState(false);

  // Helper to split text into animated letter spans
  const renderAnimatedText = (text) =>
    text.split("").map((char, index) => (
      <span key={index} className="char">
        {char}
      </span>
    ));

  useEffect(() => {
    // Set initial mobile state and update on resize
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);

    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    // ----------------------------
    // Advanced Hero Text Entrance Animations
    // ----------------------------
    gsap.from(".hero-title .char", {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "back.out(1.7)",
      stagger: 0.05,
      delay: 0.2,
    });
    gsap.from(".hero-subtitle .char", {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "back.out(1.7)",
      stagger: 0.05,
      delay: 0.4,
    });

    // ----------------------------
    // Continuous, Subtle Ongoing Animations on Each Letter
    // ----------------------------
    gsap.to(".hero-title .char", {
      rotation: 2,
      duration: 1,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: 1.5,
    });
    gsap.to(".hero-subtitle .char", {
      rotation: -2,
      duration: 1,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: 1.5,
    });

    // ----------------------------
    // Card Animations (Responsive)
    // ----------------------------
    mm.add(
      {
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)",
      },
      (context) => {
        const { isDesktop, isMobile } = context.conditions;
        if (isDesktop) {
          const leftXValues = [-800, -900, -400];
          const rightXValues = [800, 900, 400];
          const leftRotationValues = [-30, -20, -35];
          const rightRotationValues = [30, 20, 35];
          const yValues = [100, -150, -400];

          gsap.utils.toArray(".row").forEach((row, index) => {
            const cardLeft = row.querySelector(".card-left");
            const cardRight = row.querySelector(".card-right");

            gsap.to(cardLeft, {
              x: leftXValues[index],
              scrollTrigger: {
                trigger: ".main",
                start: "top center",
                end: "150% bottom",
                scrub: true,
                onUpdate: (self) => {
                  const progress = self.progress;
                  cardLeft.style.transform = `translateX(${progress * leftXValues[index]}px) translateY(${progress * yValues[index]}px) rotate(${progress * leftRotationValues[index]}deg)`;
                },
              },
            });

            gsap.to(cardRight, {
              x: rightXValues[index],
              scrollTrigger: {
                trigger: ".main",
                start: "top center",
                end: "150% bottom",
                scrub: true,
                onUpdate: (self) => {
                  const progress = self.progress;
                  cardRight.style.transform = `translateX(${progress * rightXValues[index]}px) translateY(${progress * yValues[index]}px) rotate(${progress * rightRotationValues[index]}deg)`;
                },
              },
            });
          });
        } else if (isMobile) {
          gsap.utils.toArray(".row").forEach((row) => {
            const cardLeft = row.querySelector(".card-left");
            const cardRight = row.querySelector(".card-right");

            gsap.set([cardLeft, cardRight], {
              opacity: 0,
              scale: 0.8,
              y: 50,
            });

            gsap.to(cardLeft, {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.6,
              ease: "back.out(1.2)",
              scrollTrigger: {
                trigger: row,
                start: "top 80%",
                end: "top 20%",
                toggleActions: "play none none reverse",
              },
            });

            gsap.to(cardRight, {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.6,
              delay: 0.2,
              ease: "back.out(1.2)",
              scrollTrigger: {
                trigger: row,
                start: "top 80%",
                end: "top 20%",
                toggleActions: "play none none reverse",
              },
            });

            [cardLeft, cardRight].forEach((card) => {
              card.addEventListener("touchstart", () => {
                gsap.to(card, {
                  scale: 1.1,
                  duration: 0.3,
                  ease: "power2.out",
                });
              });
              card.addEventListener("touchend", () => {
                gsap.to(card, {
                  scale: 1,
                  duration: 0.3,
                  ease: "power2.out",
                });
              });
            });
          });
        }
      }
    );

    // ----------------------------
    // Additional Animations
    // ----------------------------
    const scrollTriggerSettings = {
      trigger: ".main",
      start: "top 25%",
      toggleActions: "play reverse play reverse",
    };

    gsap.to(".logo", {
      y: 0,
      scale: 0.1,
      duration: 0.5,
      ease: "power1.out",
      scrollTrigger: scrollTriggerSettings,
    });

    gsap.to("button", {
      y: 0,
      opacity: 1,
      delay: 0.25,
      ease: "power1.out",
      scrollTrigger: scrollTriggerSettings,
    });

    // Fade Out 3D Cubes on Scroll
    gsap.to(".threeD-container", {
      opacity: 0,
      duration: 0.5,
      ease: "power1.out",
      scrollTrigger: {
        trigger: ".main",
        start: "top 80%",
        end: "top 50%",
        scrub: true,
      },
    });

    // Interactive 3D Cube Mouse Parallax
    const leftCubeWrapper = document.querySelector(".left-cube .cube-wrapper");
    const rightCubeWrapper = document.querySelector(".right-cube .cube-wrapper");
    const handleMouseMove = (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const offsetX = (e.clientX - centerX) * 0.02;
      const offsetY = (e.clientY - centerY) * 0.02;
      gsap.to(leftCubeWrapper, {
        rotationY: offsetX,
        rotationX: offsetY,
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(rightCubeWrapper, {
        rotationY: offsetX,
        rotationX: offsetY,
        duration: 0.5,
        ease: "power2.out",
      });
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      mm.revert();
    };
  }, []);

  // For mobile, create cube faces using card images.
  const leftCubeFaces = isMobile
    ? [
        { src: leftImages[0].src, alt: leftImages[0].alt },
        { src: leftImages[1].src, alt: leftImages[1].alt },
        { src: leftImages[0].src, alt: leftImages[0].alt },
        { src: leftImages[1].src, alt: leftImages[1].alt },
        { src: leftImages[0].src, alt: leftImages[0].alt },
        { src: leftImages[1].src, alt: leftImages[1].alt },
      ]
    : leftCubeImages;

  const rightCubeFaces = isMobile
    ? [
        { src: rightImages[0].src, alt: rightImages[0].alt },
        { src: rightImages[1].src, alt: rightImages[1].alt },
        { src: rightImages[2].src, alt: rightImages[2].alt },
        { src: rightImages[0].src, alt: rightImages[0].alt },
        { src: rightImages[1].src, alt: rightImages[1].alt },
        { src: rightImages[2].src, alt: rightImages[2].alt },
      ]
    : rightCubeImages;

  return (
    <ReactLenis root>
      {/* LiquidChrome Background */}
      <div className="liquid-chrome-bg">
        <LiquidChrome />
      </div>

      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* All other content */}
      <div className="content">
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

        {/* Hero section */}
        <section className="hero" style={{ position: "relative", overflow: "hidden" }}>
          <div className={`threeD-container ${isMobile ? "top-cube" : "left-cube"}`}>
            <div className="cube-wrapper">
              <div className="cube">
                {["front", "back", "right", "left", "top", "bottom"].map((face, index) => (
                  <div
                    key={face}
                    className={`face face-${face}`}
                    style={{ backgroundImage: `url(${leftCubeFaces[index].src})` }}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className={`threeD-container ${isMobile ? "bottom-cube" : "right-cube"}`}>
            <div className="cube-wrapper">
              <div className="cube">
                {["front", "back", "right", "left", "top", "bottom"].map((face, index) => (
                  <div
                    key={face}
                    className={`face face-${face}`}
                    style={{ backgroundImage: `url(${rightCubeFaces[index].src})` }}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="hero-text">
            <h1 className="hero-title" style={{ fontSize: "7rem", whiteSpace: "nowrap" }}>
              {renderAnimatedText("Events")}
            </h1>
            <h2 className="hero-subtitle" style={{ fontSize: "3.5rem", whiteSpace: "nowrap" }}>
              {renderAnimatedText("Let's dive in")}
            </h2>
          </div>
        </section>

      
        <section className="main">
          <div className="main-content">
            <h1 className="middle-text">Artificial Intelligence Society</h1>
          </div>
          {[0, 1, 2].map((i) => (
            <div className="row" key={i}>
              {/* Left Card */}
              <div className="card card-left">
                <div className="hover-container">
                  <Image
                    src={leftImages[i].src}
                    alt={leftImages[i].alt}
                    width={500}
                    height={300}
                    priority
                  />
                  <div className="card-title">
                    <h3>{leftImages[i].overlayTitle}</h3>
                  </div>
                </div>
              </div>
              {/* Right Card */}
              <div className="card card-right">
                <div className="hover-container">
                  <Image
                    src={rightImages[i].src}
                    alt={rightImages[i].alt}
                    width={500}
                    height={300}
                    priority
                  />
                  <div className="card-title">
                    <h3>{rightImages[i].overlayTitle}</h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Interactive Bento Gallery Section */}
        <section className="bento-gallery-section py-16">
          <div className="container mx-auto">
            <InteractiveBentoGallery
              mediaItems={galleryMediaItems}
              title="Explore All Our Events"
              description="Drag and interact with our collection of events and activities. Click on any event to see full details."
            />
          </div>
        </section>

        {/* Footer section – note: background set to transparent */}
        <section className="footer min-h-screen flex items-center justify-center">
          <Footer />
        </section>
      </div>

      <style jsx>{`
        /* LiquidChrome Background Styles */
        .liquid-chrome-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          pointer-events: none;
        }

        /* Content Layer */
        .content {
          position: relative;
          z-index: 1;
        }

        /* Ensure hero and footer have transparent backgrounds */
        .hero,
        .footer {
          background: transparent;
        }

        /* White/Grey Metallic Gradient Text for Hero */
        .hero-title,
        .hero-subtitle {
          background: linear-gradient(
            270deg,
            #ffffff,
            #e6e6e6,
            #cccccc,
            #b3b3b3,
            #999999
          );
          background-size: 400% 400%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientShift 8s ease infinite;
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        /* Advanced Letter Styling */
        .char {
          display: inline-block;
        }

        /* 3D Cube Styles */
        .threeD-container {
          position: absolute;
          width: 150px;
          height: 150px;
          perspective: 800px;
          z-index: 0;
          opacity: 1;
        }
        /* Desktop positions */
        .left-cube {
          top: 20%;
          left: 10%;
        }
        .right-cube {
          top: 20%;
          right: 10%;
        }
        /* Mobile positions: one cube on top and one on bottom */
        @media (max-width: 767px) {
          .top-cube {
            top: 20%;
            left: 50%;
            transform: translateX(-50%);
          }
          .bottom-cube {
            bottom: 10%;
            left: 50%;
            transform: translateX(-50%);
          }
        }
        .cube-wrapper {
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
        }
        .cube {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          animation: spinCube 10s infinite linear;
        }
        .face {
          position: absolute;
          width: 150px;
          height: 150px;
          background-size: cover;
          background-position: center;
          border: 2px solid rgba(255, 255, 255, 0.3);
        }
        .face-front {
          transform: rotateY(0deg) translateZ(75px);
        }
        .face-back {
          transform: rotateY(180deg) translateZ(75px);
        }
        .face-right {
          transform: rotateY(90deg) translateZ(75px);
        }
        .face-left {
          transform: rotateY(-90deg) translateZ(75px);
        }
        .face-top {
          transform: rotateX(90deg) translateZ(75px);
        }
        .face-bottom {
          transform: rotateX(-90deg) translateZ(75px);
        }
        @keyframes spinCube {
          from {
            transform: rotateX(0deg) rotateY(0deg);
          }
          to {
            transform: rotateX(360deg) rotateY(360deg);
          }
        }

        /* Row and Card styles */
        .row {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 2rem 0;
        }
        .card {
          flex: 1;
          margin: 0 1rem;
          max-width: 500px;
        }
        .hover-container {
          position: relative;
          display: inline-block;
          overflow: hidden;
        }
        .hover-container :global(img) {
          display: block;
          width: 100%;
          height: auto;
        }
        .card-title {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 0.5rem 1rem;
          text-align: center;
        }
        .card-title h3 {
          margin: 0;
          font-size: 1.2rem;
        }
        .main {
          margin-top: 0.5rem;
        }
        .main-content {
          margin-bottom: 0.5rem;
        }
        @media (max-width: 767px) {
          .hero-title {
            font-size: 2.5rem !important;
          }
          .hero-subtitle {
            font-size: 1.8rem !important;
          }
          .row {
            flex-direction: column;
            gap: 1rem;
          }
          .card {
            width: 100%;
            margin-bottom: 1rem;
          }
        }

        .middle-text {
          font-size: 3rem;
          text-align: center;
          color: #fff;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
          animation: glow 4s ease-in-out infinite alternate;
        }

        @keyframes glow {
          from {
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
          }
          to {
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.8),
                         0 0 30px rgba(220, 220, 220, 0.8),
                         0 0 40px rgba(200, 200, 200, 0.8);
          }
        }

        @media (max-width: 768px) {
          .middle-text {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </ReactLenis>
  );
}

// Create media items for the InteractiveBentoGallery component
const galleryMediaItems = [
  {
    id: 1,
    type: "image",
    title: "AI 101",
    desc: "An immersive kickoff event where freshers engaged in foundational AI concepts, hands-on coding sessions, and insightful talks, setting the stage for innovation and learning.",
    url: "/AI 101.png",
    span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
  },
  {
    id: 2,
    type: "image",
    title: "AI Hunt 2.0",
    desc: "AI Hunt 2.0 was an exciting 48‑hour online cryptic treasure hunt, featuring a Gen AI workshop, an info session, and dynamic problem‑solving challenges that pushed the boundaries of AI exploration.",
    url: "/AI HUNT 2.0.png",
    span: "md:col-span-2 md:row-span-2 col-span-1 sm:col-span-2 sm:row-span-2",
  },
  {
    id: 3,
    type: "image",
    title: "TechArena 2025",
    desc: "AIS proudly participated in TechArena 2025, presenting innovative projects and connecting with a vibrant community of tech enthusiasts and industry experts.",
    url: "/TECH ARENA.png",
    span: "md:col-span-1 md:row-span-3 sm:col-span-2 sm:row-span-2",
  },
  {
    id: 4,
    type: "image",
    title: "Project Showcase",
    desc: "AIS shone at the Project Showcase, presenting over 10 groundbreaking projects, the most by any student body, that redefined innovation and creativity!",
    url: "/Project Showcase.png",
    span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2",
  },
  {
    id: 5,
    type: "image",
    title: "Workshop",
    desc: "A deep dive into the fusion of XR and Generative AI, providing students with hands-on experience and practical insights into emerging technologies.",
    url: "/Workshop.png",
    span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
  },
  {
    id: 6,
    type: "image",
    title: "Club Carnival",
    desc: "Freshers Orientation and Club Carnival for the new batch of students. Included a variety of fun demos, games, and fun events.",
    url: "/Club Carnival.png",
    span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2",
  }
];
