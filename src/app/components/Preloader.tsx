import { motion } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';
import LogoPutihRaw from "../../assets/LogoIKAMMA/LogoPutih.svg?raw";

export function Preloader({ onLoadingComplete }: { onLoadingComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  const logoPath = useMemo(() => {
    const match = LogoPutihRaw.match(/d="([^"]+)"/);
    return match ? match[1] : "";
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onLoadingComplete, 300);
          return 100;
        }
        return prev + 1;
      });
    }, 12);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        y: -30,
        transition: { duration: 0.9, ease: [0.43, 0.13, 0.23, 0.96] }
      }}
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden pointer-events-none"
    >
      {/* Background Subtle Gradient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.03)_0%,_transparent_60%)]" />

      <div className="relative w-48 md:w-64 aspect-[749/538] flex items-center justify-center">

        {/* SVG with Rockstar-style Light Sweep */}
        <svg
          viewBox="0 0 749 538"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full overflow-visible"
        >
          <defs>
            {/* Darker base logo for high contrast with the glint */}
            <linearGradient id="logo-base-dark" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#111111" />
              <stop offset="100%" stopColor="#080808" />
            </linearGradient>

            {/* Ultra-Intense Light Sweep */}
            <linearGradient id="rockstar-glint" x1="0%" y1="0%" x2="100%" y2="100%">
              <motion.stop
                offset="0%"
                stopColor="rgba(255,255,255,0)"
                animate={{ offset: ["-150%", "250%"] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.5 }}
              />
              <motion.stop
                offset="15%"
                stopColor="rgba(255,255,255,0.2)"
                animate={{ offset: ["-135%", "265%"] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.5 }}
              />
              <motion.stop
                offset="20%"
                stopColor="rgba(255,255,255,1)"
                animate={{ offset: ["-130%", "270%"] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.5 }}
              />
              <motion.stop
                offset="22%"
                stopColor="rgba(255,255,255,1)"
                animate={{ offset: ["-128%", "272%"] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.5 }}
              />
              <motion.stop
                offset="25%"
                stopColor="rgba(255,255,255,0.2)"
                animate={{ offset: ["-125%", "275%"] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.5 }}
              />
              <motion.stop
                offset="40%"
                stopColor="rgba(255,255,255,0)"
                animate={{ offset: ["-110%", "290%"] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.5 }}
              />
            </linearGradient>

            {/* Enhanced Glow Filter */}
            <filter id="glint-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="glow" />
              <feComposite in="SourceGraphic" in2="glow" operator="over" />
            </filter>
          </defs>

          {/* Dark Logo (The "Canvas") - Always Visible */}
          <motion.path
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            fillRule="evenodd"
            clipRule="evenodd"
            d={logoPath}
            fill="url(#logo-base-dark)"
            stroke="white"
            strokeWidth="0.5"
            strokeOpacity="0.1"
          />

          {/* The High-Intensity Sweep - Starts immediately */}
          <motion.path
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 0.5
            }}
            fillRule="evenodd"
            clipRule="evenodd"
            d={logoPath}
            fill="url(#rockstar-glint)"
            style={{
              filter: "url(#glint-glow)",
            }}
          />
        </svg>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.4, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute bottom-8 text-white/20 text-[10px] uppercase tracking-[0.4em] font-light"
      >
        IKAMMA 2026 • EST. 1985
      </motion.p>
    </motion.div>
  );
}
