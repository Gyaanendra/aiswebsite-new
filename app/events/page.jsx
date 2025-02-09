// app/events/page.tsx
"use client";

import { useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis } from "lenis/react";
import "../../screensCss/b.css";
import Footer from "@/components/Footer";

export default function Events() {
  useEffect(() => {
    // Register the ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    // Create a GSAP matchMedia instance
    const mm = gsap.matchMedia();

    // ----------------------------
    // Hero Text Animations
    // ----------------------------

    // Fade in and scale-up hero texts
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

    // Marquee effect: continuously move the texts horizontally
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
    //
    // We use GSAP's matchMedia to set different animation parameters
    // for desktop (min-width: 768px) and mobile (max-width: 767px).
    //
    // For each row, the left and right cards will animate based on
    // the scroll progress. On mobile, the values are scaled down.
    //
    mm.add(
      {
        // Desktop settings: viewport width 768px and above
        isDesktop: "(min-width: 768px)",
        // Mobile settings: viewport width below 768px
        isMobile: "(max-width: 767px)",
      },
      (context) => {
        const { isDesktop, isMobile } = context.conditions;

        // Define animation values based on the viewport
        let leftXValues, rightXValues, leftRotationValues, rightRotationValues, yValues;
        if (isDesktop) {
          // Desktop values
          leftXValues = [-800, -900, -400];
          rightXValues = [800, 900, 400];
          leftRotationValues = [-30, -20, -35];
          rightRotationValues = [30, 20, 35];
          yValues = [100, -150, -400];
        } else if (isMobile) {
          // Mobile values (scaled down)
          leftXValues = [-200, -250, -150];
          rightXValues = [200, 250, 150];
          leftRotationValues = [-10, -5, -15];
          rightRotationValues = [10, 5, 15];
          yValues = [30, -50, -100];
        }

        // Loop through each card row and apply GSAP animations
        gsap.utils.toArray(".row").forEach((row, index) => {
          const cardLeft = row.querySelector(".card-left");
          const cardRight = row.querySelector(".card-right");

          // Animate the left card
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

          // Animate the right card
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

    // Cleanup function to kill all ScrollTriggers and revert matchMedia
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      mm.revert();
    };
  }, []);

  // Generates three rows of card pairs
  const generateRows = () => {
    const rows = [];
    for (let i = 1; i <= 3; i++) {
      rows.push(
        <div className="row" key={i}>
          <div className="card card-left">
            <Image
              src="/101.png"
              alt={`Left Image ${i}`}
              width={500}
              height={300}
              priority
            />
          </div>
          <div className="card card-right">
            <Image
              src="/101.png"
              alt={`Right Image ${i}`}
              width={500}
              height={300}
              priority
            />
          </div>
        </div>
      );
    }
    return rows;
  };

  return (
    <ReactLenis root>
      <header className="header">
        <img src="/logo.png" alt="Company Logo" className="logo" />
      </header>
      <section className="hero">
        <div className="hero-text">
          <h1 className="hero-title" style={{ fontSize: "4rem", whiteSpace: "nowrap" }}>
            Events
          </h1>
          <h2 className="hero-subtitle" style={{ fontSize: "2.5rem", whiteSpace: "nowrap" }}>
            Let's dive in
          </h2>
        </div>
      </section>
      <section className="main">
        <div className="main-content">
          <h1 className="middle-text">Artificial Intelligence Society</h1>
        </div>
        {generateRows()}
      </section>
      <section className="footer min-h-screen flex items-center justify-center bg-dark">
        <Footer />
      </section>
    </ReactLenis>
  );
}