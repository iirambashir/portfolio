"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experiences } from "../data/experience";
import { FaBriefcase } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return; // <-- SSR guard

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Animate heading with a drop-in effect
      if (headingRef.current) {
        gsap.from(headingRef.current, {
          opacity: 0,
          y: -30,
          skewY: 3,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
          },
        });
      }

      // Animate each card with rotation and fade
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 40,
          rotateX: 10,
          duration: 0.9,
          delay: index * 0.15,
          ease: "power2.out",
        });
      });
    });
    ScrollTrigger.refresh();    
    return () => ctx.revert(); // <-- cleans only this section's animations

  }, []);

  // Hover animations
  const handleEnter = (el: HTMLDivElement) => {
    const isDark = document.documentElement.classList.contains('dark');
    gsap.to(el, {
      scale: 1.04,
      boxShadow: isDark
        ? "0px 18px 30px rgba(2,6,23,0.45)"
        : "0px 15px 25px rgba(0,0,0,0.15)",
      backgroundColor: isDark
        ? "rgba(17, 24, 39, 0.85)" // slate-900 with translucency
        : "rgba(255, 240, 245, 0.9)", // light pink
      duration: 0.35,
      ease: "power2.out",
    });
  };

  const handleLeave = (el: HTMLDivElement) => {
    const isDark = document.documentElement.classList.contains('dark');
    gsap.to(el, {
      scale: 1,
      boxShadow: isDark
        ? "0px 10px 20px rgba(2,6,23,0.35)"
        : "0px 8px 15px rgba(0,0,0,0.08)",
      backgroundColor: isDark
        ? "rgba(17, 24, 39, 0.6)"
        : "rgba(255, 250, 250, 1)",
      duration: 0.35,
      ease: "power2.out",
    });
  };

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="w-full py-16 px-6 lg:px-20"
    >
      <h2 ref={headingRef} className="heading-cute mb-14">
        Experience <span><FaBriefcase aria-label="Experience" /></span>
      </h2>

      <div className="space-y-8 max-w-5xl mx-auto px-4">
        {experiences.map((exp, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) {
                cardsRef.current[index] = el;
              }
            }}
            tabIndex={0}
            className="card-content"
            onMouseEnter={() => handleEnter(cardsRef.current[index])}
            onMouseLeave={() => handleLeave(cardsRef.current[index])}
            onFocus={() => handleEnter(cardsRef.current[index])}
            onBlur={() => handleLeave(cardsRef.current[index])}
          >
            {/* Title and duration */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h3>
                {exp.title}{" "}
                <span>– {exp.company}</span>
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 sm:mt-0">{exp.duration}</p>
            </div>
            
            {/* Description Points */}
            <ul>
              {exp.description.map((point, index) => (
                <li key={index}>
                  {point}
                </li>
              ))}
            </ul>
            {/* Skill badges */}
            <div className="mt-4 flex flex-wrap gap-2">
              {exp.skills?.map((skill, i) => (
                <span
                  key={i}
                  className="skill-tag"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Optional link */}
            {exp.link && (
              <a
                href={exp.link}
                target="_blank"
                rel="noopener noreferrer"
                className="back-link mb-6"
              >
                View Project
                <span className="arrow"><FiArrowRight /></span>
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
