import React from 'react';

const experiences = [
  {
    title: 'Embedded Systems & Controls Engineer',
    company: 'UMass Mechatronics Team – ASME Student Design Competition',
    period: 'Jan 2025 – Present',
    bullets: [
      'Developed C/C++ firmware for real-time motor control and sensor fusion',
      'Diagnosed hardware-software faults during board bring-up and field testing alongside mechanical and electrical teams',
      'Integrated sensors across I2C, SPI, and UART interfaces',
      'Validated timing and signal integrity using oscilloscopes and logic analyzers',
    ],
  },
  {
    title: 'Software Engineering Intern',
    company: 'WealthTechAI',
    period: 'Jun 2025 – Aug 2025',
    bullets: [
      'Performed system-level validation on Linux-based platforms',
      'Investigated failures through structured root-cause analysis tracing issues across process execution and system state',
      'Built Python-based automation for regression testing and functional verification',
      'Documented system behavior and edge cases to support reliable integration',
    ],
  },
  {
    title: 'Undergraduate Course Assistant',
    company: 'UMass ECE Department',
    period: 'Jan 2024 – Dec 2024',
    bullets: [
      'Mentored 80+ students in digital logic, Verilog RTL design, and FPGA simulation',
      'Delivered technical training and guided structured debugging and hardware verification techniques across a diverse student base',
      'Developed clear technical explanations for complex hardware concepts',
    ],
  },
  {
    title: 'Research Assistant',
    company: 'Elaine Marieb Center for Nursing and Engineering Innovation',
    period: 'Dec 2023 – Aug 2024',
    bullets: [
      'Assembled and debugged PCB-based embedded systems for biomedical sensing devices',
      'Wrote C and Python test utilities to validate system behavior and data integrity',
      'Automated validation workflows and established repeatable testing procedures for cross-team traceability',
    ],
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
                  <ul className="space-y-2">
                    {exp.bullets.map((bullet, j) => (
                      <li key={j} className="flex gap-3 text-gray-300 text-sm leading-relaxed">
                        <span className="text-gray-600 mt-[5px] shrink-0">–</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
