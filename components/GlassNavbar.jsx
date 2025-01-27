"use client";
import { gsap } from "gsap";
import React, { useEffect, useState } from "react";

const GlassNavbar = () => {
  const [isMobile, setIsMobile] = useState(false);

  const navItems = [
    { name: "Home", href: "/home" },
    { name: "About", href: "/aboutus" },
    { name: "Projects", href: "/project" },
    { name: "Events", href: "/events" },
    { name: "Contact Us", href: "/contact" },
  ];

  // Check screen size only on the client side
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener("resize", checkScreenSize);

    // Cleanup event listener
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div
      className="glass-navbar"
      style={{
        position: "fixed",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        width: isMobile ? "90%" : "52%",
        maxWidth: "800px",
        backgroundColor: "rgba(255, 255, 255, 0.08)",
        backdropFilter: "blur(8px)",
        borderRadius: "16px",
        padding: isMobile ? "0.5rem 0.5rem" : "0.5rem 1rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 4,
        border: "1px solid rgba(255, 255, 255, 0.15)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
      }}
    >
      <nav
        style={{
          display: "flex",
          gap: isMobile ? "0.5rem" : "2rem",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: isMobile ? "wrap" : "nowrap",
        }}
      >
        {navItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className="nav-link"
            style={{
              color: "#FFFFFF",
              textDecoration: "none",
              fontSize: isMobile ? "0.85rem" : "0.95rem",
              fontWeight: "700",
              transition: "all 0.3s ease",
              padding: isMobile ? "0.3rem 0.8rem" : "0.5rem 1.2rem",
              borderRadius: "8px",
              position: "relative",
              overflow: "hidden",
              textShadow: `
                0 0 8px rgba(255, 255, 255, 0.3),
                0 1px 2px rgba(0, 0, 0, 0.1)
              `,
              letterSpacing: "0.5px",
              WebkitBackdropFilter: "blur(4px)",
              mixBlendMode: "difference",
            }}
            onMouseEnter={(e) => {
              if (!isMobile) {
                gsap.to(e.target, {
                  scale: 1.15,
                  duration: 0.3,
                  backgroundColor: "rgba(255, 255, 255, 0.25)",
                  boxShadow: "0 0 30px rgba(255, 255, 255, 0.4)",
                });
              }
            }}
            onMouseLeave={(e) => {
              if (!isMobile) {
                gsap.to(e.target, {
                  scale: 1,
                  duration: 0.3,
                  backgroundColor: "transparent",
                  boxShadow: "none",
                });
              }
            }}
          >
            {item.name}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default GlassNavbar;
