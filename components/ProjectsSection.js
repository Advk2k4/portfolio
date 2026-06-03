import { useState } from 'react'
import Image from 'next/image'

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('all')

  const projects = [
    {
      id: 1,
      title: "Bias Detection in Automated Hiring",
      description: "Wrote batch prompt scripts and parsing pipelines to automate LLM-based fairness audits on 480 controlled resumes. Applied TF-IDF and statistical analysis to simulate hiring decisions and demonstrate name-based demographic bias.",
      image: "/Bias.jpeg",
      tags: ["Python", "OpenAI API", "TF-IDF", "Statistical Testing", "NLP", "Machine Learning"],
      category: "ai",
      githubUrl: "https://github.com/Advk2k4/BiasDetectionModel",
      liveUrl: null,
      featured: false
    },
    {
      id: 2,
      title: "Real-Time Sign Language Recognition App",
      description: "Built a real-time ASL/ISL letter recognition system using hand tracking with MediaPipe and OpenCV. Integrated a trained KNN model to classify finger poses from webcam feed using streamlit-webrtc with live prediction display.",
      image: "/ASL.jpeg",
      tags: ["Python", "Streamlit", "OpenCV", "MediaPipe", "KNN", "Computer Vision"],
      category: "ai",
      githubUrl: "https://github.com/Advk2k4/asl-app",
      liveUrl: "https://www.youtube.com/watch?v=_ZuMkJ-Eqhw&ab_channel=AadvikMishra",
      featured: true
    },
    {
      id: 3,
      title: "Real-Time Facial & Text Sentiment Analyzer",
      description: "Analyzes facial expressions from live video or uploaded images and combines them with text input to detect user sentiment in real time using computer vision and NLP techniques.",
      image: "/Sentiment.png",
      tags: ["Python", "OpenCV", "Computer Vision", "NLP", "TensorFlow", "Streamlit"],
      category: "ai",
      githubUrl: "https://github.com/Advk2k4/sentiment-analysis",
      liveUrl: "https://www.youtube.com/watch?v=mjO0FVW-aDs&ab_channel=AadvikMishra",
      featured: false
    },
    {
      id: 4,
      title: "FoodScout",
      description: "Developed a mobile-friendly Streamlit app for discovering restaurants with filters for cuisine, rating, and distance. Planned integration of Google Maps API to support location-aware real-time suggestions.",
      image: "/FoodScout.png",
      tags: ["Streamlit", "Python", "Google Maps API", "Pandas", "Web Development"],
      category: "fullstack",
      githubUrl: "https://github.com/Advk2k4/FoodRecs",
      liveUrl: "https://foodrecs-by-aadvik.streamlit.app/",
      featured: false
    },
    {
      id: 5,
      title: "Handwritten Digit Recognition on DE1-SoC",
      description: "Trained a fully-connected neural network in Python and exported weights for embedded inference. Implemented tiled matrix multiplication on FPGA using OpenCL and integrated with ARM Cortex-A9 for real-time digit classification.",
      image: "/DigitDetection.png",
      tags: ["C", "OpenCL", "Verilog", "Python", "FPGA", "ARM Cortex-A9"],
      category: "embedded",
      githubUrl: "https://github.com/epeter11/ECE332",
      liveUrl: null,
      featured: false
    },
    {
      id: 6,
      title: "UPlay!",
      description: "Developed a full stack location-based platform with backend API integration using Django and frontend design in HTML/Python. Won Best Beginner Hack at HackUmassX 2022.",
      image: "/UPlay!.png",
      tags: ["HTML", "Python", "API Testing", "Django", "Full Stack", "Location Services"],
      category: "fullstack",
      githubUrl: "https://github.com/sheldor1510/uplay",
      liveUrl: "https://www.youtube.com/watch?v=SBdNoN1nVDw&list=WL&index=9&ab_channel=ShaswatGanisshan",
      featured: true
    },
    {
      id: 7,
      title: "SafeStride",
      description: "Safety-focused application designed to enhance personal security and navigation. Built with modern web technologies and user-centered design principles.",
      image: "/SafeStride.png",
      tags: ["JavaScript", "Web Development", "Safety", "Navigation", "Mobile-Friendly"],
      category: "fullstack",
      githubUrl: "https://github.com/sheldor1510/safestride",
      liveUrl: "https://www.youtube.com/watch?v=sezqMUveo20&list=WL&index=8&ab_channel=SafeStride",
      featured: true
    },
    {
      id: 8,
      title: "AI-Powered Health Monitoring System",
      description: "Built embedded firmware for health sensors with real-time data processing and anomaly detection. Designed and debugged PCBs for biomedical devices, developed automated test scripts using TDD practices.",
      image: "/health.jpeg",
      tags: ["Python", "C", "Embedded Systems", "PCB Design", "Sensors", "TDD"],
      category: "embedded",
      githubUrl: "https://github.com/Advk2k4/heart-rate-monitor",
      liveUrl: null,
      featured: false
    },
    {
      id: 9,
      title: "TinyTemp: Battery-Powered Digital Thermometer",
      description: "Designed and fabricated a custom PCB using KiCad for a low-power temperature monitor with ATtiny85, TMP-36 sensor, and SSD1306 OLED display. Achieved 6-month battery life with real-time temperature display and LED overheat alert.",
      image: "/tinytemp.jpeg",
      tags: ["KiCad", "ATtiny85", "AVR-GCC", "PCB Design", "Embedded C", "Low Power"],
      category: "embedded",
      githubUrl: "https://github.com/Advk2k4/tiny-temp",
      liveUrl: null,
      featured: false
    },
    {
      id: 10,
      title: "Medway: Avoid The Wait",
      description: "Still building...",
      image: "/logo.png",
      tags: ["JavaScript", "React", "Node.js", "Express", "MongoDB", "Full Stack"],
      category: "fullstack",
      githubUrl: "https://github.com/Advk2k4/medway",
      liveUrl: null,
      featured: true
    },
    {
      id: 11,
      title: "EchoSafe – Embedded Consumer Device",
      description: "Architected an end-to-end embedded consumer device for hearing-impaired users: schematic capture, PCB layout, BOM development, vendor coordination, board bring-up, and stress testing. Implemented real-time Embedded C firmware for sensor processing on a custom PCB. Trained and deployed an on-device sound classification ML model (5 classes, 91% accuracy) for real-time assistive alerting.",
      image: "/logo.png",
      tags: ["KiCad", "Embedded C", "Python", "ML", "PCB Design", "Sound Classification"],
      category: "embedded",
      githubUrl: null,
      liveUrl: null,
      featured: true
    }
  ]

  const filters = [
    { id: 'all', label: 'All Projects', count: projects.length },
    { id: 'featured', label: 'Featured', count: projects.filter(p => p.featured).length },
    { id: 'ai', label: 'AI/ML', count: projects.filter(p => p.category === 'ai').length },
    { id: 'embedded', label: 'Embedded', count: projects.filter(p => p.category === 'embedded').length },
    { id: 'fullstack', label: 'Full Stack', count: projects.filter(p => p.category === 'fullstack').length }
  ]

  const filteredProjects = projects.filter(project => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'featured') return project.featured
    return project.category === activeFilter
  })

  const ProjectCard = ({ project }) => (
    <div className="group relative bg-gray-900/50 rounded-xl overflow-hidden border border-gray-800 hover:border-white/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-white/25">
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden bg-gray-800">
        <Image
          src={project.image}
          alt={`${project.title} screenshot`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {project.featured && (
          <div className="absolute top-4 right-4 bg-white text-black px-3 py-1 rounded-full text-xs font-semibold z-10">
            Featured
          </div>
        )}
      </div>

      {/* Project Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-white transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm mb-4 leading-relaxed">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 4).map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-xs border border-gray-700 hover:border-white/50 transition-colors duration-200"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="px-3 py-1 bg-gray-800 text-gray-400 rounded-full text-xs border border-gray-700">
              +{project.tags.length - 4} more
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-white hover:text-black transition-all duration-300 text-sm font-medium"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            Code
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-all duration-300 text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Demo
            </a>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <section className="py-20 px-6 md:px-20 bg-black text-white relative z-10 font-bodoni">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-3 animate-on-scroll">
            Featured Projects
          </h2>
          <div className="h-px w-12 bg-white/30 mx-auto mb-5 animate-on-scroll" />
          <p className="text-xl text-gray-400 max-w-3xl mx-auto animate-on-scroll">
            A collection of projects spanning embedded systems, AI/ML, full-stack development, and hardware design.
            Each project represents a unique challenge and learning opportunity.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-white text-black shadow-lg shadow-white/25'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-700'
              }`}
            >
              {filter.label}
              <span className="ml-2 text-sm opacity-75">({filter.count})</span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <a
            href="https://github.com/Advk2k4"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-800 text-white rounded-lg hover:bg-white hover:text-black transition-all duration-300 font-medium"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            View All Projects on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}