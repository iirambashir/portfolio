'use client';

import { useEffect,useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { FaRocket } from 'react-icons/fa';
import { projects} from './../data/projects';

// gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) cardsRef.current.push(el);
  };

  useLayoutEffect(() => {
    if (typeof window === "undefined") return; // <-- SSR guard

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {

      if (headingRef.current) {
        gsap.from(headingRef.current, {
          opacity: 0,
          y: -50,
          duration: 0.9,
          ease: 'power2.out',
          textShadow: '0px 0px 20px var(--accent-soft-rose)',
        });
      }

      cardsRef.current.forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: 'top 85%' },
          opacity: 0,
          y: i % 2 === 0 ? 60 : -60,
          rotate: i % 2 === 0 ? 1 : -1,
          duration: 0.9,
          ease: 'power2.out',
          delay: i * 0.07,
        });

        
        // subtle hover scale & glow using pointer events
        card.addEventListener('mouseenter', () => {
          gsap.to(card, { scale: 1.03, boxShadow: '0 12px 40px rgba(245,182,188,0.14)', duration: 0.25 });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { scale: 1, boxShadow: 'none', duration: 0.25 });
        });

      });
    });
    ScrollTrigger.refresh();    
    
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.killTweensOf(cardsRef.current);
      cardsRef.current = [];
      ctx.revert(); // <-- cleans only this section's animations
    };
  }, []);
  
  // pick tag classes defined in globals.css
  const tagClasses = ['tag-pink', 'tag-blue', 'tag-purple', 'tag-green', 'tag-yellow', 'tag-orange'];

  return (
    <main className="min-h-screen pt-16  flex flex-col items-center justify-center py-16 bg-gradient-to-br from-[#fdf2f8] via-[#fffaf0] to-[#f0f9ff] dark:from-[#0b1220] dark:via-[#0f172a] dark:to-[#111827] text-[var(--foreground)]">
      <div className="max-w-7xl w-full px-4">
        <h2 ref={headingRef} className="heading-cute mb-14">
          Featured Projects <span><FaRocket aria-label="Featured Projects" /></span>
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projects.map((project) => (
            <article
              key={project.slug}
              ref={addToRefs}
              className="project-card group rounded-2xl shadow-md overflow-hidden transform transition-all duration-300 border"
              style={{
                background: 'linear-gradient(180deg, var(--card), var(--card))',
                borderColor: 'var(--border)'
              }}
            >
              {/* fixed aspect image box so all thumbnails match */}
              {project.image && (
                <div className="relative w-full aspect-[3/2]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              )}

              {/* content */}
              <div className="p-5">
                <h3 className="text-lg md:text-xl font-semibold mb-1 text-[var(--foreground)]">{project.title}</h3>

                {/* description: clamp to 2 lines (requires @tailwindcss/line-clamp) */}
                <p className="text-sm text-[var(--muted-foreground)] mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <span
                      key={tag}
                      className={`${tagClasses[i % tagClasses.length]} px-2 py-0.5 rounded-full text-xs font-medium shadow-sm`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* buttons / links */}
                <div className="flex flex-wrap gap-3 items-center">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cute-link"
                    >
                      GitHub
                    </a>
                  )}

                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cute-link bg-[var(--pastel-blue)] hover:scale-105"
                    >
                      Live
                    </a>
                  )}

                  {project.video && (
                    <a
                      href={project.video}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cute-link bg-[var(--pastel-green)] hover:scale-105"
                    >
                      Demo
                    </a>
                  )}

                  <Link href={`/projects/${project.slug}`} className="cute-link bg-[var(--accent-soft-rose)]">
                    Details
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}