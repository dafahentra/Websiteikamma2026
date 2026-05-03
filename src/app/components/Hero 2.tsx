import { useRef, useEffect, useState, useMemo } from "react";
import { motion, useScroll, useTransform, useMotionTemplate, MotionValue, useSpring } from "motion/react";
import { ArrowRight } from "lucide-react";
import AnimatedButton from "./AnimatedButton";
import LogoPutihRaw from "../../assets/LogoPutih.svg?raw";

import HERO_IMAGE from "../../assets/VidProf.mp4";
import LOGO from "../../assets/LogoPutih.svg";

import { SCRAPBOOK_PHOTOS, HERO_BG } from "../../assets/photos";

const BACKGROUND_IMAGE = HERO_BG;

// A massive scrolling area - shortened further to 6000 to make it more compact
const SECTION_HEIGHT_PX = 6000;

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
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false); // Track if user manually paused

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
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Auto-pause video when scrolled out of view to save performance
  // BUT respect the user's manual pause decision
  useEffect(() => {
    const unsubscribe = progress.on("change", (latest) => {
      if (videoRef.current && !userPaused.current) {
        if (latest > 0.4) {
          videoRef.current.pause();
        } else {
          videoRef.current.play().catch(() => {});
        }
      }
    });
    return () => unsubscribe();
  }, [progress]);

  /* === PHASE 1: Hero Zoom Out === */
  // 0.00 to 0.10
  // Non-linear array creates an exponential deceleration curve for a cinematic landing
  const maskScale = useTransform(
    progress,
    [0.0, 0.015, 0.025, 0.03, 0.035],
    [70, 15, 4, 1.5, 1]
  );
  const maskOpacity = useTransform(progress, [0.0, 0.02], [0, 1]);
  const captionOpacity = useTransform(progress, [0.0, 0.015], [1, 0]);

  /* === PHASE 2: Text turns white & Logo appears === */
  // 0.04 to 0.07
  const whiteLayerOpacity = useTransform(progress, [0.04, 0.07], [0, 1]);
  const logoOpacity = useTransform(progress, [0.04, 0.07], [0, 1]);
  const logoY = useTransform(progress, [0.04, 0.07], ["-24px", "0px"]);

  /* === PHASE 3: Hero Flies Past Camera === */
  // 0.08 to 0.15 (User zooms into the text!)
  // Non-linear array creates an exponential acceleration curve for realistic camera fly-through
  const heroScale = useTransform(
    progress,
    [0.08, 0.10, 0.11, 0.12],
    [1, 3, 12, 40]
  );
  const heroOpacity = useTransform(progress, [0.10, 0.12], [1, 0]);

  // Disable clicks on hero video once we fly past it
  const heroPointerEvents = useTransform(progress, (v: number) => v < 0.12 ? "auto" : "none");

  // Reduced to 12 photos for extreme performance optimization
  const PIONIR_LAYOUT = [
    { x: -28, y: -18, w: 16 }, { x: 32, y: 22, w: 18 }, { x: -12, y: 28, w: 20 },
    { x: 25, y: -25, w: 14 }, { x: 2, y: -36, w: 12 }, { x: -42, y: 8, w: 13 },
    { x: 44, y: -2, w: 12 }, { x: 12, y: 38, w: 16 }, { x: -34, y: 36, w: 12 },
    { x: 36, y: -38, w: 13 }, { x: -6, y: 6, w: 18 }, { x: 18, y: 8, w: 14 }
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
      const startP = 0.12 + (seq * 0.10);

      // Variable duration so some fly slightly faster/slower, adding depth
      const duration = 0.08 + Math.random() * 0.04;
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
  // Spawns after all scrapbook photos have at least started appearing (0.22)
  // Hits full screen (0.40), and then slowly 'elongates' (zooms) to 1.15
  const finalScale = useTransform(progress, [0.22, 0.40, 1.0], [0.15, 1, 1.15]);

  // Fades in and blurs just like the other scrapbook photos
  const finalOpacity = useTransform(progress, [0.22, 0.27], [0, 1]);
  const finalBlur = useTransform(progress, [0.22, 0.27], [10, 0]);
  const finalFilter = useMotionTemplate`blur(${finalBlur}px)`;

  // Parallax effect: A subtle, gentle slow pan up.
  // Parallax effect: A much faster, dramatic upward scroll for the background photo
  const parallaxY = useTransform(progress, [0.40, 1.00], ["0vh", "-50vh"]);

  // The dark overlay ONLY appears at the very end when it becomes the background
  const overlayOpacity = useTransform(progress, [0.35, 0.45], [0, 0.50]);

  // Pointer events control: only allow clicks on content when it's visible
  const contentPointerEvents = useTransform(progress, (v: number) => v > 0.40 ? "auto" : "none");

  /* === PHASE 6: About IKAMMA Content Fades In === */
  // 0.40 to 0.48
  const contentOpacity = useTransform(progress, [0.40, 0.48], [0, 1]);
  // Locomotive scroll effect: starts from 80, settles at 0, then slowly scrolls up to -400px to reveal cut-off content
  const contentY = useTransform(progress, [0.40, 0.48, 0.80], [80, 0, -400]);

  // Display control for the pause indicator: completely hide it after the hero phase
  const indicatorDisplay = useTransform(progress, (v: number) => v < 0.12 ? "flex" : "none");

  // Handle video pause via click - uses a native handler on the sticky container
  const handleVideoPauseClick = (e: React.MouseEvent) => {
    const currentProgress = rawProgress.get();
    
    // Logic: 
    // - If playing: only allow pausing in the hero phase (< 0.12)
    // - If paused: ALWAYS allow unpausing so the user doesn't get stuck
    if (isPlaying && currentProgress > 0.12) return;
    
    // Don't intercept clicks on navigation or other active UI elements
    const target = e.target as HTMLElement;
    if (target.closest('nav') || target.closest('button') || target.closest('a')) return;

    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        userPaused.current = true;
      } else {
        videoRef.current.play().catch(() => {});
        userPaused.current = false;
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: SECTION_HEIGHT_PX }}>
      <div
        className="sticky top-0 w-full h-screen overflow-hidden bg-[#0C2340]"
        style={{ perspective: "1000px" }}
        onClickCapture={handleVideoPauseClick}
      >

        {/* Visual indicators removed to keep the pause feature "secret" as requested */}

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
            className="w-full h-[160vh] object-cover"
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
          className="absolute inset-0 z-50 flex flex-col justify-start md:justify-center w-full pt-[20px] md:pt-[40px] lg:pt-[60px] pb-0 text-left"
          style={{ 
            opacity: contentOpacity, 
            y: contentY,
            pointerEvents: contentPointerEvents 
          }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
              {/* Left Column: What is IKAMMA */}
              <div className="flex flex-col text-left">
                <h2 className="text-white text-3xl md:text-5xl flex items-center justify-start gap-3 mb-4 md:mb-6">
                  <span className="text-white">—</span>
                  <span style={{ fontFamily: "'Libre Caslon Text', serif" }} className="italic font-bold">What is</span>
                  <span style={{ fontFamily: "'Inter', sans-serif" }} className="font-bold">IKAMMA</span>
                </h2>
                <div className="text-white/90 space-y-3 md:space-y-4">
                  <p className="text-sm md:text-lg leading-relaxed">
                    <span className="font-bold italic">Ikatan Keluarga Mahasiswa Manajemen (IKAMMA)</span> merupakan wadah aspirasi dan pengembangan bagi seluruh mahasiswa Manajemen FEB UGM. Kami berfokus pada kolaborasi, inovasi, dan nilai kekeluargaan.
                  </p>
                  <p className="text-sm md:text-lg leading-relaxed hidden sm:block">
                    IKAMMA menaungi seluruh mahasiswa Manajemen untuk meningkatkan potensi diri melalui empat basis nilai: kekeluargaan, profesionalisme, integritas, dan keilmuan.
                  </p>
                  <div className="pt-2 flex justify-start">
                    <AnimatedButton href="/about">
                      See More
                    </AnimatedButton>
                  </div>
                </div>
              </div>

              {/* Right Column: Company Profile */}
              <div className="flex flex-col text-right w-full">
                <h2 className="text-white text-3xl md:text-5xl flex items-center justify-end gap-2 sm:gap-3 mb-4 md:mb-6">
                  <span style={{ fontFamily: "'Inter', sans-serif" }} className="font-bold">Company</span>
                  <span style={{ fontFamily: "'Libre Caslon Text', serif" }} className="italic font-bold">Profile</span>
                  <span className="text-white">—</span>
                </h2>
                <div className="w-full max-w-md ml-auto">
                  <div className="w-full aspect-video bg-[#D9D9D9] rounded-2xl md:rounded-[2rem] shadow-lg mb-2 md:mb-4 relative overflow-hidden pointer-events-auto">
                    <iframe
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/8VO2f7XQ7Tw?rel=0"
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="text-right">
                    <a href="#video" className="text-white hover:text-white/60 transition-colors inline-flex items-center gap-2 text-xs md:text-sm underline underline-offset-4">
                      Click to See Full Video <ArrowRight size={12} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Spacing reduced to mt-4 to bring logos higher */}
          <div className="mt-4 w-full pointer-events-auto">
            <h3 className="text-white text-3xl md:text-5xl font-bold text-center mb-4 md:mb-8 flex items-center justify-center gap-2 md:gap-4">
              <span style={{ fontFamily: "'Libre Caslon Text', serif" }} className="italic font-bold">Our</span>
              <span style={{ fontFamily: "'Inter', sans-serif" }} className="font-bold">Partners</span>
            </h3>
            <div className="w-full overflow-hidden flex whitespace-nowrap">
              <motion.div
                className="flex gap-8 md:gap-16 items-center min-w-fit pr-8 md:pr-16"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ ease: "linear", duration: 30, repeat: Infinity }}
              >
                {[...Array(24)].map((_, i) => (
                  <IkammaLogo key={i} className="w-20 h-20 md:w-32 md:h-32 object-contain opacity-80 hover:opacity-100 transition-opacity flex-shrink-0" />
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
          className="absolute inset-0 z-40 flex items-center justify-center"
          style={{ 
            scale: heroScale, 
            opacity: heroOpacity,
            pointerEvents: heroPointerEvents 
          }}
        >
          {/* Video Layer */}
          <div className="absolute inset-0 z-0">
            <video
              ref={videoRef}
              src={HERO_IMAGE}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
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