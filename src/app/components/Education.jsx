"use client";
import React, { useLayoutEffect, useRef } from "react";
import { FaGraduationCap } from "react-icons/fa";
import education from "../data/education";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Education = () => {
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);
    const projectsRef = useRef([]);
    const headingRef = useRef(null);
    // const headingRef = useRef<HTMLHeadingElement>(null);

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
      const handleEnter = (el) => {
        gsap.to(el, {
          scale: 1.04,
        //   rotateY: 2,
          boxShadow: "0px 15px 25px rgba(0,0,0,0.15)",
          backgroundColor: "rgba(255, 240, 245, 0.9)", // light pink glow
          duration: 0.35,
          ease: "power2.out",
        });
      };
    
      const handleLeave = (el) => {
        gsap.to(el, {
          scale: 1,
        //   rotateY: 0,
          boxShadow: "0px 8px 15px rgba(0,0,0,0.08)",
          backgroundColor: "rgba(255, 250, 250, 1)", // creamy white
          duration: 0.35,
          ease: "power2.out",
        });
      };
    
    return (
        <section
            id="education"
            className="py-16 flex-col items-center px-6 lg:px-20"
            ref={sectionRef}
            >
            <h2 ref={headingRef} className="heading-cute mb-14">
                Education <span><FaGraduationCap aria-label="Education" /></span>
            </h2>
            <div className="space-y-12">
                {education.map((edu, index) => (
                <div
                    key={index}
                    ref={(el) => (cardsRef.current[index] = el)}
                    className="card-content"
                    onMouseEnter={() => handleEnter(cardsRef.current[index])}
                    onMouseLeave={() => handleLeave(cardsRef.current[index])}
                    onFocus={() => handleEnter(cardsRef.current[index])}
                    onBlur={() => handleLeave(cardsRef.current[index])}
                >            
                    {/* Title and duration */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <h3>
                        {edu.degree}{" "}
                        <p className="italic"> {edu.institution} </p>
                        {/* <span>– {exp.company}</span> */}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1 sm:mt-0">{edu.location} | {edu.year}</p>
                    </div>
                    <div className="mt-4 space-y-6" ref={(el) => (projectsRef.current[index] = el?.children)} >
                        {edu.projects.map((project, pIdx) => (
                            <div key={pIdx}>
                                <h4>
                                    {project.title}
                                </h4>
                                <p className="text-gray-400 text-sm mb-2">{project.date}</p>
                                <ul>
                                    {project.description.map((point, i) => (
                                    <li key={i} >{point}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
                ))}
            </div>
        </section>
    );
};

export default Education;
