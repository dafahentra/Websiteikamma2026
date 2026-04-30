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

function NewsCard({ item }: { item: typeof NEWS_ITEMS[number] }) {
  return (
    <div className="relative w-full aspect-square cursor-pointer group">
      {/* Card with SVG shape */}
      <svg
        viewBox="0 0 360 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <clipPath id={`card-clip-${item.id}`}>
            <path d="M0 27C0 12.0883 12.0883 0 27 0H101H330C346.569 0 360 13.4315 360 30V291C360 307.569 346.569 321 330 321H238.205C230.38 321 222.864 324.057 217.262 329.52L194.738 351.48C189.136 356.943 181.62 360 173.795 360H30C13.4315 360 0 346.569 0 330V27Z" />
          </clipPath>
        </defs>
        {/* Background fill with clip */}
        <rect width="360" height="360" fill="#CBD5E1" clipPath={`url(#card-clip-${item.id})`} className="group-hover:fill-[#c0cad4] transition-colors duration-300" />
        {/* If image exists, use foreignObject */}
        {item.image && (
          <foreignObject width="360" height="360" clipPath={`url(#card-clip-${item.id})`}>
            <img src={item.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </foreignObject>
        )}
      </svg>

      {/* Date positioned in the bottom-right notch space */}
      <div className="absolute bottom-0 right-0 flex items-end pr-1 pb-1">
        <p className="text-sm font-medium text-white/90 whitespace-nowrap">
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
            className="text-white text-4xl md:text-5xl flex items-center gap-3 mb-4"
          >
            <span className="text-[#00B894]">—</span>
            <span style={{ fontFamily: "'Libre Caslon Text', serif" }} className="italic font-bold">See</span>
            <span style={{ fontFamily: "'Inter', sans-serif" }} className="font-bold">What's News</span>
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