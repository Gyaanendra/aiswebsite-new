// pages/projects/[id].jsx
"use client";
import { useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ReactLenis } from '@studio-freight/react-lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const ProjectDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  // Sample project data (you can replace this with actual data fetching logic)
  const projects = {
    1: {
      title: "Project 1",
      description: "This is a detailed description of Project 1. It focuses on innovative solutions in AI and Robotics.",
      images: [
        "/A4 - 3.png",
        "/A4 - 6.png",
        "/A4 - 5.png"
      ],

      tags: ["AI", "Robotics", "Innovation"],
    },
    2: {
      title: "Project 2",
      description: "This is a detailed description of Project 2. It focuses on innovative solutions in AI and Robotics.",
      images: [
        "/A4 - 6.png",
        "/A4 - 5.png",
      ],
    },
  };


  const project = projects[id];

  if (!project) {
    return <div>Loading...</div>; // Handle loading state or 404
  }

  const parallaxRef = useRef(null);
  const horizontalScrollRef = useRef(null);

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${scrollY * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Horizontal scroll animation
  useEffect(() => {
    const horizontalScroll = horizontalScrollRef.current;
    let isDown = false;
    let startX;
    let scrollLeft;

    horizontalScroll.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - horizontalScroll.offsetLeft;
      scrollLeft = horizontalScroll.scrollLeft;
    });

    horizontalScroll.addEventListener('mouseleave', () => {
      isDown = false;
    });

    horizontalScroll.addEventListener('mouseup', () => {
      isDown = false;
    });

    horizontalScroll.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - horizontalScroll.offsetLeft;
      const walk = (x - startX) * 2; // Adjust multiplier for scroll speed
      horizontalScroll.scrollLeft = scrollLeft - walk;
    });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
      <p className="text-lg mb-4">{project.description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {project.images.map((image, index) => (
          <div key={index} className="relative w-full h-64">
            <Image 
              src={image}
              alt={`Image for ${project.title}`}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        ))}
      </div>

      <div className="mt-4">
        <h2 className="text-2xl font-semibold">Tags</h2>
        <ul className="list-disc pl-5">
          {project.tags.map((tag, index) => (
            <li key={index} className="text-lg">{tag}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectDetail;