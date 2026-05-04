import { useRef, useState, useEffect } from "react";
import { motion, useSpring, useTransform, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import AnimatedButton from "./AnimatedButton";
import LOGO1 from '../../assets/LogoEvent/ManagementEvent.png';
import LOGO2 from '../../assets/LogoEvent/CareerInsight.png';
import LOGO3 from '../../assets/LogoEvent/Menefest.png';
import LOGO4 from '../../assets/LogoEvent/Yes!.png';

import { EVENT_PHOTOS, EVENTS_BG } from "../../assets/photos";
const BACKGROUND_IMAGE = EVENTS_BG;

const EVENT_ITEMS = [
  { photo: EVENT_PHOTOS[0], logo: LOGO1 },
  { photo: EVENT_PHOTOS[1], logo: LOGO2 },
  { photo: EVENT_PHOTOS[2], logo: LOGO3 },
  { photo: EVENT_PHOTOS[3], logo: LOGO4 },
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
  item: { photo: string; logo: string };
  isInView: boolean;
  onClick: () => void;
}

function CarouselCard({ index, activeIndex, item, isInView, onClick, xFactor }: CarouselCardProps & { xFactor: number }) {
  const posIndex = (index - activeIndex + 4) % 4;
  
  // If not in view, all cards start folded in the center
  const target = isInView 
    ? { ...POSITIONS[posIndex], x: POSITIONS[posIndex].x * xFactor }
    : { x: 0, y: 0, rotate: 0, scale: 0.8, zIndex: 5, brightness: 0.5 };

  // Motion values animate automatically when target changes
  const x = useSpring(target.x, { stiffness: 60, damping: 15 });
  const y = useSpring(target.y, { stiffness: 60, damping: 15 });
  const rotate = useSpring(target.rotate, { stiffness: 60, damping: 15 });
  const scale = useSpring(target.scale, { stiffness: 60, damping: 15 });
  const brightness = useSpring(target.brightness, { stiffness: 60, damping: 15 });

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
        src={item.photo}
        className="w-full h-full object-cover"
        style={{ filter }}
        loading="lazy"
      />
      {/* Overlay Logo in the center of the photo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img src={item.logo} alt="Event Logo" className="w-24 md:w-32 opacity-80" loading="lazy" />
      </div>
      {/* White Inner Frame */}
      <motion.div
        className="absolute top-4 bottom-4 left-4 right-4 pointer-events-none rounded-sm border-2 border-white/80"
        animate={{
          opacity: isCenter ? 1 : 0,
          scale: isCenter ? 1 : 0.95
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

  // Trigger animation automatically when scrolled into view
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <>
      <section ref={sectionRef} id="events" className="relative w-full bg-[#f8f9fa] pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
        <div className="w-full flex flex-col justify-center">
          {/* Background with Heavy White Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src={BACKGROUND_IMAGE}
              alt="Background"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-white/90" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pt-[30px]">

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
            <div className="relative w-full max-w-4xl mx-auto h-[400px] md:h-[450px] flex items-center justify-center mb-12 mt-0 perspective-[1000px]">
              {EVENT_ITEMS.map((item, i) => (
                <CarouselCard
                  key={i}
                  index={i}
                  activeIndex={activeIndex}
                  item={item}
                  isInView={isInView}
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
              className="flex justify-center -mt-8 md:mt-2"
            >
              <AnimatedButton href="/events">
                See More
              </AnimatedButton>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
}