import { Calendar, ArrowRight, Tag } from 'lucide-react';
import { motion } from 'motion/react';
import { useRef } from 'react';
import { useInView } from 'motion/react';

const news = [
  {
    date: '20 April 2026',
    category: 'Prestasi',
    categoryBg: 'bg-blue-100',
    categoryText: 'text-blue-700',
    title: 'Tim IKAMMA Raih Juara 1 National Business Plan Competition 2026',
    excerpt:
      'Delegasi mahasiswa Manajemen FEB UGM membawa pulang Juara 1 kompetisi business plan bergengsi tingkat nasional yang diselenggarakan di Jakarta, mengalahkan lebih dari 200 tim peserta.',
    image: 'https://images.unsplash.com/photo-1760385737059-c65b583ec23e?w=900&fit=crop&q=80',
    featured: true,
  },
  {
    date: '14 April 2026',
    category: 'Karir',
    categoryBg: 'bg-purple-100',
    categoryText: 'text-purple-700',
    title: 'IKAMMA Tanda Tangani MoU dengan 15 Perusahaan untuk Magang Fair 2026',
    excerpt:
      'IKAMMA resmi bermitra dengan 15 perusahaan Fortune 500 Indonesia untuk membuka akses magang eksklusif bagi mahasiswa Manajemen FEB UGM.',
    image: 'https://images.unsplash.com/photo-1719409015910-a878b729cb9b?w=500&fit=crop&q=80',
    featured: false,
  },
  {
    date: '8 April 2026',
    category: 'Sosial',
    categoryBg: 'bg-green-100',
    categoryText: 'text-green-700',
    title: 'Program Pengabdian Masyarakat IKAMMA Sentuh 500 Warga Gunungkidul',
    excerpt:
      'Ratusan anggota IKAMMA bersama alumni turun langsung ke desa-desa di Gunungkidul, memberikan pelatihan manajemen usaha kecil dan pemberdayaan masyarakat.',
    image: 'https://images.unsplash.com/photo-1758599668356-c8c919e24dda?w=500&fit=crop&q=80',
    featured: false,
  },
];

export function NewsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const featured = news[0];
  const rest = news.slice(1);

  return (
    <section id="news" className="py-24 bg-gray-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-0.5 bg-[#00A855]" />
              <span
                className="text-[#00A855] tracking-widest uppercase"
                style={{ fontSize: '12px' }}
              >
                Berita & Kabar
              </span>
            </div>
            <h2
              className="font-caslon text-[#06244A]"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.15 }}
            >
              Berita Terkini
            </h2>
          </div>
          <button
            className="inline-flex items-center gap-2 text-[#00A855] hover:text-[#008844] transition-colors flex-shrink-0"
            style={{ fontSize: '14px' }}
          >
            Lihat Semua Berita <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Featured */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 group cursor-pointer"
          >
            <div className="relative overflow-hidden rounded-2xl mb-6" style={{ height: '340px' }}>
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06244A]/75 via-[#06244A]/10 to-transparent" />
              <div className="absolute top-4 left-4">
                <span
                  className={`px-3 py-1 rounded-full ${featured.categoryBg} ${featured.categoryText}`}
                  style={{ fontSize: '12px' }}
                >
                  {featured.category}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <div
                  className="flex items-center gap-2 text-white/70 mb-2"
                  style={{ fontSize: '13px' }}
                >
                  <Calendar size={13} /> {featured.date}
                </div>
              </div>
            </div>

            <h3
              className="font-caslon text-[#06244A] mb-3 group-hover:text-[#00A855] transition-colors"
              style={{ fontSize: '26px', lineHeight: 1.25 }}
            >
              {featured.title}
            </h3>
            <p className="text-[#7684AD] mb-4" style={{ fontSize: '15px', lineHeight: 1.7 }}>
              {featured.excerpt}
            </p>
            <div
              className="flex items-center gap-2 text-[#00A855] group-hover:gap-3 transition-all"
              style={{ fontSize: '14px' }}
            >
              Baca Selengkapnya <ArrowRight size={15} />
            </div>
          </motion.article>

          {/* Side articles */}
          <div className="lg:col-span-2 space-y-5">
            {rest.map((article, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.12 }}
                className="group cursor-pointer flex gap-4 bg-white p-4 rounded-2xl hover:shadow-md transition-all duration-300 border border-gray-100"
              >
                {/* Thumb */}
                <div
                  className="flex-shrink-0 rounded-xl overflow-hidden"
                  style={{ width: '96px', height: '96px' }}
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full ${article.categoryBg} ${article.categoryText} mb-1`}
                    style={{ fontSize: '11px' }}
                  >
                    {article.category}
                  </span>
                  <h3
                    className="font-caslon text-[#06244A] group-hover:text-[#00A855] transition-colors line-clamp-2"
                    style={{ fontSize: '16px', lineHeight: 1.35 }}
                  >
                    {article.title}
                  </h3>
                  <div
                    className="flex items-center gap-1.5 text-[#7684AD] mt-2"
                    style={{ fontSize: '12px' }}
                  >
                    <Calendar size={11} /> {article.date}
                  </div>
                </div>
              </motion.article>
            ))}

            {/* Newsletter CTA */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-[#06244A] rounded-2xl p-6"
            >
              <Tag className="text-[#00A855] mb-3" size={22} />
              <h4 className="font-caslon text-white mb-2" style={{ fontSize: '20px' }}>
                Jangan Lewatkan Info IKAMMA
              </h4>
              <p className="text-white/60 mb-4" style={{ fontSize: '13px', lineHeight: 1.6 }}>
                Daftar newsletter dan dapatkan info terbaru seputar program, event, dan lowongan magang IKAMMA.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email Anda"
                  className="flex-1 min-w-0 bg-white/10 text-white placeholder-white/40 px-3 py-2 rounded-lg border border-white/15 focus:outline-none focus:border-[#00A855] transition-colors"
                  style={{ fontSize: '13px' }}
                />
                <button className="bg-[#00A855] text-white px-4 py-2 rounded-lg hover:bg-[#008844] transition-colors flex-shrink-0" style={{ fontSize: '13px' }}>
                  Kirim
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}