import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ProjectCard = ({ title, category, description, tech, className, aosDelay, aosType, pathLength, containerRef }) => {
  const ref = useRef(null);
  const [isActive, setIsActive] = useState(false);

  useMotionValueEvent(pathLength, "change", (latest) => {
    if (!ref.current || !containerRef.current) return;
    
    const cardRect = ref.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    
    const cardTopRelativeToContainer = cardRect.top - containerRect.top;
    const containerHeight = containerRect.height;
    
    // Trigger when the line tip is 50px into the card
    const triggerY = cardTopRelativeToContainer + 50;
    const lineTipY = latest * containerHeight;
    
    if (lineTipY >= triggerY && !isActive) {
      setIsActive(true);
    } else if (lineTipY < triggerY && isActive) {
      setIsActive(false);
    }
  });

  return (
    <div 
      ref={ref}
      data-aos={aosType || "fade-up"} 
      data-aos-delay={aosDelay}
      className={`w-72 sm:w-80 rounded-[2rem] p-2 relative flex flex-col items-center hover:scale-[1.03] transition-all duration-700 z-10 ${className} ${
        isActive 
          ? 'bg-[#ff6a00] border-orange-400 shadow-[0_20px_50px_rgba(255,106,0,0.4)]' 
          : 'bg-white border border-gray-200 shadow-[0_15px_40px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]'
      }`}
    >
      {/* The hole punch */}
      <div className="w-5 h-5 bg-gradient-to-br from-gray-300 to-gray-100 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] absolute top-4 border border-gray-300 z-10 flex items-center justify-center">
        <div className="w-2 h-2 bg-gray-800 rounded-full opacity-20"></div>
      </div>
      
      {/* Inner container */}
      <div className={`w-full h-full rounded-[1.5rem] mt-8 p-6 md:p-8 flex flex-col justify-between min-h-[310px] transition-colors duration-700 ${
        isActive ? 'bg-orange-700/50' : 'bg-[#f4f4f4]'
      }`}>
        <div>
          {/* Category */}
          <span className={`text-[10px] font-black tracking-widest uppercase mb-3 block transition-colors duration-700 ${
            isActive ? 'text-orange-200' : 'text-orange-600'
          }`}>
            {category}
          </span>
          
          {/* Title */}
          <h3 className={`text-xl md:text-2xl font-black mb-3 tracking-tight transition-colors duration-700 ${
            isActive ? 'text-white' : 'text-gray-900'
          }`}>
            {title}
          </h3>
          
          {/* Description */}
          <p className={`text-xs leading-relaxed mb-6 font-medium transition-colors duration-700 ${
            isActive ? 'text-orange-100' : 'text-gray-500'
          }`}>
            {description}
          </p>
        </div>

        {/* Tech Stack Tags */}
        <div className={`flex flex-wrap gap-1.5 pt-4 border-t transition-colors duration-700 ${
          isActive ? 'border-orange-500/30' : 'border-gray-200'
        }`}>
          {tech.map((item, idx) => (
            <span 
              key={idx} 
              className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase border transition-all duration-700 ${
                isActive 
                  ? 'bg-orange-600/30 text-white border-orange-500/20' 
                  : 'bg-gray-200/60 text-gray-600 border-transparent'
              }`}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 });

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const projectsData = [
    {
      title: "Vehicle Number Plate Detection",
      category: "Computer Vision",
      description: "A real-time image processing and character recognition system that extracts text from vehicle number plates in live video feeds and static images using contour analysis and OCR techniques.",
      tech: ["Python", "OpenCV", "OCR", "MySQL"],
      className: "md:absolute md:top-[50px] md:right-[5%] lg:right-[10%] rotate-2 md:rotate-6",
      aosType: "fade-left",
      aosDelay: "100"
    },
    {
      title: "Visiting Card Application",
      category: "Mobile Application",
      description: "A sleek digital visiting card mobile application built natively for Android, focusing on modern UI principles, responsive grids, and interactive touch actions.",
      tech: ["Kotlin", "Jetpack Compose", "Android Studio"],
      className: "md:absolute md:top-[430px] md:left-[5%] lg:left-[10%] -rotate-2 md:-rotate-6",
      aosType: "fade-right",
      aosDelay: "150"
    },
    {
      title: "Voice Controlling Game",
      category: "Mobile Game",
      description: "An interactive, hands-free voice-controlled game built for mobile devices where users direct character movements and jumps using real-time voice command recognition.",
      tech: ["Flutter", "Dart", "Voice Recognition", "Cross-Platform"],
      className: "md:absolute md:top-[810px] md:right-[5%] lg:right-[10%] rotate-1 md:rotate-3",
      aosType: "fade-left",
      aosDelay: "200"
    },
    {
      title: "Interview Analyze Web App",
      category: "Web Application / AI",
      description: "An AI-powered web application that helps job seekers prepare for interviews. Users upload resumes, and the app performs semantic analysis to generate personalized, tailored interview questions with real-time feedback.",
      tech: ["Python", "Django", "HTML/CSS", "JavaScript", "AI APIs"],
      className: "md:absolute md:top-[1190px] md:left-[5%] lg:left-[10%] -rotate-1 md:-rotate-3",
      aosType: "fade-right",
      aosDelay: "250"
    },
    {
      title: "Hospital Management System",
      category: "Web Application / Database",
      description: "A comprehensive platform built for healthcare centers to securely manage patient files, doctor schedules, appointment requests, and medical billing records.",
      tech: ["Python", "Django", "MySQL", "HTML/CSS", "Bootstrap"],
      className: "md:absolute md:top-[1570px] md:right-[5%] lg:right-[10%] rotate-2 md:rotate-4",
      aosType: "fade-left",
      aosDelay: "300"
    },
    {
      title: "Ammu Mobile Application",
      category: "Mobile Application",
      description: "Collaborated on a team mobile application, designing and engineering a clean, high-performance subscription checkout flow and page integration.",
      tech: ["Flutter", "Dart", "Team Collaboration", "UI/UX Design"],
      className: "md:absolute md:top-[1950px] md:left-[5%] lg:left-[10%] -rotate-2 md:-rotate-4",
      aosType: "fade-right",
      aosDelay: "350"
    }
  ];

  return (
    <section 
      id="projects" 
      ref={containerRef}
      className="bg-[#f5f5f7] pt-24 pb-32 px-6 md:px-12 w-full relative overflow-hidden font-sans bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:80px_80px] border-t border-gray-100"
    >
      <div className="max-w-6xl mx-auto relative md:h-[2400px]">
        
        {/* Header */}
        <div data-aos="fade-up" className="md:absolute top-0 left-0 md:w-[450px] z-20 mb-16 md:mb-0">
          <div className="inline-block border border-gray-300 rounded-full px-5 py-1.5 text-xs text-gray-600 font-bold tracking-widest uppercase mb-6 bg-white shadow-sm">
            Selected Works
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-[1.1]">
            Transforming concepts into digital reality.
          </h2>
          <p className="text-gray-500 text-sm md:text-base font-medium mt-6 max-w-sm leading-relaxed">
            Scroll down to trace the development path of my mobile applications and web engineering projects.
          </p>
        </div>

        {/* Desktop SVG Animated Dashed Line */}
        <svg 
          className="hidden md:block absolute top-0 left-0 w-full h-[2400px] pointer-events-none z-0" 
          viewBox="0 0 1000 2400" 
          preserveAspectRatio="none"
        >
          {/* Faint background guide path */}
          <path 
            d="M 700,225 C 400,225 200,415 300,605 C 400,795 800,795 700,985 C 600,1175 200,1175 300,1365 C 400,1555 800,1555 700,1745 C 600,1935 200,1935 300,2125 C 400,2220 500,2250 650,2300" 
            fill="none" 
            stroke="#cbd5e1" 
            strokeWidth="2" 
            strokeDasharray="8 10" 
          />

          {/* Mask to reveal the dashed path based on scroll */}
          <mask id="project-path-mask">
            <motion.path 
              d="M 700,225 C 400,225 200,415 300,605 C 400,795 800,795 700,985 C 600,1175 200,1175 300,1365 C 400,1555 800,1555 700,1745 C 600,1935 200,1935 300,2125 C 400,2220 500,2250 650,2300" 
              fill="none" 
              stroke="white" 
              strokeWidth="20" 
              style={{ pathLength }}
            />
          </mask>

          {/* The actual dashed line revealed */}
          <path 
            d="M 700,225 C 400,225 200,415 300,605 C 400,795 800,795 700,985 C 600,1175 200,1175 300,1365 C 400,1555 800,1555 700,1745 C 600,1935 200,1935 300,2125 C 400,2220 500,2250 650,2300" 
            fill="none" 
            stroke="black" 
            strokeWidth="2" 
            strokeDasharray="8 10" 
            mask="url(#project-path-mask)"
            className="drop-shadow-sm"
          />
        </svg>

        {/* Mobile Animated Vertical Dashed Line */}
        <svg 
          className="md:hidden absolute top-0 left-[50%] -translate-x-1/2 w-4 h-[100%] pointer-events-none z-0" 
          viewBox="0 0 4 100" 
          preserveAspectRatio="none"
        >
          <path 
            d="M 2,0 L 2,100" 
            fill="none" 
            stroke="#cbd5e1" 
            strokeWidth="4" 
            strokeDasharray="4 6" 
            vectorEffect="non-scaling-stroke"
          />
          <mask id="project-path-mask-mobile">
            <motion.path 
              d="M 2,0 L 2,100" 
              fill="none" 
              stroke="white" 
              strokeWidth="4" 
              style={{ pathLength }}
              vectorEffect="non-scaling-stroke"
            />
          </mask>
          <path 
            d="M 2,0 L 2,100" 
            fill="none" 
            stroke="black" 
            strokeWidth="4" 
            strokeDasharray="4 6" 
            mask="url(#project-path-mask-mobile)"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Cards Container */}
        <div className="flex flex-col gap-8 md:gap-12 items-center md:block relative z-10 w-full pt-4 md:pt-0 pb-12 md:pb-0">
          {projectsData.map((project, idx) => (
            <ProjectCard 
              key={idx}
              title={project.title}
              category={project.category}
              description={project.description}
              tech={project.tech}
              className={project.className}
              aosType={project.aosType}
              aosDelay={project.aosDelay}
              pathLength={pathLength}
              containerRef={containerRef}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;
