import { motion } from "framer-motion";
import { MapPin, Clock } from "lucide-react";

const UPCOMING_EVENTS = [
  {
    title: "IDEAS",
    location: "FEB UGM",
    time: "TBA",
    date: "11",
    monthYear: "Mei 26"
  },
  {
    title: "Gadjah Mada Business Case Competition",
    location: "FEB UGM",
    time: "TBA",
    date: "11",
    monthYear: "Mei 26"
  },
  {
    title: "Exposure",
    location: "FEB UGM",
    time: "TBA",
    date: "11 - 15",
    monthYear: "Mei 26"
  }
];

export function UpcomingEventsSection() {
  return (
    <section className="relative w-full py-24 bg-[#08182D] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
        
        {/* Header */}
        <div className="flex flex-col items-end mb-16">
          <motion.h2 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4 text-4xl md:text-6xl font-bold"
          >
            <span className="text-white">—</span>
            <span 
              className="text-transparent"
              style={{ WebkitTextStroke: '1.5px white' }}
            >
              Upcoming
            </span>
            <span className="text-white">Event</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/80 mt-2 text-xl md:text-2xl font-light"
          >
            Discover Deez Nuts!
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {UPCOMING_EVENTS.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="flex flex-col group cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden mb-6 bg-[#00B894] shadow-lg transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-xl">
                {/* Image placeholder - can be replaced with actual image later */}
                <div className="absolute inset-0 bg-[#00B894] transition-colors duration-300 group-hover:bg-[#00d2a8]"></div>
                
                {/* Date Overlay */}
                <div className="absolute bottom-0 left-0 bg-white/20 backdrop-blur-md rounded-tr-2xl flex flex-col items-center justify-center px-6 py-3 border-t border-r border-white/30">
                  <span className="text-2xl font-bold text-white leading-none">{event.date}</span>
                  <span className="text-sm font-medium text-white/90 mt-1">{event.monthYear}</span>
                </div>
              </div>

              {/* Text Content */}
              <h3 className="text-2xl font-semibold text-white mb-4 line-clamp-2 min-h-[64px]">
                {event.title}
              </h3>
              
              <div className="flex flex-col gap-2 mt-auto">
                <div className="flex items-center gap-2 text-white/80">
                  <MapPin size={18} className="text-[#00B894]" />
                  <span className="text-sm font-medium">{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Clock size={18} className="text-[#00B894]" />
                  <span className="text-sm font-medium">{event.time}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
