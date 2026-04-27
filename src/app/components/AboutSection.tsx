import { CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useRef } from 'react';
import { useInView } from 'motion/react';

const ABOUT_IMAGE =
  'https://images.unsplash.com/photo-1633296452834-0669c7669a34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5hZ2VtZW50JTIwZWNvbm9taWNzJTIwZmFjdWx0eSUyMGJ1aWxkaW5nJTIwdW5pdmVyc2l0eXxlbnwxfHx8fDE3NzcyOTg0MDZ8MA&ixlib=rb-4.1.0&q=80&w=900';

const points = [
  'Organisasi mahasiswa resmi Jurusan Manajemen FEB Universitas Gadjah Mada',
  'Program pengembangan kepemimpinan & soft skill bertaraf nasional',
  'Jaringan alumni Manajemen FEB UGM yang luas di berbagai industri',
  'Wadah aspirasi dan advokasi mahasiswa di lingkungan FEB UGM',
];

export function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-24 bg-white overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative order-2 lg:order-1"
          >
            {/* Decorative background shapes */}
            <div className="absolute -bottom-6 -left-6 w-[90%] h-[90%] bg-[#00A855]/8 rounded-2xl" />
            <div className="absolute -top-5 -right-5 w-20 h-20 bg-[#7684AD]/15 rounded-xl" />
            <div className="absolute top-8 -right-3 w-4 h-4 bg-[#00A855] rounded-full" />

            {/* Main image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={ABOUT_IMAGE}
                alt="Tentang IKAMMA"
                className="w-full object-cover"
                style={{ height: '520px' }}
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#06244A]/30 to-transparent" />
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-5 -right-5 bg-[#06244A] text-white p-5 rounded-2xl shadow-2xl">
              <div
                className="font-caslon text-[#00A855]"
                style={{ fontSize: '36px', lineHeight: 1 }}
              >
                30+
              </div>
              <div className="text-white/70" style={{ fontSize: '13px', marginTop: 4 }}>
                Tahun Berdiri
              </div>
            </div>

            {/* Small accent card */}
            <div className="absolute top-6 -left-5 bg-[#00A855] text-white px-4 py-3 rounded-xl shadow-xl">
              <div
                className="font-caslon"
                style={{ fontSize: '22px', lineHeight: 1 }}
              >
                1000+
              </div>
              <div style={{ fontSize: '11px', opacity: 0.85, marginTop: 2 }}>Anggota Aktif</div>
            </div>
          </motion.div>

          {/* Text column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            {/* Section label */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-0.5 bg-[#00A855]" />
              <span className="text-[#00A855] tracking-widest uppercase" style={{ fontSize: '12px' }}>
                Tentang Kami
              </span>
            </div>

            <h2
              className="font-caslon text-[#06244A] mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.15 }}
            >
              Siapa Itu{' '}
              <span className="font-caslon-italic text-[#00A855]">IKAMMA?</span>
            </h2>

            <p className="text-[#7684AD] mb-5" style={{ fontSize: '17px', lineHeight: 1.75 }}>
              <strong>IKAMMA</strong> (Ikatan Keluarga Mahasiswa Manajemen) adalah organisasi kemahasiswaan resmi
              yang menaungi seluruh mahasiswa aktif Jurusan Manajemen Fakultas Ekonomika dan Bisnis
              Universitas Gadjah Mada.
            </p>

            <p className="text-[#7684AD] mb-8" style={{ lineHeight: 1.75 }}>
              Berdiri lebih dari <strong>30 tahun</strong> silam, IKAMMA hadir sebagai rumah bagi ribuan mahasiswa
              Manajemen FEB UGM — menyediakan ruang tumbuh dalam kepemimpinan, prestasi akademik,
              pengabdian masyarakat, dan jejaring alumni yang solid di berbagai sektor industri.
            </p>

            {/* Key points */}
            <div className="space-y-3 mb-10">
              {points.map((point, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="text-[#00A855] flex-shrink-0 mt-0.5" size={18} />
                  <span className="text-[#06244A]" style={{ fontSize: '15px' }}>
                    {point}
                  </span>
                </div>
              ))}
            </div>

            {/* Visi & Misi cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#06244A] text-white p-5 rounded-2xl">
                <div
                  className="font-caslon-italic text-[#00A855] mb-2"
                  style={{ fontSize: '20px' }}
                >
                  Visi
                </div>
                <p className="text-white/75" style={{ fontSize: '13px', lineHeight: 1.65 }}>
                  Menjadi organisasi mahasiswa manajemen terdepan yang melahirkan pemimpin
                  berintegritas dan berdampak bagi masyarakat Indonesia.
                </p>
              </div>
              <div className="bg-gray-50 border border-gray-200 p-5 rounded-2xl">
                <div
                  className="font-caslon-italic text-[#06244A] mb-2"
                  style={{ fontSize: '20px' }}
                >
                  Misi
                </div>
                <p className="text-[#7684AD]" style={{ fontSize: '13px', lineHeight: 1.65 }}>
                  Membangun karakter, kompetensi, dan kolaborasi anggota demi kemajuan
                  FEB UGM dan bangsa Indonesia.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}