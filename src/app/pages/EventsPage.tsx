import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { motion } from 'framer-motion';
import { MapPin, Clock, CalendarDays } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

import { EVENTS_PAGE_HERO, EVENTS_PAGE_ONGOING, EVENTS_PAGE_PAST } from '../../assets/photos';

/* ── Sample Data ─────────────────────────────────────────────────── */
const ONGOING_EVENTS = [
  {
    id: 1,
    title: 'IDEAS 2026',
    location: 'FEB UGM',
    time: '09:00 - 17:00 WIB',
    date: '11',
    monthYear: 'Mei 26',
    status: 'ongoing' as const,
    image: '',
  },
  {
    id: 2,
    title: 'Gadjah Mada Business Case Competition',
    location: 'FEB UGM',
    time: 'TBA',
    date: '11',
    monthYear: 'Mei 26',
    status: 'upcoming' as const,
    image: '',
  },
  {
    id: 3,
    title: 'Exposure: Management Week',
    location: 'FEB UGM',
    time: 'TBA',
    date: '11 - 15',
    monthYear: 'Mei 26',
    status: 'upcoming' as const,
    image: '',
  },
];

const PAST_EVENTS = [
  {
    id: 4,
    title: 'Malam Keakraban IKAMMA 2026',
    location: 'Jogja National Museum',
    date: 'Mar 15, 2026',
    image: '',
  },
  {
    id: 5,
    title: 'Workshop Financial Modeling',
    location: 'Auditorium FEB UGM',
    date: 'Feb 20, 2026',
    image: '',
  },
  {
    id: 6,
    title: 'Seminar Nasional Ekonomi Digital',
    location: 'Grha Sabha Pramana UGM',
    date: 'Jan 28, 2026',
    image: '',
  },
  {
    id: 7,
    title: 'IKAMMA Career Fair 2025',
    location: 'FEB UGM',
    date: 'Dec 10, 2025',
    image: '',
  },
  {
    id: 8,
    title: 'Musyawarah Besar IKAMMA',
    location: 'Ruang Sidang FEB UGM',
    date: 'Nov 5, 2025',
    image: '',
  },
  {
    id: 9,
    title: 'Inauguration Ceremony 2025',
    location: 'Auditorium FEB UGM',
    date: 'Oct 15, 2025',
    image: '',
  },
];

// Assign photos from the registry
ONGOING_EVENTS.forEach((ev, i) => { ev.image = EVENTS_PAGE_ONGOING[i]; });
PAST_EVENTS.forEach((ev, i) => { ev.image = EVENTS_PAGE_PAST[i]; });

export function EventsPage() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-white text-[#081C36]">
      <Navbar />

      {/* Hero */}
      <section className="w-full bg-[#081C36] pt-32 md:pt-40 pb-16 md:pb-24 px-6 lg:px-12 relative overflow-hidden flex flex-col items-center justify-center text-center mt-[-80px]">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={EVENTS_PAGE_HERO} 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-30 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#081C36]/80 via-[#081C36]/90 to-[#081C36]"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto relative z-10 pt-16"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-inter font-bold mb-4 text-white tracking-tight">
            Our Events
          </h1>
          <p className="text-white/80 text-sm md:text-xl font-inter max-w-2xl mx-auto px-4">
            Discover upcoming events, ongoing activities, and relive past moments with IKAMMA.
          </p>
        </motion.div>
      </section>

      {/* ── Ongoing / Upcoming Events ────────────────────────────── */}
      <section className="pb-24 px-6 lg:px-12 max-w-[1400px] mx-auto mt-12 md:mt-20">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-inter font-bold mb-12 flex items-center gap-4"
        >
          <div className="w-10 h-1.5 md:w-12 md:h-2 bg-[#081C36] rounded-full" />
          <span>
            <span className="font-caslon-italic">Upcoming</span> Events
          </span>
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-8">
          {ONGOING_EVENTS.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="flex flex-col group cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[4/3] overflow-hidden mb-3 md:mb-6 shadow-lg group-hover:shadow-xl group-hover:shadow-[#081C36]/10 transition-shadow duration-300">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Status Badge */}
                {event.status === 'ongoing' ? (
                  <div className="absolute top-2 left-2 md:top-4 md:left-4 flex items-center gap-1.5 md:gap-2 bg-[#081C36] px-2 py-1 md:px-3 md:py-1.5 rounded-full">
                    <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full animate-pulse" />
                    <span className="text-white text-[10px] md:text-xs font-inter font-bold tracking-wider uppercase">ONGOING</span>
                  </div>
                ) : (
                  <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-[#081C36]/10 backdrop-blur-md px-2 py-1 md:px-3 md:py-1.5 rounded-full border border-[#081C36]/15">
                    <span className="text-white text-[10px] md:text-xs font-inter font-medium tracking-wider uppercase">Upcoming</span>
                  </div>
                )}

                {/* Date Badge */}
                <div className="absolute bottom-0 left-0 bg-[#081C36]/10 backdrop-blur-md flex flex-col items-center justify-center px-3 py-1.5 md:px-6 md:py-3 border-t border-r border-[#081C36]/20">
                  <span className="text-lg md:text-2xl font-bold text-white leading-none font-inter">{event.date}</span>
                  <span className="text-[10px] md:text-sm font-medium text-[#081C36]/80 mt-0.5 md:mt-1 font-inter">{event.monthYear}</span>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-sm md:text-2xl font-inter font-semibold mb-2 md:mb-4 line-clamp-2 min-h-[36px] md:min-h-[56px] group-hover:text-[#081C36] transition-colors duration-300">
                {event.title}
              </h3>

              <div className="flex flex-col gap-1 md:gap-2 mt-auto">
                <div className="flex items-center gap-1.5 md:gap-2 text-[#081C36]/50">
                  <MapPin size={12} className="text-[#081C36] md:w-4 md:h-4" />
                  <span className="text-xs md:text-sm font-inter truncate">{event.location}</span>
                </div>
                <div className="flex items-center gap-1.5 md:gap-2 text-[#081C36]/50">
                  <Clock size={12} className="text-[#081C36] md:w-4 md:h-4" />
                  <span className="text-xs md:text-sm font-inter truncate">{event.time}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Past Events ──────────────────────────────────────────── */}
      <section className="pb-24 px-6 lg:px-12 max-w-[1400px] mx-auto">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-inter font-bold mb-12 flex items-center gap-4"
        >
          <div className="w-10 h-1.5 md:w-12 md:h-2 bg-[#081C36] rounded-full" />
          <span>
            <span className="font-caslon-italic">Past</span> Events
          </span>
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-8">
          {PAST_EVENTS.map((event, i) => (
            <motion.article
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="group cursor-pointer flex flex-col"
            >
              {/* Image */}
              <div className="w-full aspect-[4/3] overflow-hidden mb-3 md:mb-5 bg-[#081C36]/[0.03] relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0 transition-all"
                />
                <div className="absolute inset-0 bg-[#0C2340]/30 group-hover:bg-transparent transition-colors duration-500" />
              </div>

              {/* Title */}
              <h3 className="text-sm md:text-xl font-inter font-bold mb-1.5 md:mb-3 group-hover:text-[#081C36] transition-colors duration-300 line-clamp-2">
                {event.title}
              </h3>

              {/* Meta */}
              <div className="mt-auto flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4 text-[#081C36]/40 text-xs md:text-sm font-inter">
                <div className="flex items-center gap-1 md:gap-1.5">
                  <CalendarDays size={12} className="md:w-3.5 md:h-3.5" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-1 md:gap-1.5">
                  <MapPin size={12} className="md:w-3.5 md:h-3.5" />
                  <span className="truncate">{event.location}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
