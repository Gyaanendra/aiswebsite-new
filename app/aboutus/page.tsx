"use client";
import { useRef } from "react";
import Card from "@/components/aboutus/Card";
import { ReactLenis } from "@studio-freight/react-lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./a.css";

gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  const container = useRef(null);
  const cardRefs = useRef(Array(4).fill(null));
  const overlayRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 769px)", () => {
        // Desktop Wave Animation
        const wavePath = document.querySelector(".wave-path");
        const waveSection = document.querySelector(".wave-section");

        gsap.set(wavePath, {
          strokeDasharray: 2000,
          strokeDashoffset: 2000,
        });

        gsap.to(wavePath, {
          strokeDashoffset: 0,
          scrollTrigger: {
            trigger: waveSection,
            start: "top center",
            end: "bottom center",
            scrub: 1,
          },
        });

        gsap.fromTo(
          wavePath,
          { scaleY: 0.5, y: 100 },
          {
            scaleY: 1,
            y: 0,
            scrollTrigger: {
              trigger: waveSection,
              start: "top center",
              end: "bottom center",
              scrub: 1,
            },
          }
        );

        // Card Animations for Desktop
        const totalScrollHeight = window.innerHeight * 2;
        const positions = [14, 38, 62, 86];
        const rotations = [-15, -7.5, 7.5, 15];

        gsap.to(container.current, {
          backgroundColor: "#0a0a0a",
          ease: "none",
          scrollTrigger: {
            trigger: container.current,
            start: "top top",
            end: `+=${totalScrollHeight * 1.5}`,
            scrub: 0.5,
          },
        });

        gsap.to(overlayRef.current, {
          backgroundPosition: "100% 0%",
          ease: "none",
          scrollTrigger: {
            trigger: container.current,
            start: "top top",
            end: `+=${totalScrollHeight}`,
            scrub: 0.5,
          },
        });

        ScrollTrigger.create({
          trigger: container.current.querySelector(".cards"),
          start: "top top",
          end: `+=${totalScrollHeight}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        });

        cardRefs.current.forEach((card, index) => {
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
              trigger: container.current.querySelector(".cards"),
              start: "top top",
              end: `+=${totalScrollHeight}`,
              scrub: 0.3,
            },
          });

          spreadTL
            .to(card, {
              left: `${positions[index]}%`,
              rotation: rotations[index],
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
          ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
      });

      mm.add("(max-width: 768px)", () => {
        // Mobile Wave Animation
        const mobileWavePath = document.querySelector(".mobile-wave-path");
        const mobileWaveSection = document.querySelector(".mobile-wave-section");

        gsap.set(mobileWavePath, {
          strokeDasharray: 1000,
          strokeDashoffset: 1000,
        });

        gsap.to(mobileWavePath, {
          strokeDashoffset: 0,
          scrollTrigger: {
            trigger: mobileWaveSection,
            start: "top center",
            end: "bottom center",
            scrub: 1,
          },
        });

        gsap.fromTo(
          mobileWavePath,
          { scaleY: 0.5, y: 50 },
          {
            scaleY: 1,
            y: 0,
            scrollTrigger: {
              trigger: mobileWaveSection,
              start: "top center",
              end: "bottom center",
              scrub: 1,
            },
          }
        );

        // Card Animations for Mobile
        cardRefs.current.forEach((card, index) => {
          gsap.set(card, { opacity: 0, y: 50 });

          gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "top 30%",
              toggleActions: "play none none none",
            },
          });

          const frontEl = card.querySelector(".flip-card-front");
          const backEl = card.querySelector(".flip-card-back");
          const contentEl = card.querySelector(".flip-card-inner");

          ScrollTrigger.create({
            trigger: card,
            start: "top center",
            end: "bottom center",
            onEnter: () => animateFlip(frontEl, backEl, contentEl, index),
            onLeaveBack: () => resetFlip(frontEl, backEl, contentEl),
            scrub: true,
          });
        });

        return () => {
          ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
      });

      return () => mm.revert();
    },
    { scope: container }
  );

  const animateFlip = (front, back, content, index) => {
    gsap.to(content, {
      rotationY: 180,
      duration: 0.9,
      ease: "power4.out",
      overwrite: true,
    });

    gsap.to([front, back], {
      zIndex: index % 2 === 0 ? 50 : -50,
      duration: 1.2,
      ease: "power3.out",
    });
  };

  const resetFlip = (front, back, content) => {
    gsap.to(content, {
      rotationY: 0,
      duration: 0.8,
      ease: "power2.out",
    });

    gsap.to([front, back], { zIndex: 0, duration: 0.8 });
  };

  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }}>
      <div ref={container} className="flex flex-col min-h-screen">
        {/* Holographic overlay */}
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
          <img src="/logo.png" alt="Company Logo" className="logo" />
        </header>

        <div className="ais-glow">AIS</div>

        <div
          ref={overlayRef}
          className="gradient-overlay"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,10,10,0.8) 0%, rgba(10,10,10,0) 100%)",
          }}
        />

        <section className="hero min-h-screen flex items-center justify-center">
          <h1 className="text-6xl font-bold text-center leading-tight">
            ABOUT US
          </h1>
        </section>

        {/* Desktop Wave Animation */}
        <section className="wave-section min-h-[50vh] hidden md:block">
          <svg
            className="wave-svg w-full h-full"
            viewBox="0 0 1440 400"
            preserveAspectRatio="none"
          >
            <path
              className="wave-path"
              d="M0,200 C240,0 480,400 720,200 C960,0 1200,400 1440,200 L1440,400 L0,400 Z"
              fill="none"
              stroke="#ffffff"
              strokeWidth="4"
            />
          </svg>
        </section>

        {/* Mobile Wave Animation */}
        <section className="mobile-wave-section min-h-[30vh] block md:hidden">
          <svg
            className="mobile-wave-svg w-full h-full"
            viewBox="0 0 1440 200"
            preserveAspectRatio="none"
          >
            <path
              className="mobile-wave-path"
              d="M0,100 C240,0 480,200 720,100 C960,0 1200,200 1440,100 L1440,200 L0,200 Z"
              fill="none"
              stroke="#ffffff"
              strokeWidth="4"
            />
          </svg>
        </section>

        <section className="cards relative min-h-screen">
          {[...Array(4)].map((_, index) => (
            <Card
              key={index}
              id={`card-${index + 1}`}
              frontSrc="/back.png"
              frontAlt="Card Image"
              backText={
                [
                  "AIS RL TEAM",
                  "AIS GEN AI TEAM",
                  "AIS NLP TEAM",
                  "AIS CV TEAM",
                ][index]
              }
              ref={(el) => (cardRefs.current[index] = el)}
            />
          ))}
        </section>

        {/* Footer Section */}
        <section className="footer w-full py-20 px-4 bg-dark text-white mt-auto">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold mb-4">Studio</h3>
                <p className="opacity-75">
                  Suite 2<br />
                  9 Marsh Street<br />
                  Bristol, BS1 4AA<br />
                  United Kingdom
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-semibold mb-4">Connect</h3>
                <div className="flex flex-col space-y-2">
                  <a href="#" className="hover:text-gray-300 transition-colors">
                    Twitter / X
                  </a>
                  <a href="#" className="hover:text-gray-300 transition-colors">
                    Instagram
                  </a>
                  <a href="#" className="hover:text-gray-300 transition-colors">
                    LinkedIn
                  </a>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-semibold mb-4">Contact</h3>
                <p className="opacity-75">
                  General enquiries<br />
                  <a
                    href="mailto:hello@AIS.co"
                    className="hover:text-gray-300 transition-colors"
                  >
                    hello@lAIS.co
                  </a>
                </p>
                <p className="opacity-75 mt-4">
                  New business<br />
                  <a
                    href="mailto:business@AIS.co"
                    className="hover:text-gray-300 transition-colors"
                  >
                    business@AIS.co
                  </a>
                </p>
              </div>
            </div>

            <div className="max-w-md mx-auto mb-20">
              <h3 className="text-xl font-semibold mb-6 text-center">
                Subscribe to our newsletter
              </h3>
              <div className="flex gap-4">
                <input
                  type="email"
                  placeholder="Your email →"
                  className="bg-transparent border-b border-white/30 focus:border-white/60 flex-1 px-2 py-1 outline-none"
                />
                <button className="border border-white/30 hover:border-white/60 px-4 py-1 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>

            <div className="text-center opacity-75 text-Lm">
              <p>©{new Date().getFullYear()} ARTIFICIAL INTELLIGENCE SOCIETY</p>
              <p className="mt-2">
                R&D:{" "}
                <a
                  href="https://aisociety-bu-pied.vercel.app/"
                  className="hover:text-gray-300 transition-colors"
                >
                  AIS SOCIETY
                </a>
              </p>
              <p className="mt-2">Built by AIS </p>
            </div>
          </div>
        </section>
      </div>
    </ReactLenis>
  );
}