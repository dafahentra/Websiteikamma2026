import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import AnimatedButton from "./AnimatedButton";
import { Clock, User, ChevronRight } from "lucide-react";

interface Article {
  id: string;
  title: string;
  date: string;
  description: string;
  image_url: string;
  category: string;
  read_time: string;
  author: string;
}

export function ArticlesSection() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      // Fetch latest 3 articles
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('date', { ascending: false })
        .limit(3);

      if (data) {
        setArticles(data);
      }
      setLoading(false);
    };

    fetchArticles();
  }, []);

  // If loading or no articles, don't show the section
  if (loading || articles.length === 0) return null;

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
          {articles.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="flex flex-col group cursor-pointer w-[80vw] min-w-[80vw] snap-center flex-shrink-0 md:w-auto md:min-w-0 md:flex-shrink"
              onClick={() => window.location.href = `/articles/${article.id}`}
            >
              {/* Image */}
              <div className="w-full aspect-[4/3] bg-[#081C36]/[0.03] mb-6 overflow-hidden relative">
                <img
                  src={article.image_url}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Text Content */}
              <div className="flex flex-col flex-grow">
                {/* Header Meta: Category & Date */}
                <div className="flex items-center justify-between gap-1 mb-2 md:mb-3">
                  <span className="inline-block px-2 py-0.5 md:px-3 md:py-1 rounded-md bg-[#081C36]/[0.06] text-[#081C36] text-[9px] md:text-xs font-inter font-semibold uppercase tracking-wider">
                    {article.category}
                  </span>
                  <span className="text-[#081C36]/50 text-[9px] md:text-xs font-inter">
                    {article.date}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-sm md:text-2xl font-inter font-bold mb-1 group-hover:text-[#081C36]/70 transition-colors duration-300 line-clamp-2 leading-snug">
                  {article.title}
                </h3>

                {/* Footer Meta: Author & Read Time */}
                <div className="flex items-center gap-3 text-[#081C36]/50 text-[9px] md:text-xs font-inter mb-3 md:mb-4">
                  <div className="flex items-center gap-1">
                    <User size={10} className="md:w-3 md:h-3" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={10} className="md:w-3 md:h-3" />
                    <span>{article.read_time.includes('min') ? article.read_time : `${article.read_time} min read`}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[#081C36]/60 text-[11px] md:text-base font-inter leading-relaxed mb-3 md:mb-4 line-clamp-2 md:line-clamp-3">
                  {article.description}
                </p>

                {/* Read More */}
                <div className="mt-auto flex justify-end">
                  <span className="text-[#081C36] text-[10px] md:text-sm font-bold flex items-center gap-1 group-hover:underline">
                    Read More <ChevronRight size={14} className="md:w-4 md:h-4" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* See More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center mt-[20px] md:mt-2"
        >
          <AnimatedButton href="/articles">
            See More
          </AnimatedButton>
        </motion.div>

      </div>
    </section>
  );
}
