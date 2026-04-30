import { motion } from "framer-motion";

const IG_URL = "https://www.instagram.com/ikamma_ugm/";

export function WhatsNewsSection() {
  return (
    <section className="relative w-full bg-[#102a4e] text-white overflow-hidden">

      {/* ── Full-bleed Hero Photo ─────────────────────── */}
      <div className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden">
        {/* Placeholder — swap src with real IKAMMA photo */}
        <div className="absolute inset-0 bg-[#1a3a5c]" />
        <img
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=80"
          alt="IKAMMA Events"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark gradient at the bottom so text blends in */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#102a4e] to-transparent" />
      </div>

      {/* ── Text Section ─────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 pb-28 -mt-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">

          {/* Left: Big Two-line Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Line 1 — solid white */}
            <h2
              className="text-[clamp(3rem,10vw,9rem)] font-black leading-none tracking-tight text-white"
            >
              WHAT'S
            </h2>
            {/* Line 2 — neon outline */}
            <h2
              className="text-[clamp(3rem,10vw,9rem)] font-black leading-none tracking-tight text-transparent"
              style={{ WebkitTextStroke: '2px #00B894' }}
            >
              HAPPENING
            </h2>
          </motion.div>

          {/* Right: Description + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:max-w-xs flex flex-col gap-6 md:pb-4"
          >
            <p className="text-white/70 text-lg leading-relaxed">
              Follow our latest updates, moments, and behind-the-scenes from
              IKAMMA's official Instagram.
            </p>

            {/* Arrow CTA button */}
            <a
              href={IG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-4 self-start"
            >
              <div
                className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-[#00B894] transition-all duration-300 group-hover:bg-[#00B894] group-hover:scale-110"
              >
                <svg
                  width="22" height="22" viewBox="0 0 24 24" fill="none"
                  className="transition-colors duration-300 group-hover:stroke-white stroke-[#00B894]"
                  strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
              <span className="text-white/80 text-sm font-medium tracking-widest uppercase group-hover:text-white transition-colors duration-200">
                Follow on Instagram
              </span>
            </a>
          </motion.div>

        </div>
      </div>

    </section>
  );
}
