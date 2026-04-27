import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { motion } from 'motion/react';
import { useRef } from 'react';
import { useInView } from 'motion/react';
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
    <section id="gallery" className="py-24 bg-[#06244A] relative overflow-hidden" ref={ref}>
      {/* Decorative dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      {/* Accent lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00A855]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00A855]/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-0.5 bg-[#00A855]" />
              <span
                className="text-[#00A855] tracking-widest uppercase"
                style={{ fontSize: '12px' }}
              >
                Galeri Foto
              </span>
            </div>
            <h2
              className="font-caslon text-white"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.15 }}
            >
              Momen Berkesan
            </h2>
            <p className="text-white/55 mt-2" style={{ fontSize: '16px' }}>
              Rekam jejak kegiatan dan perjalanan IKAMMA FEB UGM dalam gambar
            </p>
          </div>
          <button className="inline-flex items-center gap-2 border border-white/25 text-white/70 hover:text-white hover:border-white/50 px-5 py-2.5 rounded-xl transition-all text-sm flex-shrink-0">
            <Images size={16} />
            Lihat Semua Foto
          </button>
        </div>

        {/* Masonry */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 640: 2, 900: 3 }}>
            <Masonry gutter="12px">
              {galleryImages.map((img, i) => (
                <div key={i} className="group relative overflow-hidden rounded-xl cursor-pointer">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    style={{ display: 'block' }}
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06244A]/90 via-[#06244A]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div>
                      <p className="text-white" style={{ fontSize: '14px', lineHeight: 1.4 }}>
                        {img.alt}
                      </p>
                      <div className="w-8 h-0.5 bg-[#00A855] mt-2" />
                    </div>
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