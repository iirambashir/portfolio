"use client";

import React, { useEffect, useRef } from "react";
import { FaTools } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const skillCategories = [
    {
      name: "Frontend",
      color: {
        bg: "bg-pink-100",
        text: "text-pink-800",
        heading: "text-pink-600",
      },
      skills: ["React.js", "Tailwind CSS", "SASS", "jQuery", "HTML5 / CSS"],
    },
    {
      name: "Backend",
      color: {
        bg: "bg-rose-100",
        text: "text-rose-800",
        heading: "text-rose-600",
      },
      skills: [
        "Node.js",
        "NestJS",
        "TypeOrm",
        "Swagger",
        "RESTful APIs",
        "TypeScript",
        "ESLint",
        "Postman",
      ],
    },
    {
      name: "Tools",
      color: {
        bg: "bg-fuchsia-100",
        text: "text-fuchsia-800",
        heading: "text-fuchsia-600",
      },
      skills: ["Git", "Trello", "ClickUp", "Linear", "Agile methodologies"],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section heading
      const headingElement = sectionRef.current?.querySelector(".fade-up-heading");
      if (headingElement){
        gsap.fromTo(
          headingElement,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            },
          }
        );
      }
      

      // Animate each category card
      gsap.utils.toArray<HTMLElement>(".skill-category").forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: i * 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );

        // Animate skill tags inside each card
        const tags = card.querySelectorAll(".skill-tag");
        gsap.fromTo(
          tags,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Hover scaling for tags
      gsap.utils.toArray(".skill-tag").forEach((tag) => {
        const skillTag = tag as HTMLElement;
        skillTag.addEventListener("mouseenter", () => {
          gsap.to(skillTag, { scale: 1.08, duration: 0.2 });
        });
        skillTag.addEventListener("mouseleave", () => {
          gsap.to(skillTag, { scale: 1, duration: 0.2 });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="mt-20 px-4 max-w-5xl mx-auto text-center pt-14">
      <h2 className="fade-up-heading text-4xl font-extrabold text-gray-800 dark:text-white mb-12">
        Skills & Tools <span className="text-pink-500"><FaTools aria-label="Skills and Tools" /></span>
      </h2>

      <div className="grid gap-8 md:grid-cols-3">
        {skillCategories.map((category) => (
          <div
            key={category.name}
            className="skill-category rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow border"
            style={{
              background: 'linear-gradient(180deg, var(--card), var(--card))',
              borderColor: 'var(--border)'
            }}
          >
            <h3 className={`text-2xl font-semibold ${category.color.heading} mb-4`}>
              {category.name}
            </h3>

            <div className="flex flex-wrap gap-6 mt-6 justify-center">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className={`skill-tag px-4 py-2 rounded-full ${category.color.bg} ${category.color.text} text-sm font-medium shadow hover:shadow-md cursor-pointer transition-all`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
