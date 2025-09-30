"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { FaTimes, FaGithub, FaExternalLinkAlt } from "react-icons/fa";

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: {
    id: string;
    type: string;
    title: string;
    subtitle: string;
    date: string;
    description: string[];
    tags?: string[];
    icon: ReactNode;
    color: string;
    link?: string;
    github?: string;
  } | null;
}

export default function DetailModal({ isOpen, onClose, item }: DetailModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const ctx = gsap.context(() => {
      // Animate overlay
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );

      // Animate modal with flip effect
      gsap.fromTo(
        modalRef.current,
        { 
          scale: 0.8, 
          rotateY: -90,
          opacity: 0 
        },
        { 
          scale: 1, 
          rotateY: 0,
          opacity: 1,
          duration: 0.5, 
          ease: "back.out(1.5)" 
        }
      );
    });

    return () => ctx.revert();
  }, [isOpen]);

  const handleClose = () => {
    gsap.to(modalRef.current, {
      scale: 0.8,
      rotateY: 90,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: onClose
    });
  };

  if (!isOpen || !item) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
      onClick={handleClose}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-2xl w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-white/10"
        style={{ boxShadow: `0 0 60px ${item.color}40` }}
      >
        {/* Header gradient */}
        <div 
          className="h-2 w-full"
          style={{ background: `linear-gradient(90deg, ${item.color}, ${item.color}80)` }}
        />

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 group z-10"
        >
          <FaTimes className="text-white group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {/* Content */}
        <div className="p-8">
          {/* Icon & Title */}
          <div className="flex items-start gap-4 mb-6">
            <div 
              className="text-4xl p-4 rounded-2xl flex-shrink-0"
              style={{ backgroundColor: `${item.color}20`, color: item.color }}
            >
              {item.icon}
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-2" style={{ color: item.color }}>
                {item.title}
              </h2>
              <p className="text-gray-300 text-lg">{item.subtitle}</p>
              <p className="text-gray-400 text-sm mt-1">{item.date}</p>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3 mb-6">
            {item.description.map((line, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-pink-400 mt-1">•</span>
                <p className="text-gray-300 leading-relaxed">{line}</p>
              </div>
            ))}
          </div>

          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-400 mb-3">Technologies Used</h4>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag, i) => (
                  <span
                    key={tag}
                    className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-110"
                    style={{
                      backgroundColor: `${item.color}15`,
                      color: item.color,
                      border: `1px solid ${item.color}40`
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          {(item.link || item.github) && (
            <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
              {item.github && (
                <a
                  href={item.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200"
                >
                  <FaGithub />
                  <span>View Code</span>
                </a>
              )}
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2 rounded-lg transition-all duration-200"
                  style={{
                    backgroundColor: `${item.color}20`,
                    color: item.color,
                    border: `1px solid ${item.color}40`
                  }}
                >
                  <FaExternalLinkAlt />
                  <span>View Project</span>
                </a>
              )}
            </div>
          )}

          {/* Achievement badge */}
          <div className="mt-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20">
            <p className="text-sm text-green-400 flex items-center gap-2">
              <span>✓</span>
              <span>Milestone unlocked! Keep exploring to complete your journey.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}