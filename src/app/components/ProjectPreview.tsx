"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { FaRocket } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });
    }

    if (headingRef.current) {
      gsap.from(headingRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.8,
        delay: 0.1,
        ease: "power3.out",
      });
    }

    if (textRef.current) {
      gsap.from(textRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.3,
        ease: "power2.out",
      });
    }

    if (buttonRef.current) {
      gsap.from(buttonRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.7,
        delay: 0.5,
        ease: "back.out(1.7)",
      });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="mt-20 text-center bg-gradient-to-r from-pink-50 via-white to-purple-50 py-14 px-6 rounded-2xl shadow-inner"
    >
      <h2
        ref={headingRef}
        className="text-3xl font-extrabold mb-4 text-pink-700 tracking-tight"
      >
        Featured Projects <FaRocket aria-label="Featured Projects" className="inline" />
      </h2>

      <p
        ref={textRef}
        className="text-gray-700 max-w-xl mx-auto mb-6 leading-relaxed"
      >
        Explore my best work — crafted with modern tech stacks, attention to
        detail, and a dash of creative flair.
      </p>

      <Link
        ref={buttonRef}
        href="/projects"
        className="btn-primary"
      >
        View All Projects
      </Link>
    </section>
  );
}
