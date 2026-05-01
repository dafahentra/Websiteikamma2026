import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useRef } from 'react';
import { useInView } from 'motion/react';

import { getRandomPhotos } from '../../assets/photos';

const programs = [
  {
    title: 'Latihan Kepemimpinan Manajemen',
    category: 'Kepemimpinan',
    description:
      'Program LKM sebagai gerbang pengembangan jiwa kepemimpinan mahasiswa baru Manajemen FEB UGM secara terstruktur dan menyeluruh.',
    image: '',
  },
  {
    title: 'Study Group Manajemen',
    category: 'Akademik',
    description:
      'Kelompok belajar intensif yang memfasilitasi diskusi akademik, persiapan ujian, dan peningkatan pemahaman materi kuliah bersama-sama.',
    image: '',
  },
  {
    title: 'Career Development Center',
    category: 'Karir',
    description:
      'Pembekalan karir melalui workshop, simulasi wawancara, dan sesi networking langsung bersama alumni dan rekruter dari perusahaan terkemuka.',
    image: '',
  },
  {
    title: 'Sociopreneur IKAMMA',
    category: 'Kewirausahaan',
    description:
      'Program sociopreneur untuk mengembangkan jiwa wirausaha yang berdampak sosial, mempertemukan ide inovatif dengan kebutuhan masyarakat nyata.',
    image: '',
  },
  {
    title: 'Pengabdian Masyarakat',
    category: 'Sosial',
    description:
      'Program bakti sosial dan pengabdian masyarakat di sekitar Yogyakarta untuk menerapkan ilmu manajemen demi solusi nyata bagi komunitas.',
    image: '',
  },
  {
    title: 'KOMKIS & Kompetisi',
    category: 'Prestasi',
    description:
      'Fasilitasi mahasiswa untuk mengikuti kompetisi karya ilmiah, business plan, dan lomba nasional guna mengharumkan nama FEB UGM.',
    image: '',
  },
];

// Fill with random local photos
const randomPhotos = getRandomPhotos(6);
programs.forEach((p, i) => { p.image = randomPhotos[i]; });

const categoryColors: Record<string, string> = {
  Kepemimpinan: 'bg-blue-600',
  Akademik: 'bg-indigo-600',
  Karir: 'bg-purple-600',
  Kewirausahaan: 'bg-orange-500',
  Sosial: 'bg-cyan-600',
  Prestasi: 'bg-amber-500',
};

export function ProgramsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="programs" className="py-24 bg-gray-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-0.5 bg-[#081C36]" />
            <span
              className="text-[#081C36] tracking-widest uppercase"
              style={{ fontSize: '12px' }}
            >
              Info Mahasiswa
            </span>
            <div className="w-10 h-0.5 bg-[#081C36]" />
          </div>
          <h2
            className="font-caslon text-[#06244A] mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.15 }}
          >
            Program Unggulan <span className="font-caslon-italic text-[#081C36]">IKAMMA</span>
          </h2>
          <p className="text-[#7684AD] max-w-2xl mx-auto" style={{ fontSize: '17px' }}>
            Beragam program dirancang untuk membantu mahasiswa Manajemen FEB UGM berkembang secara
            menyeluruh — dari akademik, kepemimpinan, hingga kontribusi nyata bagi masyarakat.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer border border-gray-100"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                {/* Category badge */}
                <span
                  className={`absolute top-4 left-4 ${categoryColors[program.category]} text-white px-3 py-1 rounded-full`}
                  style={{ fontSize: '11px' }}
                >
                  {program.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-caslon text-[#06244A] mb-3" style={{ fontSize: '20px' }}>
                  {program.title}
                </h3>
                <p className="text-[#7684AD] mb-5" style={{ fontSize: '14px', lineHeight: 1.65 }}>
                  {program.description}
                </p>
                <div
                  className="flex items-center gap-2 text-[#081C36] group-hover:gap-3 transition-all"
                  style={{ fontSize: '14px' }}
                >
                  <span>Pelajari Lebih</span>
                  <ArrowRight size={15} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA button */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 border-2 border-[#06244A] text-[#06244A] px-8 py-3 rounded-xl hover:bg-[#06244A] hover:text-white transition-all">
            Lihat Semua Program
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}