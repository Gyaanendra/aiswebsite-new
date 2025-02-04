"use client";
import React, { useEffect } from "react";

const ParticleBackground = () => {
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.zIndex = "1";
    canvas.style.pointerEvents = "none";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const PARTICLE_COLORS = ["#FFFFFF", "#000000"]; // Black and White
    const CONNECTION_DISTANCE = 100; // Distance for connecting particles
    const MOUSE_RADIUS = 100; // Interaction radius with mouse
    let mouseX = -MOUSE_RADIUS;
    let mouseY = -MOUSE_RADIUS;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    class Particle {
      x;
      y;
      velX;
      velY;
      size;
      color;

      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.velX = (Math.random() - 0.5) * 0.9; // Increased velocity
        this.velY = (Math.random() - 0.5) * 0.9;
        this.size = Math.random() * 2 + 1; // Slightly larger particles
        this.color = PARTICLE_COLORS[Math.floor(Math.random() * 2)];
      }

      update() {
        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < MOUSE_RADIUS) {
          const force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS;
          this.x += dx * force * 0.2; // Increased repulsion
          this.y += dy * force * 0.2;
        }

        this.x += this.velX;
        this.y += this.velY;

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.velX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.velY *= -1;
      }

      draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create particles
    for (let i = 0; i < 360; i++) particles.push(new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections between particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < CONNECTION_DISTANCE) {
            const opacity = 1 - distance / CONNECTION_DISTANCE;
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update();
        particle.draw(ctx);
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      document.body.removeChild(canvas);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return null;
};

export default ParticleBackground;