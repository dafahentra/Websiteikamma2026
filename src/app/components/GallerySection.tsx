'use client';

import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Images } from 'lucide-react';

import { GALLERY_PHOTOS } from "../../assets/photos";

const galleryImages = [
  {
    src: '',
    alt: 'IKAMMA Leadership Summit 2025',
    tall: true,
  },
  {
    src: '',
    alt: 'Study Group Manajemen FEB UGM',
    tall: false,
  },
  {
    src: '',
    alt: 'Pengabdian Masyarakat IKAMMA',
    tall: false,
  },
  {
    src: '',
    alt: 'Gathering Tahunan Anggota IKAMMA',
    tall: true,
  },
  {
    src: '',
    alt: 'Career Networking Event 2025',
    tall: false,
  },
  {
    src: '',
    alt: 'Business Plan Competition IKAMMA',
    tall: false,
  },
];

// Assign photos from the registry
galleryImages.forEach((img, i) => { img.src = GALLERY_PHOTOS[i]; });

export function GallerySection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="gallery" className="py-24 bg-[#06244A] relative z-20 overflow-hidden" ref={ref}>
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00A855]/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00A855]/50 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-0.5 bg-[#00A855]" />
              <span className="text-[#00A855] tracking-widest uppercase text-xs font-semibold">
                Galeri Foto
              </span>
            </div>
            <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-caslon leading-tight">
              Momen Berkesan
            </h2>
            <p className="text-white/60 mt-3 text-base max-w-2xl">
              Rekam jejak kegiatan dan perjalanan IKAMMA FEB UGM dalam gambar
            </p>
          </div>

          <button className="inline-flex items-center gap-2 border border-white/20 text-white/80 hover:text-white hover:bg-white/10 px-5 py-2.5 rounded-xl transition-all text-sm flex-shrink-0">
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
                    <div className="w-8 h-0.5 bg-[#00A855] mt-3 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 delay-100" />
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