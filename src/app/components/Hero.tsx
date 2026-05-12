import { useRef, useEffect, useState, useMemo } from "react";
import { motion, useScroll, useTransform, useMotionTemplate, MotionValue, useSpring } from "motion/react";
import { ArrowRight } from "lucide-react";
import AnimatedButton from "./AnimatedButton";
import LogoPutihRaw from "../../assets/LogoIKAMMA/LogoPutih.svg?raw";

import HERO_IMAGE from "../../assets/Background/VidProf.mp4";
import HERO_VIDEO_WEBM from "../../assets/Background/VidProf.webm";
import LOGO from "../../assets/LogoIKAMMA/LogoPutih.svg";
import { supabase } from "../../lib/supabase";

import { SCRAPBOOK_PHOTOS, HERO_BG } from "../../assets/photos";

import antamLogo from "../../assets/logopartner/LogoAntam.webp";
import bniLogo from "../../assets/logopartner/LogoBNI.webp";
import ekisLogo from "../../assets/logopartner/LogoEkis.webp";
import lpsLogo from "../../assets/logopartner/LogoLPS.webp";
import marketeersLogo from "../../assets/logopartner/LogoMarketeers.webp";
import paragonLogo from "../../assets/logopartner/LogoParagon.webp";
import sarirotiLogo from "../../assets/logopartner/LogoSariRoti.webp";
import telkomLogo from "../../assets/logopartner/LogoTelkom.webp";

const partnerLogos = [
  antamLogo,
  bniLogo,
  ekisLogo,
  lpsLogo,
  marketeersLogo,
  paragonLogo,
  sarirotiLogo,
  telkomLogo
];

const BACKGROUND_IMAGE = HERO_BG;

// A massive scrolling area to accommodate the grand unified sequence
// SECTION_HEIGHT_PX removed in favor of dynamic state inside Hero component

const svgInner = LogoPutihRaw
  .replace(/<\?xml[^>]*\?>/g, '')
  .replace(/<svg[^>]*>/g, '')
  .replace(/<\/svg>/g, '')
  .replace(/fill="[^"]*"/g, 'fill="black"')
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
          decoding="async"
          className="w-full h-full object-cover"
        />
      </div>
    </motion.div>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerTop, setContainerTop] = useState(0);
  const [windowHeight, setWindowHeight] = useState(1000);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false); // Track if user manually paused
  const [sectionHeight, setSectionHeight] = useState(2000);
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

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    setSectionHeight(mobile ? 2400 : 3500); // Snappier scroll on mobile, majestic on desktop
  }, []);

  // Responsive Timings (Optimized for high-performance feel)
  const tP1End = isMobile ? 0.12 : 0.16;    // Text fade/zoom finishes sooner
  const tP2Start = isMobile ? 0.08 : 0.12;  // White cut starts sooner
  const tP3End = isMobile ? 0.24 : 0.35;    // Fly-through finishes MUCH sooner
  // Photos start at 90% through the hero animation-out so no empty gap remains.
  // We replicate tP3FadeStart logic here (it's defined again below for transforms):
  const _flyDur = tP3End - tP1End;
  const _tP3FadeEnd = tP1End + _flyDur * 0.8;
  const _tP3FadeStart = Math.max(tP1End, _tP3FadeEnd - 0.10);
  // Start photos right at the 90% point of the hero fade-out
  const tP4Start = _tP3FadeStart;

  // Increased spread for a clear "one-by-one" staggered effect
  const tP4Spread = isMobile ? 0.28 : 0.22;
  const tP4End = tP4Start + tP4Spread;

  // Background photo starts earlier to overlap, but settles EXACTLY after the last photo exits
  const tP5Start = tP4Start + (tP4Spread * 0.5);
  const tP5EndOpacity = tP5Start + 0.10;
  const tP5EndScale = tP4End + 0.05; // Settles right after flyover photos are gone

  // Content appears shortly after background settles
  const tP6Start = tP5EndScale + 0.02;

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => { });
        userPaused.current = false;
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        userPaused.current = true;
        setIsPlaying(false);
      }
    }
  };

  useEffect(() => {
    function measure() {
      if (containerRef.current) {
        setContainerTop(containerRef.current.offsetTop);
      }
      setWindowHeight(window.innerHeight);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollY } = useScroll();

  // We map the scroll so that the background photo finishes scaling JUST BEFORE the container unpins.
  // We subtract a small buffer (windowHeight * 0.15) to give the `useSpring` physics just enough time to catch up.
  // This guarantees the photo is fully full-screen precisely as the Curved Divider peeks, without causing a noticeable delay.
  const rawProgress = useTransform(
    scrollY,
    [
      containerTop,
      containerTop + sectionHeight - windowHeight - (windowHeight * 0.15),
      containerTop + sectionHeight
    ],
    [
      0,
      tP5EndScale,
      1.0
    ],
    { clamp: true }
  );

  // Apply a snappy spring physics wrapper to eliminate rigid stiffness and feel ultra-responsive
  const progress = useSpring(rawProgress, {
    stiffness: 150,
    damping: 25,
    restDelta: 0.001
  });

  // Auto-pause video when scrolled out of view to save performance
  // BUT respect the user's manual pause decision
  useEffect(() => {
    const unsubscribe = progress.on("change", (latest) => {
      if (videoRef.current && !userPaused.current) {
        if (latest > tP1End) {
          videoRef.current.pause();
        } else {
          videoRef.current.play().catch(() => { });
        }
      }
    });
    return () => unsubscribe();
  }, [progress]);

  /* === PHASE 1: Hero Zoom Out === */
  // Smooth single-motion mask zoom using exponential decay
  const maskScale = useTransform(progress, (p) => {
    if (p <= 0) return 70;
    if (p >= tP1End) return 1;
    const t = p / tP1End; // normalize to 0..1
    return 70 * Math.pow(1 / 70, t); // smooth exponential zoom
  });
  const maskOpacity = useTransform(progress, [0.0, 0.05], [0, 1]);
  const captionOpacity = useTransform(progress, [0.0, 0.05], [1, 0]);
  const scrollIndicatorOpacity = useTransform(progress, [0.0, 0.03], [1, 0]);

  // Slide-up exit: after zoom-in finishes, mask slides up and out of view
  const maskY = useTransform(progress, [tP1End, tP3End], ["0vh", "-60vh"]);

  /* === PHASE 2: Text turns white === */
  // Accelerated cut to white
  const flyThroughDuration = tP3End - tP1End;
  const tP3FadeEnd = tP1End + (flyThroughDuration * 0.8);
  const tP3FadeStart = Math.max(tP1End, tP3FadeEnd - 0.10);

  const whiteLayerOpacity = useTransform(progress, [tP2Start, tP1End, tP3FadeStart, tP3FadeEnd], [0, 1, 1, 0]);

  /* === PHASE 3: Hero Flies Past Camera === */
  // Slower camera fly-through (Smooth exponential zoom)
  const heroScale = useTransform(progress, (p) => {
    if (p <= tP1End) return 1;
    if (p >= tP3End) return 40;
    const t = (p - tP1End) / (tP3End - tP1End); // normalize to 0..1
    return Math.pow(40, t); // smooth exponential zoom
  });
  const heroOpacity = useTransform(progress, [tP3FadeStart, tP3FadeEnd], [1, 0]);
  const heroDisplay = useTransform(progress, (v: number) => v >= tP3FadeEnd ? "none" : "flex");

  // Disable clicks on hero video once it turns white and pauses
  const heroPointerEvents = useTransform(progress, (v: number) => v < tP1End ? "auto" : "none");

  // Reduced to 12 photos for extreme performance optimization
  const PIONIR_LAYOUT = [
    { x: -28, y: -18, w: 16 }, { x: 32, y: 22, w: 18 }, { x: -12, y: 28, w: 20 },
    { x: 25, y: -25, w: 14 }, { x: 2, y: -36, w: 12 }, { x: -42, y: 8, w: 13 },
    { x: 44, y: -2, w: 12 }, { x: 12, y: 38, w: 16 }, { x: -34, y: 36, w: 12 },
    { x: 36, y: -38, w: 13 }, { x: -6, y: 6, w: 18 }, { x: 18, y: 8, w: 14 },
    { x: -48, y: -32, w: 15 }, { x: 15, y: -15, w: 17 }, { x: -20, y: 42, w: 14 }
  ];

  const photoConfigs = useMemo(() => {
    // Gunakan 15 foto di desktop dan 12 foto di mobile untuk performa
    const layout = isMobile ? PIONIR_LAYOUT.slice(0, 12) : PIONIR_LAYOUT;
    const shuffledLayout = [...layout].sort((a, b) => (a.x * a.y) % 3 - 1);

    const configs = [];
    const total = shuffledLayout.length;

    for (let i = 0; i < total; i++) {
      const { x: xStart, y: yStart, w: widthVW } = shuffledLayout[i];

      // Staggered timeline: each photo has a clear distinct start time
      const seq = i / (total - 1 || 1);
      const startP = tP4Start + (seq * (tP4Spread - 0.10)); // Ensure starts finish before the end of the spread

      // Fast flight duration to keep them snappy and distinct
      const duration = isMobile ? 0.09 : 0.11;
      const exitP = startP + duration;

      configs.push({
        xStart, yStart, widthVW,
        startP, exitP,
        srcIndex: i % SCRAPBOOK_PHOTOS.length,
        zIndex: 100 - i
      });
    }
    return configs;
  }, [tP4Start, tP4Spread, isMobile]);

  /* === PHASE 5: Background Photo === */
  // Spawns after all scrapbook photos have at least started appearing.
  // Stops scaling exactly at tP5EndScale so it is completely still when text appears.
  const finalScale = useTransform(progress, [tP5Start, tP5EndScale], [0.15, 1]);

  // Fades in just like the other scrapbook photos (blur removed for performance)
  const finalOpacity = useTransform(progress, [tP5Start, tP5EndOpacity], [0, 1]);

  // The dark overlay ONLY appears at the very end when it becomes the background
  const overlayOpacity = useTransform(progress, [tP5EndScale - 0.02, tP6Start], [0, 0.70]);

  // Pointer events control: only allow clicks on content when it's visible
  const contentPointerEvents = useTransform(progress, (v: number) => v > tP6Start ? "auto" : "none");

  /* === PHASE 6: About IKAMMA Content Fades In === */
  const contentOpacity = useTransform(progress, [tP6Start - 0.03, tP6Start], [0, 1]);

  // Since the container is now unpinned and scrolling up naturally during this phase, 
  // we just do a gentle entrance slide and let it scroll naturally with the page.
  const contentY = useTransform(
    progress,
    [tP6Start - 0.03, tP6Start],
    [30, 0]
  );

  return (
    <div ref={containerRef} className="relative w-full z-10" style={{ height: sectionHeight }}>
      <div
        className="sticky top-0 w-full h-screen overflow-hidden bg-[#081C36]"
        style={{ perspective: "1000px" }}
      >

        {/* === PHASE 5 & 6: Final Background and Content === */}
        {/* Navy backdrop: always visible so no grey shows behind scaling photo */}
        <div className="absolute z-0 inset-0 bg-[#081C36]" />
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
          />
          <motion.div
            className="absolute inset-0 bg-black"
            style={{ opacity: overlayOpacity }}
          />
        </motion.div>

        {/* === PHASE 6: Content === */}
        <motion.div
          className="absolute inset-0 z-50 flex flex-col justify-start md:justify-center w-full pt-[100px] md:pt-[130px] lg:pt-[150px] pb-[4vh] md:pb-[6vh] text-left"
          style={{
            opacity: contentOpacity,
            y: contentY,
            pointerEvents: contentPointerEvents,
            willChange: "transform, opacity" // GPU Acceleration for heavy iframe and SVGs
          }}
        >
          {/* Main Content inside restricted width - Mobile: pt-[35px], Desktop: pt-[26px] (moved up 25px) */}
          <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full flex flex-col pt-[35px] md:pt-[26px]">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-12 lg:gap-16 items-start">
              {/* Left Column */}
              <div className="flex flex-col text-left">
                <h2 className="text-white text-3xl md:text-5xl flex items-center justify-start gap-3 mb-4 md:mb-8">
                  <span className="text-white -mt-1">—</span>
                  <span className="font-caslon-bold-italic">What</span>
                  <span className="font-inter font-bold">is IKAMMA</span>
                </h2>
                <div className="text-white/90 space-y-3 md:space-y-6">
                  <p className="text-sm md:text-lg leading-relaxed text-justify">
                    <span className="font-bold italic">Ikatan Keluarga Mahasiswa Manajemen (IKAMMA)</span> merupakan sebuah organisasi himpunan mahasiswa Program Studi Manajemen di Fakultas Ekonomika dan Bisnis Universitas Gadjah Mada yang dibentuk pada tahun 1984.
                  </p>
                  <p className="text-sm md:text-lg leading-relaxed text-justify hidden sm:block">
                    IKAMMA menaungi seluruh mahasiswa Manajemen untuk meningkatkan potensi diri dan pengembangan soft skill. Hal ini dilakukan dengan mengimplementasikan empat basis nilai IKAMMA, yaitu kekeluargaan, profesionalisme, integritas, dan keilmuan.
                  </p>
                  <div className="pt-1 md:-mt-[25px] flex justify-start">
                    <AnimatedButton href="/about">
                      See More
                    </AnimatedButton>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="flex flex-col text-right w-full mt-0 md:mt-0">
                <h2 className="text-white text-3xl md:text-5xl flex items-center justify-end gap-2 sm:gap-3 mb-2 md:mb-8">
                  <span style={{ fontFamily: "'Inter', sans-serif" }} className="font-bold">Company</span>
                  <span style={{ fontFamily: "'Libre Caslon Text', serif" }} className="italic font-bold">Profile</span>
                  <span className="text-white font-inter font-bold -mt-1">—</span>
                </h2>
                <div className="w-full max-w-md ml-auto">
                  {/* Embedded YouTube Player */}
                  <div className="w-full aspect-video bg-[#D9D9D9] rounded-2xl md:rounded-[2rem] shadow-lg mb-0 md:mb-4 relative overflow-hidden">
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

                  <div className="text-right hidden md:block">
                    <a href={videoUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#081C36] transition-colors inline-flex items-center gap-2 text-xs md:text-sm underline underline-offset-4">
                      Click to See Full Video <ArrowRight size={12} className="md:w-[14px] md:h-[14px]" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Spacing adjusted to prevent logos from being cut off by the curved divider */}
          <div className="mt-4 md:mt-[30px] w-full mb-[80px]">
            <h3 className="text-white text-3xl md:text-5xl font-bold text-center mb-3 md:mb-4 flex items-center justify-center gap-2 md:gap-4">
              <span style={{ fontFamily: "'Libre Caslon Text', serif" }} className="italic font-bold">Our</span>
              <span style={{ fontFamily: "'Inter', sans-serif" }} className="font-bold">Partners</span>
            </h3>
            {/* Infinite Marquee Container */}
            <div className="w-full overflow-hidden flex whitespace-nowrap">
              <motion.div
                className="flex gap-8 md:gap-16 items-center min-w-max"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ ease: "linear", duration: 60, repeat: Infinity }}
                style={{ willChange: "transform" }}
              >
                {/* We render 12 logos twice (24 total) to create a perfect, seamless endless loop! */}
                {[...partnerLogos, ...partnerLogos, ...partnerLogos, ...partnerLogos].map((logo, i) => (
                  <img key={i} src={logo} alt={`Partner Logo ${i}`} loading="eager" className="h-16 md:h-28 w-auto object-contain opacity-100 flex-shrink-0" />
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
          className="absolute inset-0 z-40 flex items-center justify-center cursor-pointer"
          style={{
            scale: heroScale,
            opacity: heroOpacity,
            display: heroDisplay,
            pointerEvents: heroPointerEvents
          }}
          onPointerDown={togglePlayPause}
        >
          {/* Video Layer */}
          <div className="absolute inset-0 z-0">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover pointer-events-none"
            >
              <source src={HERO_VIDEO_WEBM} type="video/webm" />
              <source src={HERO_IMAGE} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <motion.div
              className="absolute inset-0 bg-white"
              style={{ opacity: whiteLayerOpacity }}
            />
          </div>

          {/* SVG Mask Layer */}
          <motion.div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{ scale: maskScale, opacity: maskOpacity, y: maskY }}
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
                  <svg x="50%" y="50%" overflow="visible">
                    <g
                      fill="black"
                      transform={isMobile
                        ? "translate(-56, -146) scale(0.1495)"
                        : "translate(-80, -221) scale(0.2136)"
                      }
                      dangerouslySetInnerHTML={{ __html: svgInner }}
                    />
                  </svg>
                </mask>
              </defs>
              <rect width="100%" height="100%" fill="#0C2340" mask="url(#textMask)" />
            </svg>
          </motion.div>

        </motion.div>

        {/* === Scroll Indicator === */}
        <motion.div
          className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-[60] flex flex-col items-center gap-4 pointer-events-none"
          style={{ opacity: scrollIndicatorOpacity }}
        >
          <span className="text-white/60 text-[11px] md:text-sm font-inter tracking-[0.4em] uppercase font-medium">Keep Scrolling</span>
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-12 md:h-20 bg-gradient-to-b from-white/60 to-transparent"
          />
        </motion.div>

      </div>
    </div>
  );
}