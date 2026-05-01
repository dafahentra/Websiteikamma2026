import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Mail, Linkedin, Youtube, Send, ExternalLink, MapPin, Phone, CalendarDays } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

/* ── SVG Icons for X and TikTok (not in lucide) ─────────────────── */
function XIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9a6.33 6.33 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.3 6.34 6.34 0 0 0 9.49 21.64a6.34 6.34 0 0 0 6.34-6.34V8.82a8.26 8.26 0 0 0 4.83 1.54V6.94a4.85 4.85 0 0 1-1.07-.25z" />
    </svg>
  );
}

/* ── Tabs ─────────────────────────────────────────────────────────── */
const TABS = [
  { id: 'ikamma', label: 'IKAMMA' },
  { id: 'event', label: 'Event' },
] as const;

type TabId = typeof TABS[number]['id'];

/* ── Social Links ─────────────────────────────────────────────────── */
const SOCIALS = [
  {
    icon: Instagram,
    label: 'Instagram',
    handle: '@ikamma.ugm',
    href: 'https://instagram.com/ikamma.ugm',
    color: 'from-[#f09433] via-[#e6683c] to-[#bc1888]',
  },
  {
    icon: Mail,
    label: 'Email',
    handle: 'ikamma@feb.ugm.ac.id',
    href: 'mailto:ikamma@feb.ugm.ac.id',
    color: 'from-[#0CA678] to-[#0CA678]',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    handle: 'IKAMMA FEB UGM',
    href: 'https://linkedin.com/company/ikamma',
    color: 'from-[#0077B5] to-[#0077B5]',
  },
  {
    icon: Youtube,
    label: 'YouTube',
    handle: 'IKAMMA FEB UGM',
    href: 'https://youtube.com/@ikamma',
    color: 'from-[#FF0000] to-[#CC0000]',
  },
  {
    icon: XIcon,
    label: 'X (Twitter)',
    handle: '@ikamma_ugm',
    href: 'https://x.com/ikamma_ugm',
    color: 'from-[#1DA1F2] to-[#0d8ecf]',
  },
  {
    icon: TikTokIcon,
    label: 'TikTok',
    handle: '@ikamma.ugm',
    href: 'https://tiktok.com/@ikamma.ugm',
    color: 'from-[#25F4EE] via-[#FE2C55] to-[#000000]',
  },
];

/* ── Event Contact Channels ───────────────────────────────────────── */
const EVENT_CONTACTS = [
  {
    icon: CalendarDays,
    label: 'IDEAS 2026',
    description: 'Untuk pertanyaan seputar IDEAS 2026',
    contacts: [
      { type: 'Instagram', value: '@ideas.ugm' },
      { type: 'Email', value: 'ideas@feb.ugm.ac.id' },
      { type: 'WhatsApp', value: '+62 812-3456-7890' },
    ],
  },
  {
    icon: CalendarDays,
    label: 'GMBCC 2026',
    description: 'Gadjah Mada Business Case Competition',
    contacts: [
      { type: 'Instagram', value: '@gmbcc.ugm' },
      { type: 'Email', value: 'gmbcc@feb.ugm.ac.id' },
      { type: 'WhatsApp', value: '+62 856-9876-5432' },
    ],
  },
  {
    icon: CalendarDays,
    label: 'Exposure 2026',
    description: 'Management Week — Exposure',
    contacts: [
      { type: 'Instagram', value: '@exposure.ugm' },
      { type: 'Email', value: 'exposure@feb.ugm.ac.id' },
    ],
  },
];

export function ContactPage() {
  const { pathname } = useLocation();
  const [activeTab, setActiveTab] = useState<TabId>('ikamma');
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-[#0C2340] text-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-8 px-6 lg:px-12 max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-inter font-bold mb-4">
            Contact Us
          </h1>
          <p className="text-white/60 text-lg md:text-xl font-inter max-w-2xl">
            Any question or remarks? Just write us a message!
          </p>
        </motion.div>

        {/* Tabs — like fore.coffee */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex gap-2 mt-10"
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-6 py-2.5 rounded-full text-sm font-inter font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-[#0CA678] text-white shadow-lg shadow-[#0CA678]/25'
                  : 'bg-white/[0.04] border border-white/[0.08] text-white/50 hover:text-white hover:bg-white/[0.08]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>
      </section>

      {/* Tab Content */}
      <section className="pb-24 px-6 lg:px-12 max-w-[1400px] mx-auto pt-8">
        <AnimatePresence mode="wait">
          {activeTab === 'ikamma' ? (
            <motion.div
              key="ikamma"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-16"
            >
              {/* ── Left: Contact Info & Social Links ──────────── */}
              <div>
                <h2 className="text-2xl md:text-3xl font-inter font-bold mb-2 flex items-center gap-3">
                  <div className="w-8 h-1.5 bg-[#0CA678] rounded-full" />
                  Contact Information
                </h2>
                <p className="text-white/50 text-base font-inter mb-8 ml-11">
                  Hubungi kami melalui platform favoritmu atau kirimkan pesan langsung.
                </p>

                {/* Quick Contact */}
                <div className="space-y-4 mb-10 ml-11">
                  <div className="flex items-center gap-3 text-white/70">
                    <Mail size={18} className="text-[#0CA678] shrink-0" />
                    <span className="text-sm font-inter">ikamma@feb.ugm.ac.id</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/70">
                    <Phone size={18} className="text-[#0CA678] shrink-0" />
                    <span className="text-sm font-inter">+62 812-3456-7890</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/70">
                    <MapPin size={18} className="text-[#0CA678] shrink-0" />
                    <span className="text-sm font-inter">Gedung FEB UGM, Bulaksumur, Yogyakarta</span>
                  </div>
                </div>

                {/* Social Media Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SOCIALS.map((social, i) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.06 }}
                        whileHover={{ scale: 1.03, y: -2 }}
                        className="relative group flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.15] hover:bg-white/[0.06] transition-all duration-300 overflow-hidden"
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500`} />
                        <div className="relative w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center shrink-0 group-hover:bg-white/[0.1] transition-colors duration-300">
                          <Icon size={18} />
                        </div>
                        <div className="relative flex-1 min-w-0">
                          <div className="text-sm font-inter font-semibold text-white">{social.label}</div>
                          <div className="text-xs text-white/40 truncate">{social.handle}</div>
                        </div>
                        <ExternalLink size={13} className="relative text-white/20 group-hover:text-white/50 transition-colors shrink-0" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>

              {/* ── Right: Contact Form ─────────────────────────── */}
              <div>
                <form
                  onSubmit={handleSubmit}
                  className="p-8 md:p-10 rounded-3xl bg-white/[0.03] border border-white/[0.06] space-y-6 backdrop-blur-sm"
                >
                  <h2 className="text-2xl font-inter font-bold flex items-center gap-3 mb-2">
                    <div className="w-8 h-1.5 bg-[#0CA678] rounded-full" />
                    Send a Message
                  </h2>

                  {submitted && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-[#0CA678]/10 border border-[#0CA678]/30 text-[#0CA678] px-4 py-3 rounded-xl text-sm font-inter"
                    >
                      ✓ Pesan Anda berhasil terkirim! Kami akan segera menghubungi Anda.
                    </motion.div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-white/60 text-sm font-inter mb-2">
                        Full Name <span className="text-[#0CA678]">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        placeholder="Your name"
                        className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white placeholder-white/25 focus:outline-none focus:border-[#0CA678] focus:ring-1 focus:ring-[#0CA678]/20 transition-all text-sm font-inter"
                      />
                    </div>
                    <div>
                      <label className="block text-white/60 text-sm font-inter mb-2">
                        Email <span className="text-[#0CA678]">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        placeholder="email@example.com"
                        className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white placeholder-white/25 focus:outline-none focus:border-[#0CA678] focus:ring-1 focus:ring-[#0CA678]/20 transition-all text-sm font-inter"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/60 text-sm font-inter mb-2">Subject</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="What's this about?"
                      className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white placeholder-white/25 focus:outline-none focus:border-[#0CA678] focus:ring-1 focus:ring-[#0CA678]/20 transition-all text-sm font-inter"
                    />
                  </div>

                  <div>
                    <label className="block text-white/60 text-sm font-inter mb-2">
                      Message <span className="text-[#0CA678]">*</span>
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={5}
                      placeholder="Write your message here..."
                      className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white placeholder-white/25 focus:outline-none focus:border-[#0CA678] focus:ring-1 focus:ring-[#0CA678]/20 transition-all resize-none text-sm font-inter"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full bg-[#0CA678] hover:bg-[#0b9069] text-white py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 font-inter font-semibold shadow-lg shadow-[#0CA678]/20 hover:shadow-xl hover:shadow-[#0CA678]/30"
                  >
                    Send Message <Send size={16} />
                  </motion.button>
                </form>
              </div>
            </motion.div>
          ) : (
            /* ── Event Tab ─────────────────────────────────────── */
            <motion.div
              key="event"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-2xl md:text-3xl font-inter font-bold mb-2 flex items-center gap-3">
                <div className="w-8 h-1.5 bg-[#0CA678] rounded-full" />
                Event Contact
              </h2>
              <p className="text-white/50 text-base font-inter mb-10 ml-11">
                Hubungi panitia event yang ingin kamu tanyakan secara langsung.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {EVENT_CONTACTS.map((event, i) => {
                  const Icon = event.icon;
                  return (
                    <motion.div
                      key={event.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.05] transition-all duration-300 group"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-11 h-11 rounded-xl bg-[#0CA678]/10 flex items-center justify-center shrink-0 group-hover:bg-[#0CA678]/20 transition-colors duration-300">
                          <Icon size={20} className="text-[#0CA678]" />
                        </div>
                        <div>
                          <h3 className="font-inter font-bold text-lg text-white">{event.label}</h3>
                          <p className="text-white/40 text-xs font-inter">{event.description}</p>
                        </div>
                      </div>

                      <div className="space-y-3 mt-5 pt-5 border-t border-white/[0.06]">
                        {event.contacts.map((c, j) => (
                          <div key={j} className="flex items-center gap-2">
                            <span className="text-[#0CA678] text-xs font-inter font-semibold min-w-[75px]">{c.type}</span>
                            <span className="text-white/60 text-sm font-inter">{c.value}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <Footer />
    </div>
  );
}
