import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import { ArrowRight } from "lucide-react";
import AnimatedButton from "./AnimatedButton";
import LogoPutihRaw from "../../assets/LogoPutih.svg?raw";

import { SCRAPBOOK_PHOTOS, ABOUT_BACKGROUND } from '../../assets/photos';

const BACKGROUND_IMAGE = ABOUT_BACKGROUND;

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

// Component for a flying parallax photo
function FlyingPhoto({ 
  src, 
  progress, 
  cfg 
}: { 
  src: string, 
  progress: MotionValue<number>, 
  cfg: { xStart: number, yStart: number, rot: number, sStart: number, exit: number } 
}) {
  const { xStart, yStart, rot, sStart, exit } = cfg;
  const sEnd = 6; // Final scale when it flies past the camera
  const ratio = sEnd / sStart;
  
  // Parallax calculations: As the object scales up (gets closer), its distance from the center increases proportionally
  const scale = useTransform(progress, [0, exit], [sStart, sEnd]);
  const x = useTransform(progress, [0, exit], [`${xStart}vw`, `${xStart * ratio}vw`]);
  const y = useTransform(progress, [0, exit], [`${yStart}vh`, `${yStart * ratio}vh`]);
  
  // Fade out smoothly right before it exits the screen
  const opacity = useTransform(progress, [exit - 0.15, exit], [1, 0]);

  return (
    <motion.div
      // Removed rounded-2xl so photos are sharp/square
      className="absolute z-10 w-[150px] sm:w-[220px] aspect-[4/3] overflow-hidden shadow-2xl border-4 border-white/90"
      style={{ opacity, scale, x, y, rotate: rot }}
    >
      <img src={src} alt="Scrapbook Memory" className="w-full h-full object-cover" />
    </motion.div>
  );
}

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 600vh gives plenty of scroll room for the 3D tunnel effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Generate 12 mathematically precise photos for the Parallax scatter
  const photoConfigs = useMemo(() => {
    const configs = [];
    for (let i = 0; i < 12; i++) {
      // Spread them widely across the view
      const xStart = (Math.random() - 0.5) * 80; // -40vw to 40vw
      const yStart = (Math.random() - 0.5) * 60; // -30vh to 30vh
      const rot = (Math.random() - 0.5) * 60;    // -30 to 30 deg rotation
      
      // Z-depth calculation (0 is far, 1 is close)
      const depth = Math.random(); 
      // If it's close (depth=1), it starts large and exits early (fast).
      // If it's far (depth=0), it starts small and exits late (slow).
      const sStartVal = 0.15 + (depth * 1.5); // Starts between 0.15 and 1.65
      const exitVal = 0.85 - (depth * 0.65);  // Exits between 0.85 and 0.20
      
      configs.push({
        xStart,
        yStart,
        rot,
        sStart: sStartVal,
        exit: exitVal,
        srcIndex: i % SCRAPBOOK_PHOTOS.length
      });
    }
    // Sort so smaller items (furthest) are rendered first (lowest z-index relative to DOM)
    return configs.sort((a, b) => a.sStart - b.sStart);
  }, []);

  // Final Background Photo (The 51st image)
  // Starts extremely small in the exact center and grows to 100% full screen over a long period
  const finalScale = useTransform(scrollYProgress, [0, 0.7], [0.15, 1]);
  // We don't animate rotation anymore, it stays perfectly straight (0 deg)
  const finalRadius = useTransform(scrollYProgress, [0, 0.7], ["0px", "0px"]); // No rounded corners

  // Content (About IKAMMA Text & Logos) fades in very slowly over 40% of the scroll
  const contentOpacity = useTransform(scrollYProgress, [0.4, 0.8], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.4, 0.8], [80, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0.35, 0.75], [0, 0.45]);

  return (
    <section id="about" ref={containerRef} className="relative w-full h-[1200vh] bg-white">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Final Background Photo - Rendered first so it's behind all the flying photos */}
        <motion.div
          className="absolute z-0 flex items-center justify-center overflow-hidden shadow-2xl"
          style={{
            width: "100vw",
            height: "100vh",
            scale: finalScale,
            borderRadius: finalRadius,
            rotate: 0, // Perfectly upright
          }}
        >
          <img
            src={BACKGROUND_IMAGE}
            alt="Background"
            className="w-full h-full object-cover scale-105"
          />
          {/* Dark Overlay */}
          <motion.div 
            className="absolute inset-0 bg-black"
            style={{ opacity: overlayOpacity }}
          />
        </motion.div>

        {/* The 50 Flying Parallax Photos */}
        {photoConfigs.map((cfg, i) => (
          <FlyingPhoto 
            key={i}
            src={SCRAPBOOK_PHOTOS[cfg.srcIndex]}
            progress={scrollYProgress}
            cfg={cfg}
          />
        ))}

        {/* About Section Content */}
        <motion.div 
          className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-center py-12"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full flex flex-col gap-6 md:gap-16 pointer-events-auto">
            {/* Title */}
            <h2 className="text-white text-3xl md:text-5xl font-serif italic">
              — What is IKAMMA??
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 items-start">
              {/* Left Column: Description */}
              <div className="text-white/90 space-y-6">
                <p className="text-lg leading-relaxed text-justify">
                  <span className="font-bold italic">Ikatan Keluarga Mahasiswa Manajemen (IKAMMA)</span> merupakan sebuah organisasi himpunan mahasiswa Program Studi Manajemen di Fakultas Ekonomika dan Bisnis Universitas Gadjah Mada yang dibentuk pada tahun 1984.
                </p>
                <p className="text-lg leading-relaxed text-justify">
                  IKAMMA menaungi seluruh mahasiswa Manajemen untuk meningkatkan potensi diri dan pengembangan soft skill. Hal ini dilakukan dengan mengimplementasikan empat basis nilai IKAMMA, yaitu kekeluargaan, profesionalisme, integritas, dan keilmuan.
                </p>
                <div className="pt-4">
                  <AnimatedButton href="#about-more">
                    See More
                  </AnimatedButton>
                </div>
              </div>

              {/* Right Column: Company Profile */}
              <div className="flex flex-col items-start lg:items-end w-full">
                <div className="w-full max-w-md ml-auto">
                  <div className="inline-block bg-[#081C36] px-3 py-1 mb-4">
                    <h3 className="text-white text-xl font-bold">Company Profile</h3>
                  </div>
                  <div className="w-full aspect-video bg-[#D9D9D9] rounded-[2rem] shadow-lg mb-4"></div>
                  <div className="text-right">
                    <a href="#video" className="text-white hover:text-[#081C36] transition-colors inline-flex items-center gap-2 text-sm underline underline-offset-4">
                      Click to See Full Video <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Section: Our Partners */}
            <div className="mt-8 md:mt-16 w-full">
              <h3 className="text-white text-xl md:text-3xl font-bold text-center mb-4 md:mb-8">Our Partners</h3>
              <div className="w-full overflow-hidden flex whitespace-nowrap">
                <div className="flex gap-8 md:gap-16 items-center animate-marquee">
                  {[...Array(20)].map((_, i) => (
                    <IkammaLogo key={i} className="w-16 h-16 md:w-24 md:h-24 object-contain opacity-80 hover:opacity-100 transition-opacity" />
                  ))}
                </div>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}