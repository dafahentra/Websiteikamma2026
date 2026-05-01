import { useRef, useEffect, useState, useMemo } from "react";
import { motion, useScroll, useTransform, useMotionTemplate, MotionValue, useSpring } from "motion/react";
import { ArrowRight } from "lucide-react";
import LogoPutihRaw from "../../assets/LogoPutih.svg?raw";

const HERO_IMAGE =
  "/src/assets/VidProf.mp4";
const LOGO = "/src/assets/LogoPutih.svg";
const BACKGROUND_IMAGE = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2000&auto=format&fit=crop";

import { SCRAPBOOK_PHOTOS } from "../../assets/photos";

// A massive scrolling area to accommodate the grand unified sequence
const SECTION_HEIGHT_PX = 14000;

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

function FlyingPhoto({
  src,
  progress,
  cfg
}: {
  src: string,
  progress: MotionValue<number>,
  cfg: { xStart: number, yStart: number, widthVW: number, startP: number, exitP: number, zIndex: number }
}) {
  const { xStart, yStart, widthVW, startP, exitP, zIndex: configZIndex } = cfg;

  // Real 3D Z translation
  const z = useTransform(progress, [startP, exitP], [-3000, 1500]);

  const duration = exitP - startP;
  const fadeInEnd = startP + duration * 0.25;
  const opacity = useTransform(progress, [startP, fadeInEnd], [0, 1]);

  // PERFORMANCE OPTIMIZATION: 
  // Continuously applying 'blur(0px)' forces the browser to keep the image in the expensive filter pipeline.
  // By returning 'none' when the blur is finished, we free up massive amounts of GPU memory!
  const blurValue = useTransform(progress, [startP, fadeInEnd], [10, 0]);
  const filter = useMotionTemplate`${blurValue}px`;
  const optimizedFilter = useTransform(filter, (v) => parseFloat(v) > 0.1 ? `blur(${v})` : "none");

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: "50%",
        top: "50%",
        x: `${xStart * 4}vw`,
        y: `${yStart * 4}vh`,
        z,
        opacity,
        zIndex: configZIndex, // Explicitly place older photos above newer ones
        willChange: "transform, opacity" // GPU Acceleration hint
      }}
    >
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 aspect-[4/3] rounded-md shadow-[0_20px_40px_rgba(0,0,0,0.6)] overflow-hidden"
        style={{ width: `${widthVW * 4}vw` }}
      >
        <img
          src={src}
          alt="Scrapbook Memory"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
        />
        {/* We apply the filter to a separate motion div or directly to the wrapper if possible. Actually, applying it to a wrapper is fine, but motion.div requires it. */}
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none bg-transparent"
          style={{ backdropFilter: optimizedFilter, willChange: "backdrop-filter" }}
        />
      </div>
    </motion.div>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerTop, setContainerTop] = useState(0);

  useEffect(() => {
    function measure() {
      if (containerRef.current) {
        setContainerTop(containerRef.current.offsetTop);
      }
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollY } = useScroll();

  const rawProgress = useTransform(
    scrollY,
    [containerTop, containerTop + SECTION_HEIGHT_PX],
    [0, 1],
    { clamp: true }
  );

  // Apply a smooth spring physics wrapper to eliminate rigid mouse-wheel tick stiffness
  const progress = useSpring(rawProgress, {
    stiffness: 150,
    damping: 35,
    restDelta: 0.001
  });

  /* === PHASE 1: Hero Zoom Out === */
  // 0.00 to 0.10
  // Non-linear array creates an exponential deceleration curve for a cinematic landing
  const maskScale = useTransform(
    progress,
    [0.0, 0.04, 0.07, 0.09, 0.10],
    [70, 15, 4, 1.5, 1]
  );
  const maskOpacity = useTransform(progress, [0.0, 0.05], [0, 1]);
  const captionOpacity = useTransform(progress, [0.0, 0.02], [1, 0]);

  /* === PHASE 2: Text turns white & Logo appears === */
  // 0.10 to 0.15
  const whiteLayerOpacity = useTransform(progress, [0.10, 0.15], [0, 1]);
  const logoOpacity = useTransform(progress, [0.10, 0.15], [0, 1]);
  const logoY = useTransform(progress, [0.10, 0.15], ["-24px", "0px"]);

  /* === PHASE 3: Hero Flies Past Camera === */
  // 0.25 to 0.35 (User zooms into the text!)
  // Non-linear array creates an exponential acceleration curve for realistic camera fly-through
  const heroScale = useTransform(
    progress,
    [0.25, 0.30, 0.33, 0.35],
    [1, 3, 12, 40]
  );
  const heroOpacity = useTransform(progress, [0.30, 0.35], [1, 0]);

  // Reduced layout to 25 photos for better balance and performance
  const PIONIR_LAYOUT = [
    { x: -28, y: -18, w: 16 }, // Main top left
    { x: 32, y: 22, w: 18 },   // Main bottom right
    { x: -12, y: 28, w: 20 },  // Main bottom left
    { x: 25, y: -25, w: 14 },  // Secondary top right
    { x: 2, y: -36, w: 12 },   // Small top center
    { x: -42, y: 8, w: 13 },   // Small far left
    { x: 44, y: -2, w: 12 },   // Small far right
    { x: 12, y: 38, w: 16 },   // Secondary bottom center
    { x: -34, y: 36, w: 12 },  // Small bottom far left
    { x: 36, y: -38, w: 13 },  // Small top far right
    { x: -6, y: 6, w: 18 },    // Center left
    { x: 18, y: 8, w: 14 },    // Center right

    { x: -45, y: -30, w: 11 }, // Far Top Left
    { x: 45, y: -25, w: 14 },  // Far Top Right
    { x: -20, y: -38, w: 15 }, // Mid-Top Left
    { x: 15, y: -42, w: 13 },  // Mid-Top Right
    { x: -46, y: 25, w: 16 },  // Far Bottom Left
    { x: 42, y: 38, w: 12 },   // Far Bottom Right
    { x: -25, y: 12, w: 14 },  // Inner Mid Left
    { x: 22, y: -5, w: 17 },   // Inner Mid Right
    { x: -5, y: -15, w: 19 },  // Inner Top Center
    { x: 5, y: 25, w: 15 },    // Inner Bottom Center

    { x: -52, y: -15, w: 10 }, // Extreme Left
    { x: 52, y: 10, w: 11 },   // Extreme Right
  ];

  const photoConfigs = useMemo(() => {
    // We shuffle the layout array deterministically so they pop up randomly across the screen
    // rather than left-to-right, making the "1 by 1" appearance feel much more dynamic!
    const shuffledLayout = [...PIONIR_LAYOUT].sort((a, b) => (a.x * a.y) % 3 - 1);

    const configs = [];
    for (let i = 0; i < shuffledLayout.length; i++) {
      const { x: xStart, y: yStart, w: widthVW } = shuffledLayout[i];

      // Sequential appearance: strict 1-by-1 staggered timeline
      const seq = i / shuffledLayout.length;
      const startP = 0.35 + (seq * 0.30);

      // Variable duration so some fly slightly faster/slower, adding depth
      const duration = 0.12 + Math.random() * 0.05;
      const exitP = startP + duration;

      configs.push({
        xStart,
        yStart,
        widthVW,
        startP,
        exitP,
        srcIndex: i % SCRAPBOOK_PHOTOS.length,
        zIndex: 100 - i // Older photos (lower i) get a higher z-index to stay on top!
      });
    }
    return configs;
  }, []);

  /* === PHASE 5: Background Photo === */
  // Spawns during the scrapbook phase (0.55), hits full screen (0.75), 
  // and then slowly 'elongates' (zooms) to 1.1 for a cinematic effect until the end.
  const finalScale = useTransform(progress, [0.55, 0.75, 1.0], [0.15, 1, 1.15]);

  // Fades in and blurs just like the other scrapbook photos
  const finalOpacity = useTransform(progress, [0.55, 0.60], [0, 1]);
  const finalBlur = useTransform(progress, [0.55, 0.60], [10, 0]);
  const finalFilter = useMotionTemplate`blur(${finalBlur}px)`;

  // Parallax effect: A subtle, gentle slow pan up.
  const parallaxY = useTransform(progress, [0.85, 1.00], ["0vh", "-10vh"]);

  /* === PHASE 6: About IKAMMA Content Fades In === */
  // 0.75 to 0.85
  const contentOpacity = useTransform(progress, [0.75, 0.85], [0, 1]);
  const contentY = useTransform(progress, [0.75, 0.85], [80, 0]);

  // The dark overlay ONLY appears at the very end when it becomes the background
  const overlayOpacity = useTransform(progress, [0.70, 0.80], [0, 0.50]);

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: SECTION_HEIGHT_PX }}>
      <div
        className="sticky top-0 w-full h-screen overflow-hidden bg-[#0C2340]"
        style={{ perspective: "1000px" }}
      >

        {/* === PHASE 5 & 6: Final Background and Content === */}
        {/* Placed lowest in the DOM so it's behind flying photos */}
        <motion.div
          className="absolute z-0 flex items-start justify-center overflow-hidden shadow-2xl"
          style={{
            width: "100vw",
            height: "100vh",
            scale: finalScale,
            opacity: finalOpacity,
          }}
        >
          <motion.img
            src={BACKGROUND_IMAGE}
            alt="Background"
            className="w-full h-[130vh] object-cover"
            style={{
              filter: finalFilter,
              y: parallaxY
            }}
          />
          <motion.div
            className="absolute inset-0 bg-black"
            style={{ opacity: overlayOpacity }}
          />
        </motion.div>

        {/* === PHASE 6: Content === */}
        <motion.div
          className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-start md:justify-center w-full pt-[12vh] md:pt-20 pb-[4vh] md:pb-[8vh]"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          {/* Main Content inside restricted width */}
          <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full flex flex-col gap-4 md:gap-10 pointer-events-auto">
            <h2 className="text-white text-3xl md:text-5xl flex items-center gap-3">
              <span className="text-[#081C36]">—</span>
              <span style={{ fontFamily: "'Libre Caslon Text', serif" }} className="italic font-bold">What is</span>
              <span style={{ fontFamily: "'Inter', sans-serif" }} className="font-bold">IKAMMA</span>
            </h2>

            {/* Changed from items-start to items-center to make the Company Profile vertically centered! */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 lg:gap-16 items-center">
              <div className="text-white/90 space-y-3 md:space-y-6">
                <p className="text-sm md:text-lg leading-relaxed text-justify">
                  <span className="font-bold italic">Ikatan Keluarga Mahasiswa Manajemen (IKAMMA)</span> merupakan sebuah organisasi himpunan mahasiswa Program Studi Manajemen di Fakultas Ekonomika dan Bisnis Universitas Gadjah Mada yang dibentuk pada tahun 1984.
                </p>
                <p className="text-sm md:text-lg leading-relaxed text-justify hidden sm:block">
                  IKAMMA menaungi seluruh mahasiswa Manajemen untuk meningkatkan potensi diri dan pengembangan soft skill. Hal ini dilakukan dengan mengimplementasikan empat basis nilai IKAMMA, yaitu kekeluargaan, profesionalisme, integritas, dan keilmuan.
                </p>
                <div className="pt-2 md:pt-4">
                  <a
                    href="#about-more"
                    className="inline-flex items-center gap-2 bg-[#081C36] hover:bg-[#0a2545] text-white px-4 py-2 md:px-6 md:py-2.5 rounded-full text-sm md:text-base font-medium transition-colors"
                  >
                    <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                    See More
                    <ArrowRight size={16} className="md:w-[18px] md:h-[18px]" />
                  </a>
                </div>
              </div>

              <div className="flex flex-col items-start lg:items-end w-full">
                <div className="w-full max-w-md ml-auto">
                  <div className="inline-block bg-[#081C36] px-3 py-1 md:px-4 md:py-1.5 mb-3 md:mb-5 shadow-md">
                    <h3 className="text-white text-lg md:text-2xl font-black tracking-wide uppercase">Company Profile</h3>
                  </div>

                  {/* Embedded YouTube Player */}
                  <div className="w-full aspect-video rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl mb-2 md:mb-4 bg-black/50 border border-white/10">
                    <iframe
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/8VO2f7XQ7Tw?rel=0"
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    ></iframe>
                  </div>

                  <div className="text-right">
                    <a href="#video" className="text-white hover:text-[#081C36] transition-colors inline-flex items-center gap-2 text-xs md:text-sm underline underline-offset-4">
                      Click to See Full Video <ArrowRight size={12} className="md:w-[14px] md:h-[14px]" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Our Partners outside container wrapper to bleed edge-to-edge! */}
          <div className="mt-6 md:mt-12 w-full pointer-events-auto">
            <h3 className="text-white text-xl md:text-3xl font-bold text-center mb-4 md:mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>Our Partners</h3>
            {/* Infinite Marquee Container */}
            <div className="w-full overflow-hidden flex whitespace-nowrap">
              <motion.div
                className="flex gap-8 md:gap-16 items-center min-w-fit pr-8 md:pr-16"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ ease: "linear", duration: 30, repeat: Infinity }}
              >
                {/* We render 12 logos twice (24 total) to create a perfect, seamless endless loop! */}
                {[...Array(24)].map((_, i) => (
                  <IkammaLogo key={i} className="w-16 h-16 md:w-24 md:h-24 object-contain opacity-80 hover:opacity-100 transition-opacity flex-shrink-0" />
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* === PHASE 4: 50 Flying Scrapbook Photos === */}
        {photoConfigs.map((cfg, i) => (
          <FlyingPhoto
            key={i}
            src={SCRAPBOOK_PHOTOS[cfg.srcIndex]}
            progress={progress}
            cfg={cfg}
          />
        ))}

        {/* === PHASE 1, 2 & 3: Hero Initial State === */}
        <motion.div
          className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
          style={{ scale: heroScale, opacity: heroOpacity }}
        >
          {/* Photo behind the mask */}
          <div className="absolute inset-0 z-0">
            <img src={HERO_IMAGE} alt="Graduation" className="w-full h-full object-cover" />
            <motion.div
              className="absolute inset-0 bg-white"
              style={{ opacity: whiteLayerOpacity }}
            />
          </div>

          {/* SVG Mask Layer */}
          <motion.div
            className="absolute inset-0 z-10"
            style={{ scale: maskScale, opacity: maskOpacity }}
          >
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <mask id="textMask">
                  <rect width="100%" height="100%" fill="white" />
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="black"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 700,
                      fontStyle: "italic",
                      fontSize: "clamp(2rem, 8vw, 7rem)",
                      letterSpacing: "-0.045em",
                    }}
                  >
                    #WeShareToInspire
                  </text>
                </mask>
              </defs>
              <rect width="100%" height="100%" fill="#0C2340" mask="url(#textMask)" />
            </svg>
          </motion.div>

          {/* Logo above text */}
          <motion.div
            className="absolute z-30 w-full flex justify-center pointer-events-none"
            style={{
              opacity: logoOpacity,
              y: logoY,
              bottom: "calc(50% + clamp(1rem, 4vw, 3.5rem) + 50px)"
            }}
          >
            <img src={LOGO} alt="IKAMMA Logo" className="w-28 md:w-40 object-contain" />
          </motion.div>

        </motion.div>

      </div>
    </div>
  );
}