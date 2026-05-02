import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import AnimatedButton from "./AnimatedButton";
import { ARTICLE_PHOTOS } from "../../assets/photos";

const ARTICLES = [
  {
    date: "April 18, 2025",
    title: "Lorem Ipsum Acikiwir",
    description: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum...",
    image: ""
  },
  {
    date: "April 18, 2025",
    title: "Lorem Ipsum Acikiwir",
    description: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum...",
    image: ""
  },
  {
    date: "April 18, 2025",
    title: "Lorem Ipsum Acikiwir",
    description: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum...",
    image: ""
  }
];

// Assign photos from the registry
ARTICLES.forEach((art, i) => { art.image = ARTICLE_PHOTOS[i]; });

export function ArticlesSection() {
  return (
    <section className="relative w-full py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">

        {/* Header */}
        <div className="flex flex-col mb-16">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[#081C36] text-4xl md:text-5xl flex items-center gap-3"
          >
            <span className="text-[#081C36]">—</span>
            <span style={{ fontFamily: "'Libre Caslon Text', serif" }} className="italic font-bold">Our</span>
            <span style={{ fontFamily: "'Inter', sans-serif" }} className="font-bold">Articles</span>
          </motion.h2>
        </div>

        {/* Articles Slider/Grid */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-3 md:gap-8 md:gap-12 md:overflow-visible [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {ARTICLES.map((article, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="flex flex-col group cursor-pointer w-[80vw] min-w-[80vw] snap-center flex-shrink-0 md:w-auto md:min-w-0 md:flex-shrink"
            >
              {/* Image */}
              <div className="w-full aspect-[4/3] bg-[#f0f2f5] mb-6 overflow-hidden rounded-2xl md:rounded-none relative">
                <img
                  src={article.image}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Text Content */}
              <p className="text-[#081C36]/50 text-sm md:text-base font-light mb-2 md:mb-3">
                {article.date}
              </p>
              <h3 className="text-xl md:text-2xl font-bold text-[#081C36] mb-3 md:mb-4 group-hover:text-[#081C36]/70 transition-colors duration-300">
                {article.title}
              </h3>
              <p className="text-[#081C36]/60 font-light leading-relaxed text-sm md:text-base">
                {article.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* See More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center -mt-5 md:mt-2"
        >
          <AnimatedButton href="/articles">
            See More
          </AnimatedButton>
        </motion.div>

      </div>
    </section>
  );
}
