'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import gsap from 'gsap';

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    gsap.fromTo(
      'header',
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
    );
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const navLinks = useMemo(() => ([
    { href: '/', label: 'Home', section: 'home' },
    { href: '/experience', label: 'Experience', section: 'experience' },
    { href: '/projects', label: 'Projects', section: 'projects' },
    { href: '/education', label: 'Education', section: 'education' },
    { href: '/contact', label: 'Contact', section: 'contact' },
  ]), []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ScrollSpy for home sections
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const sectionIds = ['experience', 'projects', 'education', 'contact'];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (pathname !== '/') {
      setActiveSection('');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -60% 0px',
        threshold: 0.25,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, section?: string) => {
    if (!href.startsWith('/#')) return; // normal navigation
    // If already on home, smooth-scroll instead of full navigation
    if (pathname === '/') {
      e.preventDefault();
      const id = section || href.replace('/#', '');
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setMenuOpen(false);
      }
    } else {
      // navigate to home with hash
      e.preventDefault();
      router.push(href);
      setMenuOpen(false);
    }
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md transition-all ${scrolled ? 'shadow-md' : 'shadow-sm'} bg-[var(--background)]/70 dark:bg-gray-900/70`}>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <h1 className="text-lg sm:text-xl font-bold text-[var(--foreground)]">
          Iram Bashir
        </h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = pathname === '/'
              ? (link.section === 'home' ? activeSection === 'home' : activeSection === link.section)
              : pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href, link.section)}
                className={`relative transition-colors duration-200 ${
                  isActive
                    ? 'text-[var(--accent-soft-rose)]'
                    : 'text-[var(--foreground)] hover:text-[var(--accent-light-pink)]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[var(--accent-soft-rose)] rounded-full"></span>
                )}
              </Link>
            );
          })}
          <button
            onClick={() => setDarkMode(!darkMode)}
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="ml-2 p-2 rounded-full bg-[var(--accent-light-pink)]/20 hover:bg-[var(--accent-soft-rose)]/30 transition"
          >
            {darkMode ? '🌞' : '🌙'}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md bg-[var(--accent-light-pink)]/20"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[var(--background)] dark:bg-gray-900 px-4 pb-4 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href, link.section)}
              className={`block py-2 ${
                (pathname === '/' && activeSection === link.section) || pathname === link.href
                  ? 'text-[var(--accent-soft-rose)]'
                  : 'text-[var(--foreground)] hover:text-[var(--accent-light-pink)]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
