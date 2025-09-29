// src/data/projects.ts

export interface Project {
  title: string;
  description: string;
  image?: string;
  tags: string[];
  github: string;
  live?: string;
  video?: string;
  slug: string;
  screenshots?: string[];
}

export const projects: Project[] = [
  {
    title: "AI Chatbot",
    description: "An AI-powered chatbot built with Next.js and OpenAI API.",
    image: "/assets/ai-chatbot.png",
    tags: ["Next.js", "TypeScript", "OpenAI"],
    github: "https://github.com/example/ai-chatbot",
    live: "https://example.com/ai-chatbot",
    slug: "ai-chatbot",
    screenshots: ["/assets/ai-chatbot-1.png", "/assets/ai-chatbot-2.png"],
  },
  {
    title: "Portfolio Website",
    description: "A personal portfolio website with animations and responsive design.",
    image: "/assets/portfolio.png",
    tags: ["React", "Tailwind", "GSAP"],
    github: "https://github.com/example/portfolio",
    live: "https://example.com/portfolio",
    slug: "portfolio-website",
  },
   {
    slug: 'warraich-contracting',
    title: 'Warraich Contracting',
    description:
      'Responsive business website built for a construction company. Includes homepage, services, about, and contact.',
    image: '/assets/waraich-contracting.png',
    github: 'https://github.com/IramBashir/waraich-contracting',
    live: 'https://IramBashir.github.io/waraich-contracting',
    tags: ['React', 'Next.js', 'TailwindCSS'],
    screenshots: [
      '/assets/waraich-contracting-1.png',
      '/assets/waraich-contracting-2.png',
    ],
  },
  {
    slug: 'realtime-task-board',
    title: 'Real-time Task Board',
    description:
      'Collaborative task management system with real-time updates using Socket.IO. Built with React, TypeScript, and Node.js.',
    image: '/assets/realtime-task-board.jpg',
    github: 'https://github.com/IramBashir/realtime-task-board',
    video:
      'https://drive.google.com/file/d/11jUXO7OinUYctMZ9QGFEkY2-yXIZFczV/view',
    tags: ['React', 'TypeScript', 'Socket.IO', 'Next.js', 'Node.js'],
    screenshots: [],
  },
  {
    slug: 'tic-tac-toe',
    title: 'Tic Tac Toe',
    description:
      'A 2-player Tic Tac Toe game made with React. Built 3 years ago, still a clean example of core frontend logic.',
    image: '/assets/tic-tac-toe.png',
    github: 'https://github.com/IramBashir/Tic-Tac-Toe',
    live: 'https://IramBashir.github.io/Tic-Tac-Toe',
    tags: ['React', 'JavaScript'],
    screenshots: [],
  },
  {
    slug: 'project-4',
    title: 'Project 4',
    description: 'Placeholder project built using ReactJS.',
    image: '/assets/profile.jpg',
    github: '#',
    tags: ['React'],
    screenshots: [],
  },
  {
    slug: 'project-5',
    title: 'Project 5',
    description: 'Demo project showcasing frontend skills.',
    image: '/assets/profile.jpg',
    github: '#',
    tags: ['Next.js'],
    screenshots: [],
  },
];

// Helper to find a single project by slug
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
