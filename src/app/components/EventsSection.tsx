import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const BACKGROUND_IMAGE = "/src/imports/Screenshot_2026-04-27_at_23.54.12.png";

export function EventsSection() {
  return (
    <section id="events" className="relative w-full py-24 overflow-hidden min-h-screen flex flex-col justify-center">
      {/* Background with White Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={BACKGROUND_IMAGE}
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        
        {/* Title */}
        <div className="flex justify-center md:justify-end mb-16">
          <motion.h2 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[#04233F] text-4xl md:text-5xl font-serif italic text-right font-bold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            — Our Notable Events
          </motion.h2>
        </div>

        {/* Stacked Carousel Visualization */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full max-w-2xl mx-auto h-[400px] flex items-center justify-center mb-12"
        >
          {/* Back Left Card (Dark Red) */}
          <motion.div 
            className="absolute bg-[#8B0000] w-64 h-80 rounded-sm shadow-xl"
            style={{ x: -120, rotate: -4, zIndex: 1 }}
          />
          
          {/* Back Right Card (Red) */}
          <motion.div 
            className="absolute bg-[#E50914] w-64 h-80 rounded-sm shadow-xl"
            style={{ x: 120, rotate: 4, zIndex: 2 }}
          />

          {/* Center Active Card */}
          <motion.div 
            className="absolute bg-[#D9D9D9] w-80 h-96 shadow-2xl z-10 flex items-center justify-center p-2"
          >
            {/* Inner Border */}
            <div className="w-full h-full border-2 border-[#00B894] rounded-sm relative">
              {/* Corner Dots/Accents (Optional, visible in screenshot as faint green lines) */}
            </div>
          </motion.div>
        </motion.div>

        {/* CTA Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center"
        >
          <button className="bg-[#00B894] hover:bg-[#009b7c] text-white px-8 py-3 rounded-full font-medium transition-colors inline-flex items-center gap-2 shadow-lg hover:shadow-xl">
            <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
            See More
            <ArrowRight size={18} />
          </button>
        </motion.div>

      </div>
    </section>
  );
}