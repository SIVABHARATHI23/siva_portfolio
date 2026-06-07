import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TimelineItem = ({ role, company, type, duration, points, className, aosDelay, aosType, pathLength, containerRef }) => {
  const ref = useRef(null);
  const [isActive, setIsActive] = useState(false);

  useMotionValueEvent(pathLength, "change", (latest) => {
    if (!ref.current || !containerRef.current) return;
    
    const cardRect = ref.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    
    const cardTopRelativeToContainer = cardRect.top - containerRect.top;
    const containerHeight = containerRef.height;
    
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
          ? 'bg-[#ff6a00] border-orange-400 shadow-[0_20px_50px_rgba(255,106,0,0.3)]' 
          : 'bg-zinc-900 border border-zinc-800 shadow-[0_15px_40px_rgba(0,0,0,0.2)]'
      }`}
    >
      {/* The hole punch */}
      <div className="w-5 h-5 bg-gradient-to-br from-zinc-700 to-zinc-900 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] absolute top-4 border border-zinc-800 z-10 flex items-center justify-center">
        <div className="w-2 h-2 bg-black rounded-full opacity-35"></div>
      </div>
      
      {/* Inner container */}
      <div className={`w-full h-full rounded-[1.5rem] mt-8 p-6 md:p-8 flex flex-col justify-between min-h-[300px] transition-colors duration-700 ${
        isActive ? 'bg-orange-700/50 text-white' : 'bg-[#121214] text-zinc-300'
      }`}>
        <div>
          <div className="flex flex-col gap-1 mb-4">
            <span className={`text-[10px] font-black tracking-widest uppercase transition-colors duration-700 ${
              isActive ? 'text-orange-200' : 'text-orange-500'
            }`}>
              {type}
            </span>
            <h3 className={`text-lg md:text-xl font-black tracking-tight transition-colors duration-700 ${
              isActive ? 'text-white' : 'text-white'
            }`}>
              {role}
            </h3>
            <span className="text-zinc-500 text-[11px] font-bold uppercase tracking-wider">
              {company} | {duration}
            </span>
          </div>

          <ul className="space-y-2.5">
            {points.map((pt, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs leading-relaxed font-medium">
                <svg className={`w-4.5 h-4.5 shrink-0 mt-0.5 transition-colors duration-700 ${
                  isActive ? 'text-white' : 'text-orange-500'
                }`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                <span className={isActive ? 'text-orange-50' : 'text-zinc-400'}>{pt}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const Experience = () => {
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

  const experienceData = [
    {
      role: "Certificate of Merit in Django Full Stack",
      company: "Technical Qualification",
      type: "Django & Python Training",
      duration: "Aug 2024 - Nov 2024",
      className: "md:absolute md:top-[50px] md:right-[5%] lg:right-[10%] rotate-2 md:rotate-6",
      aosType: "fade-left",
      aosDelay: "100",
      points: [
        "Completed comprehensive full stack course covering Django architecture, views, models, and Rest framework.",
        "Built database-connected templates and APIs with Python, HTML, CSS, and relational databases.",
        "Acquired strong foundations in server-side request routing and dynamic backend logic systems."
      ]
    },
    {
      role: "Certificate of Merit in Mobile App Development",
      company: "Technical Qualification",
      type: "Flutter & Dart Training",
      duration: "Apr 2025 - July 2025",
      className: "md:absolute md:top-[430px] md:left-[5%] lg:left-[10%] -rotate-2 md:-rotate-6",
      aosType: "fade-right",
      aosDelay: "150",
      points: [
        "Qualified in cross-platform mobile application development using Flutter SDK and Dart programming.",
        "Designed responsive mobile user interfaces and state management flows (Provider, setState).",
        "Wired native Android Studio emulators and packaged application builds."
      ]
    },
    {
      role: "Full Stack Developer Intern",
      company: "Techpuram",
      type: "3-Month Internship",
      duration: "June 2025 - Aug 2025",
      className: "md:absolute md:top-[810px] md:right-[5%] lg:right-[10%] rotate-1 md:rotate-3",
      aosType: "fade-left",
      aosDelay: "200",
      points: [
        "Spearheaded the development of the 'Interview Analyze Web Application' using HTML, CSS, JavaScript, and Django.",
        "Integrated advanced AI APIs to analyze user resumes and generate context-aware mock interview questions.",
        "Gained practical experience in Agile workflows, Git collaboration, and product cycles."
      ]
    },
    {
      role: "Full Stack Developer",
      company: "Techpuram",
      type: "Full-Time Employee",
      duration: "Sept 2025 - Present",
      className: "md:absolute md:top-[1190px] md:left-[5%] lg:left-[10%] -rotate-1 md:-rotate-3",
      aosType: "fade-right",
      aosDelay: "250",
      points: [
        "Developing robust, responsive, and scalable web applications, handling complete frontend and backend deliverables.",
        "Engineering backends with Python & Django, and relational database schemas with MySQL.",
        "Building engaging, highly-interactive user interfaces in React.js and modern styling libraries."
      ]
    }
  ];

  return (
    <section 
      id="experience" 
      ref={containerRef}
      className="bg-[#08080a] pt-24 pb-32 px-6 md:px-12 w-full relative overflow-hidden border-t border-zinc-900"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 rounded-full filter blur-[150px] pointer-events-none z-0"></div>

      <div className="max-w-6xl mx-auto relative md:h-[1600px]">
        
        {/* Header */}
        <div data-aos="fade-up" className="md:absolute top-0 left-0 md:w-[450px] z-20 mb-16 md:mb-0">
          <div className="inline-block border border-zinc-800 rounded-full px-5 py-1.5 text-xs text-orange-500 font-black tracking-widest uppercase mb-6 bg-zinc-900/40">
            Journey
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Work & Qualifications
          </h2>
          <p className="text-zinc-500 text-sm md:text-base font-medium mt-4 max-w-sm leading-relaxed">
            Scroll down to trace my career path at Techpuram and technical qualifications.
          </p>
        </div>

        {/* Desktop SVG Animated Dashed Line */}
        <svg 
          className="hidden md:block absolute top-0 left-0 w-full h-[1600px] pointer-events-none z-0" 
          viewBox="0 0 1000 1600" 
          preserveAspectRatio="none"
        >
          {/* Faint background guide path */}
          <path 
            d="M 700,225 C 400,225 200,415 300,605 C 400,795 800,795 700,985 C 600,1175 200,1175 300,1365 C 400,1460 500,1500 650,1550" 
            fill="none" 
            stroke="#1f1f23" 
            strokeWidth="2" 
            strokeDasharray="8 10" 
          />

          {/* Mask to reveal the dashed path based on scroll */}
          <mask id="exp-path-mask">
            <motion.path 
              d="M 700,225 C 400,225 200,415 300,605 C 400,795 800,795 700,985 C 600,1175 200,1175 300,1365 C 400,1460 500,1500 650,1550" 
              fill="none" 
              stroke="white" 
              strokeWidth="20" 
              style={{ pathLength }}
            />
          </mask>

          {/* The actual dashed line revealed */}
          <path 
            d="M 700,225 C 400,225 200,415 300,605 C 400,795 800,795 700,985 C 600,1175 200,1175 300,1365 C 400,1460 500,1500 650,1550" 
            fill="none" 
            stroke="#ff6a00" 
            strokeWidth="2" 
            strokeDasharray="8 10" 
            mask="url(#exp-path-mask)"
            className="drop-shadow-[0_0_10px_rgba(255,106,0,0.5)]"
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
            stroke="#1f1f23" 
            strokeWidth="4" 
            strokeDasharray="4 6" 
            vectorEffect="non-scaling-stroke"
          />
          <mask id="exp-path-mask-mobile">
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
            stroke="#ff6a00" 
            strokeWidth="4" 
            strokeDasharray="4 6" 
            mask="url(#exp-path-mask-mobile)"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Cards Container */}
        <div className="flex flex-col gap-8 md:gap-12 items-center md:block relative z-10 w-full pt-4 md:pt-0 pb-12 md:pb-0">
          {experienceData.map((item, idx) => (
            <TimelineItem 
              key={idx}
              role={item.role}
              company={item.company}
              type={item.type}
              duration={item.duration}
              points={item.points}
              className={item.className}
              aosType={item.aosType}
              aosDelay={item.aosDelay}
              pathLength={pathLength}
              containerRef={containerRef}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Experience;
