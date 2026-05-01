import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { motion } from 'framer-motion';
import { MapPin, Clock, CalendarDays } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

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
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
  },
  {
    id: 2,
    title: 'Gadjah Mada Business Case Competition',
    location: 'FEB UGM',
    time: 'TBA',
    date: '11',
    monthYear: 'Mei 26',
    status: 'upcoming' as const,
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80',
  },
  {
    id: 3,
    title: 'Exposure: Management Week',
    location: 'FEB UGM',
    time: 'TBA',
    date: '11 - 15',
    monthYear: 'Mei 26',
    status: 'upcoming' as const,
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80',
  },
];

const PAST_EVENTS = [
  {
    id: 4,
    title: 'Malam Keakraban IKAMMA 2026',
    location: 'Jogja National Museum',
    date: 'Mar 15, 2026',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
  },
  {
    id: 5,
    title: 'Workshop Financial Modeling',
    location: 'Auditorium FEB UGM',
    date: 'Feb 20, 2026',
    image: 'https://images.unsplash.com/photo-1523580494112-071d16940d14?w=800&q=80',
  },
  {
    id: 6,
    title: 'Seminar Nasional Ekonomi Digital',
    location: 'Grha Sabha Pramana UGM',
    date: 'Jan 28, 2026',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80',
  },
  {
    id: 7,
    title: 'IKAMMA Career Fair 2025',
    location: 'FEB UGM',
    date: 'Dec 10, 2025',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
  },
  {
    id: 8,
    title: 'Musyawarah Besar IKAMMA',
    location: 'Ruang Sidang FEB UGM',
    date: 'Nov 5, 2025',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80',
  },
  {
    id: 9,
    title: 'Inauguration Ceremony 2025',
    location: 'Auditorium FEB UGM',
    date: 'Oct 15, 2025',
    image: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?w=800&q=80',
  },
];

export function EventsPage() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-white text-[#081C36]">
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-16 px-6 lg:px-12 max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-inter font-bold mb-4">
            Our Events
          </h1>
          <p className="text-[#081C36]/50 text-lg md:text-xl font-inter max-w-2xl">
            Discover upcoming events, ongoing activities, and relive past moments with IKAMMA.
          </p>
        </motion.div>
      </section>

      {/* ── Ongoing / Upcoming Events ────────────────────────────── */}
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
            <span className="font-caslon-italic">Upcoming</span> Events
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ONGOING_EVENTS.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="flex flex-col group cursor-pointer"
            >
              {/* Image Container — styled like UpcomingEventsSection */}
              <div className="relative w-full aspect-[4/3] overflow-hidden mb-6 shadow-lg group-hover:shadow-xl group-hover:shadow-[#081C36]/10 transition-shadow duration-300">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Status Badge */}
                {event.status === 'ongoing' ? (
                  <div className="absolute top-4 left-4 flex items-center gap-2 bg-[#081C36] px-3 py-1.5 rounded-full">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    <span className="text-white text-xs font-inter font-bold tracking-wider uppercase">ONGOING</span>
                  </div>
                ) : (
                  <div className="absolute top-4 left-4 bg-[#081C36]/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#081C36]/15">
                    <span className="text-white text-xs font-inter font-medium tracking-wider uppercase">Upcoming</span>
                  </div>
                )}

                {/* Date Badge */}
                <div className="absolute bottom-0 left-0 bg-[#081C36]/10 backdrop-blur-md flex flex-col items-center justify-center px-6 py-3 border-t border-r border-[#081C36]/20">
                  <span className="text-2xl font-bold text-white leading-none font-inter">{event.date}</span>
                  <span className="text-sm font-medium text-[#081C36]/80 mt-1 font-inter">{event.monthYear}</span>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl md:text-2xl font-inter font-semibold mb-4 line-clamp-2 min-h-[56px] group-hover:text-[#081C36] transition-colors duration-300">
                {event.title}
              </h3>

              <div className="flex flex-col gap-2 mt-auto">
                <div className="flex items-center gap-2 text-[#081C36]/50">
                  <MapPin size={16} className="text-[#081C36]" />
                  <span className="text-sm font-inter">{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-[#081C36]/50">
                  <Clock size={16} className="text-[#081C36]" />
                  <span className="text-sm font-inter">{event.time}</span>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
              <div className="w-full aspect-[4/3] overflow-hidden mb-5 bg-[#081C36]/[0.03] relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0 transition-all"
                />
                <div className="absolute inset-0 bg-[#0C2340]/30 group-hover:bg-transparent transition-colors duration-500" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-inter font-bold mb-3 group-hover:text-[#081C36] transition-colors duration-300 line-clamp-2">
                {event.title}
              </h3>

              {/* Meta */}
              <div className="mt-auto flex items-center gap-4 text-[#081C36]/40 text-sm font-inter">
                <div className="flex items-center gap-1.5">
                  <CalendarDays size={14} />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin size={14} />
                  <span>{event.location}</span>
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
