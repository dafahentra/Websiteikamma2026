import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, Clock, User } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
const MicroShape = ({ className, delay = 0, duration = 5, size = "w-20 h-20" }: { className: string, delay?: number, duration?: number, size?: string }) => (
  <motion.div
    className={`absolute pointer-events-none select-none rounded-full bg-white/10 blur-[40px] ${size} ${className}`}
    animate={{
      y: [0, -30, 0],
      x: [0, 15, 0],
      opacity: [0.05, 0.15, 0.05],
    }}
    transition={{
      duration,
      repeat: Infinity,
      ease: "easeInOut",
      delay
    }}
  />
);

const DotPattern = ({ className }: { className: string }) => (
  <div className={`absolute pointer-events-none select-none opacity-[0.03] ${className}`} style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
);

import { ARTICLES_PAGE_PHOTOS, ARTICLES_PAGE_HERO } from '../../assets/photos';

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
    image: '',
  },
  {
    id: 2,
    category: 'Campus Life',
    title: 'Tips Sukses Menghadapi UTS Semester Genap',
    description: 'Strategi belajar efektif yang bisa kamu terapkan untuk menghadapi Ujian Tengah Semester dengan percaya diri.',
    author: 'Dept. Indev',
    date: 'Apr 22, 2026',
    readTime: '4 min read',
    image: '',
  },
  {
    id: 3,
    category: 'Career',
    title: 'Internship 101: Panduan Lengkap Magang untuk Mahasiswa Manajemen',
    description: 'Dari persiapan CV hingga menghadapi interview — semua yang perlu kamu ketahui sebelum mendaftar magang.',
    author: 'Dept. External',
    date: 'Apr 15, 2026',
    readTime: '6 min read',
    image: '',
  },
  {
    id: 4,
    category: 'IKAMMA Insights',
    title: 'Rekapitulasi Kegiatan IKAMMA Semester Ganjil 2025/2026',
    description: 'Menilik kembali pencapaian dan kegiatan yang telah dilaksanakan IKAMMA pada semester ganjil tahun ini.',
    author: 'Biro HRM',
    date: 'Apr 10, 2026',
    readTime: '7 min read',
    image: '',
  },
  {
    id: 5,
    category: 'Alumni',
    title: 'Kisah Sukses Alumni Manajemen UGM di Dunia Startup',
    description: 'Tiga alumni manajemen UGM berbagi pengalaman mereka membangun startup dari nol hingga meraih pendanaan.',
    author: 'Tim Redaksi',
    date: 'Apr 5, 2026',
    readTime: '8 min read',
    image: '',
  },
  {
    id: 6,
    category: 'Campus Life',
    title: 'Mengenal Lebih Dekat Organisasi Mahasiswa di FEB UGM',
    description: 'Panduan lengkap tentang berbagai organisasi mahasiswa yang ada di Fakultas Ekonomika dan Bisnis UGM.',
    author: 'Dept. Internal',
    date: 'Mar 30, 2026',
    readTime: '5 min read',
    image: '',
  },
];

// Assign photos from the registry
ARTICLES.forEach((art, i) => { art.image = ARTICLES_PAGE_PHOTOS[i]; });

export function ArticlesPage() {
  const { pathname } = useLocation();
  const [activeCategory, setActiveCategory] = useState('All Topics');
  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Track window size for responsive itemsPerPage
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset to page 1 on category change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const filtered = activeCategory === 'All Topics'
    ? ARTICLES
    : ARTICLES.filter(a => a.category === activeCategory);

  const itemsPerPage = isMobile ? 4 : 6;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visible = filtered.slice(startIndex, startIndex + itemsPerPage);

  const scrollToGrid = () => {
    const grid = document.getElementById('articles-grid');
    if (grid) {
      grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
      scrollToGrid();
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      scrollToGrid();
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#081C36]">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden bg-[#081C36]">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={ARTICLES_PAGE_HERO}
            alt="Articles Hero"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#081C36]/80 via-transparent to-[#081C36]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#081C36]/50 via-transparent to-[#081C36]/50" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto relative z-10 pt-16 text-center"
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <MicroShape className="-top-20 right-[10%]" size="w-72 h-72" delay={0.5} duration={10} />
            <MicroShape className="bottom-0 -left-10" size="w-64 h-64" delay={2} duration={8} />
            <DotPattern className="top-1/4 left-[5%] w-20 h-40" />
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl mb-4 text-white tracking-tight relative z-10">
            <span className="font-caslon-italic font-bold">Artikel</span> <span className="font-inter font-bold">IKAMMA</span>
          </h1>
          <p className="text-white/80 text-sm md:text-xl font-inter max-w-2xl mx-auto px-4">
            Get the latest updates and deeper insights from IKAMMA FEB UGM
          </p>
        </motion.div>
      </section>

      {/* Main Content Area */}
      <div id="articles-grid" className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-12 pb-24 scroll-mt-24">

        {/* Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-start gap-2 md:gap-3 py-8"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 md:px-5 md:py-2 rounded-full text-xs md:text-sm font-inter font-medium transition-all duration-300 border ${activeCategory === cat
                ? 'bg-[#081C36] border-[#081C36] text-white shadow-lg shadow-[#081C36]/20'
                : 'bg-white border-[#081C36]/10 text-[#081C36]/60 hover:bg-[#081C36]/5 hover:text-[#081C36]'
                }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Articles Grid (2 columns on mobile, 3 on desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
          {visible.map((article, i) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="group cursor-pointer flex flex-col bg-white rounded-xl md:rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Image */}
              <div className="w-full aspect-[4/3] md:aspect-[4/3] bg-[#081C36]/[0.03] overflow-hidden relative">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="p-3 md:p-5 flex flex-col flex-grow">
                {/* Header Meta: Category & Date */}
                <div className="flex flex-wrap items-center justify-between gap-1 mb-2 md:mb-3">
                  <span className="inline-block px-2 py-0.5 md:px-3 md:py-1 rounded-md bg-[#081C36]/[0.06] text-[#081C36] text-[9px] md:text-xs font-inter font-semibold">
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
                    <span>{article.readTime}</span>
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
            </motion.article>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-4 mt-10 md:mt-16"
          >
            <div className="flex items-center gap-4 md:gap-6">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`w-10 h-10 md:w-12 md:h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${currentPage === 1
                  ? 'border-[#081C36]/10 text-[#081C36]/30 cursor-not-allowed'
                  : 'border-[#081C36]/15 text-[#081C36] hover:bg-[#081C36] hover:text-white'
                  }`}
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setCurrentPage(i + 1);
                      scrollToGrid();
                    }}
                    className={`rounded-full transition-all duration-300 ${currentPage === i + 1
                      ? 'w-2.5 h-2.5 md:w-3 md:h-3 bg-[#081C36]'
                      : 'w-2 h-2 md:w-2.5 md:h-2.5 bg-[#081C36]/20 hover:bg-[#081C36]/50'
                      }`}
                    aria-label={`Go to page ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`w-10 h-10 md:w-12 md:h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${currentPage === totalPages
                  ? 'border-[#081C36]/10 text-[#081C36]/30 cursor-not-allowed'
                  : 'border-[#081C36]/15 text-[#081C36] hover:bg-[#081C36] hover:text-white'
                  }`}
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <span className="text-[#081C36]/50 font-inter text-xs md:text-sm font-medium">
              Page {currentPage} of {totalPages}
            </span>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
}
