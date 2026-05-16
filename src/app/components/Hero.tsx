import { useRef, useEffect, useState, useMemo } from "react";
import { motion, useScroll, useTransform, useMotionTemplate, MotionValue, useSpring } from "motion/react";
import { ArrowRight } from "lucide-react";
import AnimatedButton from "./AnimatedButton";
import LogoPutihRaw from "../../assets/LogoIKAMMA/LogoPutih.svg?raw";

import HERO_VIDEO_WEBM from "../../assets/Background/VidProf.mp4";
import LOGO from "../../assets/LogoIKAMMA/LogoPutih.svg";
import { supabase } from "../../lib/supabase";

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

  // Zoom OUT from video (mask is huge) to text (mask is scale 1)
  const maskScale = useTransform(scrollYProgress, [0, 0.4], [80, 1]);
  const maskOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  // White overlay: fades in at the tail end of the hero scroll (0.65 → 1)
  // so the hero dissolves seamlessly into the white About section.
  const whiteOverlayOpacity = useTransform(scrollYProgress, [0.65, 1], [0, 1]);

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
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center cursor-pointer" onClick={togglePlayPause}>
        {/* Video Layer */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover pointer-events-none"
          >
            <source src={HERO_VIDEO_WEBM} type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* SVG Mask Layer */}
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none"
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