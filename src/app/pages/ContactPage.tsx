import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Mail, Linkedin, Youtube, Send, Phone, MapPin, ChevronDown } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

/* ── SVG Icons for X and TikTok ──────────────────────────────────── */
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

/* ── Social Icons ─────────────────────────────────────────────────── */
const SOCIAL_ICONS = [
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/ikamma.ugm' },
  { icon: Mail, label: 'Email', href: 'mailto:ikamma@feb.ugm.ac.id' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/company/ikamma' },
  { icon: Youtube, label: 'YouTube', href: 'https://youtube.com/@ikamma' },
  { icon: XIcon, label: 'X', href: 'https://x.com/ikamma_ugm' },
  { icon: TikTokIcon, label: 'TikTok', href: 'https://tiktok.com/@ikamma.ugm' },
];

/* ── Event Contacts ───────────────────────────────────────────────── */
const EVENT_CONTACTS = [
  {
    label: 'IDEAS 2026',
    description: 'Pertanyaan seputar IDEAS 2026',
    contacts: [
      { type: 'Instagram', value: '@ideas.ugm' },
      { type: 'Email', value: 'ideas@feb.ugm.ac.id' },
      { type: 'WhatsApp', value: '+62 812-3456-7890' },
    ],
  },
  {
    label: 'GMBCC 2026',
    description: 'Gadjah Mada Business Case Competition',
    contacts: [
      { type: 'Instagram', value: '@gmbcc.ugm' },
      { type: 'Email', value: 'gmbcc@feb.ugm.ac.id' },
      { type: 'WhatsApp', value: '+62 856-9876-5432' },
    ],
  },
  {
    label: 'Exposure 2026',
    description: 'Management Week — Exposure',
    contacts: [
      { type: 'Instagram', value: '@exposure.ugm' },
      { type: 'Email', value: 'exposure@feb.ugm.ac.id' },
    ],
  },
];

const ENQUIRY_TYPES = ['External', 'Media Partnership'];

export function ContactPage() {
  const { pathname } = useLocation();
  const [activeTab, setActiveTab] = useState<TabId>('ikamma');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', enquiry: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', email: '', phone: '', enquiry: '', subject: '', message: '' });
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
          className="text-center"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-inter font-bold mb-4">
            Contact Us
          </h1>
          <p className="text-white/60 text-lg md:text-xl font-inter max-w-2xl mx-auto">
            Any question or remarks? Just write us a message!
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-2 mt-10"
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-8 py-2.5 rounded-full text-sm font-inter font-semibold transition-all duration-300 ${
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
      <section className="pb-24 px-6 lg:px-12 max-w-[1400px] mx-auto pt-10">
        <AnimatePresence mode="wait">
          {activeTab === 'ikamma' ? (
            <motion.div
              key="ikamma"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* ── Sector Seven-inspired card layout ──────────── */}
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] rounded-3xl overflow-hidden shadow-2xl shadow-black/30 min-h-[600px]">

                {/* ── Left: Dark Info Card ───────────────────────── */}
                <div className="relative bg-[#081C36] p-10 md:p-14 flex flex-col justify-between overflow-hidden">
                  {/* Decorative circles */}
                  <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#0CA678]/10 rounded-full blur-xl pointer-events-none" />
                  <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#0CA678]/5 rounded-full pointer-events-none" />

                  <div className="relative z-10">
                    <h2 className="text-3xl md:text-4xl font-inter font-bold mb-4">
                      Contact Information
                    </h2>
                    <p className="text-white/60 text-base font-inter leading-relaxed mb-12 max-w-md">
                      Should you have any question or concern, you can reach us by filling out the contact form, finding us on social networks, or you can personal email us at:
                    </p>

                    {/* Contact Details */}
                    <div className="space-y-8">
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 rounded-full bg-white/[0.06] flex items-center justify-center shrink-0">
                          <Phone size={20} className="text-white/80" />
                        </div>
                        <span className="font-inter text-lg text-white">+62 812-3456-7890</span>
                      </div>

                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 rounded-full bg-white/[0.06] flex items-center justify-center shrink-0">
                          <Mail size={20} className="text-white/80" />
                        </div>
                        <span className="font-inter text-lg text-white">ikamma@feb.ugm.ac.id</span>
                      </div>

                      <div className="flex items-start gap-5">
                        <div className="w-12 h-12 rounded-full bg-white/[0.06] flex items-center justify-center shrink-0 mt-0.5">
                          <MapPin size={20} className="text-white/80" />
                        </div>
                        <div className="font-inter text-base text-white/80 leading-relaxed">
                          Gedung FEB UGM<br />
                          Jl. Sosio Humaniora No.1, Bulaksumur<br />
                          Yogyakarta 55281
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Social Icons at bottom */}
                  <div className="relative z-10 mt-12 pt-8 border-t border-white/[0.08]">
                    <div className="flex gap-3">
                      {SOCIAL_ICONS.map((social, i) => {
                        const Icon = social.icon;
                        return (
                          <motion.a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.15, y: -3 }}
                            className="w-10 h-10 rounded-full bg-white/[0.06] hover:bg-[#0CA678] flex items-center justify-center transition-colors duration-300"
                            title={social.label}
                          >
                            <Icon size={16} />
                          </motion.a>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* ── Right: Form (light bg) ─────────────────────── */}
                <div className="bg-[#0E2849] p-10 md:p-14">
                  <form onSubmit={handleSubmit} className="space-y-6 h-full flex flex-col">

                    {submitted && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[#0CA678]/10 border border-[#0CA678]/30 text-[#0CA678] px-4 py-3 rounded-xl text-sm font-inter"
                      >
                        ✓ Pesan Anda berhasil terkirim! Kami akan segera menghubungi Anda.
                      </motion.div>
                    )}

                    <div className="grid sm:grid-cols-2 gap-6">
                      {/* Name */}
                      <div>
                        <label className="block text-white/50 text-sm font-inter mb-2">Name</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          placeholder="John Doe"
                          className="w-full px-0 py-3 bg-transparent border-b border-white/[0.15] text-white placeholder-white/25 focus:outline-none focus:border-[#0CA678] transition-colors text-sm font-inter"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-white/50 text-sm font-inter mb-2">Email</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          placeholder="johndoe@example.com"
                          className="w-full px-0 py-3 bg-transparent border-b border-white/[0.15] text-white placeholder-white/25 focus:outline-none focus:border-[#0CA678] transition-colors text-sm font-inter"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      {/* Phone */}
                      <div>
                        <label className="block text-white/50 text-sm font-inter mb-2">Phone Number</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+62"
                          className="w-full px-0 py-3 bg-transparent border-b border-white/[0.15] text-white placeholder-white/25 focus:outline-none focus:border-[#0CA678] transition-colors text-sm font-inter"
                        />
                      </div>

                      {/* Type of Enquiry — dropdown */}
                      <div className="relative">
                        <label className="block text-white/50 text-sm font-inter mb-2">Type of Enquiry</label>
                        <button
                          type="button"
                          onClick={() => setDropdownOpen(!dropdownOpen)}
                          className="w-full px-0 py-3 bg-transparent border-b border-white/[0.15] text-left focus:outline-none focus:border-[#0CA678] transition-colors text-sm font-inter flex items-center justify-between"
                        >
                          <span className={formData.enquiry ? 'text-white' : 'text-white/25'}>
                            {formData.enquiry || 'Select type'}
                          </span>
                          <ChevronDown size={16} className={`text-white/40 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                          {dropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              transition={{ duration: 0.15 }}
                              className="absolute top-full left-0 right-0 mt-1 z-20 rounded-xl overflow-hidden border border-white/[0.1]"
                              style={{
                                background: 'rgba(12, 35, 64, 0.95)',
                                backdropFilter: 'blur(20px)',
                              }}
                            >
                              {ENQUIRY_TYPES.map((type) => (
                                <button
                                  key={type}
                                  type="button"
                                  onClick={() => {
                                    setFormData({ ...formData, enquiry: type });
                                    setDropdownOpen(false);
                                  }}
                                  className={`w-full text-left px-4 py-3 text-sm font-inter transition-colors duration-150 ${
                                    formData.enquiry === type
                                      ? 'bg-[#0CA678]/15 text-[#0CA678]'
                                      : 'text-white/70 hover:bg-white/[0.06] hover:text-white'
                                  }`}
                                >
                                  {type}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block text-white/50 text-sm font-inter mb-2">Subject</label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="What's this about?"
                        className="w-full px-0 py-3 bg-transparent border-b border-white/[0.15] text-white placeholder-white/25 focus:outline-none focus:border-[#0CA678] transition-colors text-sm font-inter"
                      />
                    </div>

                    {/* Message */}
                    <div className="flex-1">
                      <label className="block text-white/50 text-sm font-inter mb-2">Message</label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        rows={4}
                        placeholder="Write Your Message Here..."
                        className="w-full px-0 py-3 bg-transparent border-b border-white/[0.15] text-white placeholder-white/25 focus:outline-none focus:border-[#0CA678] transition-colors resize-none text-sm font-inter"
                      />
                    </div>

                    {/* Submit */}
                    <div className="flex justify-end pt-4">
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-[#0CA678] hover:bg-[#0b9069] text-white px-10 py-3.5 rounded-xl transition-all duration-300 flex items-center gap-2 font-inter font-semibold shadow-lg shadow-[#0CA678]/20 hover:shadow-xl hover:shadow-[#0CA678]/30"
                      >
                        Send Message <Send size={16} />
                      </motion.button>
                    </div>
                  </form>
                </div>
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {EVENT_CONTACTS.map((event, i) => (
                  <motion.div
                    key={event.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="p-8 rounded-2xl bg-[#081C36] border border-white/[0.04] hover:border-white/[0.1] transition-all duration-300 group"
                  >
                    <h3 className="font-inter font-bold text-2xl text-white mb-1">{event.label}</h3>
                    <p className="text-white/40 text-sm font-inter mb-8">{event.description}</p>

                    <div className="space-y-4 pt-6 border-t border-white/[0.06]">
                      {event.contacts.map((c, j) => (
                        <div key={j} className="flex items-center gap-3">
                          <span className="text-[#0CA678] text-xs font-inter font-bold min-w-[80px] uppercase tracking-wider">{c.type}</span>
                          <span className="text-white/60 text-sm font-inter">{c.value}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <Footer />
    </div>
  );
}
