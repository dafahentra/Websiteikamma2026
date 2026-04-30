import { motion } from "framer-motion";

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

export function ArticlesSection() {
  return (
    <section className="relative w-full py-24 bg-[#0C2340] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
        
        {/* Header */}
        <div className="flex flex-col mb-16">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4 text-4xl md:text-6xl font-bold"
          >
            <span className="text-white">—</span>
            <span 
              className="text-transparent"
              style={{ WebkitTextStroke: '1.5px white' }}
            >
              Our
            </span>
            <span className="text-white">Articles</span>
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
              <div className="w-full aspect-[4/3] bg-[#D9D9D9] mb-6 overflow-hidden">
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
    </section>
  );
}
