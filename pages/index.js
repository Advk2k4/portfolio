import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import ExperienceSection from '../components/ExperienceSection';
import ProjectsSection from '../components/ProjectsSection';
import SkillsSection from '../components/SkillsSection';
import Image from 'next/image';

const ROLES = ['AI/ML Engineer', 'Embedded Systems Dev', 'Full-Stack Builder', 'Hardware Hacker'];

export default function Home() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [chars, setChars] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const role = ROLES[roleIdx];
    let timer;
    if (!deleting && chars < role.length) {
      timer = setTimeout(() => setChars((c) => c + 1), 80);
    } else if (!deleting && chars === role.length) {
      timer = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && chars > 0) {
      timer = setTimeout(() => setChars((c) => c - 1), 40);
    } else {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % ROLES.length);
    }
    return () => clearTimeout(timer);
  }, [chars, deleting, roleIdx]);

  const displayRole = ROLES[roleIdx].slice(0, chars);

  return (
    <div className="relative min-h-screen text-white font-bodoni">
      <div className="absolute inset-0 bg-black -z-0" />

      <div className="relative z-10">
        <Navigation />

        {/* Hero Section */}
        <section
          id="home"
          className="min-h-screen flex items-center px-6 md:px-20 pt-20 relative overflow-hidden"
        >
          {/* Background glow orbs for depth */}
          <div className="absolute top-1/4 left-1/6 w-[480px] h-[480px] rounded-full bg-white/[0.025] blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/3 right-1/5 w-64 h-64 rounded-full bg-white/[0.015] blur-[80px] pointer-events-none" />

          <div className="relative z-10 w-full max-w-7xl mx-auto grid md:grid-cols-[3fr_2fr] gap-12 md:gap-20 items-center py-12">
            {/* Left: Text */}
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-[0.3em] mb-5">
                Computer Engineering · UMass Amherst
              </p>
              <h1 className="text-7xl md:text-8xl lg:text-[7.5rem] font-extrabold tracking-tight text-white leading-[0.88] mb-8">
                AADVIK<br />MISHRA
              </h1>
              <div className="h-px w-14 bg-white/35 mb-7" />
              <div className="text-lg md:text-xl text-gray-300 mb-10 h-7 font-light">
                {displayRole}<span className="cursor-blink text-gray-400">|</span>
              </div>
              <div className="flex flex-wrap gap-4">
                <a
                  href="/AadvikMishra_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all duration-300 text-sm tracking-wide"
                >
                  Download Resume
                </a>
                <button
                  onClick={() => {
                    const el = document.getElementById('contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-7 py-3 bg-transparent text-white border border-white/25 rounded-lg hover:border-white/60 hover:bg-white/[0.04] transition-all duration-300 text-sm tracking-wide"
                >
                  Get in touch
                </button>
              </div>
            </div>

            {/* Right: Photo */}
            <div className="flex justify-center md:justify-end mt-8 md:mt-0">
              <div className="relative">
                <div className="absolute inset-0 bg-white/[0.06] blur-3xl rounded-2xl scale-110 pointer-events-none" />
                <Image
                  src="/Aadvik.jpeg"
                  alt="Aadvik Mishra"
                  width={320}
                  height={420}
                  className="relative rounded-2xl shadow-2xl object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600 select-none">
            <span className="text-[10px] uppercase tracking-[0.3em]">scroll</span>
            <div className="scroll-indicator w-px h-10 bg-gradient-to-b from-gray-600 to-transparent" />
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 px-6 md:px-20 bg-black text-white relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-3 animate-on-scroll">
              About Me
            </h2>
            <div className="h-px w-12 bg-white/30 mx-auto mb-12 animate-on-scroll" />
            <div className="text-lg text-gray-300 leading-relaxed space-y-6">
              <p className="animate-on-scroll">
                I'm a passionate Computer Engineering student at UMass Amherst,
                specializing in the intersection of embedded systems, AI/ML, and
                full-stack development. My journey in technology is driven by a
                desire to build innovative solutions that make a real-world impact.
              </p>
              <p className="animate-on-scroll">
                With hands-on experience in firmware development, PCB design, and
                modern web technologies, I bring a unique perspective that bridges
                hardware and software. Whether it's developing health monitoring
                systems, migrating cloud infrastructure, or creating AI-powered
                applications, I thrive on solving complex technical challenges.
              </p>
              <p className="animate-on-scroll">
                When I'm not coding, you'll find me participating in hackathons,
                contributing to open-source projects, or exploring the latest
                developments in embedded AI and IoT technologies.
              </p>
            </div>
          </div>
        </section>

        <section id="experience"><ExperienceSection /></section>
        <section id="projects"><ProjectsSection /></section>
        <section id="skills"><SkillsSection /></section>

        {/* Contact Section */}
        <section id="contact" className="py-24 px-6 md:px-20 bg-black text-white relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 animate-on-scroll">
              Let's Connect
            </h2>
            <div className="h-px w-12 bg-white/30 mx-auto mb-8 animate-on-scroll" />
            <p className="text-xl text-gray-400 mb-12 animate-on-scroll">
              I'm always open to discussing new opportunities, collaborations, or
              just chatting about technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-on-scroll">
              <a
                href="mailto:aadvikmishra7@gmail.com"
                className="flex items-center gap-3 px-8 py-4 bg-white text-black rounded-lg hover:bg-gray-200 transition font-medium"
              >
                Email Me
              </a>
              <a
                href="https://www.linkedin.com/in/aadvik-mishra-2a8981252"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-8 py-4 bg-gray-900 border border-gray-700 text-white rounded-lg hover:border-white/50 hover:bg-gray-800/50 transition font-medium"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/Advk2k4"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-8 py-4 bg-gray-900 border border-gray-700 text-white rounded-lg hover:border-white/50 hover:bg-gray-800/50 transition font-medium"
              >
                GitHub
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
