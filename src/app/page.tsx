'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Navbar from './components/Navbar';
import SkillsSection from './components/SkillsSection';
import ProjectPreview from './components/ProjectPreview';
import DownloadCVButton from './components/DownloadCVButton';
import Link from 'next/link';
import { FaRegHandPaper } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const bgGlowRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const ctaRefs = useRef<HTMLAnchorElement[]>([]);
  const [positions, setPositions] = useState<{ top: string; left: string }[]>([]);

  useEffect(() => {
    // Generate random positions once, after client mounts
    setPositions(
      [...Array(40)].map(() => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
      }))
    );
  }, []);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
        },
      });

      const elements = textRef.current?.querySelectorAll('[data-animate]');
      if (elements?.length) {
        gsap.from(elements, {
          opacity: 0,
          y: 30,
          stagger: 0.2,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
          },
        });
      }
    }, textRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const emoji = textRef.current?.querySelector('h1 span');

    if (emoji) {
      gsap.to(emoji, {
        y: -5,
        repeat: -1,
        yoyo: true,
        duration: 0.6,
        ease: 'power1.inOut',
      });
    }
  }, []);

  useEffect(() => {
    const imgEl = imageRef.current;
    const glowEl = bgGlowRef.current;

    if (!imgEl || !glowEl) return;

    gsap.fromTo(imgEl, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1 });

    const handleMouseEnter = () => {
      gsap.to(imgEl, { scale: 1.05, duration: 0.3 });
      imgEl.addEventListener('mousemove', handleImageMouseMove);
    };

    const handleMouseLeave = () => {
      gsap.to(imgEl, { scale: 1, rotateX: 0, rotateY: 0, duration: 0.3 });
      gsap.to(glowEl, { opacity: 0, scale: 0.8, duration: 0.5 });
      imgEl.removeEventListener('mousemove', handleImageMouseMove);
    };

  const handleImageMouseMove = (e: MouseEvent) => {
    const bounds = imgEl.getBoundingClientRect();
    const glowSize = glowEl.offsetWidth; // actual glow element width
    const relX = (e.clientX - bounds.left) / bounds.width - 0.5;
    const relY = (e.clientY - bounds.top) / bounds.height - 0.5;

    gsap.to(glowEl, {
      x: e.clientX - bounds.left - glowSize / 2,
      y: e.clientY - bounds.top - glowSize / 2,
      opacity: 1,
      scale: 1,
      duration: 0.3,
    });

    gsap.to(imgEl, {
      rotateY: relX * 14,
      rotateX: -relY * 14,
      transformPerspective: 800,
      transformOrigin: 'center',
      duration: 0.2,
      ease: 'power2.out',
    });
  };

    const handleWindowMouseMove = (e: MouseEvent) => {
      gsap.to(cursorRef.current, { 
        x: e.clientX, 
        y: e.clientY, 
        scale: 1.5, 
        duration: 0.15 
      });
    };

    imgEl.addEventListener('mouseenter', handleMouseEnter);
    imgEl.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousemove', handleWindowMouseMove);

    return () => {
      imgEl.removeEventListener('mouseenter', handleMouseEnter);
      imgEl.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousemove', handleWindowMouseMove);
    };
  }, []);


  useEffect(() => {
    if (!containerRef.current || positions.length === 0) return;

    const ctx = gsap.context(() => {
      particlesRef.current.forEach((particle) => {
        if (particle) {
          gsap.to(particle, {
            x: gsap.utils.random(-50, 50),
            y: gsap.utils.random(-50, 50),
            scale: gsap.utils.random(0.5, 1.5),
            duration: gsap.utils.random(4, 8),
            delay: gsap.utils.random(0, 3),
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            scrollTrigger: {
              trigger: containerRef.current, // 👈 this is where we use it
              start: "top 80%",
              end: "bottom top",
              toggleActions: "play pause resume pause", // pause when out of view
            }
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [positions]);

  // Scroll progress bar
  useEffect(() => {
    const bar = progressRef.current;
    if (!bar) return;
    const st = ScrollTrigger.create({
      start: 0,
      end: () => document.documentElement.scrollHeight - window.innerHeight,
      onUpdate: (self) => {
        const pct = Math.max(0, Math.min(1, self.progress));
        gsap.to(bar, { width: `${pct * 100}%`, duration: 0.1, ease: 'none' });
      },
    });
    return () => st.kill();
  }, []);

  // Looping marquee for tech stack
  useEffect(() => {
    const wrapper = marqueeRef.current;
    if (!wrapper) return;
    const inner = wrapper.querySelector('.marquee-inner') as HTMLDivElement | null;
    if (!inner) return;
    const totalWidth = inner.scrollWidth;
    inner.innerHTML = inner.innerHTML + inner.innerHTML;
    gsap.to(inner, {
      x: -totalWidth,
      duration: 18,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: (x) => `${parseFloat(x) % -totalWidth}`
      }
    });
    return () => gsap.killTweensOf(inner);
  }, []);

  // Magnetic buttons
  useEffect(() => {
    const buttons = ctaRefs.current.filter(Boolean);
    const handleMove = (e: MouseEvent) => {
      buttons.forEach((btn) => {
        const rect = btn.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / rect.width;
        const dy = (e.clientY - cy) / rect.height;
        gsap.to(btn, { x: dx * 10, y: dy * 10, duration: 0.2, ease: 'power2.out' });
      });
    };
    const handleLeave = () => {
      buttons.forEach((btn) => gsap.to(btn, { x: 0, y: 0, duration: 0.3 }));
    };
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseleave', handleLeave);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  
  return (
    <main className="min-h-screen pt-16 flex flex-col items-center justify-center bg-gradient-to-br from-pinkLight via-cream to-blueSoft dark:from-[#0b1220] dark:via-[#0f172a] dark:to-[#111827] px-4 py-12 text-[var(--foreground)]">
      {/* Scroll progress bar */}
      <div className="fixed top-16 left-0 right-0 h-1 bg-transparent z-40">
        <div ref={progressRef} className="h-full" style={{ background: 'linear-gradient(90deg, var(--accent-soft-rose), var(--pastel-purple))', width: '0%' }} />
      </div>

      <div
        ref={containerRef}
        className="backdrop-blur-md shadow-2xl rounded-3xl p-10 max-w-7xl w-full"
        style={{
          background: 'linear-gradient(180deg, var(--card), var(--card))',
          border: '1px solid var(--border)'
        }}
      >
        <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-16 py-8 md:py-16">
          {/* Text intro */}
          <div ref={textRef} className="flex-1 text-left px-4">
            <h1
              data-animate
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[var(--foreground)] mb-6 leading-tight"
            >
              Hi, I’m <span className="text-pinkSoft">Iram Bashir</span>{' '}
              <span className="inline-block animate-wave"><FaRegHandPaper aria-label="wave" /></span>
            </h1>

            <p
              data-animate
              className="text-lg sm:text-xl text-[var(--muted-foreground)] leading-relaxed mb-8"
            >
              I’m a <strong>Full-Stack Developer</strong> specializing in{' '}
              <span className="font-semibold text-pinkSoft">React</span>,{' '}
              <span className="font-semibold text-pinkSoft">Nest.js</span>, and{' '}
              <span className="font-semibold text-pinkSoft">TypeScript</span>.  
              Currently pursuing my <strong>Master’s at FAST NUCES</strong>, I build
              clean, scalable, and user-focused applications with a balance of{' '}
              <em>performance, design,</em> and <em>attention to detail</em>.  
              <br className="hidden sm:block" />
              Open to <u>remote</u> or <u>freelance</u> opportunities where I can
              contribute to impactful projects and collaborate with diverse teams.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap md:flex-nowrap items-center gap-4 mt-6">

              <a
                data-animate
                href="mailto:irambashir889@gmail.com"
                className="btn-primary"
                ref={(el) => { if (el) ctaRefs.current[0] = el; }}
              >
                Email Me
              </a>

              <a
                data-animate
                href="https://github.com/IramBashir"
                target="_blank"
                rel="noopener noreferrer" 
                className="btn-primary"
                ref={(el) => { if (el) ctaRefs.current[1] = el; }}
              >
                GitHub
              </a>

              <Link
                href="/projects"
                className="text-sm font-medium text-[var(--muted-foreground)] underline underline-offset-4 hover:text-pinkSoft transition inline-flex items-center gap-1"
              >
                See Projects <FiArrowRight />
              </Link>
            </div>
          </div>

          {/* Profile image */}
          <div
            className="relative group outline-none focus-visible:ring-4 focus-visible:ring-pinkSoft rounded-full"
            ref={imageRef}
            tabIndex={0}
          >

          {/* Floating particles */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            {positions.map((pos, i) => (
              <div
                key={i}
                ref={(el) => {
                  if (el) particlesRef.current[i] = el;
                }}
                style={{
                  position: "absolute",
                  top: pos.top,
                  left: pos.left,
                  width: "6px",
                  height: "6px",
                  backgroundColor: "pink",
                  borderRadius: "50%",
                }}
              />
            ))}
          </div>

            {/* Background glow */}
            <div
              ref={bgGlowRef}
              className="absolute inset-0 z-0 rounded-full blur-2xl opacity-20 group-hover:opacity-100 transition duration-300"
              style={{
                background:
                  'radial-gradient(circle at center, rgba(249,197,213,0.4), transparent 70%)',
              }}
            />

            {/* Actual Profile Image */}
            <div className="relative z-10 w-44 h-44 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-pink shadow-lg">
              <Image
                src="/assets/profile.jpg"
                alt="Iram Bashir Profile"
                fill
                className="profile-img"
              />
            </div>
          </div>
        </div>

        <SkillsSection /> 
        {/* <ProjectPreview /> */}
        <DownloadCVButton />
        {/* <Footer /> */}
        {/* Custom cursor */}
        <div ref={cursorRef} className="custom-cursor hidden md:block" />

      </div>

      {/* Tech stack marquee */}
      <section ref={marqueeRef} className="w-full mt-12 select-none" aria-label="Tech stack">
        <div className="overflow-hidden rounded-xl border" style={{ borderColor: 'var(--border)' }}>
          <div className="marquee-inner whitespace-nowrap py-3" style={{ background: 'linear-gradient(180deg, var(--card), var(--card))' }}>
            {['React', 'Next.js', 'TypeScript', 'Node.js', 'NestJS', 'Tailwind', 'GSAP', 'PostgreSQL', 'Redis', 'Docker', 'Prisma', 'Jest'].map((tech, i) => (
              <span key={`marquee-${i}`} className="mx-6 text-sm md:text-base font-medium text-[var(--muted-foreground)]">{tech}</span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
