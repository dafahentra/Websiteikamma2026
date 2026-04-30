import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";

const BACKGROUND_IMAGE = "/src/imports/Screenshot_2026-04-27_at_23.54.12.png";

const EVENT_PHOTOS = [
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
  "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80",
  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80",
  "https://images.unsplash.com/photo-1523580494112-071d16940d14?w=800&q=80",
];

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

function CarouselCard({ index, activeIndex, photo, unfoldProgress, onClick }: CarouselCardProps) {
  const posIndex = (index - activeIndex + 4) % 4;
  const target = POSITIONS[posIndex];

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
      className="absolute w-56 h-72 md:w-72 md:h-96 shadow-[0_20px_50px_rgba(0,0,0,0.4)] overflow-hidden cursor-pointer rounded-xl bg-black"
      style={{ x, y, rotate, scale, zIndex: target.zIndex }}
    >
      <motion.img 
        src={photo} 
        className="w-full h-full object-cover" 
        style={{ filter }}
      />
    </motion.div>
  );
}

export function EventsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Track scroll progress relative to this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"]
  });

  // Calculate 0 to 1 unfold progression based on scroll
  const unfoldProgress = useTransform(scrollYProgress, [0.4, 1], [0, 1]);

  return (
    <section ref={sectionRef} id="events" className="relative w-full py-32 overflow-hidden min-h-screen flex flex-col justify-center bg-[#f8f9fa]">
      {/* Background with Heavy White Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={BACKGROUND_IMAGE}
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        
        {/* Title */}
        <div className="flex justify-center md:justify-end mb-24">
          <motion.h2 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[#04233F] text-4xl md:text-5xl font-serif italic text-right font-bold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            — Our Notable Events
          </motion.h2>
        </div>

        {/* Stacked Interactive Carousel Visualization */}
        <div className="relative w-full max-w-4xl mx-auto h-[450px] flex items-center justify-center mb-16 perspective-[1000px]">
          {EVENT_PHOTOS.map((photo, i) => (
            <CarouselCard
              key={i}
              index={i}
              activeIndex={activeIndex}
              photo={photo}
              unfoldProgress={unfoldProgress}
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
          <button className="bg-[#00B894] hover:bg-[#009b7c] text-white px-8 py-3 rounded-full font-medium transition-colors inline-flex items-center gap-2 shadow-lg hover:shadow-xl">
            <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
            See More
            <ArrowRight size={18} />
          </button>
        </motion.div>

      </div>
    </section>
  );
}