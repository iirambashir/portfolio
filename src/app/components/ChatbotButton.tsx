"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { FaRobot, FaComments } from "react-icons/fa";

interface ChatbotButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export default function ChatbotButton({ onClick, isOpen }: ChatbotButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!buttonRef.current) return;

    // Floating animation
    gsap.to(buttonRef.current, {
      y: -10,
      duration: 2,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1
    });

    // Pulse effect
    if (pulseRef.current) {
      gsap.to(pulseRef.current, {
        scale: 1.5,
        opacity: 0,
        duration: 1.5,
        ease: "power1.out",
        repeat: -1
      });
    }
  }, []);

  return (
    <>
      {!isOpen && (
        <button
          ref={buttonRef}
          onClick={onClick}
          className="fixed bottom-6 right-6 z-40 w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300 group"
          aria-label="Open AI Assistant"
        >
          {/* Pulse ring */}
          <div
            ref={pulseRef}
            className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
            style={{ opacity: 0.6 }}
          />
          
          {/* Icon */}
          <FaRobot className="text-white text-2xl relative z-10 group-hover:rotate-12 transition-transform" />
          
          {/* Badge */}
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-bounce">
            AI
          </div>
        </button>
      )}
    </>
  );
}