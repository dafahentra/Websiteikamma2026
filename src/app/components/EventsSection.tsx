import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";
import AnimatedButton from "./AnimatedButton";
import LOGO1 from '../../assets/LogoIKAMMA/LogoPutih.svg';
import LOGO2 from '../../assets/LogoIKAMMA/LogoPutih.svg';
import LOGO3 from '../../assets/LogoIKAMMA/LogoPutih.svg';
import LOGO4 from '../../assets/LogoIKAMMA/LogoPutih.svg';

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
  unfoldProgress: MotionValue<number>;
  onClick: () => void;
}

function CarouselCard({ index, activeIndex, item, unfoldProgress, onClick, xFactor }: CarouselCardProps & { xFactor: number }) {
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
        src={item.photo}
        className="w-full h-full object-cover"
        style={{ filter }}
      />
      {/* Overlay Logo in the center of the photo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img src={item.logo} alt="Event Logo" className="w-24 md:w-32 opacity-80" />
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

  // Track scroll progress relative to this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"]
  });

  // Calculate 0 to 1 unfold progression based on scroll
  const unfoldProgress = useTransform(scrollYProgress, [0.05, 0.70], [0, 1]);

  return (
    <>
      <section ref={sectionRef} id="events" className="relative w-full h-[120vh] bg-[#f8f9fa]">
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
            <div className="relative w-full max-w-4xl mx-auto h-[400px] md:h-[450px] flex items-center justify-center mb-0 mt-[-50px] perspective-[1000px]">
              {EVENT_ITEMS.map((item, i) => (
                <CarouselCard
                  key={i}
                  index={i}
                  activeIndex={activeIndex}
                  item={item}
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