"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis } from "lenis/react";
import "../../screensCss/b.css";
import Footer from "@/components/Footer";
import LiquidChrome from "@/components/LiquidChrome";

// Card arrays for the main event cards
const leftImages = [
  { 
    src: "/AI 101.png", 
    alt: "AI 101", 
    overlayTitle: "AI 101", 
    overlayText:
      "An immersive kickoff event where freshers engaged in foundational AI concepts, hands-on coding sessions, and insightful talks, setting the stage for innovation and learning."
  },
  { 
    src: "/TECH ARENA.png", 
    alt: "TechArena 2025", 
    overlayTitle: "TechArena 2025", 
    overlayText:
      "AIS proudly participated in TechArena 2025, presenting innovative projects and connecting with a vibrant community of tech enthusiasts and industry experts."
  },
  { 
    src: "/Workshop.png", 
    alt: "Workshop", 
    overlayTitle: "Workshop", 
    overlayText:
      "A deep dive into the fusion of XR and Generative AI, providing students with hands-on experience and practical insights into emerging technologies."
  }
];

const rightImages = [
  { 
    src: "/AI HUNT 2.0.png", 
    alt: "AI Hunt 2.0", 
    overlayTitle: "AI Hunt 2.0", 
    overlayText:
      "AI Hunt 2.0 was an exciting 48‑hour online cryptic treasure hunt, featuring a Gen AI workshop, an info session, and dynamic problem‑solving challenges that pushed the boundaries of AI exploration."
  },
  { 
    src: "/Project Showcase.png", 
    alt: "Project Showcase", 
    overlayTitle: "Project Showcase", 
    overlayText:
      "AIS shone at the Project Showcase, presenting over 10 groundbreaking projects, the most by any student body, that redefined innovation and creativity!"
  },
  { 
    src: "/Club Carnival.png", 
    alt: "Club Carnival", 
    overlayTitle: "Club Carnival", 
    overlayText:
      "Freshers Orientation and Club Carnival for the new batch of students. Included a variety of fun demos, games, and fun events."
  }
];

// Desktop cube images (used when NOT on mobile)
const leftCubeImages = [
  { src: "/cube-left-front.png", alt: "Left Cube Front" },
  { src: "/cube-left-back.png", alt: "Left Cube Back" },
  { src: "/cube-left-right.png", alt: "Left Cube Right" },
  { src: "/cube-left-left.png", alt: "Left Cube Left" },
  { src: "/cube-left-top.png", alt: "Left Cube Top" },
  { src: "/cube-left-bottom.png", alt: "Left Cube Bottom" }
];

const rightCubeImages = [
  { src: "/cube-right-front.png", alt: "Right Cube Front" },
  { src: "/cube-right-back.png", alt: "Right Cube Back" },
  { src: "/cube-right-right.png", alt: "Right Cube Right" },
  { src: "/cube-right-left.png", alt: "Right Cube Left" },
  { src: "/cube-right-top.png", alt: "Right Cube Top" },
  { src: "/cube-right-bottom.png", alt: "Right Cube Bottom" }
];

export default function Events() {
  // State to check if we are on mobile
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Set initial mobile state and update on resize
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);

    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    // ----------------------------
    // Hero Text Animations
    // ----------------------------
    gsap.from(".hero-title", {
      opacity: 0,
      scale: 0.8,
      duration: 1,
      ease: "power1.out",
      delay: 0.2,
    });
    gsap.from(".hero-subtitle", {
      opacity: 0,
      scale: 0.8,
      duration: 1,
      ease: "power1.out",
      delay: 0.4,
    });
    gsap.to(".hero-title", {
      x: "-50%",
      duration: 10,
      ease: "linear",
      repeat: -1,
    });
    gsap.to(".hero-subtitle", {
      x: "50%",
      duration: 10,
      ease: "linear",
      repeat: -1,
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

    // ----------------------------
    // Fade Out 3D Cubes on Scroll
    // ----------------------------
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

    // ----------------------------
    // Interactive 3D Cube Mouse Parallax
    // ----------------------------
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
            <h1 className="hero-title" style={{ fontSize: "4rem", whiteSpace: "nowrap" }}>
              Events
            </h1>
            <h2 className="hero-subtitle" style={{ fontSize: "2.5rem", whiteSpace: "nowrap" }}>
              Let's dive in
            </h2>
          </div>
        </section>

        {/* Main content */}
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
                  <div className="overlay">
                    <div className="overlay-content">
                      <h3>{leftImages[i].overlayTitle}</h3>
                      <p>{leftImages[i].overlayText}</p>
                    </div>
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
                  <div className="overlay">
                    <div className="overlay-content">
                      <h3>{rightImages[i].overlayTitle}</h3>
                      <p>{rightImages[i].overlayText}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Footer section – note: background set to transparent */}
        <section className="footer min-h-screen flex items-center justify-center">
          <Footer />
        </section>
      </div>

      {/* Inline CSS */}
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
            top: 5%;
            left: 50%;
            transform: translateX(-50%);
          }
          .bottom-cube {
            bottom: 5%;
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
        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.6);
          opacity: 0;
          transition: opacity 0.3s ease;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 1rem;
        }
        .hover-container:hover .overlay {
          opacity: 1;
        }
        .overlay-content {
          z-index: 1;
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
      `}</style>
    </ReactLenis>
  );
}
