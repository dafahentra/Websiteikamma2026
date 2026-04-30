import { motion } from 'motion/react';

// News items with date split for the design
const NEWS_ITEMS = [
  { id: 1, day: '17', month: 'April', year: '2026', image: '', span: 'row-span-1 col-span-1' },
  { id: 2, day: '17', month: 'April', year: '2026', image: '', span: 'row-span-2 col-span-1' },
  { id: 3, day: '17', month: 'April', year: '2026', image: '', span: 'row-span-1 col-span-1' },
  { id: 4, day: '17', month: 'April', year: '2026', image: '', span: 'row-span-1 col-span-1' },
  { id: 5, day: '17', month: 'April', year: '2026', image: '', span: 'row-span-1 col-span-1' },
  { id: 6, day: '17', month: 'April', year: '2026', image: '', span: 'row-span-2 col-span-1' },
  { id: 7, day: '17', month: 'April', year: '2026', image: '', span: 'row-span-1 col-span-1' },
  { id: 8, day: '17', month: 'April', year: '2026', image: '', span: 'row-span-1 col-span-1' },
];

// Background color matching this section
const BG = '#102a4e';

function NewsCard({ item, delay }: { item: typeof NEWS_ITEMS[number]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="relative w-full h-full min-h-[180px] rounded-3xl overflow-hidden bg-[#CBD5E1] cursor-pointer group"
    >
      {/* Photo placeholder — replace with <img> when ready */}
      {item.image
        ? <img src={item.image} alt="" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        : <div className="absolute inset-0 bg-[#CBD5E1] group-hover:brightness-95 transition-all duration-300" />
      }

      {/* Bottom-right cutout date badge */}
      <div
        className="absolute bottom-0 right-0 flex items-center justify-center px-4 py-2 rounded-tl-2xl"
        style={{ background: BG }}
      >
        {/* Inverted corner top-right */}
        <div
          className="absolute -top-5 right-0 w-5 h-5"
          style={{ boxShadow: `10px 10px 0 0 ${BG}`, borderBottomRightRadius: '20px' }}
        />
        {/* Inverted corner bottom-left */}
        <div
          className="absolute bottom-0 -left-5 w-5 h-5"
          style={{ boxShadow: `10px 10px 0 0 ${BG}`, borderBottomRightRadius: '20px' }}
        />
        <p className="text-sm font-medium text-white/90 whitespace-nowrap z-10">
          {item.day} {item.month} <span className="text-[#00B894]">{item.year}</span>
        </p>
      </div>
    </motion.div>
  );
}

export function NewsSection() {
  return (
    <section className="relative w-full py-24 bg-[#102a4e] text-white">
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
            className="relative self-start"
          >
            <a href="#" className="text-white/70 text-lg font-light">Follow for more!</a>
            <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-[#00B894]" />
          </motion.div>
        </div>

        {/* Masonry-style grid — 4 columns, staggered rows */}
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridTemplateRows: 'repeat(3, 180px)',
          }}
        >
          {/* Row 1, Col 1 — normal */}
          <div style={{ gridColumn: '1', gridRow: '1' }}>
            <NewsCard item={NEWS_ITEMS[0]} delay={0} />
          </div>
          {/* Row 1-2, Col 2 — tall */}
          <div style={{ gridColumn: '2', gridRow: '1 / 3' }}>
            <NewsCard item={NEWS_ITEMS[1]} delay={0.05} />
          </div>
          {/* Row 1, Col 3 — normal */}
          <div style={{ gridColumn: '3', gridRow: '1' }}>
            <NewsCard item={NEWS_ITEMS[2]} delay={0.1} />
          </div>
          {/* Row 1-2, Col 4 — tall */}
          <div style={{ gridColumn: '4', gridRow: '1 / 3' }}>
            <NewsCard item={NEWS_ITEMS[3]} delay={0.15} />
          </div>
          {/* Row 2, Col 1 — normal */}
          <div style={{ gridColumn: '1', gridRow: '2' }}>
            <NewsCard item={NEWS_ITEMS[4]} delay={0.2} />
          </div>
          {/* Row 2, Col 3 — normal */}
          <div style={{ gridColumn: '3', gridRow: '2' }}>
            <NewsCard item={NEWS_ITEMS[5]} delay={0.25} />
          </div>
          {/* Row 3, Col 1 — normal */}
          <div style={{ gridColumn: '1', gridRow: '3' }}>
            <NewsCard item={NEWS_ITEMS[6]} delay={0.3} />
          </div>
          {/* Row 3, Col 2 — normal */}
          <div style={{ gridColumn: '2', gridRow: '3' }}>
            <NewsCard item={NEWS_ITEMS[7]} delay={0.35} />
          </div>
        </div>

      </div>
    </section>
  );
}