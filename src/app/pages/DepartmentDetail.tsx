import { useRef, useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import LogoPutihRaw from '../../assets/LogoIKAMMA/LogoPutih.svg?raw';
import { departmentsData, WorkProgram } from '../../data/departments';

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
 
  const [selectedProgram, setSelectedProgram] = useState<WorkProgram | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
 
  const openModal = (program: WorkProgram) => {
    setSelectedProgram(program);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };
 
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const { scrollYProgress } = useScroll();
  // Parallax effect: images move slightly toward the center as user scrolls down
  const parallaxXLeft = useTransform(scrollYProgress, [0, 0.2], [0, 40]);
  const parallaxXRight = useTransform(scrollYProgress, [0, 0.2], [0, -40]);



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
      <section className="relative w-full min-h-[102vh] flex flex-col items-center pt-[15vh] px-6 lg:px-12 pb-0">
        {/* Title Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center w-full z-20 mb-8"
        >
          <p className="text-[#081C36] font-inter font-medium mb-4 uppercase tracking-widest text-xs md:text-sm">Welcome to</p>
          <h1 className="text-4xl sm:text-5xl md:text-[6vw] lg:text-[7vw] font-inter tracking-tighter max-w-[90vw] text-[#081C36] leading-[0.85] text-center mx-auto" style={{ fontWeight: 800 }}>
            {department.name}
          </h1>
        </motion.div>

        {/* Leaders Layout - Stable fixed heights, pushed to bottom */}
        <div className="relative w-full flex flex-row justify-between items-end h-[320px] md:h-[500px] max-w-[1800px] mx-auto px-0 shrink-0 mt-auto">



          {/* Manager (Left) */}
          <motion.div
            className="flex items-end z-10 relative w-[50%] md:w-[45%] justify-start h-full -ml-[130px] md:-ml-[194px] lg:-ml-[226px]"
          >
            <div className="h-full w-auto shrink-0 relative">
              <motion.img
                style={{ x: parallaxXLeft }}
                src={department.managerImg}
                alt={department.manager}
                className="h-full w-auto object-contain object-bottom drop-shadow-2xl relative z-10"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              />
              {/* Manager Label - Positioned near head but behind */}
              <motion.div
                className="absolute left-[70%] md:left-full ml-[-80px] md:-ml-[90px] top-[15%] md:top-[18%] z-0 max-w-[140px] md:max-w-none -translate-y-[80px] md:translate-y-0"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <a 
                  href={department.managerLinkedIn} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition-colors duration-300 flex items-center gap-2 group/link"
                >
                  <h3 className="text-sm sm:text-base md:text-3xl lg:text-4xl font-inter md:whitespace-nowrap drop-shadow-md text-[#081C36] leading-tight" style={{ fontWeight: 800 }}>{department.manager}</h3>
                  {department.managerLinkedIn && (
                    <ArrowUpRight size={18} className="text-[#081C36]/40 group-hover/link:text-blue-600 transition-colors shrink-0" />
                  )}
                </a>
                <p className="text-[#081C36]/70 text-[8px] sm:text-[9px] md:text-lg lg:text-xl font-medium drop-shadow-md">Manager</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Center Logo Branding */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="absolute left-1/2 bottom-0 -translate-x-1/2 z-20 w-48 h-48 md:w-[450px] md:h-[450px] mb-8 md:mb-12 flex items-center justify-center pointer-events-none"
          >
            <motion.img
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              src={department.logo}
              alt={`${department.name} Logo`}
              className="w-full h-full object-contain"
            />
          </motion.div>

          {/* Vice Manager (Right) */}
          <motion.div
            className="flex items-end z-10 relative w-[50%] md:w-[45%] justify-end h-full -mr-[130px] md:-mr-[194px] lg:-mr-[226px]"
          >
            <div className="h-full w-auto shrink-0 relative">
              {/* Vice Manager Label - Positioned near head but behind */}
              <motion.div
                className="absolute right-[70%] md:right-full mr-[-80px] md:-mr-[90px] top-[15%] md:top-[18%] text-right z-0 max-w-[140px] md:max-w-none -translate-y-[80px] md:translate-y-0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <a 
                  href={department.viceManagerLinkedIn} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition-colors duration-300 flex items-center gap-2 group/link"
                >
                  <h3 className="text-sm sm:text-base md:text-3xl lg:text-4xl font-inter md:whitespace-nowrap drop-shadow-md text-[#081C36] leading-tight" style={{ fontWeight: 800 }}>{department.viceManager}</h3>
                  {department.viceManagerLinkedIn && (
                    <ArrowUpRight size={18} className="text-[#081C36]/40 group-hover/link:text-blue-600 transition-colors shrink-0" />
                  )}
                </a>
                <p className="text-[#081C36]/70 text-[8px] sm:text-[9px] md:text-lg lg:text-xl font-medium drop-shadow-md">Vice Manager</p>
              </motion.div>
              <motion.img
                style={{ x: parallaxXRight }}
                src={department.viceManagerImg}
                alt={department.viceManager}
                className="h-full w-auto object-contain object-bottom drop-shadow-2xl relative z-10"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Group Photo Section */}
      <section ref={groupPhotoRef} className="w-full aspect-video overflow-hidden relative">
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
      <section className="py-24 px-6 lg:px-12 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[480px_1fr] gap-12 lg:gap-16 items-center">
          {/* Left: Decorative Elements */}
          <motion.div
            className="relative flex justify-center lg:justify-start"
          >
            <div className="relative w-full max-w-[480px] aspect-video mb-12 lg:mb-0">
              {/* Main Photo (16:9) */}
              <motion.div
                className="absolute inset-0 overflow-hidden rounded-xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <img src={department.meetingImg} alt="Meeting" className="w-full h-full object-cover shadow-2xl" />
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
            <h2 className="text-[#081C36] text-3xl md:text-4xl lg:text-5xl flex items-center gap-3 mb-8">
              <span className="font-bold">—</span>
              <span>
                <span className="font-caslon-bold-italic">About</span> <span className="font-inter font-bold">{department.name}</span>
              </span>
            </h2>
            <p
              className="text-sky-500 text-base md:text-lg lg:text-xl leading-relaxed max-w-3xl text-justify font-semibold"
              dangerouslySetInnerHTML={{ __html: department.description.replace(/\*\*(.*?)\*\*/g, '<span class="text-[#081C36] font-bold font-inter">$1</span>') }}
            />
          </motion.div>
        </div>
      </section>

      {/* 4. Our Staff Section */}
      <section className="py-24 px-6 lg:px-12 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <h2 className="text-[#081C36] text-4xl md:text-5xl mb-16 flex items-center gap-3">
            <span className="font-bold">—</span>
            <span><span className="font-caslon-bold-italic">Our</span> <span className="font-inter font-bold">Staff</span></span>
          </h2>
 
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 md:gap-8">
            {department.staffs.map((staff, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="group flex flex-col items-center"
              >
                <div className="w-full aspect-[3/4] bg-white overflow-hidden mb-4 relative group-hover:-translate-y-2 transition-all duration-500">
                  {staff.img ? (
                    <img src={staff.img} alt={staff.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-[#081C36]/5 flex items-center justify-center p-8">
                       <IkammaLogo className="w-full h-auto opacity-10 grayscale" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-[#081C36]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <h3 className="text-[#081C36] font-bold text-center text-sm md:text-base lg:text-lg font-inter px-2 line-clamp-2">{staff.name}</h3>
                <p className="text-[#081C36]/50 text-[10px] md:text-xs uppercase tracking-widest mt-1">Staff</p>
              </motion.div>
            ))}
          </div>
 
          {department.staffs.length === 0 && (
            <div className="py-20 text-center border-2 border-dashed border-[#081C36]/10 rounded-3xl">
              <p className="text-[#081C36]/40 font-inter italic text-lg">Staff data will be updated soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* 5. Program Kerja Section */}
      <section className="py-24 px-6 lg:px-12 bg-transparent">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-[#081C36] text-4xl md:text-5xl mb-16 flex items-center gap-3">
            <span className="font-bold">—</span>
            <span><span className="font-caslon-bold-italic">Program</span> <span className="font-inter font-bold">Kerja</span></span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {department.programs.map((program, idx) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (idx % 2) * 0.1 }}
                whileHover={{ scale: 1.02, x: 8 }}
                onClick={() => openModal(program)}
                className="flex items-center gap-4 group cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-[50px]">
                  <span className="text-sky-500 font-inter font-bold text-2xl group-hover:scale-110 transition-transform duration-300">{idx + 1}</span>
                  <span className="text-sky-500/30 font-inter text-2xl font-bold">—</span>
                </div>
 
                <div className="relative flex-1 h-16 md:h-20 overflow-hidden bg-sky-500/5 rounded-xl border border-sky-500/10 group-hover:bg-sky-500/10 group-hover:border-sky-500/30 transition-all duration-500 flex items-center justify-center">
                  <div className="text-[#081C36] font-inter font-bold text-base md:text-xl px-6 text-center">{program.title}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      <Footer />
 
      {/* 6. Program Modal */}
      <AnimatePresence>
        {isModalOpen && selectedProgram && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-[#081C36]/80 backdrop-blur-md"
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[2rem] overflow-hidden shadow-2xl z-10 p-8 md:p-12 flex flex-col items-center text-center"
            >
              {/* Close Button */}
              <button 
                onClick={closeModal}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#081C36]/5 flex items-center justify-center hover:bg-[#081C36]/10 transition-colors group"
              >
                <svg className="w-5 h-5 text-[#081C36] group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <p className="text-sky-500 text-xs uppercase tracking-widest mb-2 font-inter font-bold">Program Kerja</p>
              <div className="text-3xl md:text-4xl font-inter font-bold text-[#081C36] mb-6 leading-tight">
                {selectedProgram.title}
              </div>
              <div className="w-12 h-1.5 bg-sky-500/20 rounded-full mb-8" />
              <p className="text-[#081C36]/70 text-lg leading-relaxed font-inter max-w-lg">
                {selectedProgram.description}
              </p>

              <div className="mt-12">
                 <IkammaLogo className="w-16 h-auto opacity-5" />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
