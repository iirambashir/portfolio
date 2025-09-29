"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";

export default function DownloadCVButton() {
  const btnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const btnEl = btnRef.current;
    if (!btnEl) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = btnEl.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(btnEl, {
        x: x * 0.3, // adjust strength
        y: y * 0.3,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(btnEl, { x: 0, y: 0, duration: 0.4, ease: "power2.out" });
    };

    btnEl.addEventListener("mousemove", handleMouseMove);
    btnEl.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      btnEl.removeEventListener("mousemove", handleMouseMove);
      btnEl.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="flex justify-center mb-8 mt-24">
      <a
        ref={btnRef}
        href="/IramBashirCV.pdf"
        download
        className="btn-primary inline-block"
      >
        Download CV
      </a>
    </div>
  );
}
