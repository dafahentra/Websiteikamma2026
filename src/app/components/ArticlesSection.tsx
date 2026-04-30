import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ARTICLES = [
  {
    date: "April 18, 2025",
    title: "Lorem Ipsum Acikiwir",
    description: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum..."
  },
  {
    date: "April 18, 2025",
    title: "Lorem Ipsum Acikiwir",
    description: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum..."
  },
  {
    date: "April 18, 2025",
    title: "Lorem Ipsum Acikiwir",
    description: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum..."
  }
];

const BG_IMAGE = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2000&auto=format&fit=crop";

export function ArticlesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Slow parallax on the background image
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div ref={sectionRef} className="relative">
      {/* ── Sticky Full-Viewport Background (stays in place during scroll) ── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div
          className="absolute inset-0 w-full h-[120%] -top-[10%]"
          style={{ y: bgY }}
        >
          <img
            src={BG_IMAGE}
            alt=""
            className="w-full h-full object-cover"
          />
        </motion.div>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#0C2340]/80" />
      </div>

      {/* ── Content scrolls over the sticky background ── */}
      <section className="relative z-10 -mt-[100vh]">
        <div className="min-h-screen flex flex-col justify-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full py-32">
            
            {/* Header */}
            <div className="flex flex-col mb-16">
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-white text-4xl md:text-5xl flex items-center gap-3"
              >
                <span className="text-[#00B894]">—</span>
                <span style={{ fontFamily: "'Libre Caslon Text', serif" }} className="italic font-bold">Our</span>
                <span style={{ fontFamily: "'Inter', sans-serif" }} className="font-bold">Articles</span>
              </motion.h2>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {ARTICLES.map((article, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="flex flex-col group cursor-pointer"
                >
                  {/* Image Placeholder */}
                  <div className="w-full aspect-[4/3] bg-[#D9D9D9] mb-6 overflow-hidden rounded-xl">
                    <div className="w-full h-full bg-[#D9D9D9] group-hover:scale-105 transition-transform duration-500"></div>
                  </div>

                  {/* Text Content */}
                  <p className="text-white/60 text-sm md:text-base font-light mb-3">
                    {article.date}
                  </p>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#00B894] transition-colors duration-300">
                    {article.title}
                  </h3>
                  <p className="text-white/80 font-light leading-relaxed">
                    {article.description}
                  </p>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
