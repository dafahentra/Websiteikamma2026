import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { NEWS_PLACEHOLDER_PHOTOS, NEWS_BG } from '../../assets/photos';

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

// Fallback placeholder data (used when API is unavailable)
const PLACEHOLDER_ITEMS: NewsItem[] = Array.from({ length: 12 }, (_, i) => ({
  id: String(i + 1),
  day: '17',
  month: 'Apr',
  year: '2026',
  image: NEWS_PLACEHOLDER_PHOTOS[i],
  permalink: 'https://www.instagram.com/ikamma_ugm/',
}));

// ── Card Component ─────────────────────────────────
function NewsCard({ item }: { item: NewsItem }) {
  return (
    <div className="relative w-full aspect-square group">
      {/* The Clipped Image Container */}
      <a
        href={item.permalink}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 cursor-pointer block"
        style={{ clipPath: 'url(#news-clip-path)' }}
      >
        <div className="w-full h-full overflow-hidden bg-[#1A2E44]">
          {item.image ? (
            <img
              src={item.image}
              alt=""
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full bg-[#1A2E44]" />
          )}
        </div>
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
      </a>

      {/* Date - outside the clip path so it shows up in the bottom right corner */}
      <div className="absolute bottom-[2%] right-[2%] pointer-events-none z-20">
        <p className="text-[12px] md:text-[14px] font-inter font-bold leading-none tracking-tight whitespace-nowrap">
          <span className="text-[#081C36]">{item.day} {item.month}</span>{' '}
          <span className="text-[#3B82F6]">{item.year}</span>
        </p>
      </div>
    </div>
  );
}

// ── Section Component ──────────────────────────────
export function NewsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<NewsItem[]>(PLACEHOLDER_ITEMS);
  const [bgImage] = useState(() => NEWS_BG);

  // Fetch IG posts from Netlify function
  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/api/instagram');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        // data.data is the array of posts
        const formatted = (data.data || []).slice(0, 12).map(igPostToNewsItem);
        if (formatted.length > 0) {
          setItems(formatted);
        }
      } catch (err) {
        console.error('Error fetching Instagram posts:', err);
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

  // Locomotive-style background parallax (moves slower than content)
  const bgParallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  // Desktop: 4 columns of 3
  const colsDesktop = [
    items.slice(0, 3),
    items.slice(3, 6),
    items.slice(6, 9),
    items.slice(9, 12),
  ];

  // Mobile: 2 columns of 6
  const colsMobile = [
    items.filter((_, i) => i % 2 === 0),
    items.filter((_, i) => i % 2 === 1),
  ];

  return (
    <section ref={sectionRef} className="relative w-full py-24 bg-white text-[#081C36] overflow-hidden">
      {/* Invisible SVG for clip-path */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="news-clip-path" clipPathUnits="objectBoundingBox">
            <path 
              transform="scale(0.002777777777777778, 0.002777777777777778)"
              d="M0 27C0 12.0883 12.0883 0 27 0H101H330C346.569 0 360 13.4315 360 30V291C360 307.569 346.569 321 330 321H238.205C230.38 321 222.864 324.057 217.262 329.52L194.738 351.48C189.136 356.943 181.62 360 173.795 360H30C13.4315 360 0 346.569 0 330V27Z" 
            />
          </clipPath>
        </defs>
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">

        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[#081C36] text-4xl md:text-5xl flex items-center gap-3 mb-4"
          >
            <span className="text-[#081C36]">—</span>
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
            <a href="https://www.instagram.com/ikamma_ugm/" target="_blank" rel="noopener noreferrer" className="text-[#081C36]/60 text-lg font-light">
              Follow for more!
            </a>
            <div className="absolute -bottom-2 left-0 w-full h-[1px] bg-[#081C36]/30" />
          </motion.div>
        </div>

        {/* Desktop 4-Column Grid */}
        <div className="hidden md:grid grid-cols-4 gap-5">
          {colsDesktop.map((col, colIdx) => {
            const isOffset = colIdx === 1 || colIdx === 3;

            return (
              <motion.div
                key={`desktop-${colIdx}`}
                className="flex flex-col gap-5"
                style={{
                  marginTop: isOffset ? 200 : 0,
                  y: isOffset ? parallaxY : 0,
                }}
              >
                {col.map((item) => (
                  <NewsCard key={`desktop-${item.id}`} item={item} />
                ))}
              </motion.div>
            );
          })}
        </div>

        {/* Mobile 2-Column Grid */}
        <div className="grid md:hidden grid-cols-2 gap-4">
          {colsMobile.map((col, colIdx) => {
            const isOffset = colIdx === 1;

            return (
              <motion.div
                key={`mobile-${colIdx}`}
                className="flex flex-col gap-4"
                style={{
                  marginTop: isOffset ? 100 : 0,
                  y: isOffset ? parallaxY : 0,
                }}
              >
                {col.map((item) => (
                  <NewsCard key={`mobile-${item.id}`} item={item} />
                ))}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}