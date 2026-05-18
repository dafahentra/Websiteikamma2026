import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import LogoPutihRaw from "../../assets/LogoIKAMMA/LogoPutih.svg?raw";

import HERO_VIDEO_WEBM from "../../assets/Background/VidProf.webm";
import HERO_VIDEO_MP4 from "../../assets/Background/VidProf.mp4";

import { HERO_BG } from "../../assets/photos";

const BACKGROUND_IMAGE = HERO_BG;

const svgInner = LogoPutihRaw
  .replace(/<\?xml[^>]*\?>/g, '')
  .replace(/<svg[^>]*>/g, '')
  .replace(/<\/svg>/g, '')
  .replace(/fill="[^"]*"/g, 'fill="black"')
  .trim();

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // ── iOS autoplay: nudge play() after mount ──────────────────────────────
  // iOS Safari sometimes stalls autoplay even with muted+playsInline.
  // Calling play() imperatively after hydration reliably starts the video.
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = true; // must be set in JS too for iOS
    const tryPlay = () => {
      vid.play().catch(() => {
        // silently ignore – browser policy blocked it (e.g. Low Power Mode)
      });
    };
    // Attempt immediately and again on first user interaction as fallback
    tryPlay();
    document.addEventListener("touchstart", tryPlay, { once: true });
    return () => document.removeEventListener("touchstart", tryPlay);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // ── Mask animation ───────────────────────────────────────────────────────
  // Key mobile perf insight: large CSS scale on an SVG causes iOS to
  // rasterize a huge offscreen surface. Strategy:
  //   1. Keep initial scale much lower (12 mobile / 18 desktop).
  //   2. Drive scale with useSpring so interpolation is on the JS thread,
  //      not layout — paired with will-change: transform for GPU promotion.
  //   3. Start revealing opacity slightly earlier so the user sees motion
  //      before the scale hits 1 (masks the coarser steps at high scale).
  const maskScaleRaw = useTransform(
    scrollYProgress,
    [0, 0.45],
    [isMobile ? 12 : 18, 1]
  );
  const maskOpacityRaw = useTransform(scrollYProgress, [0, 0.03], [0, 1]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const whiteOverlayOpacity = useTransform(scrollYProgress, [0.65, 1], [0, 1]);

  // Tighter spring = crisper tracking, less perceived jank
  const springCfg = { stiffness: 400, damping: 45, mass: 0.15 };
  const maskScale = useSpring(maskScaleRaw, springCfg);
  const maskOpacity = useSpring(maskOpacityRaw, springCfg);

  return (
    <div ref={containerRef} className="relative w-full h-[200vh] bg-[#0C2340]">
      {/* ── Sticky viewport ──────────────────────────────────────────────── */}
      <div
        className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center"
        style={{ contain: "layout style paint" }}
      >
        {/* Suppress ALL native video UI on every browser */}
        <style>{`
          video::-webkit-media-controls,
          video::-webkit-media-controls-panel,
          video::-webkit-media-controls-play-button,
          video::-webkit-media-controls-start-playback-button,
          video::-webkit-media-controls-overlay-play-button,
          video::--webkit-media-controls-enclosure {
            display: none !important;
            -webkit-appearance: none !important;
            opacity: 0 !important;
            pointer-events: none !important;
          }
        `}</style>

        {/* ── Video layer ─────────────────────────────────────────────────── */}
        <div className="absolute inset-0 z-0" style={{ transform: "translateZ(0)" }}>
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            controls={false}            // explicit false — kills native controls
            disablePictureInPicture
            disableRemotePlayback       // prevents AirPlay icon on iOS
            x-webkit-airplay="deny"     // belt-and-suspenders for older iOS
            className="w-full h-full object-cover pointer-events-none select-none"
            style={{ willChange: "transform" }}
          >
            <source src={HERO_VIDEO_WEBM} type="video/webm" />
            <source src={HERO_VIDEO_MP4} type="video/mp4" />
          </video>
        </div>

        {/* ── SVG mask layer ──────────────────────────────────────────────── */}
        {/*
          Performance notes for the mask:
          - `transform-origin: center` is kept default (50% 50%) — no shift needed.
          - The motion.div is GPU-promoted via will-change + translateZ.
          - shapeRendering: "optimizeSpeed" skips anti-aliasing during animation.
          - The SVG itself also gets translateZ so the browser creates its own
            compositing layer separate from the motion wrapper.
        */}
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            scale: maskScale,
            opacity: maskOpacity,
            willChange: "transform, opacity",
            transform: "translateZ(0)",
          }}
        >
          <svg
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              shapeRendering: "optimizeSpeed",
              transform: "translateZ(0)",
              willChange: "transform",
            }}
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
                    transform={
                      isMobile
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

        {/* ── Scroll indicator ────────────────────────────────────────────── */}
        <motion.div
          className="absolute bottom-20 md:bottom-24 left-1/2 -translate-x-1/2 z-[60] flex flex-col items-center gap-4 pointer-events-none"
          style={{ opacity: scrollIndicatorOpacity }}
        >
          <span className="text-white/60 text-[11px] md:text-sm font-inter tracking-[0.4em] uppercase font-medium">
            Keep Scrolling
          </span>
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white/60">
              <path
                d="M12 5V19M12 19L5 12M12 19L19 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </motion.div>

        {/* ── White fade-out overlay ──────────────────────────────────────── */}
        <motion.div
          className="absolute inset-0 z-20 bg-white pointer-events-none"
          style={{ opacity: whiteOverlayOpacity }}
        />
      </div>
    </div>
  );
}