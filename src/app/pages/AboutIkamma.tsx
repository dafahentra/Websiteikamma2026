import { Link } from 'react-router';
import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import LogoPutihRaw from '../../assets/LogoIKAMMA/LogoPutih.svg?raw';
import LogoHitamRaw from '../../assets/LogoIKAMMA/LogoHitam.svg?raw';
import { SCRAPBOOK_PHOTOS, DEPT_PHOTOS, ABOUT_BACKGROUND } from '../../assets/photos';
import { departmentsData } from '../../data/departments';
import { CORE_LEADERS, ORGANIZATION_LIST } from '../../data/team';
import BenihSvg from '../../assets/LogoKabinet/Benih.svg';
import BatangSvg from '../../assets/LogoKabinet/Batang.svg';
import TanganSvg from '../../assets/LogoKabinet/Tangan.svg';
import DaunSvg from '../../assets/LogoKabinet/Daun.svg';
import BungaSvg from '../../assets/LogoKabinet/Bunga.svg';
import { Users, Briefcase, ShieldCheck, GraduationCap } from 'lucide-react';

// Extract SVG inner paths
const svgInner = LogoHitamRaw
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

function AboutHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  // Photo shrinking animations - Mapped to more of the scroll for better symmetry up/down
  const photoWidth = useTransform(progress, [0, 0.8], ["100vw", "60vw"]);
  const photoHeight = useTransform(progress, [0, 0.8], ["100vh", "45vh"]);

  // Keep photo perfectly centered vertically
  const photoY = useTransform(progress, [0, 1], ["0vh", "0vh"]);
  const photoRadius = useTransform(progress, [0, 0.6], ["0px", "32px"]); // Subtle rounded corners for a premium feel

  // Overlay fade in (tambalan warna putih) - happens simultaneously with scale
  const overlayOpacity = useTransform(progress, [0, 0.8], [0, 0.35]);

  // Text fade ins - Adjusted to fit the new scroll range
  const bgOpacity = useTransform(progress, [0.2, 0.7], [0, 1]);

  const MarqueeHalf = () => (
    <div className="flex items-center">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex items-center">
          <span className="text-[6vw] md:text-[70px] text-[#081C36]/80 font-inter font-bold tracking-tight mx-4 md:mx-6">
            We Share to Inspire
          </span>
          <span className="w-3 h-3 md:w-5 md:h-5 rounded-full bg-[#081C36]" />
          <span className="text-[6vw] md:text-[70px] text-[#081C36]/80 font-caslon-italic font-bold tracking-tight mx-4 md:mx-6">
            We Share to Inspire
          </span>
          <span className="w-3 h-3 md:w-5 md:h-5 rounded-full bg-[#081C36]" />
        </div>
      ))}
    </div>
  );

  return (
    <div ref={containerRef} className="relative w-full h-[140vh] bg-transparent">
      <div className="sticky top-0 w-full h-screen bg-transparent overflow-hidden">

        {/* Background Marquee Text - 2 Sliders */}
        <motion.div
          className="absolute z-0 w-full top-1/2 -translate-y-1/2 flex flex-col gap-2 md:gap-4 overflow-hidden"
          style={{ opacity: bgOpacity }}
        >
          {/* Slider 1 (Moves Left) */}
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 30, repeat: Infinity }}
            className="flex items-center whitespace-nowrap w-max"
          >
            <MarqueeHalf />
            <MarqueeHalf />
          </motion.div>

          {/* Slider 2 (Moves Right) */}
          <motion.div
            animate={{ x: ["-50%", "0%"] }}
            transition={{ ease: "linear", duration: 35, repeat: Infinity }}
            className="flex items-center whitespace-nowrap w-max"
          >
            <MarqueeHalf />
            <MarqueeHalf />
          </motion.div>
        </motion.div>

        {/* The Photo */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <motion.div
            className="relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] pointer-events-auto origin-center"
            style={{
              width: photoWidth,
              height: photoHeight,
              y: photoY,
              borderRadius: photoRadius
            }}
          >
            <img
              src={SCRAPBOOK_PHOTOS[8]}
              className="w-full h-full object-cover"
              alt="FEB UGM"
            />
            {/* White overlay tint */}
            <motion.div
              className="absolute inset-0 bg-white"
              style={{ opacity: overlayOpacity }}
            />
          </motion.div>
        </div>

      </div>
    </div>
  );
}

const HoverImageRow = ({ item, index, photo }: { item: any, index: number, photo: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const imageX = useSpring(mouseX, springConfig);
  const imageY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const RowContent = (
    <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 py-4 md:py-8 flex items-center justify-between gap-3 md:gap-4">
      <h3 className="font-inter font-bold text-base md:text-3xl text-[#081C36] flex-1 leading-tight">{item.name}</h3>
      <div className="flex items-center gap-4 md:gap-10 shrink-0 relative z-10">
        <span className="px-3 py-1 md:px-8 md:py-2 rounded-full bg-[#081C36] text-white font-inter text-[10px] md:text-base font-medium min-w-[70px] md:min-w-[120px] text-center">
          {item.type}
        </span>
        <svg className="w-5 h-5 md:w-8 md:h-8 text-[#081C36] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="w-full border-b border-[#081C36]/15 group md:hover:bg-white/5 transition-colors cursor-pointer relative"
      onMouseEnter={() => {
        if (window.innerWidth >= 1024) setIsHovered(true);
      }}
      onMouseLeave={() => {
        if (window.innerWidth >= 1024) setIsHovered(false);
      }}
      onMouseMove={(e) => {
        if (window.innerWidth >= 1024) handleMouseMove(e);
      }}
    >
      {item.href ? (
        <Link to={item.href} className="block w-full">
          {RowContent}
        </Link>
      ) : RowContent}

      {/* Floating Image Portal/Overlay - Desktop Only */}
      <motion.div
        className="fixed top-0 left-0 w-[260px] md:w-[400px] aspect-video overflow-hidden pointer-events-none z-50 rounded-2xl md:rounded-[2rem] border-4 border-white shadow-2xl hidden md:block"
        style={{
          x: imageX,
          y: imageY,
          opacity: isHovered ? 1 : 0,
          translateX: "-50%",
          translateY: "-50%"
        }}
        transition={{
          opacity: { duration: 0.2 }
        }}
      >
        <img
          src={photo}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </motion.div>
    </motion.div>
  );
};

// Percentage positions of each part SVG overlaid on the full ArsanaLogo (419x419)
const PART_POSITIONS = [
  { left: '35.9%', top: '73.0%', width: '28.2%', height: '19.8%' },   // Benih (bottom seed)
  { left: '31.9%', top: '31.3%', width: '35.8%', height: '51.3%' },   // Batang (central stem)
  { left: '34.5%', top: '43.5%', width: '30.8%', height: '10.3%' },   // Tangan (hands/ears)
  { left: '4.7%', top: '21.8%', width: '90.7%', height: '47.0%' },   // Daun (leaves, spans wide)
  { left: '24.4%', top: '8.3%', width: '51.3%', height: '28.6%' },   // Bunga (flower/crown top)
];

// Coordinate-based hover detection zones (percentage of logo container)
// Priority order: check smaller/specific parts first
function detectPhiloPart(xPct: number, yPct: number): number {
  // Tangan: the small ear decorations on left and right sides, middle height
  if (yPct > 43 && yPct < 54) {
    if ((xPct > 34 && xPct < 42) || (xPct > 58 && xPct < 66)) return 2;
  }
  // Benih: bottom seed shape
  if (yPct > 72 && xPct > 33 && xPct < 67) return 0;
  // Bunga: top crown/flower
  if (yPct < 32 && xPct > 24 && xPct < 76) return 4;
  // Batang: central stem body
  if (yPct > 30 && yPct < 73 && xPct > 36 && xPct < 64) return 1;
  // Daun: side leaves (left and right wings)
  if (yPct > 20 && yPct < 70) {
    if (xPct < 36 || xPct > 64) return 3;
  }
  return -1;
}

const PHILOSOPHY_DATA = [
  {
    id: "01",
    title: "Benih",
    pron: "[Be·nih]",
    desc: "Melambangkan awal mula setiap individu mahasiswa Manajemen yang menapaki langkah pertama di IKAMMA. Dari benih inilah semangat dan potensi mulai tumbuh.",
    svg: BenihSvg
  },
  {
    id: "02",
    title: "Batang",
    pron: "[Ba·tang]",
    desc: "Menunjukkan IKAMMA sebagai penopang dan sumber kekuatan yang membantu setiap anggotanya untuk tumbuh kokoh. Batang menjadi simbol arah, panduan, dan dukungan yang saling menguatkan.",
    svg: BatangSvg
  },
  {
    id: "03",
    title: "Tangan",
    pron: "[Ta·ngan]",
    desc: "Melambangkan kepercayaan, kebersamaan, dan kolaborasi. Tangan adalah perantara pertumbuhan karena dari kerja sama dan kepercayaan, kita mampu menumbuhkan sesuatu yang lebih besar dari diri sendiri.",
    svg: TanganSvg
  },
  {
    id: "04",
    title: "Daun",
    pron: "[Da·un]",
    desc: "Merepresentasikan perjalanan setiap individu yang mulai berkembang ke arah masing-masing. Setiap daun tumbuh berbeda, namun tetap bersumber dari akar dan batang yang sama.",
    svg: DaunSvg
  },
  {
    id: "05",
    title: "Bunga",
    pron: "[Bu·nga]",
    desc: "Menjadi simbol dari puncak pertumbuhan hasil dari perjalanan panjang yang ditempuh bersama. Bunga adalah wujud tujuan, cita-cita, dan kebermanfaatan yang ingin diwujudkan IKAMMA.",
    svg: BungaSvg
  }
];

export function AboutIkamma() {
  const [activePhilo, setActivePhilo] = useState(-1);
  const [[currentSlide, direction], setPage] = useState([0, 0]);

  const allTeamMembers = [
    ...CORE_LEADERS,
    ...Object.values(departmentsData).flatMap((dept) => [
      { name: dept.manager, role: `Manager\n${dept.name}`, img: dept.managerImg },
      { name: dept.viceManager, role: `Vice Manager\n${dept.name}`, img: dept.viceManagerImg },
    ])
  ];
  const itemsPerSlide = 4;
  const firstSlideItems = 3;
  const totalSlides = 1 + Math.ceil((allTeamMembers.length - firstSlideItems) / itemsPerSlide);

  const currentMembers = currentSlide === 0
    ? allTeamMembers.slice(0, firstSlideItems)
    : allTeamMembers.slice(firstSlideItems + (currentSlide - 1) * itemsPerSlide, firstSlideItems + currentSlide * itemsPerSlide);

  const paginate = (newDirection: number) => {
    let nextSlide = (currentSlide + newDirection) % totalSlides;
    if (nextSlide < 0) nextSlide += totalSlides;
    setPage([nextSlide, newDirection]);
  };

  const jumpToSlide = (index: number) => {
    setPage([index, index > currentSlide ? 1 : -1]);
  };

  const renderTeamMember = (member: { name: string; role: string; img?: string }, i: number, isSlider = false) => {
    let wrapperClass = "flex flex-col items-center text-center shrink-0 w-[45%] md:w-56";

    if (isSlider && currentSlide === 0) {
      if (member.role === "Chairman") {
        wrapperClass = "flex flex-col items-center text-center shrink-0 w-full md:w-56 order-1 md:order-2";
      } else if (i === 0) {
        wrapperClass = "flex flex-col items-center text-center shrink-0 w-[45%] md:w-56 order-2 md:order-1";
      } else {
        wrapperClass = "flex flex-col items-center text-center shrink-0 w-[45%] md:w-56 order-3";
      }
    }
    const innerContent = (
      <>
        <div className="relative w-36 h-36 md:w-44 md:h-44 mb-6 rounded-full">
          {/* Crescent glow at the bottom */}
          <div className="absolute inset-[-3px] rounded-full bg-gradient-to-b from-transparent via-transparent to-white/50 blur-[2px] opacity-80"></div>
          <div className="absolute inset-0 rounded-full overflow-hidden bg-transparent">
            <img src={member.img || SCRAPBOOK_PHOTOS[8]} alt={member.name} className="w-full h-full object-cover object-top" />
          </div>
        </div>
        <h3 className="font-inter font-bold text-xl md:text-2xl text-[#081C36] mb-2">{member.name}</h3>
        <p className="font-inter text-base md:text-lg text-[#081C36] max-w-[150px] leading-tight font-medium whitespace-pre-line">
          {member.role}
        </p>
      </>
    );

    if (isSlider) {
      return (
        <div key={`${member.name}-${i}`} className={wrapperClass}>
          {innerContent}
        </div>
      );
    }

    return (
      <motion.div
        key={`${member.name}-${i}`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: (i % 6) * 0.1 }}
        className={wrapperClass}
      >
        {innerContent}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-white text-[#081C36] flex flex-col relative overflow-x-hidden">
      {/* Global Background Image */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img 
          src={ABOUT_BACKGROUND} 
          alt="Background" 
          className="w-full h-full object-cover opacity-10"
        />
      </div>

      <Navbar />

      <AboutHero />

      <main className="flex-grow relative z-10 max-w-[1400px] mx-auto w-full px-6 md:px-12 bg-transparent">

        {/* Info Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center max-w-[800px] mx-auto pb-32 relative z-20"
          style={{ marginTop: 'calc(50px - 27.5vh)' }} // Precisely 50px gap below the 45vh centered photo
        >
          <IkammaLogo className="w-24 md:w-32 mb-8 text-[#081C36] drop-shadow-md" />
          <p className="text-[#081C36]/80 text-sm md:text-base leading-relaxed mb-4 font-inter font-light drop-shadow-md">
            Ikatan Keluarga Mahasiswa Manajemen (IKAMMA) FEB UGM merupakan sebuah organisasi himpunan mahasiswa Jurusan Manajemen Fakultas Ekonomika dan Bisnis Universitas Gadjah Mada yang dibentuk pada tahun 1984.
          </p>
          <p className="text-[#081C36]/80 text-sm md:text-base leading-relaxed font-inter font-light drop-shadow-md">
            IKAMMA menaungi seluruh mahasiswa Manajemen untuk meningkatkan potensi diri dan pengembangan soft skill. Hal ini dilakukan dengan mengimplementasikan empat basis nilai IKAMMA, yaitu kekeluargaan, profesionalisme, integritas, dan keilmuan
          </p>
        </motion.div>

        {/* Section: Kabinet & Filosofi Logo */}
        <section className="mb-32 pt-16 relative">
          <div className="flex flex-col items-end justify-end mb-16 w-full">
            <div className="flex flex-wrap items-center justify-end gap-3 md:gap-5 text-4xl md:text-6xl lg:text-7xl text-right">
              <span className="text-[#081C36]/50 font-inter font-light">—</span>
              <span className="font-inter font-bold">Kabinet</span>
              <span className="font-caslon-italic text-[#081C36]">Arsanakala</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start min-h-[500px] lg:min-h-[600px]">
            {/* Left side - Text content */}
            <div className="relative min-h-[320px] flex flex-col justify-start pt-4">
              {/* Static header - never fades */}
              <div className="mb-6 lg:mb-10 flex items-center gap-3">
                <span className="text-[#081C36] font-inter text-xl md:text-2xl">01</span>
                <span className="text-[#081C36]/50 text-xl">—</span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#081C36]">
                  <span className="font-caslon-italic">Filosofi</span> <span className="font-inter font-bold">Logo</span>
                </h2>
              </div>

              {/* Animated body content */}
              <div className="min-h-[200px]">
                <AnimatePresence mode="wait">
                  {activePhilo === -1 ? (
                    <motion.div
                      key="intro"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="mb-4 flex items-end gap-3">
                        <h3 className="font-inter font-bold text-4xl md:text-5xl text-[#081C36]">Arsanakala</h3>
                        <span className="font-inter font-light text-2xl md:text-3xl text-[#081C36]/40 pb-1">[Ar·sa·na·ka·la]</span>
                      </div>
                      <p className="font-inter text-xl md:text-2xl leading-relaxed text-[#081C36] max-w-lg font-medium">
                        Kehendak dan daya cipta yang tumbuh seirama, seiring waktu untuk mewujudkan cita.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={`philo-${activePhilo}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="mb-4 flex items-end gap-3">
                        <h3 className="font-inter font-bold text-3xl md:text-5xl">{PHILOSOPHY_DATA[activePhilo].title}</h3>
                        <span className="font-inter font-light text-xl md:text-2xl text-[#081C36]/40 pb-1">{PHILOSOPHY_DATA[activePhilo].pron}</span>
                      </div>
                      <p className="font-inter text-lg md:text-xl leading-relaxed text-[#081C36]/70 max-w-lg">
                        {PHILOSOPHY_DATA[activePhilo].desc}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Right side - Interactive Logo (Hover-based, coordinate detection) */}
            <div className="w-full flex flex-col items-center justify-center gap-8">
              <div
                className="relative w-full max-w-[350px] md:max-w-[420px] lg:max-w-[480px] aspect-square cursor-pointer"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const xPct = ((e.clientX - rect.left) / rect.width) * 100;
                  const yPct = ((e.clientY - rect.top) / rect.height) * 100;
                  const detected = detectPhiloPart(xPct, yPct);
                  setActivePhilo(detected);
                }}
                onMouseLeave={() => setActivePhilo(-1)}
              >
                {/* Part SVG Overlays (compose the full logo together) */}
                {PHILOSOPHY_DATA.map((item, i) => {
                  const pos = PART_POSITIONS[i];
                  const isActive = activePhilo === i;
                  const isIdle = activePhilo === -1;
                  return (
                    <div
                      key={item.id}
                      className="absolute pointer-events-none"
                      style={{
                        left: pos.left,
                        top: pos.top,
                        width: pos.width,
                        height: pos.height,
                      }}
                    >
                      <img
                        src={item.svg}
                        alt={item.title}
                        className="w-full h-full object-contain select-none"
                        draggable={false}
                        style={{
                          transition: 'filter 0.4s ease, opacity 0.4s ease',
                          opacity: isIdle ? 1 : (isActive ? 1 : 0.2),
                          filter: isIdle
                            ? 'grayscale(0)'
                            : (isActive
                              ? 'grayscale(0) drop-shadow(0 0 12px rgba(12,166,120,0.5))'
                              : 'grayscale(1)'),
                        }}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Dots Navigation */}
              <div className="flex items-center gap-3" onMouseLeave={() => setActivePhilo(-1)}>
                {PHILOSOPHY_DATA.map((_, i) => (
                  <button
                    key={i}
                    onMouseEnter={() => setActivePhilo(i)}
                    className={`rounded-full transition-all duration-300 focus:outline-none cursor-pointer ${activePhilo === i ? 'w-3 h-3 bg-[#081C36]' : 'w-2 h-2 bg-[#081C36]/30 hover:bg-[#081C36]/60'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section: Our Vision */}
        <section className="mb-32 flex flex-col items-end text-right">
          <div className="mb-8 flex items-center justify-end gap-3 w-full">
            <span className="text-[#081C36] font-inter text-xl md:text-2xl">02</span>
            <span className="text-[#081C36]/50 text-xl">—</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#081C36]">
              <span className="font-caslon-italic">Our</span> <span className="font-inter font-bold">Vision</span>
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-[600px]"
          >
            <p className="font-inter text-xl md:text-2xl leading-relaxed text-[#081C36]/80">
              Menjadikan IKAMMA sebagai <strong className="text-[#081C36]">himpunan mahasiswa terbaik di Indonesia</strong> melalui penguatan sistem internal untuk memberikan dampak nyata bagi masyarakat manajemen dan masyarakat luas.
            </p>
          </motion.div>
        </section>

        {/* Section: Our Mission */}
        <section className="mb-32">
          <div className="mb-12 flex items-center gap-3 w-full">
            <span className="text-[#081C36] font-inter text-xl md:text-2xl">03</span>
            <span className="text-[#081C36]/50 text-xl">—</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#081C36]">
              <span className="font-caslon-italic">Our</span> <span className="font-inter font-bold">Missions</span>
            </h2>
          </div>

          <div className="flex flex-col gap-4 max-w-4xl">
            {[
              'Mewujudkan lingkungan organisasi yang **profesional dan solid** melalui **penguatan sistem dan SOP.**',
              'Menumbuhkan potensi anggota melalui **apresiasi, pengembangan diri,** serta iklim kerja yang **inklusif dan kolaboratif.**',
              'Menjadi pionir kolaborasi lintas himpunan untuk **memperluas jejaring** dan membangun **citra positif IKAMMA** di tingkat nasional.',
              'Melaksanakan **program kerja yang relevan** dengan kebutuhan mahasiswa manajemen.',
              'Merealisasikan program yang **berdampak langsung bagi masyarakat** untuk memperkuat kontribusi sosial dan kebermanfaatan mahasiswa.'
            ].map((text, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-5 md:p-6 rounded-2xl bg-[#081C36]/[0.02] border border-[#081C36]/10 shadow-lg shadow-[#081C36]/5 hover:bg-[#081C36]/[0.04] hover:border-[#081C36]/15 hover:shadow-xl hover:shadow-[#081C36]/10 transition-all duration-300 flex items-start gap-4"
              >
                <span className="text-[#081C36] font-inter font-bold text-lg mt-0.5 shrink-0">0{i + 1}</span>
                <p className="font-inter text-base md:text-lg leading-relaxed text-[#081C36]/60 text-left" dangerouslySetInnerHTML={{ __html: text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#081C36]">$1</strong>') }} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section: Core Values */}
        <section className="mb-32">
          <div className="mb-16 flex items-center justify-center gap-3">
            <span className="text-[#081C36] font-inter text-xl md:text-2xl">04</span>
            <span className="text-[#081C36]/50 text-xl">—</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#081C36]">
              <span className="font-caslon-italic">Core</span> <span className="font-inter font-bold">Values</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto">
            {[
              { title: 'Kekeluargaan', desc: 'Menjunjung tinggi rasa kebersamaan, saling menghargai, dan kepedulian antaranggota.', icon: Users },
              { title: 'Profesionalitas', desc: 'Menjalankan setiap peran dan tanggung jawab secara disiplin, tepat waktu, dan bertanggung jawab.', icon: Briefcase },
              { title: 'Integritas', desc: 'Menegakkan kejujuran, konsistensi, dan komitmen moral dalam setiap tindakan.', icon: ShieldCheck },
              { title: 'Keilmuan', desc: 'Mendorong pengembangan intelektual dan pemikiran kritis sebagai landasan setiap gerak organisasi.', icon: GraduationCap }
            ].map((value, i) => {
              const Icon = value.icon;
              return (
                <div
                  key={i}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-20 h-20 md:w-28 md:h-28 mb-4 flex items-center justify-center">
                    <Icon className="w-full h-full text-[#081C36]" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-inter font-bold text-lg md:text-xl mb-2 text-[#081C36]">{value.title}</h3>
                  <p className="font-inter text-xs md:text-sm text-[#081C36]/60 leading-relaxed">
                    {value.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section: Our Team */}
        <section className="mb-32 flex flex-col items-end text-right w-full">
          <div className="mb-20 flex items-center justify-end gap-3 w-full">
            <span className="text-[#081C36] font-inter text-xl md:text-2xl">05</span>
            <span className="text-[#081C36]/50 text-xl">—</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#081C36]">
              <span className="font-caslon-italic">Our</span> <span className="font-inter font-bold">Team</span>
            </h2>
          </div>

          <div className="w-full flex flex-col items-center">
            {/* Unified Team Slider */}
            <div className="min-h-[650px] md:min-h-[400px] relative flex items-center justify-center w-full overflow-hidden">
              <AnimatePresence mode="wait" initial={false} custom={direction}>
                <motion.div
                  key={currentSlide}
                  custom={direction}
                  variants={{
                    enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
                    center: { x: 0, opacity: 1 },
                    exit: (dir: number) => ({ x: dir < 0 ? '100%' : '-100%', opacity: 0 }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                  className="absolute w-full flex flex-wrap justify-center gap-8 md:gap-12 will-change-transform"
                >
                  {currentMembers.map((member, i) => renderTeamMember(member, i, true))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slider Controls (Arrows + Small Dots) */}
            <div className="flex items-center gap-6 mt-8 md:mt-12 z-10 relative">
              {/* Prev Arrow */}
              <button
                onClick={() => paginate(-1)}
                className="w-10 h-10 rounded-full border border-[#081C36]/15 flex items-center justify-center text-[#081C36] hover:bg-[#081C36]/10 hover:border-[#081C36]/40 transition-all focus:outline-none"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>

              {/* Small Dots */}
              <div className="flex items-center gap-3">
                {Array.from({ length: totalSlides }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => jumpToSlide(i)}
                    className={`rounded-full transition-all duration-300 focus:outline-none ${currentSlide === i ? 'w-3 h-3 bg-[#081C36]' : 'w-2 h-2 bg-[#081C36]/30 hover:bg-[#081C36]/60'}`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              {/* Next Arrow */}
              <button
                onClick={() => paginate(1)}
                className="w-10 h-10 rounded-full border border-[#081C36]/15 flex items-center justify-center text-[#081C36] hover:bg-[#081C36]/10 hover:border-[#081C36]/40 transition-all focus:outline-none"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </section>

        {/* Section: Our Bureau/Department */}
        <section className="w-full flex flex-col">
          <div className="mb-12 flex items-center justify-end gap-3 w-full">
            <span className="text-[#081C36] font-inter text-xl md:text-2xl">06</span>
            <span className="text-[#081C36]/50 text-xl">—</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#081C36]">
              <span className="font-caslon-italic">Our</span> <span className="font-inter font-bold">Bureau/Department</span>
            </h2>
          </div>

          <div className="w-[100vw] self-center flex flex-col border-t border-[#081C36]/15 mt-8 relative">
            {ORGANIZATION_LIST.map((item, i) => (
              <HoverImageRow key={i} item={item} index={i} photo={DEPT_PHOTOS[i % DEPT_PHOTOS.length]} />
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
