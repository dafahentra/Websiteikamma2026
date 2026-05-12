import { useEffect, useState } from 'react';
import { useLocation, useSearchParams, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Clock, CalendarDays, Filter, Search, X, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { createSlug } from '../../lib/slugify';
import { INFO_MAHASISWA_PHOTOS, INFO_MAHASISWA_HERO } from '../../assets/photos';
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

/* ── Types ─────────────────────────────────────────────────────── */
type Category = 'Magang' | 'Lomba' | 'Beasiswa';
type Status = 'open' | 'closed';

interface InfoItem {
  id: number;
  title: string;
  category: Category;
  postedDate: string;
  description: string;
  fullDescription: string;
  poster: string;
  periodStart: string;
  periodEnd: string;
  status: Status;
  deadlineDate?: string;
  link: string;
  organizer: string;
}

/* ── Sample Data ───────────────────────────────────────────────── */
/* ── Component ─────────────────────────────────────────────────── */
export function InfoMahasiswaPage() {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<'All' | Category>('All');
  const [activeStatus, setActiveStatus] = useState<typeof STATUS_FILTERS[number]>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const [infoItems, setInfoItems] = useState<InfoItem[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchInfo = async () => {
      const { data } = await supabase
        .from('info_mahasiswa')
        .select('id, title, category, posted_date, description, full_description, poster_url, period_start, period_end, status, link, organizer, work_type')
        .order('created_at', { ascending: false });
      
      if (data) {
        const mappedData: InfoItem[] = data.map((item: any, index: number) => ({
          id: item.id,
          title: item.title,
          category: item.category,
          postedDate: item.posted_date,
          description: item.description,
          fullDescription: item.full_description,
          poster: item.poster_url || INFO_MAHASISWA_PHOTOS[index % INFO_MAHASISWA_PHOTOS.length],
          periodStart: item.period_start,
          periodEnd: item.period_end,
          status: item.status,
          deadlineDate: item.deadline_date,
          link: item.link,
          organizer: item.organizer,
        }));
        setInfoItems(mappedData);
      }
    };
    fetchInfo();
  }, []);

const CATEGORIES: ('All' | Category)[] = ['All', 'Magang', 'Lomba', 'Beasiswa'];
const STATUS_FILTERS = ['All', 'Open Now', 'Closed'] as const;

const CATEGORY_COLORS: Record<Category, string> = {
  Magang: 'bg-[#86A0D3]',
  Lomba: 'bg-[#86A0D3]',
  Beasiswa: 'bg-[#86A0D3]',
};

  // Track window size for responsive itemsPerPage
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, activeStatus, searchQuery]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Read ?category= from URL
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && CATEGORIES.includes(cat as 'All' | Category)) {
      setActiveCategory(cat as 'All' | Category);
    }
  }, [searchParams]);



  const filtered = infoItems.filter((item) => {
    const matchCategory = activeCategory === 'All' || item.category === activeCategory;
    
    // Smart Status Detection Fallback
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const parseIKAMMADate = (str: string) => {
      if (!str) return null;
      const parts = str.split(' ');
      if (parts.length !== 3) return null;
      const day = parseInt(parts[0]);
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
      const month = months.indexOf(parts[1]);
      const year = parseInt(parts[2]);
      if (month === -1) return null;
      return new Date(year, month, day);
    };

    const deadline = item.deadlineDate ? new Date(item.deadlineDate) : parseIKAMMADate(item.periodEnd);
    if (deadline) deadline.setHours(0, 0, 0, 0);

    const isActuallyClosed = (deadline && now > deadline) || item.status === 'closed';

    const matchStatus =
      activeStatus === 'All' ||
      (activeStatus === 'Open Now' && !isActuallyClosed) ||
      (activeStatus === 'Closed' && isActuallyClosed);
    
    const matchSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.organizer.toLowerCase().includes(searchQuery.toLowerCase());

    return matchCategory && matchStatus && matchSearch;
  });

  const itemsPerPage = isMobile ? 4 : 6;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visible = filtered.slice(startIndex, startIndex + itemsPerPage);

  const scrollToGrid = () => {
    const grid = document.getElementById('info-grid');
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
            src={INFO_MAHASISWA_HERO}
            alt="Info Mahasiswa Hero"
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
            {/* Ambient Blurs */}
            <MicroShape className="-top-10 -left-10" size="w-64 h-64" delay={0} duration={8} />
            <MicroShape className="top-1/2 -right-20" size="w-80 h-80" delay={2} duration={10} />
            <MicroShape className="-bottom-20 left-1/3" size="w-72 h-72" delay={1} duration={9} />

            {/* Micro Dots */}
            <DotPattern className="top-20 right-20 w-32 h-32" />
            <DotPattern className="bottom-20 left-10 w-24 h-48" />
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl mb-4 text-white tracking-tight relative z-10">
            <span className="font-caslon-italic font-bold">Info</span> <span className="font-inter font-bold">Manajemen</span>
          </h1>
          <p className="text-white/80 text-sm md:text-xl font-inter max-w-2xl mx-auto px-4">
            Temukan peluang magang, lomba, dan beasiswa terbaru yang relevan untuk mahasiswa Manajemen FEB UGM.
          </p>
        </motion.div>
      </section>

      {/* Filters & Search */}
      <section className="px-6 lg:px-12 max-w-[1400px] mx-auto mb-8 mt-12 md:mt-20">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col gap-6"
        >
          {/* Row 1: Category + Search */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              <Filter size={18} className="text-[#081C36]/40" />
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 text-sm font-inter font-medium transition-all duration-300 rounded-full border ${activeCategory === cat
                    ? 'bg-[#081C36] border-[#081C36] text-white'
                    : 'bg-transparent border-[#081C36]/15 text-[#081C36]/60 hover:border-[#081C36]/40 hover:text-[#081C36]'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-80">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#081C36]/40" />
              <input
                type="text"
                placeholder="Cari info..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#081C36]/[0.03] border border-[#081C36]/15 rounded-full text-[#081C36] pl-11 pr-4 py-3 font-inter text-sm placeholder-[#081C36]/30 focus:outline-none focus:border-[#081C36] transition-colors"
              />
            </div>
          </div>

          {/* Row 2: Status Filter */}
          <div className="flex items-center gap-3">
            <Clock size={16} className="text-[#081C36]/40" />
            <span className="text-sm font-inter text-[#081C36]/40 mr-1">Status:</span>
            {STATUS_FILTERS.map((s) => (
              <button
                key={s}
                onClick={() => setActiveStatus(s)}
                className={`px-4 py-1.5 text-xs font-inter font-semibold transition-all duration-300 rounded-full border ${activeStatus === s
                  ? 'bg-[#081C36] border-[#081C36] text-white'
                  : 'bg-transparent border-[#081C36]/15 text-[#081C36]/50 hover:border-[#081C36]/30 hover:text-[#081C36]'
                  }`}
              >
                {s}
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Results Count */}
      <section className="px-6 lg:px-12 max-w-[1400px] mx-auto mb-6">
        <p className="text-[#081C36]/40 text-sm font-inter">
          Menampilkan <span className="text-[#081C36] font-medium">{filtered.length}</span> hasil
        </p>
      </section>

      {/* Cards Grid */}
      <section id="info-grid" className="pb-24 px-4 md:px-6 lg:px-12 max-w-[1400px] mx-auto scroll-mt-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + activeStatus + searchQuery + currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8"
          >
            {visible.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                onClick={() => navigate('/info-mahasiswa/' + createSlug(item.title))}
                className="group cursor-pointer flex flex-col bg-white rounded-xl md:rounded-2xl border border-[#081C36]/10 overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                {/* Poster Image */}
                <div className="relative w-full aspect-[4/3] md:aspect-[4/3] overflow-hidden bg-[#081C36]/[0.03]">
                  <img
                    src={item.poster}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-2 left-2 md:top-3 md:left-3">
                    {(() => {
                      const now = new Date();
                      now.setHours(0, 0, 0, 0);

                      const parseIKAMMADate = (str: string) => {
                        if (!str) return null;
                        const parts = str.split(' ');
                        if (parts.length !== 3) return null;
                        const day = parseInt(parts[0]);
                        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
                        const month = months.indexOf(parts[1]);
                        const year = parseInt(parts[2]);
                        if (month === -1) return null;
                        return new Date(year, month, day);
                      };

                      const deadline = item.deadlineDate ? new Date(item.deadlineDate) : parseIKAMMADate(item.periodEnd);
                      if (deadline) deadline.setHours(0, 0, 0, 0);

                      const isActuallyClosed = (deadline && now > deadline) || item.status === 'closed';
                      const displayStatus = isActuallyClosed ? 'closed' : item.status;
                      
                      return displayStatus === 'open' ? (
                        <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 h-7 md:px-4 md:h-10 rounded-full border border-white/30 shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
                          <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
                          <span className="text-white text-[10px] md:text-xs font-inter font-bold tracking-wider uppercase">OPEN</span>
                        </div>
                      ) : (
                        <div className="flex items-center bg-white/10 backdrop-blur-md px-3 h-7 md:px-4 md:h-10 rounded-full border border-white/20 shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
                          <span className="text-white text-[10px] md:text-xs font-inter font-bold tracking-wider uppercase">CLOSED</span>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* Content */}
                <div className="p-3 md:p-5 flex flex-col flex-grow">
                  {/* Header Meta: Category & Date */}
                  <div className="flex flex-wrap items-center justify-between gap-1 mb-2 md:mb-3">
                    <span className={`flex items-center px-3 h-7 md:px-4 md:h-10 rounded-full text-white text-[10px] md:text-xs font-inter font-bold uppercase tracking-wider ${CATEGORY_COLORS[item.category]}`}>
                      {item.category}
                    </span>
                    <span className="text-[#081C36]/50 text-xs sm:text-sm font-inter">
                      {item.periodStart === item.periodEnd ? item.periodStart : `${item.periodStart} - ${item.periodEnd}`}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm md:text-2xl font-inter font-bold mb-1 group-hover:text-[#081C36]/70 transition-colors duration-300 line-clamp-2 leading-snug">
                    {item.title}
                  </h3>

                  {/* Footer Meta: Organizer */}
                  <div className="flex flex-col gap-1 md:gap-2 text-[#081C36]/50 text-xs sm:text-sm font-inter mb-3 md:mb-4">
                    <div className="flex items-center gap-1 font-semibold text-[#081C36]">
                      <span>{item.organizer}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <div 
                    className="text-[#081C36]/60 text-[11px] md:text-base font-inter leading-relaxed mb-3 md:mb-4 line-clamp-2 md:line-clamp-3 prose-p:my-0"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />

                  {/* CTA */}
                  <div className="mt-auto flex justify-end">
                    <span className="text-[#081C36] text-[10px] md:text-sm font-bold flex items-center gap-1 group-hover:underline">
                      Lihat Detail <ArrowRight size={14} className="md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <p className="text-[#081C36]/40 text-lg font-inter">Tidak ada info yang ditemukan.</p>
          </motion.div>
        )}

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
      </section>



      <Footer />
    </div>
  );
}
