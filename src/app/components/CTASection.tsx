import { ChevronRight, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useRef } from 'react';
import { useInView } from 'motion/react';

export function CTASection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="relative py-28 overflow-hidden bg-white" ref={ref}>
      {/* Decorative */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        {/* Circles */}
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] border border-white/5 rounded-full" />
        <div className="absolute top-10 right-10 w-[360px] h-[360px] border border-[#081C36]/8 rounded-full" />
        <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] border border-white/5 rounded-full" />
        {/* Green accent */}
        <div className="absolute bottom-0 left-0 w-96 h-1 bg-gradient-to-r from-[#081C36] to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-1 bg-gradient-to-l from-[#081C36]/50 to-transparent" />
        {/* Diagonal shape */}
        <div
          className="absolute top-0 left-0"
          style={{
            width: 0,
            height: 0,
            borderStyle: 'solid',
            borderWidth: '200px 300px 0 0',
            borderColor: 'rgba(0,168,85,0.05) transparent transparent transparent',
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-0.5 bg-[#081C36]" />
            <span
              className="text-[#081C36] tracking-widest uppercase"
              style={{ fontSize: '12px' }}
            >
              Bergabung Sekarang
            </span>
            <div className="w-10 h-0.5 bg-[#081C36]" />
          </div>

          <h2
            className="font-caslon text-[#081C36] mb-6"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.15 }}
          >
            Siap Menjadi Bagian dari
            <span className="block font-caslon-italic text-[#081C36]">Keluarga IKAMMA?</span>
          </h2>

          <p
            className="text-[#081C36]/50 mb-10 max-w-2xl mx-auto"
            style={{ fontSize: '18px', lineHeight: 1.7 }}
          >
            Bergabunglah bersama lebih dari 1000 mahasiswa Manajemen FEB UGM yang aktif berkontribusi
            dan merasakan manfaat nyata dari komunitas IKAMMA.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-[#081C36] text-white px-10 py-4 rounded-xl hover:bg-[#0a2545] transition-all hover:shadow-2xl hover:shadow-[#081C36]/30 hover:-translate-y-0.5 flex items-center gap-2">
              Daftar Sekarang <ChevronRight size={20} />
            </button>
            <a
              href="#contact"
              className="border border-[#081C36]/20 text-[#081C36] px-10 py-4 rounded-xl hover:bg-[#081C36]/5 hover:border-[#081C36]/40 transition-all flex items-center gap-2 cursor-pointer"
            >
              Hubungi Kami <ArrowRight size={20} />
            </a>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-14 pt-10 border-t border-white/10">
            {[
              { value: '1000+', label: 'Anggota Aktif' },
              { value: '20+', label: 'Program/Tahun' },
              { value: '5000+', label: 'Alumni' },
              { value: '100%', label: 'Gratis Bergabung' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div
                  className="font-caslon text-[#081C36]"
                  style={{ fontSize: '28px', lineHeight: 1 }}
                >
                  {item.value}
                </div>
                <div className="text-[#081C36]/45 mt-1" style={{ fontSize: '13px' }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}