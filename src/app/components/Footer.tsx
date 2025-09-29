'use client';

import Link from 'next/link';
import { FaGithub, FaEnvelope, FaLinkedin } from 'react-icons/fa';
import gsap from 'gsap';
import { useEffect } from 'react';

export default function Footer() {
  const year = new Date().getFullYear();

  useEffect(() => {
    gsap.fromTo(
      'footer',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.2 }
    );
  }, []);

  return (
    <footer className="mt-16 border-t border-[var(--accent-light-pink)]/40 pt-6 text-center text-sm text-[var(--foreground)]">
      <div className="mb-4 flex justify-center gap-6">
        <a
          href="https://github.com/IramBashir"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--accent-soft-rose)] transition"
        >
          <FaGithub size={20} />
        </a>
        <a
          href="mailto:irambashir889@gmail.com"
          className="hover:text-[var(--accent-soft-rose)] transition"
        >
          <FaEnvelope size={20} />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--accent-soft-rose)] transition"
        >
          <FaLinkedin size={20} />
        </a>
        <Link
          href="/projects"
          className="hover:text-[var(--accent-soft-rose)] transition"
        >
          Projects
        </Link>
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400">
        © {year} Iram Bashir. All rights reserved.
      </p>
    </footer>
  );
}
