import { motion } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';
import LogoPutihRaw from "../../assets/LogoIKAMMA/LogoPutih.svg?raw";

export function Preloader({ onLoadingComplete }: { onLoadingComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  // Extract the path 'd' attribute from the raw SVG to ensure it's never truncated
  const logoPath = useMemo(() => {
    const match = LogoPutihRaw.match(/d="([^"]+)"/);
    return match ? match[1] : "";
  }, []);

  useEffect(() => {
    // Simulasi loading progres atau menunggu window.onload
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          // Berikan sedikit jeda setelah 100% agar user bisa melihat logo emasnya
          setTimeout(onLoadingComplete, 1000);
          return 100;
        }
        return prev + 1;
      });
    }, 20); // Kecepatan loading

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 1.05,
        transition: { duration: 0.8, ease: "easeInOut" }
      }}
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="relative w-48 md:w-64 aspect-[749/538] flex items-center justify-center">
        {/* Animated SVG Logo - Now in White */}
        <svg 
          viewBox="0 0 749 538" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-full h-full overflow-visible"
          style={{ filter: 'none' }} // Ensure no browser-level filters are applied
        >
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            fillRule="evenodd" 
            clipRule="evenodd" 
            d={logoPath}
            fill="white"
          />
        </svg>

        {/* Cinematic Progress Bar */}
        <div className="absolute -bottom-16 left-0 w-full h-[1px] bg-white/5 overflow-hidden">
          <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: `${progress - 100}%` }}
            transition={{ ease: "linear" }}
            className="w-full h-full bg-white/40"
          />
        </div>
      </div>
    </motion.div>
  );
}
