import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { motion } from 'framer-motion';
import { Clock, User, ChevronDown } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

/* ── Sample Data ─────────────────────────────────────────────────── */
const CATEGORIES = ['All Topics', 'IKAMMA Insights', 'Campus Life', 'Career', 'Alumni'];

const ARTICLES = [
  {
    id: 1,
    category: 'IKAMMA Insights',
    title: 'Membangun Solidaritas Melalui Program Kerja IKAMMA 2026',
    description: 'Mengenal lebih dalam bagaimana program kerja IKAMMA membentuk karakter dan solidaritas antar mahasiswa manajemen FEB UGM.',
    author: 'Tim Redaksi',
    date: 'Apr 28, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1523580494112-071d16940d14?w=800&q=80',
  },
  {
    id: 2,
    category: 'Campus Life',
    title: 'Tips Sukses Menghadapi UTS Semester Genap',
    description: 'Strategi belajar efektif yang bisa kamu terapkan untuk menghadapi Ujian Tengah Semester dengan percaya diri.',
    author: 'Dept. Indev',
    date: 'Apr 22, 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?w=800&q=80',
  },
  {
    id: 3,
    category: 'Career',
    title: 'Internship 101: Panduan Lengkap Magang untuk Mahasiswa Manajemen',
    description: 'Dari persiapan CV hingga menghadapi interview — semua yang perlu kamu ketahui sebelum mendaftar magang.',
    author: 'Dept. External',
    date: 'Apr 15, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
  },
  {
    id: 4,
    category: 'IKAMMA Insights',
    title: 'Rekapitulasi Kegiatan IKAMMA Semester Ganjil 2025/2026',
    description: 'Menilik kembali pencapaian dan kegiatan yang telah dilaksanakan IKAMMA pada semester ganjil tahun ini.',
    author: 'Biro HRM',
    date: 'Apr 10, 2026',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
  },
  {
    id: 5,
    category: 'Alumni',
    title: 'Kisah Sukses Alumni Manajemen UGM di Dunia Startup',
    description: 'Tiga alumni manajemen UGM berbagi pengalaman mereka membangun startup dari nol hingga meraih pendanaan.',
    author: 'Tim Redaksi',
    date: 'Apr 5, 2026',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80',
  },
  {
    id: 6,
    category: 'Campus Life',
    title: 'Mengenal Lebih Dekat Organisasi Mahasiswa di FEB UGM',
    description: 'Panduan lengkap tentang berbagai organisasi mahasiswa yang ada di Fakultas Ekonomika dan Bisnis UGM.',
    author: 'Dept. Internal',
    date: 'Mar 30, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80',
  },
];

export function ArticlesPage() {
  const { pathname } = useLocation();
  const [activeCategory, setActiveCategory] = useState('All Topics');
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const filtered = activeCategory === 'All Topics'
    ? ARTICLES
    : ARTICLES.filter(a => a.category === activeCategory);

  const visible = filtered.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-[#0C2340] text-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-12 px-6 lg:px-12 max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-inter font-bold mb-4">
            All Posts
          </h1>
          <p className="text-white/60 text-lg md:text-xl font-inter max-w-2xl">
            Browse by topic or interest to find what matters most to you.
          </p>
        </motion.div>

        {/* Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-3 mt-10"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setVisibleCount(6); }}
              className={`px-5 py-2 rounded-full text-sm font-inter font-medium transition-all duration-300 border ${
                activeCategory === cat
                  ? 'bg-[#0CA678] border-[#0CA678] text-white shadow-lg shadow-[#0CA678]/20'
                  : 'bg-white/[0.04] border-white/[0.1] text-white/60 hover:bg-white/[0.08] hover:text-white'
              }`}
            >
              {cat}
              {cat !== 'All Topics' && (
                <ChevronDown size={14} className="inline ml-1.5 opacity-50" />
              )}
            </button>
          ))}
        </motion.div>
      </section>

      {/* Articles Grid */}
      <section className="pb-24 px-6 lg:px-12 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visible.map((article, i) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="group cursor-pointer flex flex-col"
            >
              {/* Image */}
              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-5 bg-white/[0.04]">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Category Tag */}
              <span className="inline-block w-fit px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.08] text-[#0CA678] text-xs font-inter font-medium mb-3">
                {article.category}
              </span>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-inter font-bold mb-3 group-hover:text-[#0CA678] transition-colors duration-300 line-clamp-2">
                {article.title}
              </h3>

              {/* Description */}
              <p className="text-white/50 text-sm md:text-base font-inter leading-relaxed mb-4 line-clamp-2">
                {article.description}
              </p>

              {/* Meta */}
              <div className="mt-auto flex items-center justify-between text-white/40 text-sm font-inter">
                <div className="flex items-center gap-1.5">
                  <User size={14} />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span>{article.date}</span>
                  <div className="flex items-center gap-1">
                    <Clock size={13} />
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Load More */}
        {visibleCount < filtered.length && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mt-16"
          >
            <button
              onClick={() => setVisibleCount(prev => prev + 6)}
              className="px-8 py-3 rounded-full border border-white/[0.15] text-white/70 font-inter font-medium hover:bg-white/[0.06] hover:text-white transition-all duration-300"
            >
              Load More Articles
            </button>
          </motion.div>
        )}
      </section>

      <Footer />
    </div>
  );
}
