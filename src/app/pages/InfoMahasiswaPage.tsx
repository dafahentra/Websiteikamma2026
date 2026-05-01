import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Clock, CalendarDays, Filter, Search, X, ArrowRight } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

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
  link: string;
  organizer: string;
}

/* ── Sample Data ───────────────────────────────────────────────── */
const INFO_ITEMS: InfoItem[] = [
  {
    id: 1,
    title: 'Internship at Bank Indonesia',
    category: 'Magang',
    postedDate: '25 Apr 2026',
    description: 'Program magang di Bank Indonesia untuk mahasiswa S1 semester 5-7 jurusan Ekonomi/Manajemen.',
    fullDescription: 'Program magang di Bank Indonesia untuk mahasiswa S1 semester 5-7 jurusan Ekonomi/Manajemen. Pengalaman langsung di institusi moneter nasional. Peserta akan ditempatkan di berbagai divisi seperti Departemen Kebijakan Makroprudensial, Departemen Pengelolaan Moneter, atau Departemen Komunikasi. Program berlangsung selama 3 bulan dengan tunjangan transport dan makan.',
    poster: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
    periodStart: '1 Mei 2026',
    periodEnd: '30 Juni 2026',
    status: 'open',
    link: '#',
    organizer: 'Bank Indonesia',
  },
  {
    id: 2,
    title: 'Garuda Indonesia Management Trainee',
    category: 'Magang',
    postedDate: '20 Apr 2026',
    description: 'Garuda Indonesia membuka program Management Trainee untuk lulusan baru S1 Manajemen.',
    fullDescription: 'Garuda Indonesia membuka program Management Trainee untuk lulusan baru S1 Manajemen. Peluang karir di industri penerbangan nasional. Program ini mencakup pelatihan intensif selama 6 bulan, rotasi di berbagai departemen, dan mentoring dari senior management. Lulusan program akan ditempatkan sebagai supervisor di berbagai unit bisnis.',
    poster: 'https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=800&q=80',
    periodStart: '15 Apr 2026',
    periodEnd: '15 Mei 2026',
    status: 'open',
    link: '#',
    organizer: 'Garuda Indonesia',
  },
  {
    id: 3,
    title: 'National Business Case Competition 2026',
    category: 'Lomba',
    postedDate: '18 Apr 2026',
    description: 'Kompetisi studi kasus bisnis tingkat nasional. Peserta akan menganalisis dan mempresentasikan solusi bisnis.',
    fullDescription: 'Kompetisi studi kasus bisnis tingkat nasional. Peserta akan menganalisis dan mempresentasikan solusi untuk masalah bisnis aktual. Terbuka untuk mahasiswa S1 aktif dari seluruh Indonesia. Format: tim 3 orang. Tahapan: seleksi proposal, babak penyisihan, semifinal, dan grand final di Jakarta. Total hadiah Rp 50.000.000.',
    poster: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    periodStart: '1 Jun 2026',
    periodEnd: '15 Jul 2026',
    status: 'open',
    link: '#',
    organizer: 'Kompetisi Nasional',
  },
  {
    id: 4,
    title: 'Beasiswa LPDP 2026',
    category: 'Beasiswa',
    postedDate: '10 Jan 2026',
    description: 'LPDP membuka pendaftaran beasiswa S2 dalam dan luar negeri untuk periode tahun 2026.',
    fullDescription: 'Lembaga Pengelola Dana Pendidikan membuka pendaftaran beasiswa S2 dalam dan luar negeri untuk periode tahun 2026. Beasiswa ini mencakup biaya kuliah penuh, biaya hidup, tiket pesawat PP, asuransi kesehatan, dan tunjangan buku. Terbuka untuk WNI berusia maksimal 35 tahun dengan IPK minimal 3.00.',
    poster: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80',
    periodStart: '1 Jan 2026',
    periodEnd: '28 Feb 2026',
    status: 'closed',
    link: '#',
    organizer: 'LPDP',
  },
  {
    id: 5,
    title: 'McKinsey Next Gen Women Leaders',
    category: 'Lomba',
    postedDate: '1 May 2026',
    description: 'Program pengembangan kepemimpinan perempuan oleh McKinsey & Company.',
    fullDescription: 'Program pengembangan kepemimpinan perempuan oleh McKinsey & Company untuk mahasiswa S1 dan S2 tingkat akhir. Peserta akan mendapat kesempatan networking dengan konsultan senior, workshop design thinking, dan case interview preparation. Finalis berkesempatan mendapatkan fast-track interview untuk posisi Business Analyst.',
    poster: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&q=80',
    periodStart: '10 Mei 2026',
    periodEnd: '20 Jun 2026',
    status: 'open',
    link: '#',
    organizer: 'McKinsey & Company',
  },
  {
    id: 6,
    title: 'Tokopedia Product & Tech Internship',
    category: 'Magang',
    postedDate: '1 Mar 2026',
    description: 'Program magang di divisi Product & Technology Tokopedia untuk mahasiswa semester 6-7.',
    fullDescription: 'Program magang di divisi Product & Technology Tokopedia. Terbuka untuk mahasiswa semester 6-7 jurusan terkait. Peserta akan bekerja langsung pada produk nyata dengan mentoring dari product manager dan engineer senior. Durasi 3-6 bulan dengan stipend kompetitif dan benefit makan siang.',
    poster: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80',
    periodStart: '1 Mar 2026',
    periodEnd: '30 Apr 2026',
    status: 'closed',
    link: '#',
    organizer: 'Tokopedia',
  },
  {
    id: 7,
    title: 'Beasiswa Bank Indonesia 2026',
    category: 'Beasiswa',
    postedDate: '10 Apr 2026',
    description: 'Bank Indonesia membuka program beasiswa untuk mahasiswa berprestasi Ekonomi & Manajemen.',
    fullDescription: 'Bank Indonesia membuka program beasiswa untuk mahasiswa berprestasi dari program studi Ekonomi, Manajemen, dan Akuntansi. Mencakup biaya pendidikan, biaya hidup, pelatihan softskill, dan kesempatan magang di BI. Syarat: IPK minimal 3.25, aktif berorganisasi, dan memiliki prestasi akademik/non-akademik.',
    poster: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
    periodStart: '15 Apr 2026',
    periodEnd: '31 Mei 2026',
    status: 'open',
    link: '#',
    organizer: 'Bank Indonesia',
  },
  {
    id: 8,
    title: 'Unilever Future Leaders Program',
    category: 'Magang',
    postedDate: '5 May 2026',
    description: 'Program pengembangan talenta Unilever untuk lulusan baru dengan rotasi di berbagai divisi.',
    fullDescription: 'Program pengembangan talenta Unilever untuk lulusan baru. Rotasi di berbagai divisi selama 3 tahun termasuk Marketing, Finance, Supply Chain, dan HR. Program ini menawarkan gaji kompetitif, overseas assignment, dan career acceleration menuju posisi manajerial dalam 3-5 tahun.',
    poster: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    periodStart: '20 Mei 2026',
    periodEnd: '30 Jun 2026',
    status: 'open',
    link: '#',
    organizer: 'Unilever',
  },
  {
    id: 9,
    title: 'CFA Institute Research Challenge',
    category: 'Lomba',
    postedDate: '15 Apr 2026',
    description: 'Kompetisi analisis ekuitas global oleh CFA Institute. Tim mahasiswa menganalisis perusahaan publik.',
    fullDescription: 'Kompetisi analisis ekuitas global yang diselenggarakan oleh CFA Institute. Tim mahasiswa menganalisis perusahaan publik dan mempresentasikan investment recommendation. Terbuka untuk tim 3-5 mahasiswa S1/S2. Pemenang level nasional akan mewakili Indonesia di level Asia Pacific dan Global Final.',
    poster: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    periodStart: '1 Sep 2026',
    periodEnd: '30 Nov 2026',
    status: 'open',
    link: '#',
    organizer: 'CFA Institute',
  },
];

const CATEGORIES: ('All' | Category)[] = ['All', 'Magang', 'Lomba', 'Beasiswa'];
const STATUS_FILTERS = ['All', 'Open Now', 'Closed'] as const;

const CATEGORY_COLORS: Record<Category, string> = {
  Magang: 'bg-blue-600',
  Lomba: 'bg-amber-500',
  Beasiswa: 'bg-indigo-600',
};

/* ── Component ─────────────────────────────────────────────────── */
export function InfoMahasiswaPage() {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<'All' | Category>('All');
  const [activeStatus, setActiveStatus] = useState<typeof STATUS_FILTERS[number]>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<InfoItem | null>(null);

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

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedItem]);

  const filtered = INFO_ITEMS.filter((item) => {
    const matchCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchStatus =
      activeStatus === 'All' ||
      (activeStatus === 'Open Now' && item.status === 'open') ||
      (activeStatus === 'Closed' && item.status === 'closed');
    const matchSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.organizer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchStatus && matchSearch;
  });

  return (
    <div className="min-h-screen bg-white text-[#081C36]">
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-16 px-6 lg:px-12 max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl mb-4 text-[#081C36] flex items-center gap-4">
            <span className="text-[#002444]">—</span>
            <span className="font-caslon-italic font-bold" style={{ fontFamily: "'Libre Caslon Text', serif" }}>Info</span>{' '}
            <span className="font-inter font-bold" style={{ fontFamily: "'Inter', sans-serif" }}>Mahasiswa</span>
          </h1>
          <p className="text-[#081C36]/50 text-lg md:text-xl font-inter max-w-2xl">
            Temukan peluang magang, lomba, dan beasiswa terbaru yang relevan untuk mahasiswa Manajemen FEB UGM.
          </p>
        </motion.div>
      </section>

      {/* Filters & Search */}
      <section className="px-6 lg:px-12 max-w-[1400px] mx-auto mb-8">
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
                  className={`px-5 py-2 text-sm font-inter font-medium transition-all duration-300 rounded-full border ${
                    activeCategory === cat
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
                className={`px-4 py-1.5 text-xs font-inter font-semibold transition-all duration-300 rounded-full border ${
                  activeStatus === s
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
      <section className="pb-24 px-6 lg:px-12 max-w-[1400px] mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + activeStatus + searchQuery}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                onClick={() => setSelectedItem(item)}
                className="flex flex-col border border-[#081C36]/10 bg-white hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                {/* Poster Image */}
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  <img
                    src={item.poster}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Status Badge */}
                  {item.status === 'open' ? (
                    <div className="absolute top-4 left-4 flex items-center gap-2 bg-[#081C36] px-3 py-1.5 rounded-full">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      <span className="text-white text-xs font-inter font-bold tracking-wider uppercase">OPEN</span>
                    </div>
                  ) : (
                    <div className="absolute top-4 left-4 bg-red-500/90 px-3 py-1.5 rounded-full">
                      <span className="text-white text-xs font-inter font-bold tracking-wider uppercase">CLOSED</span>
                    </div>
                  )}

                  {/* Category Badge */}
                  <div className={`absolute top-4 right-4 ${CATEGORY_COLORS[item.category]} px-3 py-1.5 rounded-full`}>
                    <span className="text-white text-xs font-inter font-bold tracking-wider uppercase">{item.category}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6">
                  {/* Posted Date */}
                  <p className="text-[#081C36]/35 text-xs font-inter mb-2">
                    Diposting {item.postedDate}
                  </p>

                  {/* Title */}
                  <h3 className="text-xl font-inter font-bold mb-3 line-clamp-2 min-h-[56px] text-[#081C36] group-hover:text-[#081C36]/70 transition-colors duration-300">
                    {item.title}
                  </h3>

                  {/* Organizer */}
                  <p className="text-[#081C36] text-sm font-inter font-semibold mb-2">
                    {item.organizer}
                  </p>

                  {/* Description */}
                  <p className="text-[#081C36]/50 text-sm font-inter leading-relaxed mb-5 line-clamp-2 flex-1">
                    {item.description}
                  </p>

                  {/* Period */}
                  <div className="flex items-center gap-2 text-[#081C36]/50 mb-2">
                    <CalendarDays size={14} className="text-[#081C36] shrink-0" />
                    <span className="text-sm font-inter">
                      {item.periodStart} — {item.periodEnd}
                    </span>
                  </div>

                  {/* View Detail CTA */}
                  <div className="mt-4 pt-4 border-t border-[#081C36]/10 flex items-center justify-between">
                    <span className="text-sm font-inter font-semibold text-[#081C36] group-hover:text-[#081C36]/70 transition-colors">
                      Lihat Detail
                    </span>
                    <ArrowRight size={16} className="text-[#081C36] group-hover:translate-x-1 transition-transform duration-300" />
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
      </section>

      {/* ── Detail Modal ──────────────────────────────────────── */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] flex items-center justify-center px-4 py-8"
            onClick={() => setSelectedItem(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto z-10 shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-[#081C36] hover:bg-[#081C36] hover:text-white transition-all duration-200 shadow-md"
              >
                <X size={18} />
              </button>

              {/* Poster */}
              <div className="relative w-full aspect-[16/9] overflow-hidden">
                <img
                  src={selectedItem.poster}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Badges on poster */}
                <div className="absolute bottom-4 left-6 flex items-center gap-3">
                  {selectedItem.status === 'open' ? (
                    <div className="flex items-center gap-2 bg-[#081C36] px-4 py-2 rounded-full">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      <span className="text-white text-xs font-inter font-bold tracking-wider uppercase">OPEN</span>
                    </div>
                  ) : (
                    <div className="bg-red-500/90 px-4 py-2 rounded-full">
                      <span className="text-white text-xs font-inter font-bold tracking-wider uppercase">CLOSED</span>
                    </div>
                  )}
                  <div className={`${CATEGORY_COLORS[selectedItem.category]} px-4 py-2 rounded-full`}>
                    <span className="text-white text-xs font-inter font-bold tracking-wider uppercase">{selectedItem.category}</span>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-8 md:p-10">
                {/* Posted Date */}
                <p className="text-[#081C36]/35 text-xs font-inter mb-3">
                  Diposting {selectedItem.postedDate}
                </p>

                {/* Title */}
                <h2 className="text-3xl md:text-4xl font-inter font-bold text-[#081C36] mb-2">
                  {selectedItem.title}
                </h2>

                {/* Organizer */}
                <p className="text-[#081C36]/60 text-base font-inter font-medium mb-6">
                  oleh {selectedItem.organizer}
                </p>

                {/* Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 p-5 bg-[#081C36]/[0.03] rounded-xl border border-[#081C36]/10">
                  <div className="flex items-start gap-3">
                    <CalendarDays size={18} className="text-[#081C36] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs font-inter text-[#081C36]/40 uppercase tracking-wider mb-1">Periode Pendaftaran</p>
                      <p className="text-sm font-inter font-semibold text-[#081C36]">{selectedItem.periodStart} — {selectedItem.periodEnd}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock size={18} className="text-[#081C36] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs font-inter text-[#081C36]/40 uppercase tracking-wider mb-1">Status</p>
                      <p className={`text-sm font-inter font-semibold ${selectedItem.status === 'open' ? 'text-blue-600' : 'text-red-500'}`}>
                        {selectedItem.status === 'open' ? 'Masih Dibuka' : 'Sudah Ditutup'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-lg font-inter font-bold text-[#081C36] mb-3">Deskripsi</h3>
                  <p className="text-[#081C36]/60 text-base font-inter leading-relaxed">
                    {selectedItem.fullDescription}
                  </p>
                </div>

                {/* CTA */}
                {selectedItem.status === 'open' ? (
                  <a
                    href={selectedItem.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 bg-[#081C36] text-white font-inter font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-[#0a2545] transition-colors duration-300 rounded-xl"
                  >
                    DAFTAR SEKARANG <ExternalLink size={16} />
                  </a>
                ) : (
                  <div className="w-full py-4 bg-[#081C36]/10 text-[#081C36]/40 font-inter font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 cursor-not-allowed rounded-xl">
                    PENDAFTARAN DITUTUP
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
