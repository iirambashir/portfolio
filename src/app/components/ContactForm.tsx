"use client";

import React, { useState, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MdOutlineEmail } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { BsFillChatDotsFill } from "react-icons/bs";

export default function ContactForm() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return; // <-- SSR guard

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {

      if (sectionRef.current) {
        gsap.from(sectionRef.current, {
          opacity: 0,
          y: 50,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        });
      }

      if (formRef.current) {
        gsap.from(formRef.current.querySelectorAll(".form-field"), {
          opacity: 0,
          y: 30,
          stagger: 0.15,
          duration: 0.8,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 85%",
          },
        });
      }    
    });
    ScrollTrigger.refresh();    
    return () => ctx.revert(); // <-- cleans only this section's animations

  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!form.name.trim()) {
      return setStatus("Please enter your name.");
    }
    if (!validateEmail(form.email)) {
      return setStatus("Please enter a valid email.");
    }
    if (!form.message.trim()) {
      return setStatus("Please enter a message.");
    }

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("✅ Your message has been sent!");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("❌ Failed to send message. Try again later.");
      }
    } catch (error) {
      setStatus("❌ Something went wrong.");
    }
  };


  return (
    <section
      id="contact"
      ref={sectionRef}
      className="contact-section"
    >
      
      <h2 className="heading-cute mb-14">
        Contact <span>💬</span>
      </h2>
      <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
        {/* Name */}
        <div className="form-field">
          <FaUserAlt />          
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        {/* Email */}
        <div className="form-field">
          <MdOutlineEmail />
          <input 
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        {/* Message */}
        <div className="form-field">
          <BsFillChatDotsFill />
          <textarea 
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Submit */}
        <div className="text-center form-field">
          <button type="submit" className="contact-submit">
            Send Message
          </button>
          {status && <p className="text-center mt-2">{status}</p>}
        </div>
      </form>
    </section>
  );
}
