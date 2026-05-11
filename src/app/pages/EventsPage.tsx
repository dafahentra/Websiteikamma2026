import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { motion } from 'framer-motion';
import { MapPin, Clock, CalendarDays, X, ExternalLink, ArrowRight } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
const MicroShape = ({ className, delay = 0, duration = 5, size = "w-20 h-20" }: { className: string, delay?: number, duration?: number, size?: string }) => (
  <motion.div
    className={`absolute pointer-events-none select-none rounded-full bg-white/10 blur-[40px] ${size} ${className}`}
    animate={{
      y: [0, -30, 0],
      x: [0, 15, 0],
      opacity: [0.05, 0.15, 0.05],
    }}
    transition={{
      duration,
      repeat: Infinity,
      ease: "easeInOut",
      delay
    }}
  />
);

const DotPattern = ({ className }: { className: string }) => (
  <div className={`absolute pointer-events-none select-none opacity-[0.03] ${className}`} style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
);

import { EVENTS_PAGE_HERO, EVENTS_PAGE_ONGOING, EVENTS_PAGE_PAST } from '../../assets/photos';

/* ── Sample Data ─────────────────────────────────────────────────── */
export function EventsPage() {
  const { pathname } = useLocation();
  const [events, setEvents] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

  const getTeaser = (html: string) => {
    if (!html) return '';
    // Remove HTML tags and replace with space, then trim and collapse multiple spaces
    const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    return text.length > 100 ? text.substring(0, 100) + '...' : text;
  };

  const ongoingEvents = events.filter(e => {
    if (e.type === 'past') return false;
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const end = e.end_date ? new Date(e.end_date) : null;
    if (end) end.setHours(0, 0, 0, 0);
    
    // If no end date, or end date is today/future, it's ongoing
    return !end || now <= end;
  });

  const pastEvents = events.filter(e => {
    if (e.type === 'past') return true;
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const end = e.end_date ? new Date(e.end_date) : null;
    if (end) end.setHours(0, 0, 0, 0);
    
    // If end date exists and is in the past, it's a past event
    return end && now > end;
  });

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedEvent) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedEvent]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });
      setEvents(data || []);
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-white text-[#081C36]">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden bg-[#081C36]">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={EVENTS_PAGE_HERO}
            alt="Events Hero"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#081C36]/80 via-transparent to-[#081C36]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#081C36]/50 via-transparent to-[#081C36]/50" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto relative z-10 pt-16 text-center"
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <MicroShape className="-bottom-20 right-[5%]" size="w-80 h-80" delay={1} duration={12} />
            <MicroShape className="top-10 -right-10" size="w-48 h-48" delay={0} duration={7} />
            <DotPattern className="top-1/2 left-[10%] w-40 h-20" />
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl mb-4 text-white tracking-tight relative z-10">
            <span className="font-caslon-italic font-bold">Event</span> <span className="font-inter font-bold">IKAMMA</span>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {ongoingEvents.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              onClick={() => setSelectedEvent(event)}
              className="flex flex-col group cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[4/3] overflow-hidden mb-3 md:mb-6 shadow-lg group-hover:shadow-xl group-hover:shadow-[#081C36]/10 transition-shadow duration-300">
                <img
                  src={event.image_url || EVENTS_PAGE_ONGOING[i % EVENTS_PAGE_ONGOING.length]}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <div className="absolute top-2 left-2 md:top-4 md:left-4 flex items-center gap-1.5 md:gap-2">
                    {(() => {
                      const now = new Date();
                      now.setHours(0, 0, 0, 0);
                      const start = event.start_date ? new Date(event.start_date) : null;
                      const end = event.end_date ? new Date(event.end_date) : null;
                      
                      if (start) start.setHours(0, 0, 0, 0);
                      if (end) end.setHours(0, 0, 0, 0);

                      let displayType = 'upcoming';
                      if (start && now >= start) {
                        displayType = 'ongoing';
                      }
                      if (end && now > end) {
                        displayType = 'past';
                      }

                      if (displayType === 'ongoing') {
                        return (
                          <div className="flex items-center gap-1.5 bg-[#081C36] px-2 py-0.5 md:px-3 md:h-8 rounded-full">
                            <span className="w-1 h-1 md:w-1.5 md:h-1.5 bg-white rounded-full animate-pulse" />
                            <span className="text-white text-[9px] md:text-[10px] font-inter font-bold tracking-wider uppercase">ONGOING</span>
                          </div>
                        );
                      } else if (displayType === 'past') {
                         return (
                          <div className="flex items-center bg-gray-500/90 backdrop-blur-md px-2 py-0.5 md:px-3 md:h-8 rounded-full border border-white/20">
                            <span className="text-white text-[9px] md:text-[10px] font-bold tracking-wider uppercase">Past Event</span>
                          </div>
                        );
                      } else {
                        return (
                          <div className="flex items-center bg-[#081C36]/20 backdrop-blur-md px-2 py-0.5 md:px-3 md:h-8 rounded-full border border-white/20">
                            <span className="text-white text-[9px] md:text-[10px] font-bold tracking-wider uppercase">Upcoming</span>
                          </div>
                        );
                      }
                    })()}
                    
                    {/* Event Type / Category */}
                    {event.category && (
                      <div className="flex items-center bg-amber-500 px-2 py-0.5 md:px-3 md:h-8 rounded-full shadow-lg">
                        <span className="text-white text-[9px] md:text-[10px] font-inter font-bold tracking-wider uppercase">{event.category}</span>
                      </div>
                    )}
                  </div>

                {/* Date Badge */}
                <div className="absolute bottom-0 left-0 bg-white/20 backdrop-blur-md rounded-tr-2xl flex flex-col items-center justify-center px-4 py-2 md:px-6 md:py-3 border-t border-r border-white/30">
                  <span className="text-lg md:text-2xl font-bold text-white leading-none font-inter">{event.event_date}</span>
                  <span className="text-[10px] md:text-sm font-medium text-white/90 mt-0.5 md:mt-1 font-inter">{event.month_year}</span>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-base md:text-xl font-inter font-bold mb-1 group-hover:text-[#081C36] transition-colors duration-300 line-clamp-1">
                {event.title}
              </h3>
              <p className="text-[#081C36]/50 text-[10px] md:text-xs font-inter line-clamp-2 mb-3 md:mb-4">
                {getTeaser(event.description)}
              </p>

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

              {/* Read More */}
              <div className="mt-4 flex justify-end">
                <span className="text-[#081C36] text-[10px] md:text-sm font-bold flex items-center gap-1 group-hover:underline">
                  Lihat Detail <ArrowRight size={14} className="md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                </span>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {pastEvents.map((event, i) => (
            <motion.article
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              onClick={() => setSelectedEvent(event)}
              className="group cursor-pointer flex flex-col"
            >
              {/* Image */}
              <div className="w-full aspect-[4/3] overflow-hidden mb-3 md:mb-5 bg-[#081C36]/[0.03] relative">
                <img
                  src={event.image_url || EVENTS_PAGE_PAST[i % EVENTS_PAGE_PAST.length]}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0 transition-all"
                />
                <div className="absolute inset-0 bg-[#0C2340]/30 group-hover:bg-transparent transition-colors duration-500" />
              </div>

              {/* Title */}
              <h3 className="text-sm md:text-xl font-inter font-bold mb-1 group-hover:text-[#081C36] transition-colors duration-300 line-clamp-1">
                {event.title}
              </h3>
              <p className="text-[#081C36]/50 text-[10px] md:text-xs font-inter line-clamp-2 mb-3 md:mb-4">
                {getTeaser(event.description)}
              </p>

              {/* Meta */}
              <div className="mt-auto flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4 text-[#081C36]/40 text-xs md:text-sm font-inter">
                <div className="flex items-center gap-1 md:gap-1.5">
                  <CalendarDays size={12} className="md:w-3.5 md:h-3.5" />
                  <span>{event.full_date}</span>
                </div>
                <div className="flex items-center gap-1 md:gap-1.5">
                  <MapPin size={12} className="md:w-3.5 md:h-3.5" />
                  <span className="truncate">{event.location}</span>
                </div>
              </div>

              {/* Read More */}
              <div className="mt-3 flex justify-end">
                <span className="text-[#081C36] text-[10px] md:text-sm font-bold flex items-center gap-1 group-hover:underline">
                  Lihat Detail <ArrowRight size={14} className="md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ── Detail Modal ──────────────────────────────────────── */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] flex items-center justify-center px-4 py-8"
            onClick={() => setSelectedEvent(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto z-10 shadow-2xl rounded-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-[#081C36] hover:bg-[#081C36] hover:text-white transition-all duration-200 shadow-md"
              >
                <X size={18} />
              </button>

              {/* Poster */}
              <div className="relative w-full aspect-[16/9] overflow-hidden">
                <img
                  src={selectedEvent.image_url || (selectedEvent.type === 'upcoming' ? EVENTS_PAGE_ONGOING[0] : EVENTS_PAGE_PAST[0])}
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                <div className="absolute bottom-4 left-6 flex items-center gap-3">
                  {(() => {
                    const now = new Date();
                    now.setHours(0, 0, 0, 0);
                    const start = selectedEvent.start_date ? new Date(selectedEvent.start_date) : null;
                    const end = selectedEvent.end_date ? new Date(selectedEvent.end_date) : null;
                    
                    if (start) start.setHours(0, 0, 0, 0);
                    if (end) end.setHours(0, 0, 0, 0);

                    let displayType = selectedEvent.type === 'past' ? 'past' : 'upcoming';
                    if (selectedEvent.type !== 'past') {
                      if (start && now >= start) displayType = 'ongoing';
                      if (end && now > end) displayType = 'past';
                    }

                    if (displayType === 'ongoing') {
                      return (
                        <div className="flex items-center gap-2 bg-[#081C36] px-4 h-10 rounded-full">
                          <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                          <span className="text-white text-xs font-inter font-bold tracking-wider uppercase">ONGOING</span>
                        </div>
                      );
                    } else if (displayType === 'past') {
                      return (
                        <div className="flex items-center bg-gray-500/90 px-4 h-10 rounded-full">
                          <span className="text-white text-xs font-inter font-bold tracking-wider uppercase">PAST EVENT</span>
                        </div>
                      );
                    } else {
                      return (
                        <div className="flex items-center bg-[#081C36] px-4 h-10 rounded-full">
                          <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                          <span className="text-white text-xs font-inter font-bold tracking-wider uppercase">UPCOMING</span>
                        </div>
                      );
                    }
                  })()}

                  {/* Event Category Badge */}
                  {selectedEvent.category && (
                    <div className="flex items-center bg-amber-500 px-4 h-10 rounded-full shadow-lg">
                      <span className="text-white text-xs font-inter font-bold tracking-wider uppercase">{selectedEvent.category}</span>
                    </div>
                  )}

                  {/* Location Type Badge */}
                  {selectedEvent.location_type && (
                    <div className="flex items-center bg-blue-600 px-4 h-10 rounded-full">
                      <span className="text-white text-xs font-inter font-bold tracking-wider uppercase">{selectedEvent.location_type}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Body */}
              <div className="p-8 md:p-10">
                {/* Title */}
                <h2 className="text-3xl md:text-4xl font-inter font-bold text-[#081C36] mb-6">
                  {selectedEvent.title}
                </h2>

                {/* Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 p-5 bg-[#081C36]/[0.03] rounded-xl border border-[#081C36]/10">
                  <div className="flex items-start gap-3">
                    <CalendarDays size={18} className="text-[#081C36] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs font-inter text-[#081C36]/40 uppercase tracking-wider mb-1">Tanggal</p>
                      <p className="text-sm font-inter font-semibold text-[#081C36]">
                        {selectedEvent.full_date || `${selectedEvent.event_date} ${selectedEvent.month_year}`}
                      </p>
                    </div>
                  </div>
                  {selectedEvent.time && (
                    <div className="flex items-start gap-3">
                      <Clock size={18} className="text-[#081C36] mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs font-inter text-[#081C36]/40 uppercase tracking-wider mb-1">Waktu</p>
                        <p className="text-sm font-inter font-semibold text-[#081C36]">{selectedEvent.time}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-[#081C36] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs font-inter text-[#081C36]/40 uppercase tracking-wider mb-1">Lokasi</p>
                      <p className="text-sm font-inter font-semibold text-[#081C36]">{selectedEvent.location}</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                {selectedEvent.description && (
                  <div className="mb-8">
                    <h3 className="text-lg font-inter font-bold text-[#081C36] mb-3">Deskripsi</h3>
                    <div 
                      className="prose prose-slate max-w-none text-[#081C36]/60 text-base font-inter leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: selectedEvent.description }}
                    />
                  </div>
                )}

                {/* CTA */}
                {selectedEvent.type === 'upcoming' && selectedEvent.registration_link && (
                  <a
                    href={selectedEvent.registration_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 bg-[#081C36] text-white font-inter font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-[#0a2545] transition-colors duration-300 rounded-xl"
                  >
                    DAFTAR SEKARANG <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
