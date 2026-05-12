import { useRef, useMemo, useState, useEffect } from "react";
import { motion, useScroll, useTransform, MotionValue, useSpring } from "motion/react";
import { ArrowRight } from "lucide-react";
import AnimatedButton from "./AnimatedButton";
import LogoPutihRaw from "../../assets/LogoIKAMMA/LogoPutih.svg?raw";

import { SCRAPBOOK_PHOTOS, ABOUT_BACKGROUND } from '../../assets/photos';
import { supabase } from "../../lib/supabase";

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



export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [videoUrl, setVideoUrl] = useState("https://www.youtube.com/watch?v=8VO2f7XQ7Tw");

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

  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  // Parallax effect: moves the background image down slightly as you scroll down
  // Added useSpring for smoother performance and will-change for GPU acceleration
  const yRaw = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const y = useSpring(yRaw, { stiffness: 400, damping: 90 });

  return (
    <section id="about" ref={targetRef} className="relative w-full h-auto bg-[#081C36] overflow-hidden pt-24 md:pt-40 pb-12 md:pb-16">
      {/* Static Background Photo */}
      <div className="absolute inset-0 z-0">
        <img
          src={BACKGROUND_IMAGE}
          alt="Background"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* About Section Content */}
      <div className="relative z-30 flex flex-col justify-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full flex flex-col gap-4 md:gap-8">


          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-start">
            {/* Left Column: Description */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="text-white/90 space-y-6"
            >
              {/* Aligned Heading */}
              <h2 className="text-white text-3xl md:text-5xl mb-6">
                <span className="font-caslon-bold-italic">— What is</span> <span className="font-inter font-bold">IKAMMA??</span>
              </h2>
              <p className="text-lg leading-relaxed text-justify">
                <span className="font-bold italic">Ikatan Keluarga Mahasiswa Manajemen (IKAMMA)</span> merupakan sebuah organisasi himpunan mahasiswa Program Studi Manajemen di Fakultas Ekonomika dan Bisnis Universitas Gadjah Mada yang dibentuk pada tahun 1984.
              </p>
              <p className="text-lg leading-relaxed text-justify">
                IKAMMA menaungi seluruh mahasiswa Manajemen untuk meningkatkan potensi diri dan pengembangan soft skill. Hal ini dilakukan dengan mengimplementasikan empat basis nilai IKAMMA, yaitu kekeluargaan, profesionalisme, integritas, dan keilmuan.
              </p>
              <div className="pt-2">
                <AnimatedButton href="#about-more">
                  See More
                </AnimatedButton>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full ml-auto lg:text-right"
            >
              {/* Aligned Heading without box, forced to one line */}
              <h3 className="text-white text-3xl md:text-5xl mb-6 whitespace-nowrap">
                <span className="font-caslon-bold-italic">— Company</span> <span className="font-inter font-bold">Profile</span>
              </h3>
              <div className="w-full max-w-md ml-auto">
                <div className="w-full aspect-video bg-[#000d1a] rounded-[2rem] shadow-lg mb-2 relative overflow-hidden">
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
                  <div className="text-right">
                    <a href={videoUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#081C36] transition-colors inline-flex items-center gap-2 text-sm underline underline-offset-4">
                      Click to See Full Video <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Bottom Section: Our Partners - Moved outside max-w container for full-width */}
        <div className="mt-8 md:mt-12 w-full pb-12 md:pb-24">
          <motion.h3 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white text-3xl md:text-5xl lg:text-6xl text-center mb-6 md:mb-10"
          >
            <span className="font-caslon-bold-italic">Our</span> <span className="font-inter font-bold">Partners</span>
          </motion.h3>
          <div className="w-full overflow-hidden flex whitespace-nowrap">
            <motion.div 
              animate={{ x: ["0%", "-50%"] }}
              transition={{ ease: "linear", duration: 30, repeat: Infinity }}
              className="flex items-center w-max"
            >
              {[...Array(4)].map((_, setIdx) => (
                <div key={setIdx} className="flex items-center shrink-0">
                  {partnerLogos.map((logo, i) => (
                    <div key={`${setIdx}-${i}`} className="pr-12 md:pr-24 shrink-0 flex items-center">
                      <img
                        src={logo}
                        alt={`Partner Logo ${i}`}
                        loading="eager"
                        className="h-16 md:h-28 w-auto object-contain"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}