"use client"
import { useEffect, useState, useRef } from "react"
import { gsap } from "gsap"

const GlassNavbar = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const underlineRefs = useRef([])
  const mobileMenuOverlayRef = useRef(null)

  const navItems = [
    { name: "Home", href: "/home" },
    { name: "About", href: "/aboutus" },
    { name: "Projects", href: "/project" },
    { name: "Events", href: "/events" },
    { name: "Contact Us", href: "/contact" },
  ]

  // Check screen size on mount and update on resize.
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  // Animate the mobile overlay menu with GSAP when menuOpen changes.
  useEffect(() => {
    if (isMobile && mobileMenuOverlayRef.current) {
      if (menuOpen) {
        // Ensure the overlay is visible before animating.
        mobileMenuOverlayRef.current.style.display = "flex"
        gsap.fromTo(mobileMenuOverlayRef.current, { y: "-100%" }, { y: "0%", duration: 0.6, ease: "power2.out" })
        // Animate each nav link with a stagger.
        const navLinks = mobileMenuOverlayRef.current.querySelectorAll("nav a")
        gsap.fromTo(
          navLinks,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.1,
            delay: 0.3,
          },
        )
      } else {
        gsap.to(mobileMenuOverlayRef.current, {
          y: "-100%",
          duration: 0.6,
          ease: "power2.in",
          onComplete: () => {
            if (mobileMenuOverlayRef.current) mobileMenuOverlayRef.current.style.display = "none"
          },
        })
      }
    }
  }, [menuOpen, isMobile])

  return (
    <>
      {/* Glass Navbar Container */}
      <div
        style={{
          position: "fixed",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          width: isMobile ? "90%" : "50%",
          maxWidth: "800px",
          backgroundColor: "rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(8px)",
          borderRadius: "16px",
          padding: "0.8rem 1rem",
          zIndex: 1000,
          border: "1px solid rgba(255, 255, 255, 0.15)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        }}
      >
        {isMobile ? (
          // Mobile Header with title & animated hamburger button.
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3
              style={{
                color: "#FFFFFF",
                fontSize: "1rem",
                fontWeight: "700",
                margin: 0,
              }}
            >
              Artificial Intelligence Society
            </h3>
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              style={{
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "0.5rem",
                color: "#FFFFFF",
              }}
            >
              ⋮
            </button>
          </div>
        ) : (
          // Desktop Navigation
          <nav
            style={{
              display: "flex",
              gap: "2rem",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                style={{
                  color: "#FFFFFF",
                  textDecoration: "none",
                  fontSize: "0.95rem",
                  fontWeight: "700",
                  padding: "0.5rem 0",
                  position: "relative",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, {
                    y: -3,
                    duration: 0.3,
                    ease: "power2.out",
                  })
                  gsap.to(underlineRefs.current[index], {
                    scaleX: 1,
                    duration: 0.3,
                    ease: "power2.out",
                  })
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, {
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out",
                  })
                  gsap.to(underlineRefs.current[index], {
                    scaleX: 0,
                    duration: 0.3,
                    ease: "power2.out",
                  })
                }}
              >
                {item.name}
                <div
                  ref={(el) => (underlineRefs.current[index] = el)}
                  style={{
                    position: "absolute",
                    bottom: "-2px",
                    left: "0",
                    width: "100%",
                    height: "2px",
                    backgroundColor: "#FFFFFF",
                    transform: "scaleX(0)",
                    transformOrigin: "center",
                  }}
                />
              </a>
            ))}
          </nav>
        )}
      </div>

      {/* Mobile Full-Screen Overlay Menu with Blue Background */}
      {isMobile && (
        <div
          ref={mobileMenuOverlayRef}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "#191919", // Changed to blue
            display: "none",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 1100,
            padding: "1rem",
          }}
        >
          {/* Mobile Header */}
          <div
            style={{
              width: "100%",
              marginBottom: "2rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3
              style={{
                color: "#fff",
                fontSize: "1.5rem",
                fontWeight: "500",
                margin: 0,
              }}
            >
              AIS
            </h3>
            <button
              onClick={() => setMenuOpen(false)}
              style={{
                backgroundColor: "transparent",
                border: "none",
                color: "#fff",
                fontSize: "1.5rem",
                cursor: "pointer",
                padding: "0.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
              }}
            >
              ✕
            </button>
          </div>

          {/* Navigation Menu Card */}
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "1rem",
              padding: "1.5rem",
              width: "100%",
              marginBottom: "1rem",
            }}
          >
            <nav
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  style={{
                    color: "#000000",
                    textDecoration: "none",
                    fontSize: "1.2rem",
                    fontWeight: "500",
                  }}
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Newsletter Section */}
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "1rem",
              padding: "1.5rem",
              width: "100%",
              marginBottom: "1rem",
            }}
          >
            <h4
              style={{
                margin: "0 0 1rem 0",
                fontSize: "1.5rem",
                fontWeight: "500",
              }}
            >
              Subscribe to
              <br />
              our newsletter
            </h4>
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
              }}
            >
              <input
                type="email"
                placeholder="Your email"
                style={{
                  flex: 1,
                  padding: "0.75rem",
                  borderRadius: "0.5rem",
                  border: "none",
                  backgroundColor: "#F5F5F5",
                }}
              />
              <button
                style={{
                  padding: "0.75rem",
                  backgroundColor: "#F5F5F5",
                  border: "none",
                  borderRadius: "0.5rem",
                  cursor: "pointer",
                }}
              >
                →
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {/* "LET'S TALK" now acts as a mailto link */}
            <a
              href="mailto:ais@bennett.edu.in"
              style={{
                width: "100%",
                padding: "1rem",
                backgroundColor: "#FFFFFF",
                border: "none",
                borderRadius: "1rem",
                fontSize: "1rem",
                fontWeight: "500",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              LET'S TALK
              <span>💬</span>
            </a>
            <button
              style={{
                width: "100%",
                padding: "1rem",
                backgroundColor: "#000000",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "1rem",
                fontSize: "1rem",
                fontWeight: "500",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              LABS
              <span>↗</span>
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default GlassNavbar
