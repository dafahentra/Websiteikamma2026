import { useRef, useEffect, useState, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import LogoPutihRaw from "../../assets/LogoIKAMMA/LogoPutih.svg?raw";

import HERO_VIDEO_WEBM from "../../assets/Background/VidProf.webm";
import HERO_VIDEO_MP4 from "../../assets/Background/VidProf.mp4";

import { HERO_BG } from "../../assets/photos";

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

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // ── Performance fix: reduced scale range ──
  // Previously 80→1, now 25→1 (mobile) / 35→1 (desktop).
  // At scale 25, the text already far exceeds the viewport.
  // This reduces GPU rasterization area by ~10x.
  const maskScaleRaw = useTransform(
    scrollYProgress,
    [0, 0.4],
    [isMobile ? 25 : 35, 1]
  );
  const maskOpacityRaw = useTransform(scrollYProgress, [0, 0.05], [0, 1]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const whiteOverlayOpacity = useTransform(scrollYProgress, [0.65, 1], [0, 1]);

  // ── Performance fix: spring smoothing ──
  // Smooths scroll-driven values to prevent frame drops on mobile.
  // High stiffness = responsive, moderate damping = no oscillation.
  const springCfg = { stiffness: 300, damping: 40, mass: 0.2 };
  const maskScale = useSpring(maskScaleRaw, springCfg);
  const maskOpacity = useSpring(maskOpacityRaw, springCfg);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => { });
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-[200vh] bg-[#0C2340]">
      <div
        className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center cursor-pointer"
        onClick={togglePlayPause}
        style={{ contain: 'layout style paint' }}
      >
        <style>
          {`
            video::-webkit-media-controls { display: none !important; }
            video::-webkit-media-controls-start-playback-button { display: none !important; -webkit-appearance: none; }
          `}
        </style>
        {/* Video Layer — GPU-promoted with translateZ(0) */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            disablePictureInPicture
            className="w-full h-full object-cover pointer-events-none"
            style={{ transform: 'translateZ(0)', willChange: 'transform' }}
          >
            {/* WebM first — smaller file (4.1MB vs 7.6MB), better for mobile */}
            <source src={HERO_VIDEO_WEBM} type="video/webm" />
            <source src={HERO_VIDEO_MP4} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* SVG Mask Layer — optimized with shapeRendering and reduced scale */}
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            scale: maskScale,
            opacity: maskOpacity,
            willChange: 'transform, opacity',
            transform: 'translateZ(0)',
          }}
        >
          <svg
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
            style={{ shapeRendering: 'optimizeSpeed' }}
          >
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

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-20 md:bottom-24 left-1/2 -translate-x-1/2 z-[60] flex flex-col items-center gap-4 pointer-events-none"
          style={{ opacity: scrollIndicatorOpacity }}
        >
          <span className="text-white/60 text-[11px] md:text-sm font-inter tracking-[0.4em] uppercase font-medium">Keep Scrolling</span>
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white/60">
              <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </motion.div>
        {/* White fade-out overlay — dissolves hero into the About section */}
        <motion.div
          className="absolute inset-0 z-20 bg-white pointer-events-none"
          style={{ opacity: whiteOverlayOpacity }}
        />
      </div>
    </div>
  );
}