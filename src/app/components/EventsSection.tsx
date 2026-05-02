import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";
import LOGO from '../../assets/LogoPutih.svg';

import { EVENT_PHOTOS, EVENTS_BG } from "../../assets/photos";
const BACKGROUND_IMAGE = EVENTS_BG;

const POSITIONS = [
  { x: 0, y: 0, rotate: 0, scale: 1, zIndex: 10, brightness: 1 },         // 0: Center (Active)
  { x: 220, y: 15, rotate: 8, scale: 0.85, zIndex: 5, brightness: 0.7 },  // 1: Right
  { x: 0, y: -20, rotate: 0, scale: 0.75, zIndex: 1, brightness: 0.4 },   // 2: Back (Hidden/Folded)
  { x: -220, y: 15, rotate: -8, scale: 0.85, zIndex: 5, brightness: 0.7 },// 3: Left
];

interface CarouselCardProps {
  index: number;
  activeIndex: number;
  photo: string;
  unfoldProgress: MotionValue<number>;
  onClick: () => void;
}

function CarouselCard({ index, activeIndex, photo, unfoldProgress, onClick, xFactor }: CarouselCardProps & { xFactor: number }) {
  const posIndex = (index - activeIndex + 4) % 4;
  const target = { ...POSITIONS[posIndex], x: POSITIONS[posIndex].x * xFactor };

  // Motion values for the targets (state-driven)
  const tX = useSpring(target.x, { stiffness: 200, damping: 25 });
  const tY = useSpring(target.y, { stiffness: 200, damping: 25 });
  const tRotate = useSpring(target.rotate, { stiffness: 200, damping: 25 });
  const tScale = useSpring(target.scale, { stiffness: 200, damping: 25 });
  const tBright = useSpring(target.brightness, { stiffness: 200, damping: 25 });

  useEffect(() => {
    tX.set(target.x);
    tY.set(target.y);
    tRotate.set(target.rotate);
    tScale.set(target.scale);
    tBright.set(target.brightness);
  }, [posIndex, target, tX, tY, tRotate, tScale, tBright]);

  // Mix with scroll progress! (0 = folded up in the center, 1 = fanned out to target)
  const x = useTransform([tX, unfoldProgress], (latest) => (latest[0] as number) * (latest[1] as number));
  const y = useTransform([tY, unfoldProgress], (latest) => (latest[0] as number) * (latest[1] as number));
  const rotate = useTransform([tRotate, unfoldProgress], (latest) => (latest[0] as number) * (latest[1] as number));
  const scale = useTransform([tScale, unfoldProgress], (latest) => 0.8 + ((latest[0] as number) - 0.8) * (latest[1] as number));
  const brightness = useTransform([tBright, unfoldProgress], (latest) => 0.5 + ((latest[0] as number) - 0.5) * (latest[1] as number));
  const filter = useTransform(brightness, (b) => `brightness(${b})`);

  const isCenter = posIndex === 0;

  return (
    <motion.div
      onClick={onClick}
      className="absolute w-56 h-72 md:w-72 md:h-96 overflow-hidden cursor-pointer rounded-xl bg-black"
      style={{ x, y, rotate, scale, zIndex: target.zIndex }}
      animate={{
        boxShadow: isCenter 
          ? "0 20px 50px rgba(0,0,0,0.4), 0 0 60px rgba(8,28,54,0.5)" 
          : "0 20px 50px rgba(0,0,0,0.4), 0 0 0px rgba(8,28,54,0)"
      }}
      transition={{ duration: 0.4 }}
    >
      <motion.img 
        src={photo} 
        className="w-full h-full object-cover" 
        style={{ filter }}
      />
      {/* Overlay Logo in the center of the photo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img src={LOGO} alt="IKAMMA Logo" className="w-24 md:w-32 opacity-80" />
      </div>
      {/* Inner Neon Frame matching Figma */}
      <motion.div 
        className="absolute top-4 bottom-4 left-4 right-4 pointer-events-none rounded-sm border-2"
        animate={{ 
          borderColor: isCenter ? "rgba(8,28,54,1)" : "rgba(8,28,54,0)",
          boxShadow: isCenter 
            ? "0 0 15px rgba(8,28,54,0.5), inset 0 0 15px rgba(8,28,54,0.5)" 
            : "0 0 0px rgba(8,28,54,0), inset 0 0 0px rgba(8,28,54,0)",
          opacity: isCenter ? 1 : 0
        }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
}

export function EventsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [xFactor, setXFactor] = useState(1);

  useEffect(() => {
    const check = () => setXFactor(window.innerWidth < 768 ? 0.4 : 1);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  
  // Track scroll progress relative to this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"]
  });

  // Calculate 0 to 1 unfold progression based on scroll
  const unfoldProgress = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

  return (
    <>
      <section ref={sectionRef} id="events" className="relative w-full h-[200vh] bg-[#f8f9fa]">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">
          {/* Background with Heavy White Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src={BACKGROUND_IMAGE}
              alt="Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-white/90" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pt-[25px]">
            
            {/* Title */}
            <div className="flex justify-center md:justify-end mb-16 md:mb-24">
              <motion.h2 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-[#0C2340] text-4xl md:text-5xl flex items-center gap-3"
              >
                <span className="text-[#081C36]">—</span>
                <span style={{ fontFamily: "'Libre Caslon Text', serif" }} className="italic font-bold">Our</span>
                <span style={{ fontFamily: "'Inter', sans-serif" }} className="font-bold">Notable Events</span>
              </motion.h2>
            </div>

            {/* Stacked Interactive Carousel Visualization */}
            <div className="relative w-full max-w-4xl mx-auto h-[400px] md:h-[450px] flex items-center justify-center mb-12 md:mb-16 perspective-[1000px]">
              {EVENT_PHOTOS.map((photo, i) => (
                <CarouselCard
                  key={i}
                  index={i}
                  activeIndex={activeIndex}
                  photo={photo}
                  unfoldProgress={unfoldProgress}
                  xFactor={xFactor}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>

            {/* CTA Button */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center"
            >
              <button className="bg-[#081C36] hover:bg-[#0a2545] text-white px-8 py-3 rounded-full font-medium transition-colors inline-flex items-center gap-2 shadow-lg hover:shadow-xl">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                See More
                <ArrowRight size={18} />
              </button>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
}