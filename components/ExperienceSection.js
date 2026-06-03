import React from 'react';

const experiences = [
  {
    title: 'Software Engineering Intern',
    company: 'WealthTechAI Robo Advisory',
    period: 'Jun 2025 – Present',
    description:
      'Migrated microservices from AWS to Frappe Cloud, rewrote APIs, and led end-to-end backend integration for a large-scale fintech platform.',
  },
  {
    title: 'Research Assistant',
    company: 'UMass ECE Department',
    period: 'Dec 2023 – Jun 2024',
    description:
      'Built a proximity-based smart lock system using PCB design, ESP32 firmware, and mobile app control for secure access management.',
  },
  {
    title: 'Hackathons & Freelance',
    company: 'Various',
    period: 'Ongoing',
    description:
      'Built real-time ASL recognition tools, carbon footprint scanners, and AI-powered accessibility tech for visually impaired users using Streamlit, TensorFlow, and OpenCV.',
  },
];

export default function ExperienceSection() {
  return (
    <section className="py-24 px-6 md:px-20 bg-black text-white relative z-10 font-bodoni">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-3 animate-on-scroll">
          Experience
        </h2>
        <div className="h-px w-12 bg-white/30 mx-auto mb-16 animate-on-scroll" />

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-[7px] md:left-[11px] top-3 bottom-6 w-px bg-gradient-to-b from-white/50 via-gray-700 to-transparent" />

          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <div key={i} className="relative pl-10 md:pl-14 animate-on-scroll">
                {/* Circle node on the line */}
                <div className="absolute left-0 md:left-[4px] top-[22px] w-[15px] h-[15px] rounded-full bg-black border-2 border-white/80 ring-4 ring-black" />

                {/* Period badge */}
                <p className="text-[11px] text-gray-500 uppercase tracking-[0.2em] mb-2">
                  {exp.period}
                </p>

                {/* Card */}
                <div className="border border-gray-800 rounded-xl p-6 bg-white/[0.02] hover:border-gray-600 hover:bg-white/[0.03] transition-all duration-300">
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-1">
                    {exp.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">{exp.company}</p>
                  <p className="text-gray-300 leading-relaxed">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
