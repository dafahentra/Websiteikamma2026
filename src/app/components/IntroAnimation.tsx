import { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

import { HERO_IMAGE } from "../../assets/photos";
import LOGO from "../../assets/LogoPutih.svg";

export function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"intro" | "zoomout" | "done">("intro");
  const overlayControls = useAnimation();

  useEffect(() => {
    // Phase 1 (0–2.5s): Show intro (dark blue + logo + big text)
    // Phase 2 (2.5s): Start zoom-out transition
    // Phase 3 (4.5s): Done — reveal hero underneath

    const t1 = setTimeout(() => {
      setPhase("zoomout");
    }, 2500);

    const t2 = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 4800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="intro-wrapper"
          className="fixed inset-0 z-50 overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* ── Hero photo underneath (always rendered, revealed by zoom-out) ── */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src={HERO_IMAGE}
              alt="FEB UGM"
              className="w-full h-full object-cover"
            />
            {/* Bottom gradient for "#Bertumbuh Seirama" readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div
              className="absolute bottom-12 right-8 sm:bottom-16 sm:right-16 md:right-24"
              style={{ opacity: phase === "zoomout" ? 1 : 0, transition: "opacity 0.8s 0.6s" }}
            >
              <h1
                className="text-white text-4xl sm:text-5xl md:text-6xl italic"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700 }}
              >
                #Bertumbuh Seirama
              </h1>
            </div>
          </div>

          {/* ── Intro overlay — dark blue card that zooms out ── */}
          <motion.div
            key="intro-card"
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ backgroundColor: "#0C2340", transformOrigin: "center center" }}
            initial={{ scale: 1, borderRadius: "0px" }}
            animate={
              phase === "zoomout"
                ? {
                    scale: 0.0,
                    borderRadius: "24px",
                    opacity: 0,
                  }
                : { scale: 1, borderRadius: "0px", opacity: 1 }
            }
            transition={
              phase === "zoomout"
                ? { duration: 1.6, ease: [0.76, 0, 0.24, 1] }
                : { duration: 0 }
            }
          >
            {/* Logo */}
            <motion.img
              src={LOGO}
              alt="IKAMMA Logo"
              initial={{ opacity: 0, y: -24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="w-36 md:w-48 object-contain mb-10 md:mb-14"
            />

            {/* ── Big image-clipped text: #WeShareToInspire ── */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="font-bold italic leading-none select-none text-center"
              style={{
                fontSize: "clamp(3.5rem, 11vw, 10rem)",
                letterSpacing: "-0.03em",
                /* Image clip — photo fills the text */
                backgroundImage: `url(${HERO_IMAGE})`,
                backgroundSize: "120% auto",
                backgroundPosition: "center 40%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                /* Subtle silver/grey fallback outline so text reads on dark bg */
                filter: "drop-shadow(0 0 2px rgba(160,170,190,0.35))",
                fontFamily: "'Helvetica Neue', Arial, sans-serif",
                padding: "0 2vw",
              }}
            >
              #WeShareToInspire
            </motion.h1>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
