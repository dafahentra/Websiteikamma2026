import { useRef, useState, useEffect } from "react";
import { motion, useTransform, useSpring, useScroll, MotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";
import AnimatedButton from "./AnimatedButton";
import LOGO1 from '../../assets/LogoEvent/LogoME.webp';
import LOGO2 from '../../assets/LogoEvent/LogoCI.webp';
import LOGO3 from '../../assets/LogoEvent/LogoMenefest.webp';
import LOGO4 from '../../assets/LogoEvent/LogoYES!.webp';
import LOGO5 from '../../assets/LogoEvent/LogoGMSC.webp'

import { EVENT_PHOTOS, EVENTS_BG } from "../../assets/photos";
const BACKGROUND_IMAGE = EVENTS_BG;

const EVENT_ITEMS = [
  { photo: EVENT_PHOTOS[0], logo: LOGO1 },
  { photo: EVENT_PHOTOS[1], logo: LOGO2 },
  { photo: EVENT_PHOTOS[2], logo: LOGO3 },
  { photo: EVENT_PHOTOS[3], logo: LOGO4 },
  { photo: EVENT_PHOTOS[4], logo: LOGO5 }, // Placeholder for 5th item
];

const POSITIONS = [
  { x: 0, y: 0, rotate: 0, scale: 1, zIndex: 10, brightness: 1 },         // 0: Center (Active)
  { x: 220, y: 15, rotate: 10, scale: 0.85, zIndex: 8, brightness: 0.8 }, // 1: Right 1
  { x: 400, y: 40, rotate: 20, scale: 0.70, zIndex: 5, brightness: 0.5 }, // 2: Right 2 (Far)
  { x: -400, y: 40, rotate: -20, scale: 0.70, zIndex: 5, brightness: 0.5 },// 3: Left 2 (Far)
  { x: -220, y: 15, rotate: -10, scale: 0.85, zIndex: 8, brightness: 0.8 },// 4: Left 1
];

interface CarouselCardProps {
  index: number;
  activeIndex: number;
  item: { photo: string; logo: string };
  unfoldProgress: MotionValue<number>;
  onClick: () => void;
}

function CarouselCard({ index, activeIndex, item, unfoldProgress, onClick, xFactor }: CarouselCardProps & { xFactor: number }) {
  const posIndex = (index - activeIndex + 5) % 5;
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

  const isCenter = posIndex === 0;

  return (
    <motion.div
      onClick={onClick}
      className="absolute w-56 h-72 md:w-72 md:h-96 overflow-hidden cursor-pointer rounded-xl bg-black"
      style={{ x, y, rotate, scale, zIndex: target.zIndex }}
      animate={{
        boxShadow: isCenter
          ? "0 10px 30px rgba(0,0,0,0.3)"
          : "0 5px 15px rgba(0,0,0,0.1)"
      }}
      transition={{ duration: 0.4 }}
    >
      <div className="relative w-full h-full">
        <motion.img
          src={item.photo}
          loading="eager"
          decoding="sync"
          className="w-full h-full object-cover"
        />
        {/* Simple overlay for brightness effect instead of CSS filter */}
        <motion.div 
          className="absolute inset-0 bg-black pointer-events-none"
          style={{ opacity: useTransform(brightness, [0.5, 1], [0.5, 0]) }}
        />
      </div>

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

  // Scroll-driven unfold: cards fan out progressively as user scrolls the section into view
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start 0.3"] // Unfold completes when section is 30% from top
  });

  // Smooth spring for natural, premium feel on the unfold
  const unfoldProgress = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1], { clamp: true }),
    { stiffness: 80, damping: 25, restDelta: 0.001 }
  );

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
                <span style={{ fontFamily: "'Libre Caslon Text', serif" }} className="italic font-bold">Notable</span>
                <span style={{ fontFamily: "'Inter', sans-serif" }} className="font-bold">Events</span>
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