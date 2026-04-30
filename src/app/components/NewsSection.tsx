import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// 12 IG posts (4 columns × 3 rows)
const NEWS_ITEMS = [
  // Column 1
  { id: 1, day: '17', month: 'April', year: '2026', image: '' },
  { id: 2, day: '17', month: 'April', year: '2026', image: '' },
  { id: 3, day: '17', month: 'April', year: '2026', image: '' },
  // Column 2
  { id: 4, day: '17', month: 'April', year: '2026', image: '' },
  { id: 5, day: '17', month: 'April', year: '2026', image: '' },
  { id: 6, day: '17', month: 'April', year: '2026', image: '' },
  // Column 3
  { id: 7, day: '17', month: 'April', year: '2026', image: '' },
  { id: 8, day: '17', month: 'April', year: '2026', image: '' },
  { id: 9, day: '17', month: 'April', year: '2026', image: '' },
  // Column 4
  { id: 10, day: '17', month: 'April', year: '2026', image: '' },
  { id: 11, day: '17', month: 'April', year: '2026', image: '' },
  { id: 12, day: '17', month: 'April', year: '2026', image: '' },
];

const BG = '#102a4e';

function NewsCard({ item }: { item: typeof NEWS_ITEMS[number] }) {
  return (
    <div className="relative w-full aspect-square rounded-3xl overflow-hidden bg-[#CBD5E1] cursor-pointer group">
      {item.image
        ? <img src={item.image} alt="" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        : <div className="absolute inset-0 bg-[#CBD5E1] group-hover:brightness-95 transition-all duration-300" />
      }

      {/* Bottom-right cutout date badge */}
      <div
        className="absolute bottom-0 right-0 flex items-center justify-center px-4 py-2 rounded-tl-2xl"
        style={{ background: BG }}
      >
        <div
          className="absolute -top-5 right-0 w-5 h-5"
          style={{ boxShadow: `10px 10px 0 0 ${BG}`, borderBottomRightRadius: '20px' }}
        />
        <div
          className="absolute bottom-0 -left-5 w-5 h-5"
          style={{ boxShadow: `10px 10px 0 0 ${BG}`, borderBottomRightRadius: '20px' }}
        />
        <p className="text-sm font-medium text-white/90 whitespace-nowrap z-10">
          {item.day} {item.month} <span className="text-[#00B894]">{item.year}</span>
        </p>
      </div>
    </div>
  );
}

export function NewsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Columns 2 & 4 move up as you scroll (parallax)
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -200]);

  // Divide items into 4 columns of 3
  const columns = [
    NEWS_ITEMS.slice(0, 3),
    NEWS_ITEMS.slice(3, 6),
    NEWS_ITEMS.slice(6, 9),
    NEWS_ITEMS.slice(9, 12),
  ];

  return (
    <section ref={sectionRef} className="relative w-full py-24 bg-[#102a4e] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">

        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4 text-4xl md:text-6xl font-bold mb-4"
          >
            <span className="text-white">—</span>
            <span className="text-transparent" style={{ WebkitTextStroke: '1.5px white' }}>See</span>
            <span className="text-white">What's News</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <a href="https://www.instagram.com/ikamma_ugm/" target="_blank" rel="noopener noreferrer" className="text-white/70 text-lg font-light">
              Follow for more!
            </a>
            <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-[#00B894]" />
          </motion.div>
        </div>

        {/* 4-Column Grid with parallax offset */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {columns.map((col, colIdx) => {
            const isOffset = colIdx === 1 || colIdx === 3;

            return (
              <motion.div
                key={colIdx}
                className="flex flex-col gap-4 md:gap-5"
                style={{
                  marginTop: isOffset ? 150 : 0,
                  y: isOffset ? parallaxY : 0,
                }}
              >
                {col.map((item) => (
                  <NewsCard key={item.id} item={item} />
                ))}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}