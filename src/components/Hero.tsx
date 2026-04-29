import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  Globe,
  Cpu,
  BarChart3,
  Code,
} from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // Mouse tracking for 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 150, mass: 0.5 };

  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], isMobile ? [0, 0] : [10, -10]),
    springConfig
  );

  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], isMobile ? [0, 0] : [-10, 10]),
    springConfig
  );

  const brightness = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [1.05, 0.95]),
    springConfig
  );

  const filterValue = useTransform(brightness, (b) => `brightness(${b})`);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || isMobile) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20 overflow-hidden min-h-screen flex items-center"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[70px] sm:blur-[100px] animate-pulse-soft" />
        <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-blue-400/20 rounded-full blur-[70px] sm:blur-[100px] animate-pulse-soft delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gradient-to-tr from-primary/5 via-transparent to-blue-400/5 rounded-full blur-[60px] sm:blur-[100px]" />

        {!isMobile && (
          <>
            <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-primary/40 rounded-full blur-sm animate-orbit" />
            <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-blue-400/60 rounded-full blur-[2px] animate-orbit [animation-delay:-5s]" />
            <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-indigo-400/40 rounded-full blur-[3px] animate-orbit [animation-delay:-10s]" />
          </>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 text-center relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1 }}
          className="inline-flex items-center gap-2 px-3 sm:px-4 md:px-5 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6 sm:mb-8 md:mb-10 backdrop-blur-md shadow-lg"
        >
          <Sparkles size={16} className="text-primary animate-pulse" />
          <span className="text-[10px] sm:text-xs font-black text-primary uppercase tracking-[0.2em] sm:tracking-[0.3em]">
            Next-Gen AI Platform
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[10rem] font-black text-slate-900 tracking-tighter mb-6 sm:mb-8 md:mb-12 leading-[0.9] md:leading-[0.85]"
        >
          Examine the <br />
          <span className="text-gradient">Genius AI</span>
        </motion.h1>

        {/* Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-3xl mx-auto text-base sm:text-lg md:text-2xl lg:text-3xl text-slate-600 mb-10 sm:mb-12 md:mb-16 leading-relaxed font-medium px-2"
        >
          A next-gen AI system that understands context, uses tools, learns
          from data, and solves complex problems like a human expert.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16 md:mb-24"
        >
          <button
            aria-label="Get Started"
            className="btn-primary group w-full sm:w-auto text-base sm:text-lg md:text-xl px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6"
          >
            Get Started
            <ArrowRight
              size={24}
              className="transition-transform group-hover:translate-x-2"
            />
          </button>

          <button
            aria-label="Contact Us"
            className="btn-secondary w-full sm:w-auto text-base sm:text-lg md:text-xl px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6"
          >
            Contact Us
          </button>
        </motion.div>

        {/* Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="relative max-w-6xl mx-auto perspective-2000 scale-[0.58] sm:scale-75 md:scale-90 lg:scale-100 origin-top"
          style={{ rotateX, rotateY, filter: filterValue }}
        >
          <div className="relative group">
            <div className="rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[3rem] border border-white/30 bg-white/40 backdrop-blur-3xl shadow-[0_40px_100px_-30px_rgba(0,0,0,0.2)] overflow-hidden aspect-[16/14] sm:aspect-video md:aspect-[21/9] relative">
              {/* Header */}
              <div className="h-12 sm:h-14 md:h-16 bg-white/60 border-b border-slate-200/50 flex items-center px-4 sm:px-6 md:px-10 gap-3 sm:gap-4 md:gap-6">
                <div className="flex gap-2">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-red-400/80" />
                  <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-yellow-400/80" />
                  <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-green-400/80" />
                </div>

                <div className="flex-1 justify-center hidden sm:flex">
                  <div className="h-8 md:h-10 w-40 md:w-96 bg-white/80 border rounded-2xl flex items-center px-3 md:px-5 gap-2 shadow-inner">
                    <Globe size={14} className="text-slate-400" />
                    <div className="w-full h-2 bg-slate-200/50 rounded-full" />
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-4">
                  <Zap size={18} className="text-primary" />
                  <Shield size={18} className="text-slate-400" />
                </div>
              </div>

              {/* Main */}
              <div className="p-4 sm:p-6 md:p-12 flex gap-4 sm:gap-6 md:gap-12 h-[calc(100%-3rem)] md:h-[calc(100%-4rem)]">
                {/* Sidebar */}
                <div className="hidden lg:block w-72 space-y-8">
                  <div className="space-y-4">
                    <div className="h-4 w-full bg-slate-200/40 rounded-full" />
                    <div className="h-4 w-4/5 bg-slate-200/40 rounded-full" />
                    <div className="h-4 w-3/4 bg-slate-200/40 rounded-full" />
                  </div>

                  <div className="space-y-4">
                    {[
                      { icon: <Cpu size={18} />, label: "Neural Engine", active: true },
                      { icon: <BarChart3 size={18} />, label: "Analytics", active: false },
                      { icon: <Globe size={18} />, label: "Network", active: false },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className={`h-14 rounded-2xl border flex items-center px-4 gap-3 ${
                          item.active
                            ? "bg-primary text-white border-primary"
                            : "bg-white/40 border-slate-200/50 text-slate-500"
                        }`}
                      >
                        {item.icon}
                        <span className="font-bold text-sm">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chat */}
                <div className="flex-1 flex flex-col gap-4 sm:gap-6 md:gap-10">
                  <div className="flex gap-3 sm:gap-4 md:gap-8">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-2xl bg-slate-200/40 flex items-center justify-center">
                      <Cpu size={28} />
                    </div>

                    <div className="space-y-3 flex-1">
                      <div className="h-4 w-40 bg-slate-200/40 rounded-full" />
                      <div className="bg-white/80 rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] p-4 sm:p-5 md:p-8 text-left text-sm sm:text-base md:text-xl text-slate-600">
                        I&apos;ve analyzed your workflow. Automating CRM sync could save 12 hours weekly.
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 sm:gap-4 md:gap-8 justify-end">
                    <div className="space-y-3 flex-1 flex flex-col items-end">
                      <div className="h-4 w-48 bg-primary/20 rounded-full" />
                      <div className="bg-primary text-white rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] p-4 sm:p-5 md:p-8 text-left text-sm sm:text-base md:text-xl">
                        Amazing! Generate the automation script and projected ROI.
                      </div>
                    </div>

                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-2xl bg-primary flex items-center justify-center">
                      <Sparkles size={28} className="text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating cards desktop only */}
            {!isMobile && (
              <>
                <div className="absolute -top-16 -right-16 w-72 p-6 glass rounded-[2rem] hidden 2xl:block">
                  <div className="font-black text-xs uppercase mb-4">
                    System Performance
                  </div>
                </div>

                <div className="absolute -bottom-16 -left-16 w-64 p-6 glass-dark rounded-[2rem] text-white hidden 2xl:block">
                  <div className="flex items-center gap-3">
                    <Code size={22} />
                    <span className="font-bold">Workflow Automation</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}