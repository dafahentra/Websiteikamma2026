'use client';

import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Images } from 'lucide-react';

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1760385737059-c65b583ec23e?w=700&fit=crop&q=80',
    alt: 'IKAMMA Leadership Summit 2025',
    tall: true,
  },
  {
    src: 'https://images.unsplash.com/photo-1758270705518-b61b40527e76?w=700&fit=crop&q=80',
    alt: 'Study Group Manajemen FEB UGM',
    tall: false,
  },
  {
    src: 'https://images.unsplash.com/photo-1758599668356-c8c919e24dda?w=700&fit=crop&q=80',
    alt: 'Pengabdian Masyarakat IKAMMA',
    tall: false,
  },
  {
    src: 'https://images.unsplash.com/photo-1757143091093-26a27d102cfa?w=700&fit=crop&q=80',
    alt: 'Gathering Tahunan Anggota IKAMMA',
    tall: true,
  },
  {
    src: 'https://images.unsplash.com/photo-1763739530672-4aadafbd81ff?w=700&fit=crop&q=80',
    alt: 'Career Networking Event 2025',
    tall: false,
  },
  {
    src: 'https://images.unsplash.com/photo-1719409015910-a878b729cb9b?w=700&fit=crop&q=80',
    alt: 'Business Plan Competition IKAMMA',
    tall: false,
  },
];

export function GallerySection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="gallery" className="py-24 bg-white relative z-20 overflow-hidden" ref={ref}>
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#081C36]/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#081C36]/50 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-0.5 bg-[#081C36]" />
              <span className="text-[#081C36] tracking-widest uppercase text-xs font-semibold">
                Galeri Foto
              </span>
            </div>
            <h2 className="text-[#081C36] text-3xl md:text-4xl lg:text-5xl font-caslon leading-tight">
              Momen Berkesan
            </h2>
            <p className="text-[#081C36]/50 mt-3 text-base max-w-2xl">
              Rekam jejak kegiatan dan perjalanan IKAMMA FEB UGM dalam gambar
            </p>
          </div>

          <button className="inline-flex items-center gap-2 border border-[#081C36]/15 text-[#081C36]/70 hover:text-[#081C36] hover:bg-[#081C36]/5 px-5 py-2.5 rounded-xl transition-all text-sm flex-shrink-0">
            <Images size={16} />
            Lihat Semua Foto
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 640: 2, 900: 3 }}>
            <Masonry gutter="16px">
              {galleryImages.map((img, i) => (
                <div key={i} className="group relative overflow-hidden rounded-xl cursor-pointer shadow-lg bg-white/5">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-105"
                    style={{ display: 'block' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                    <p className="text-white font-medium text-sm md:text-base leading-snug translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {img.alt}
                    </p>
                    <div className="w-8 h-0.5 bg-[#081C36] mt-3 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 delay-100" />
                  </div>
                </div>
              ))}
            </Masonry>
          </ResponsiveMasonry>
        </motion.div>
      </div>
    </section>
  );
}