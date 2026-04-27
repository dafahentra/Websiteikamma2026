import { MapPin, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useRef } from 'react';
import { useInView } from 'motion/react';

const events = [
  {
    date: { day: '10', month: 'Mei', year: '2026' },
    title: 'IKAMMA Leadership Summit 2026',
    location: 'Auditorium FEB UGM, Yogyakarta',
    time: '08.00 – 16.00 WIB',
    category: 'Kepemimpinan',
    description:
      'Forum diskusi kepemimpinan tahunan IKAMMA menghadirkan alumni terkemuka Manajemen FEB UGM dan tokoh industri nasional sebagai pembicara inspiratif.',
    categoryBg: 'bg-blue-100',
    categoryText: 'text-blue-700',
  },
  {
    date: { day: '24', month: 'Mei', year: '2026' },
    title: 'Magang Fair & Career Expo 2026',
    location: 'Gedung FEB UGM, Yogyakarta',
    time: '09.00 – 17.00 WIB',
    category: 'Karir',
    description:
      'Pameran lowongan magang dan karir bersama 50+ perusahaan terkemuka khusus untuk mahasiswa aktif Manajemen FEB UGM dan alumni.',
    categoryBg: 'bg-purple-100',
    categoryText: 'text-purple-700',
  },
  {
    date: { day: '07', month: 'Jun', year: '2026' },
    title: 'Business Plan Competition IKAMMA',
    location: 'FEB UGM, Yogyakarta',
    time: '08.00 – 18.00 WIB',
    category: 'Kompetisi',
    description:
      'Kompetisi business plan tingkat nasional yang terbuka bagi mahasiswa S1 seluruh Indonesia dengan total hadiah senilai Rp 50 juta.',
    categoryBg: 'bg-green-100',
    categoryText: 'text-green-700',
  },
  {
    date: { day: '28', month: 'Jun', year: '2026' },
    title: 'Musyawarah Besar IKAMMA 2026',
    location: 'Ruang Sidang FEB UGM',
    time: '10.00 – 16.00 WIB',
    category: 'Organisasi',
    description:
      'Musyawarah besar untuk evaluasi program kerja tahunan dan pemilihan pengurus baru IKAMMA periode 2026–2027.',
    categoryBg: 'bg-amber-100',
    categoryText: 'text-amber-700',
  },
];

export function EventsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="events" className="py-24 bg-white" ref={ref}>
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
                Our Events
              </span>
            </div>
            <h2
              className="font-caslon text-[#06244A]"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.15 }}
            >
              Kegiatan <span className="font-caslon-italic text-[#00A855]">Mendatang</span>
            </h2>
          </div>
          <button className="inline-flex items-center gap-2 text-[#00A855] hover:text-[#008844] transition-colors flex-shrink-0" style={{ fontSize: '14px' }}>
            Lihat Semua Kegiatan <ArrowRight size={16} />
          </button>
        </div>

        {/* Events */}
        <div className="space-y-5">
          {events.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="group flex flex-col sm:flex-row gap-5 p-6 bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200 rounded-2xl transition-all duration-300 hover:shadow-lg cursor-pointer"
            >
              {/* Date box */}
              <div className="flex-shrink-0 w-20 h-20 bg-[#06244A] rounded-2xl flex flex-col items-center justify-center text-white group-hover:bg-[#00A855] transition-colors duration-300">
                <span
                  className="font-caslon text-white"
                  style={{ fontSize: '28px', lineHeight: 1 }}
                >
                  {event.date.day}
                </span>
                <span className="text-white/75 uppercase" style={{ fontSize: '11px' }}>
                  {event.date.month}
                </span>
                <span className="text-white/50" style={{ fontSize: '10px' }}>
                  {event.date.year}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="mb-2">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full ${event.categoryBg} ${event.categoryText}`}
                    style={{ fontSize: '11px' }}
                  >
                    {event.category}
                  </span>
                </div>
                <h3
                  className="font-caslon text-[#06244A] mb-2 group-hover:text-[#00A855] transition-colors"
                  style={{ fontSize: '20px' }}
                >
                  {event.title}
                </h3>
                <p className="text-[#7684AD] mb-3" style={{ fontSize: '14px', lineHeight: 1.6 }}>
                  {event.description}
                </p>
                <div className="flex flex-wrap gap-4 text-[#7684AD]" style={{ fontSize: '13px' }}>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={13} /> {event.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={13} /> {event.time}
                  </span>
                </div>
              </div>

              {/* CTA */}
              <div className="flex-shrink-0 flex items-center">
                <button className="bg-[#00A855] text-white px-6 py-2.5 rounded-xl hover:bg-[#008844] transition-colors whitespace-nowrap" style={{ fontSize: '14px' }}>
                  Daftar
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}