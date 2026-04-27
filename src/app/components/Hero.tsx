import { motion, useScroll, useTransform } from "motion/react";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1758270704787-615782711641?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwc3R1ZGVudHMlMjBjYW1wdXMlMjBjb21tdW5pdHklMjBncm91cHxlbnwxfHx8fDE3NzczMDEyNjF8MA&ixlib=rb-4.1.0&q=80&w=1920";

export function Hero() {
  const { scrollY } = useScroll();

  /*
   * Parallax — foto bergerak ke BAWAH lebih lambat dari scroll (efek "tertinggal").
   *
   * Cara menghindari white space di atas:
   *   scale: 1.15  →  foto 15% lebih besar, dengan transformOrigin DEFAULT (center).
   *   Buffer atas  =  7.5% tinggi viewport  (misal 800px → ~60px).
   *   y max        =  5vh  ←  lebih kecil dari buffer 60px, atas TIDAK pernah terpotong.
   */
  const imgY = useTransform(scrollY, [0, 700], ["0vh", "7vh"]);

  return (
    <>
      {/* ── Fixed hero — background [#06244A] agar tidak pernah terlihat putih ── */}
      <div
        className="fixed inset-0 overflow-hidden"
        style={{ zIndex: 1, backgroundColor: "#06244A" }}
      >
        {/* Photo — scale dari CENTER (buffer merata atas & bawah), bergerak perlahan ke bawah */}
        <motion.img
          src={HERO_IMAGE}
          alt="IKAMMA"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            y: imgY,
            scale: 1.15,
            /* transformOrigin dibiarkan default: 'center center'
               → 7.5% buffer di atas TIDAK tergerus transform */
          }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#06244A]/80 via-[#06244A]/25 to-transparent" />

        {/* Hero text */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.3,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="absolute left-8 sm:left-14 lg:left-20"
          style={{ bottom: "28%" }}
        >
          <h1
            className="font-caslon text-white"
            style={{
              fontSize: "clamp(2.6rem, 6.5vw, 5.5rem)",
              lineHeight: 1.05,
            }}
          >
            Bersama Tumbuh,
            <span className="block font-caslon-italic text-[#00A855]">
              Bersama Berkarya
            </span>
          </h1>
        </motion.div>
      </div>

      {/* ── Spacer ── */}
      <div
        style={{
          height: "calc(100vh + 120px)",
          position: "relative",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
    </>
  );
}