import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import LogoPutihRaw from "../../assets/LogoIKAMMA/LogoPutih.svg?raw";

import HERO_VIDEO_WEBM from "../../assets/Background/VidProf.webm";
import HERO_VIDEO_MP4 from "../../assets/Background/VidProf.mp4";

import { HERO_BG } from "../../assets/photos";

const BACKGROUND_IMAGE = HERO_BG;

const svgInner = LogoPutihRaw
  .replace(/<\?xml[^>]*\?>/g, "")
  .replace(/<svg[^>]*>/g, "")
  .replace(/<\/svg>/g, "")
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

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = true;
    const tryPlay = () => vid.play().catch(() => { });
    tryPlay();
    document.addEventListener("touchstart", tryPlay, { once: true });
    return () => document.removeEventListener("touchstart", tryPlay);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const maskScaleRaw = useTransform(
    scrollYProgress,
    [0, 0.45],
    [isMobile ? 12 : 18, 1]
  );
  const maskOpacityRaw = useTransform(scrollYProgress, [0, 0.03], [0, 1]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const whiteOverlayOpacity = useTransform(scrollYProgress, [0.65, 1], [0, 1]);

  const springCfg = { stiffness: 400, damping: 45, mass: 0.15 };
  const maskScale = useSpring(maskScaleRaw, springCfg);
  const maskOpacity = useSpring(maskOpacityRaw, springCfg);

  return (
    <div ref={containerRef} className="relative w-full h-[200vh] bg-[#0C2340]">
      <div
        className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center"
        style={{ contain: "layout style paint" }}
      >
        <style>{`
          video::-webkit-media-controls,
          video::-webkit-media-controls-panel,
          video::-webkit-media-controls-play-button,
          video::-webkit-media-controls-start-playback-button,
          video::-webkit-media-controls-overlay-play-button,
          video::-webkit-media-controls-enclosure {
            display: none !important;
            -webkit-appearance: none !important;
            opacity: 0 !important;
            pointer-events: none !important;
          }
        `}</style>

        {/* z-0: solid blue base */}
        <div className="absolute inset-0 z-0 bg-[#0C2340]" />

        {/* z-10: video */}
        <div className="absolute inset-0 z-10">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            disablePictureInPicture
            disableRemotePlayback
            className="w-full h-full object-cover pointer-events-none select-none"
          >
            <source src={HERO_VIDEO_WEBM} type="video/webm" />
            <source src={HERO_VIDEO_MP4} type="video/mp4" />
          </video>
        </div>

        {/* ── z-20: SVG mask — kembali ke SVG <mask> tapi dengan rect terpisah ── */}
        {/*                                                                        */}
        {/* Root cause destination-out tidak jalan:                               */}
        {/* Framer Motion inject `transform` via inline style → menciptakan        */}
        {/* stacking context baru → isolation tidak bisa scope blend dengan benar. */}
        {/*                                                                        */}
        {/* Solusi final: gunakan SVG <mask> murni tanpa willChange/translateZ     */}
        {/* pada element SVG itu sendiri. Scale/opacity dianimasikan di wrapper    */}
        {/* div biasa (bukan motion.div langsung pada SVG).                        */}
        {/*                                                                        */}
        {/* SVG <mask> bekerja di dalam satu SVG context — tidak terpengaruh       */}
        {/* stacking context dari parent HTML. Chrome stabil selama kita tidak     */}
        {/* taruh willChange/translateZ di elemen yang sama dengan mask.           */}
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            scale: maskScale,
            opacity: maskOpacity,
          }}
        >
          <svg
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: "block" }}
          >
            <defs>
              <mask id="heroMask" maskUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%">
                {/* Putih = area yang TAMPIL (biru solid) */}
                <rect width="100%" height="100%" fill="white" />

                {/* Hitam = area yang DIPOTONG (video tembus) */}

                {/* Logo — tengah atas */}
                <svg
                  x="50%"
                  y="50%"
                  overflow="visible"
                >
                  <g
                    transform={
                      isMobile
                        ? "translate(-105, -180) scale(0.28)"
                        : "translate(-150, -240) scale(0.40)"
                    }
                    dangerouslySetInnerHTML={{ __html: svgInner }}
                  />
                </svg>

                {/* Teks — tengah bawah, offset dari logo */}
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="black"
                  dy={isMobile ? "80" : "110"}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 700,
                    fontStyle: "italic",
                    fontSize: isMobile ? "28px" : "clamp(2rem, 5vw, 4.5rem)",
                    letterSpacing: "-0.045em",
                  }}
                >
                  #WeShareToInspire
                </text>
              </mask>
            </defs>

            {/* Rect yang dikenai mask: putih → tampil biru, hitam → transparan */}
            <rect width="100%" height="100%" fill="#0C2340" mask="url(#heroMask)" />
          </svg>
        </motion.div>

        {/* Scroll indicator */}
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

        {/* White fade-out overlay */}
        <motion.div
          className="absolute inset-0 z-30 bg-white pointer-events-none"
          style={{ opacity: whiteOverlayOpacity }}
        />
      </div>
    </div>
  );
}