"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaBriefcase, FaGraduationCap, FaRocket, FaTools, FaTrophy } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

interface TimelineItem {
  id: string;
  type: "education" | "experience" | "project" | "skill";
  title: string;
  subtitle: string;
  date: string;
  description: string[];
  tags?: string[];
  icon: ReactNode;
  color: string;
}

interface InteractiveTimelineProps {
  onItemClick: (item: TimelineItem) => void;
}

export default function InteractiveTimeline({ onItemClick }: InteractiveTimelineProps) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());
  const [progress, setProgress] = useState(0);

  const timelineData: TimelineItem[] = [
    {
      id: "edu-1",
      type: "education",
      title: "MS Computer Science",
      subtitle: "FAST NUCES",
      date: "Expected 2025",
      description: ["Advanced Data Analytics Platform", "Python, React.js, Node.js, PostgreSQL"],
      icon: <FaGraduationCap />,
      color: "#f472b6"
    },
    {
      id: "exp-1",
      type: "experience",
      title: "Junior Backend Developer",
      subtitle: "Norvana",
      date: "Dec 2024 - Present",
      description: ["Built scalable backend with Nest.js", "Optimized PostgreSQL queries by 40%"],
      tags: ["Nest.js", "TypeORM", "PostgreSQL"],
      icon: <FaBriefcase />,
      color: "#a78bfa"
    },
    {
      id: "exp-2",
      type: "experience",
      title: "Front-End Developer",
      subtitle: "Tourly Technologies",
      date: "Nov 2023 - Sep 2024",
      description: ["Developed responsive UIs with React.js", "Optimized performance & accessibility"],
      tags: ["React.js", "TypeScript", "Tailwind"],
      icon: <FaBriefcase />,
      color: "#60a5fa"
    },
    {
      id: "proj-1",
      type: "project",
      title: "Real-time Task Board",
      subtitle: "Collaborative Platform",
      date: "2024",
      description: ["WebSocket integration", "Optimistic UI updates"],
      tags: ["Socket.IO", "React", "Node.js"],
      icon: <FaRocket />,
      color: "#34d399"
    },
    {
      id: "exp-3",
      type: "experience",
      title: "Software Engineer",
      subtitle: "Jin Technologies",
      date: "Oct 2022 - Oct 2023",
      description: ["Migrated 4D app to web platform", "Boosted efficiency by 80%"],
      tags: ["React.js", "NestJS"],
      icon: <FaBriefcase />,
      color: "#fbbf24"
    },
    {
      id: "edu-2",
      type: "education",
      title: "BS Computer Science",
      subtitle: "FAST NUCES",
      date: "2018 - 2022",
      description: ["Final Year: Route & Safety App", "Yolov5, CNN, Raspberry Pi"],
      icon: <FaGraduationCap />,
      color: "#f472b6"
    }
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // Animate timeline line
      gsap.from(".timeline-line", {
        scaleY: 0,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 80%"
        }
      });

      // Animate each timeline item
      itemsRef.current.forEach((item, index) => {
        if (!item) return;

        gsap.from(item, {
          opacity: 0,
          x: index % 2 === 0 ? -80 : 80,
          duration: 0.8,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            onEnter: () => {
              // Mark as viewed
              const itemId = item.dataset.id;
              if (itemId) {
                setCompletedItems(prev => new Set(prev).add(itemId));
              }
            }
          }
        });
      });
    }, timelineRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const newProgress = (completedItems.size / timelineData.length) * 100;
    setProgress(newProgress);
  }, [completedItems, timelineData.length]);

  const handleItemClick = (item: TimelineItem) => {
    onItemClick(item);
  };

  return (
    <section ref={timelineRef} className="py-16 px-4 max-w-6xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-12 bg-white/10 rounded-full h-4 overflow-hidden backdrop-blur-sm">
        <div 
          className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 transition-all duration-700 ease-out relative"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 mr-2 text-xs font-bold text-white">
            {Math.round(progress)}%
          </div>
        </div>
      </div>

      <h2 className="text-5xl font-extrabold text-center mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
        My Journey <FaTrophy className="inline text-yellow-400" />
      </h2>
      <p className="text-center text-gray-400 mb-16">Click any milestone to explore details</p>

      {/* Timeline */}
      <div className="relative">
        {/* Center line */}
        <div className="timeline-line absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-500 via-purple-500 to-blue-500 transform -translate-x-1/2 origin-top" />

        {/* Timeline items */}
        <div className="space-y-16">
          {timelineData.map((item, index) => (
            <div
              key={item.id}
              ref={el => { if (el) itemsRef.current[index] = el; }}
              data-id={item.id}
              className={`flex items-center gap-8 ${
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              }`}
            >
              {/* Content card (make wider than spacer) */}
              <div className={`flex-[1.25] md:flex-[1.4] ${index % 2 === 0 ? "text-right" : "text-left"}`}>
                <div
                  onClick={() => handleItemClick(item)}
                  className="timeline-card group cursor-pointer bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                  style={{
                    boxShadow: completedItems.has(item.id) ? `0 0 20px ${item.color}40` : "none"
                  }}
                >
                  <div className="flex items-center gap-3 mb-2" style={{ justifyContent: index % 2 === 0 ? "flex-end" : "flex-start" }}>
                    <div 
                      className="text-2xl p-3 rounded-full"
                      style={{ backgroundColor: `${item.color}20`, color: item.color }}
                    >
                      {item.icon}
                    </div>
                    <span className="text-sm text-gray-400">{item.date}</span>
                  </div>

                  <h3 className="text-xl font-bold mb-1" style={{ color: item.color }}>
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-3">{item.subtitle}</p>

                  <div className="text-sm text-gray-400 space-y-1">
                    {item.description.slice(0, 2).map((line, i) => (
                      <p key={i}>• {line}</p>
                    ))}
                  </div>

                  {item.tags && (
                    <div className="flex flex-wrap gap-2 mt-3" style={{ justifyContent: index % 2 === 0 ? "flex-end" : "flex-start" }}>
                      {item.tags.map(tag => (
                        <span key={tag} className="text-xs px-2 py-1 rounded-full bg-white/10">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {completedItems.has(item.id) && (
                    <div className="mt-3 text-xs text-green-400 flex items-center gap-1" style={{ justifyContent: index % 2 === 0 ? "flex-end" : "flex-start" }}>
                      ✓ Viewed
                    </div>
                  )}
                </div>
              </div>

              {/* Center dot */}
              <div 
                className="timeline-dot w-6 h-6 rounded-full border-4 border-white/20 z-10 transition-all duration-300 hover:scale-150"
                style={{ 
                  backgroundColor: completedItems.has(item.id) ? item.color : "#1f2937",
                  boxShadow: completedItems.has(item.id) ? `0 0 15px ${item.color}` : "none"
                }}
              />

              {/* Spacer (narrower than content) */}
              <div className="flex-[0.75] md:flex-[0.6]" />
            </div>
          ))}
        </div>
      </div>

      {/* Achievement Badge */}
      {progress === 100 && (
        <div className="mt-16 text-center animate-bounce">
          <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full font-bold shadow-2xl">
            🎉 Timeline Completed! 🏆
          </div>
        </div>
      )}
    </section>
  );
}