import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// ── Types ──────────────────────────────────────────
interface IGPost {
  id: string;
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
  media_type: string;
  caption?: string;
}

interface NewsItem {
  id: string;
  day: string;
  month: string;
  year: string;
  image: string;
  permalink: string;
}

// ── Helpers ────────────────────────────────────────
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function parseTimestamp(ts: string): { day: string; month: string; year: string } {
  const d = new Date(ts);
  return {
    day: String(d.getDate()),
    month: MONTHS[d.getMonth()],
    year: String(d.getFullYear()),
  };
}

function igPostToNewsItem(post: IGPost): NewsItem {
  const { day, month, year } = parseTimestamp(post.timestamp);
  return {
    id: post.id,
    day,
    month,
    year,
    image: post.media_type === 'VIDEO' ? (post.thumbnail_url || post.media_url) : post.media_url,
    permalink: post.permalink,
  };
}

// ── Fallback placeholder data (used when API is unavailable) ──
const PLACEHOLDER_ITEMS: NewsItem[] = Array.from({ length: 12 }, (_, i) => ({
  id: String(i + 1),
  day: '17',
  month: 'Apr',
  year: '2026',
  image: '',
  permalink: 'https://www.instagram.com/ikamma_ugm/',
}));

// ── Card Component ─────────────────────────────────
function NewsCard({ item }: { item: NewsItem }) {
  return (
    <a
      href={item.permalink}
      target="_blank"
      rel="noopener noreferrer"
      className="relative w-full aspect-square cursor-pointer group block"
    >
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
        {/* Background fill */}
        <rect width="360" height="360" fill="#CBD5E1" clipPath={`url(#card-clip-${item.id})`} />
        {/* Image via foreignObject */}
        {item.image && (
          <foreignObject width="360" height="360" clipPath={`url(#card-clip-${item.id})`}>
            <img
              src={item.image}
              alt=""
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </foreignObject>
        )}
      </svg>

      {/* Date in the bottom-right notch */}
      <div className="absolute bottom-0 right-0 flex items-end pr-1 pb-1">
        <p className="text-sm font-medium text-white/90 whitespace-nowrap">
          {item.day} {item.month} <span className="text-[#00B894]">{item.year}</span>
        </p>
      </div>
    </a>
  );
}

// ── Section Component ──────────────────────────────
export function NewsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<NewsItem[]>(PLACEHOLDER_ITEMS);

  // Fetch IG posts from Netlify function
  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch('/api/instagram');
        if (!res.ok) throw new Error('API error');
        const data = await res.json();

        if (data?.data?.length) {
          const posts: NewsItem[] = data.data
            .slice(0, 12)
            .map((p: IGPost) => igPostToNewsItem(p));
          setItems(posts);
        }
      } catch {
        // Silently fall back to placeholders
        console.warn('Instagram API unavailable — using placeholders');
      }
    }
    fetchPosts();
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Columns 2 & 4 move up as you scroll (parallax)
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -250]);

  // Divide items into 4 columns of 3
  const columns = [
    items.slice(0, 3),
    items.slice(3, 6),
    items.slice(6, 9),
    items.slice(9, 12),
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
                  marginTop: isOffset ? 200 : 0,
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