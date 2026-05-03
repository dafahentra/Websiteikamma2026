import { useRef, useEffect, useState, useMemo } from "react";
import { motion, useScroll, useTransform, useMotionTemplate, MotionValue, useSpring } from "motion/react";
import { ArrowRight } from "lucide-react";
import AnimatedButton from "./AnimatedButton";
import LogoPutihRaw from "../../assets/LogoIKAMMA/LogoPutih.svg?raw";

import HERO_IMAGE from "../../assets/Background/VidProf.mp4";
import LOGO from "../../assets/LogoIKAMMA/LogoPutih.svg";
import { supabase } from "../../lib/supabase";

import { SCRAPBOOK_PHOTOS, HERO_BG } from "../../assets/photos";

const BACKGROUND_IMAGE = HERO_BG;

// A massive scrolling area to accommodate the grand unified sequence
// SECTION_HEIGHT_PX removed in favor of dynamic state inside Hero component

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
  const [sectionHeight, setSectionHeight] = useState(3000);
  const [videoUrl, setVideoUrl] = useState("https://www.youtube.com/watch?v=8VO2f7XQ7Tw");
  const [isCompanyVideoPlaying, setIsCompanyVideoPlaying] = useState(false);

  // Helper to convert YouTube URL to Embed URL
  const getEmbedUrl = (url: string) => {
    let videoId = "";
    if (url.includes("v=")) {
      videoId = url.split("v=")[1]?.split("&")[0];
    } else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0];
    } else if (url.includes("embed/")) {
      videoId = url.split("embed/")[1]?.split("?")[0];
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}?rel=0` : url;
  };

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase.from('site_settings').select('company_profile_video_url').eq('id', 1).single();
      if (data?.company_profile_video_url) setVideoUrl(data.company_profile_video_url);
    };
    fetchSettings();
  }, []);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    setSectionHeight(isMobile ? 6000 : 6000); //yang pertama itu mobile, yang kedua itu desktop
  }, []);

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
    [containerTop, containerTop + sectionHeight],
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
          videoRef.current.play().catch(() => { });
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

  // The dark overlay ONLY appears at the very end when it becomes the background
  const overlayOpacity = useTransform(progress, [0.35, 0.45], [0, 0.70]);

  // Pointer events control: only allow clicks on content when it's visible
  const contentPointerEvents = useTransform(progress, (v: number) => v > 0.40 ? "auto" : "none");

  /* === PHASE 6: About IKAMMA Content Fades In === */
  // 0.40 to 0.48
  const contentOpacity = useTransform(progress, [0.40, 0.48], [0, 1]);
  // Locomotive scroll effect: starts from 80, settles at 0, then slowly scrolls up to -400px to reveal cut-off content
  const contentY = useTransform(progress, [0.40, 0.55, 0.85], [80, 0, -80]);

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: sectionHeight }}>
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
            className="w-full h-[100vh] object-cover"
            style={{
              filter: finalFilter
            }}
          />
          <motion.div
            className="absolute inset-0 bg-black"
            style={{ opacity: overlayOpacity }}
          />
        </motion.div>

        {/* === PHASE 6: Content === */}
        <motion.div
          className="absolute inset-0 z-50 flex flex-col justify-start md:justify-center w-full pt-[80px] md:pt-[110px] lg:pt-[130px] pb-[4vh] md:pb-[6vh] text-left"
          style={{
            opacity: contentOpacity,
            y: contentY,
            pointerEvents: contentPointerEvents
          }}
        >
          {/* Main Content inside restricted width - Mobile: pt-[21px] (moved up another 50px), Desktop: pt-[101px] */}
          <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full flex flex-col pointer-events-auto pt-[0px] md:pt-[51px]">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
              {/* Left Column */}
              <div className="flex flex-col text-left">
                <h2 className="text-white text-3xl md:text-5xl flex items-center justify-start gap-3 mb-4 md:mb-8">
                  <span className="text-white">—</span>
                  <span style={{ fontFamily: "'Libre Caslon Text', serif" }} className="italic font-bold">What is</span>
                  <span style={{ fontFamily: "'Inter', sans-serif" }} className="font-bold">IKAMMA</span>
                </h2>
                <div className="text-white/90 space-y-3 md:space-y-6">
                  <p className="text-sm md:text-lg leading-relaxed">
                    <span className="font-bold italic">Ikatan Keluarga Mahasiswa Manajemen (IKAMMA)</span> merupakan sebuah organisasi himpunan mahasiswa Program Studi Manajemen di Fakultas Ekonomika dan Bisnis Universitas Gadjah Mada yang dibentuk pada tahun 1984.
                  </p>
                  <p className="text-sm md:text-lg leading-relaxed hidden sm:block">
                    IKAMMA menaungi seluruh mahasiswa Manajemen untuk meningkatkan potensi diri dan pengembangan soft skill. Hal ini dilakukan dengan mengimplementasikan empat basis nilai IKAMMA, yaitu kekeluargaan, profesionalisme, integritas, dan keilmuan.
                  </p>
                  <div className="pt-2 md:-mt-[25px] flex justify-start">
                    <AnimatedButton href="/about">
                      See More
                    </AnimatedButton>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="flex flex-col text-right w-full">
                <h2 className="text-white text-3xl md:text-5xl flex items-center justify-end gap-2 sm:gap-3 mb-4 md:mb-8">
                  <span style={{ fontFamily: "'Inter', sans-serif" }} className="font-bold">Company</span>
                  <span style={{ fontFamily: "'Libre Caslon Text', serif" }} className="italic font-bold">Profile</span>
                  <span className="text-white">—</span>
                </h2>
                <div className="w-full max-w-md ml-auto">
                  {/* Embedded YouTube Player */}
                  <div className="w-full aspect-video bg-[#D9D9D9] rounded-2xl md:rounded-[2rem] shadow-lg mb-2 md:mb-4 relative overflow-hidden">
                    <iframe
                      className="w-full h-full"
                      src={getEmbedUrl(videoUrl)}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    ></iframe>
                  </div>

                  <div className="text-right">
                    <a href={videoUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#081C36] transition-colors inline-flex items-center gap-2 text-xs md:text-sm underline underline-offset-4">
                      Click to See Full Video <ArrowRight size={12} className="md:w-[14px] md:h-[14px]" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Spacing adjusted to 40px (mt-10) from content above */}
          <div className="mt-10 w-full pointer-events-auto">
            <h3 className="text-white text-3xl md:text-5xl font-bold text-center mb-6 md:mb-10 flex items-center justify-center gap-2 md:gap-4">
              <span style={{ fontFamily: "'Libre Caslon Text', serif" }} className="italic font-bold">Our</span>
              <span style={{ fontFamily: "'Inter', sans-serif" }} className="font-bold">Partners</span>
            </h3>
            {/* Infinite Marquee Container */}
            <div className="w-full overflow-hidden flex whitespace-nowrap">
              <motion.div
                className="flex gap-8 md:gap-16 items-center min-w-fit pr-8 md:pr-16"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ ease: "linear", duration: 30, repeat: Infinity }}
              >
                {/* We render 12 logos twice (24 total) to create a perfect, seamless endless loop! */}
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