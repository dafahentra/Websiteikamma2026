import { motion } from "framer-motion";
import { MapPin, Clock } from "lucide-react";

import { getRandomPhotos } from "../../assets/photos";

const UPCOMING_EVENTS = [
  {
    title: "IDEAS",
    location: "FEB UGM",
    time: "TBA",
    date: "11",
    monthYear: "Mei 26",
    image: "" // Placeholder
  },
  {
    title: "Gadjah Mada Business Case Competition",
    location: "FEB UGM",
    time: "TBA",
    date: "11",
    monthYear: "Mei 26",
    image: "" // Placeholder
  },
  {
    title: "Exposure",
    location: "FEB UGM",
    time: "TBA",
    date: "11 - 15",
    monthYear: "Mei 26",
    image: "" // Placeholder
  }
];

// Fill with random local photos
const randomPhotos = getRandomPhotos(3);
UPCOMING_EVENTS.forEach((ev, i) => { ev.image = randomPhotos[i]; });

export function UpcomingEventsSection() {
  return (
    <section className="relative w-full py-24 bg-white text-[#081C36]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
        
        {/* Header */}
        <div className="flex flex-col items-end mb-16">
          <motion.h2 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[#081C36] text-4xl md:text-5xl flex items-center gap-3"
          >
            <span className="text-[#081C36]">—</span>
            <span style={{ fontFamily: "'Libre Caslon Text', serif" }} className="italic font-bold">Upcoming</span>
            <span style={{ fontFamily: "'Inter', sans-serif" }} className="font-bold">Event</span>
          </motion.h2>
        </div>

        {/* Cards Slider/Grid */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {UPCOMING_EVENTS.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="flex flex-col group cursor-pointer w-[80vw] min-w-[80vw] snap-center flex-shrink-0 md:w-auto md:min-w-0 md:flex-shrink"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden mb-6 bg-[#081C36] shadow-lg transition-shadow duration-300 group-hover:shadow-xl">
                {/* Image */}
                <div className="absolute inset-0 bg-[#081C36] overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/20"></div>
                </div>
                
                {/* Date Overlay */}
                <div className="absolute bottom-0 left-0 bg-white/20 backdrop-blur-md rounded-tr-2xl flex flex-col items-center justify-center px-6 py-3 border-t border-r border-white/30">
                  <span className="text-2xl font-bold text-white leading-none">{event.date}</span>
                  <span className="text-sm font-medium text-white/90 mt-1">{event.monthYear}</span>
                </div>
              </div>

              {/* Text Content */}
              <h3 className="text-2xl font-semibold text-[#081C36] mb-4 line-clamp-2 min-h-[64px]">
                {event.title}
              </h3>
              
              <div className="flex flex-col gap-2 mt-auto">
                <div className="flex items-center gap-2 text-[#081C36]/60">
                  <MapPin size={18} className="text-[#081C36]" />
                  <span className="text-sm font-medium">{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-[#081C36]/60">
                  <Clock size={18} className="text-[#081C36]" />
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
