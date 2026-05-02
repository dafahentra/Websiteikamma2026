import { useRef, useEffect } from 'react';
import { useParams, useLocation } from 'react-router';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import LogoPutihRaw from '../../assets/LogoPutih.svg?raw';
import { departmentsData } from '../../data/departments';

// Extract SVG inner paths for the background logo
const svgInner = LogoPutihRaw
  .replace(/<\?xml[^>]*\?>/g, '')
  .replace(/<svg[^>]*>/g, '')
  .replace(/<\/svg>/g, '')
  .trim();

function IkammaLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 749 538"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="IKAMMA"
      dangerouslySetInnerHTML={{ __html: svgInner }}
    />
  );
}

export function DepartmentDetail() {
  const { slug } = useParams();
  const department = slug ? departmentsData[slug] : null;
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const { scrollYProgress } = useScroll();
  // Parallax effect: images move slightly toward the center as user scrolls down
  const parallaxXLeft = useTransform(scrollYProgress, [0, 0.2], [0, 40]);
  const parallaxXRight = useTransform(scrollYProgress, [0, 0.2], [0, -40]);

  // About section parallax
  const aboutRef = useRef<HTMLElement>(null);
  const { scrollYProgress: aboutScrollY } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"]
  });
  const aboutParallaxY = useTransform(aboutScrollY, [0, 1], [60, -60]);

  // Group Photo Parallax
  const groupPhotoRef = useRef<HTMLElement>(null);
  const { scrollYProgress: groupPhotoScrollY } = useScroll({
    target: groupPhotoRef,
    offset: ["start end", "end start"]
  });
  const parallaxYGroup = useTransform(groupPhotoScrollY, [0, 1], ["-20%", "20%"]);

  if (!department) {
    return (
      <div className="min-h-screen bg-white text-[#081C36] flex items-center justify-center">
        <Navbar />
        <h1 className="text-2xl">Department Not Found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#081C36] overflow-hidden">
      <Navbar />

      {/* 1. Hero Section: Welcome & Leaders */}
      <section className="relative pt-48 pb-10 px-6 lg:px-12 flex flex-col items-center min-h-[80vh] md:min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <p className="text-[#081C36] font-inter font-medium mb-4 uppercase tracking-widest text-xs">Welcome to</p>
          <h1 className="text-4xl md:text-7xl lg:text-[8rem] font-inter tracking-tight max-w-7xl text-[#081C36] leading-[0.9] text-center" style={{ fontWeight: 800 }}>
            {department.name}
          </h1>
        </motion.div>

        {/* Leaders Layout - Edge-to-edge photos */}
        <div className="relative w-full flex flex-row justify-between items-end mt-auto h-[320px] md:h-[500px] max-w-[1800px] mx-auto px-0">

          {/* Background Large Logo (Centered) */}
          <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[400px] md:w-[800px] opacity-[0.06] pointer-events-none z-0">
            <IkammaLogo className="w-full h-auto text-white" />
          </div>

          {/* Manager (Left) */}
          <motion.div
            style={{ x: parallaxXLeft }}
            className="flex items-end z-10 relative w-[50%] md:w-[45%] justify-start h-full -ml-[130px] md:-ml-[194px] lg:-ml-[226px]"
          >
            <div className="h-full w-auto shrink-0 relative">
              <motion.img
                src={department.managerImg}
                alt={department.manager}
                className="h-full w-auto object-contain object-bottom drop-shadow-2xl"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              />
              {/* Desktop label */}
              <motion.div
                className="hidden md:block absolute left-full -ml-[90px] top-[18%]"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-inter whitespace-nowrap drop-shadow-md" style={{ fontWeight: 800 }}>{department.manager}</h3>
                <p className="text-[#081C36] text-lg lg:text-xl font-medium drop-shadow-md">Manager</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Vice Manager (Right) */}
          <motion.div
            style={{ x: parallaxXRight }}
            className="flex items-end z-10 relative w-[50%] md:w-[45%] justify-end h-full -mr-[130px] md:-mr-[194px] lg:-mr-[226px]"
          >
            <div className="h-full w-auto shrink-0 relative">
              {/* Desktop label */}
              <motion.div
                className="hidden md:block absolute right-full -mr-[90px] top-[18%] text-right"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-inter whitespace-nowrap drop-shadow-md" style={{ fontWeight: 800 }}>{department.viceManager}</h3>
                <p className="text-[#081C36] text-lg lg:text-xl font-medium drop-shadow-md">Vice Manager</p>
              </motion.div>
              <motion.img
                src={department.viceManagerImg}
                alt={department.viceManager}
                className="h-full w-auto object-contain object-bottom drop-shadow-2xl"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </motion.div>

          {/* Mobile Labels - positioned near heads like desktop */}
          <div className="md:hidden absolute top-[12%] left-1/2 -translate-x-1/2 flex justify-between items-start z-20 w-full px-[60px]">
            <div className="text-left">
              <h3 className="text-sm font-inter text-[#081C36] drop-shadow-sm" style={{ fontWeight: 800 }}>{department.manager}</h3>
              <p className="text-[#081C36]/50 text-[10px] font-bold uppercase tracking-widest">Manager</p>
            </div>
            <div className="text-right">
              <h3 className="text-sm font-inter text-[#081C36] drop-shadow-sm" style={{ fontWeight: 800 }}>{department.viceManager}</h3>
              <p className="text-[#081C36]/50 text-[10px] font-bold uppercase tracking-widest">Vice Manager</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Group Photo Section */}
      <section ref={groupPhotoRef} className="w-full aspect-video overflow-hidden relative mt-0">
        <div className="w-full h-full relative">
          <motion.img
            style={{ y: parallaxYGroup, scale: 1.3 }}
            src={department.groupImg}
            alt="Team Group"
            className="w-full h-full object-cover shadow-inner"
          />
          <div className="absolute inset-0 bg-[#0C2340]/40" />
        </div>
      </section>

      {/* 3. About Section */}
      <section ref={aboutRef} className="py-24 px-6 lg:px-12 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[480px_1fr] gap-12 lg:gap-16 items-center">
          {/* Left: Decorative Elements */}
          <motion.div
            className="relative flex justify-center lg:justify-start"
            style={{ y: aboutParallaxY }}
          >
            <div className="relative w-full max-w-[480px] aspect-video mb-12 lg:mb-0">
              {/* Main Photo (16:9) */}
              <motion.div
                className="absolute top-0 right-0 w-[85%] aspect-video overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <img src="/about_main.png" alt="Meeting" className="w-full h-full object-cover shadow-2xl" />
              </motion.div>
              {/* Secondary Photo (4:5) */}
              <motion.div
                className="absolute left-0 top-[30%] w-[35%] aspect-[4/5] overflow-hidden"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.4 }}
              >
                <img src="/about_secondary.png" alt="Student Activity" className="w-full h-full object-cover shadow-2xl" />
              </motion.div>
              {/* Logo Overlay */}
              <motion.div
                className="absolute -bottom-8 right-2 md:right-8 w-24 h-24 md:w-32 md:h-32"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <IkammaLogo className="w-full h-full text-white drop-shadow-xl" />
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl flex items-center gap-4 mb-8">
              <div className="w-10 h-1.5 md:w-12 md:h-2 bg-[#081C36] rounded-full shrink-0" />
              <span>
                <span className="font-caslon-italic font-bold">About</span> <span className="font-inter font-bold">{department.name}</span>
              </span>
            </h2>
            <p 
              className="text-[#081C36]/70 text-base md:text-lg lg:text-xl leading-relaxed max-w-3xl text-justify md:text-left"
              dangerouslySetInnerHTML={{ __html: department.description.replace(/\*\*(.*?)\*\*/g, '<span class="text-[#081C36] font-bold font-inter">$1</span>') }}
            />
          </motion.div>
        </div>
      </section>

      {/* 4. Program Kerja Section */}
      <section className="py-24 px-6 lg:px-12 bg-transparent">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-4xl md:text-5xl mb-16 flex items-center gap-4">
            <div className="w-10 h-1.5 md:w-12 md:h-2 bg-[#081C36] rounded-full" />
            <span><span className="font-caslon-italic font-bold" style={{ fontFamily: "'Libre Caslon Text', serif" }}>Program</span> <span className="font-inter font-bold" style={{ fontFamily: "'Inter', sans-serif" }}>Kerja</span></span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
            {department.programs.map((program, idx) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (idx % 2) * 0.1 }}
                whileHover={{ scale: 1.02, x: 6 }}
                className="flex items-center gap-4 group cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-[40px]">
                  <span className="text-[#081C36] font-inter text-2xl group-hover:text-[#081C36]/70 transition-colors duration-300">{idx + 1}</span>
                  <span className="text-[#081C36]/40 font-inter text-2xl">-</span>
                </div>

                <div className="relative flex-1 h-24 md:h-28 overflow-hidden bg-[#f5f7fa] rounded-lg shadow-md border border-[#081C36]/10 group-hover:border-[#081C36]/25 group-hover:shadow-lg transition-all duration-500">
                  <img src={program.img} alt={program.title} className="w-full h-full object-cover opacity-10 group-hover:opacity-15 transition-opacity duration-500" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <h3 className="text-[#081C36] font-semibold text-xl md:text-2xl font-inter">{program.title}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
