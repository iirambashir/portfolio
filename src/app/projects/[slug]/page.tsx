'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { getProjectBySlug } from './../../data/projects';

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(true);

  const project = slug ? getProjectBySlug(slug) : undefined;

  // pick tag classes defined in globals.css
  const tagClasses = ['tag-pink', 'tag-blue', 'tag-purple', 'tag-green', 'tag-yellow', 'tag-orange'];

  useEffect(() => {
    if (project) setLoading(false);
  }, [project]);

  useEffect(() => {
    const link = document.querySelector('.back-link');
    if (!link) return;

    link.addEventListener('mouseenter', () => {
      gsap.to(link, {
        scale: 1.08,
        boxShadow: '0 0 16px var(--accent-soft-rose), 0 0 32px var(--pastel-pink)',
        duration: 0.3,
        ease: 'power2.out',
      });
    });

    link.addEventListener('mouseleave', () => {
      gsap.to(link, {
        scale: 1,
        boxShadow: '0 0 0px transparent',
        duration: 0.3,
        ease: 'power2.out',
      });
    });
  }, []);



  useEffect(() => {
    if (!loading && containerRef.current) {
      gsap.from(containerRef.current.children, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
      });
    }
    return () => {
      gsap.killTweensOf(containerRef.current?.children || []);
    };
  }, [loading]);

  if (loading) {
    return <p className="text-center text-gray-500 mt-10">Loading project...</p>;
  }

  if (!project) {
    return <p className="text-center text-red-500 mt-10">Project not found.</p>;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br ... py-12">
      <div className="max-w-5xl mx-auto px-4" ref={containerRef}>
        <Link href="/projects" className="back-link mb-6">
          <span className="arrow">←</span>
          Back to Projects
        </Link>
        {project.image && (
          <div className="w-full h-72 sm:h-96 rounded-2xl overflow-hidden shadow-lg gradient-glow">
            <Image
              src={project.image}
              alt={project.title}
              width={1200}
              height={500}
              className="object-cover w-full h-full transition-transform duration-700 hover:scale-105 hero-image"
            />
          </div>
        )}

        <h1 className="text-7xl font-extrabold mb-4 gradient-glow font-heading leading-tight" >
          {project.title}
        </h1>

        <p className="mb-6 leading-relaxed mt-6">
          {project.description}
        </p>


        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag, idx) => (
            <span
              key={tag}
              className={`px-3 py-1 rounded-full text-xs font-medium ${tagClasses[idx % tagClasses.length]} gradient-glow-hover`}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            GitHub
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Live Site
            </a>
          )}
          {project.video && (
            <a
              href={project.video}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Demo Video
            </a>
          )}
        </div>

        {/* SCREENSHOTS */}
        {project.screenshots && project.screenshots.length > 0 && (
        <div>
          <h2 className="text-[2.5rem] text-[var(--accent-soft-gray)] gradient-glow font-heading font-semibold leading-tight mb-2">
            Screenshots
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {project.screenshots.map((src, i) => (
              <div key={i} className="relative w-full h-80 rounded-xl overflow-hidden">
                <Image
                  src={src}
                  alt={`Screenshot ${i + 1}`}
                  fill
                  className="object-cover rounded-xl hover:scale-105 transition-transform duration-300 ease-in-out screenshot-image"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      </div>
    </main>
  );
}
