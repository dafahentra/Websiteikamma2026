import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Phone, MapPin, ChevronDown, Mail } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { supabase } from '../../lib/supabase';

/* ── Sleek Brand SVG Icons ────────────────────────────────────────── */
function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function YouTubeIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

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
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

function MailIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

/* ── Tabs ─────────────────────────────────────────────────────────── */
const TABS = [
  { id: 'ikamma', label: 'IKAMMA' },
  { id: 'event', label: 'Event' },
] as const;

type TabId = typeof TABS[number]['id'];

const ENQUIRY_TYPES = ['External', 'Media Partnership'];

export function ContactPage() {
  const { pathname } = useLocation();
  const [activeTab, setActiveTab] = useState<TabId>('ikamma');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', enquiry: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const [settings, setSettings] = useState<any>(null);
  const [eventContacts, setEventContacts] = useState<any[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      const [settingsRes, contactsRes] = await Promise.all([
        supabase.from('site_settings').select('*').eq('id', 1).single(),
        supabase.from('event_contacts').select('*').order('id', { ascending: true })
      ]);

      if (settingsRes.data) setSettings(settingsRes.data);
      if (contactsRes.data) {
        const formatted = contactsRes.data.map((c: any) => ({
          label: c.name,
          description: c.description,
          contacts: [
            c.instagram && { type: 'Instagram', value: c.instagram },
            c.email && { type: 'Email', value: c.email },
            c.whatsapp && { type: 'WhatsApp', value: c.whatsapp },
          ].filter(Boolean)
        }));
        setEventContacts(formatted);
      }
    };
    fetchData();
  }, [pathname]);

  const SOCIAL_ICONS = [
    { icon: InstagramIcon, label: 'Instagram', href: settings?.instagram_url || 'https://instagram.com/ikamma.ugm' },
    { icon: MailIcon, label: 'Email', href: `mailto:${settings?.email_contact || 'ikamma@feb.ugm.ac.id'}` },
    { icon: LinkedInIcon, label: 'LinkedIn', href: settings?.linkedin_url || 'https://linkedin.com/company/ikamma' },
    { icon: YouTubeIcon, label: 'YouTube', href: settings?.youtube_url || 'https://youtube.com/@ikamma' },
    { icon: XIcon, label: 'X', href: settings?.x_url || 'https://x.com/ikamma_ugm' },
    { icon: TikTokIcon, label: 'TikTok', href: settings?.tiktok_url || 'https://tiktok.com/@ikamma.ugm' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Determine which form to submit to based on enquiry
    const formName = formData.enquiry === 'Media Partnership' ? 'contact-media' : 'contact-external';
    
    const myForm = e.target as HTMLFormElement;
    const formDataObj = new FormData(myForm);
    
    // Ensure the form-name matches our dynamic choice
    formDataObj.set("form-name", formName);
    
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formDataObj as any).toString(),
      });
      
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
      setFormData({ name: '', email: '', phone: '', enquiry: '', subject: '', message: '' });
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Something went wrong! Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#002444] overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-8 px-4 md:px-6 lg:px-12 max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl mb-4 flex items-center justify-center gap-x-4">
            <span style={{ fontFamily: "'Libre Caslon Text', serif" }} className="italic font-bold">Contact</span>
            <span style={{ fontFamily: "'Inter', sans-serif" }} className="font-bold">Us</span>
          </h1>
          <p className="text-[#002444]/50 text-lg md:text-xl font-inter max-w-2xl mx-auto">
            Any question or remarks? Just write us a message!
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mt-10"
        >
          <div className="flex bg-[#002444]/[0.05] border border-[#002444]/10 p-1.5 rounded-full relative">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-6 md:px-10 py-2 rounded-full text-sm font-inter font-bold transition-colors duration-300 z-10 ${
                  activeTab === tab.id ? 'text-white' : 'text-[#002444]/50 hover:text-[#002444]'
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-[#002444] rounded-full shadow-lg shadow-[#002444]/20"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-20">{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Tab Content */}
      <section className="pb-24 px-4 md:px-6 lg:px-12 max-w-[1400px] mx-auto pt-10">
        <AnimatePresence mode="wait">
          {activeTab === 'ikamma' && (
            <motion.div
              key="ikamma"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] rounded-3xl overflow-hidden shadow-xl shadow-black/10 min-h-[600px] w-full box-border">
                <div className="relative bg-[#f5f7fa] p-6 sm:p-8 md:p-14 flex flex-col justify-between overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-[#002444]/5 rounded-full blur-xl pointer-events-none translate-x-1/4 -translate-y-1/4" />
                  <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#002444]/3 rounded-full pointer-events-none translate-x-1/3 translate-y-1/3" />
                  <div className="relative z-10">
                    <h2 className="text-3xl md:text-4xl font-inter font-bold mb-4">Contact Information</h2>
                    <p className="text-[#002444]/60 text-base font-inter leading-relaxed mb-12 max-w-md">Should you have any question or concern, you can reach us by filling out the contact form, finding us on social networks, or you can personal email us at:</p>
                    <div className="space-y-8">
                      <div className="space-y-6">
                        <a 
                          href="https://wa.me/6282111400126" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-4 md:gap-5"
                        >
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#002444]/10 flex items-center justify-center shrink-0">
                            <Phone size={18} className="text-[#002444] md:w-5 md:h-5" />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-inter text-[10px] font-bold text-[#002444]/40 uppercase tracking-widest mb-1">Partnership (External)</span>
                            <span className="font-inter text-base md:text-lg text-[#002444]">+62 821 1140 0126</span>
                          </div>
                        </a>
                        <a 
                          href="https://wa.me/6281228244549" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-4 md:gap-5"
                        >
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#002444]/10 flex items-center justify-center shrink-0">
                            <Phone size={18} className="text-[#002444] md:w-5 md:h-5" />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-inter text-[10px] font-bold text-[#002444]/40 uppercase tracking-widest mb-1">Media Partner</span>
                            <span className="font-inter text-base md:text-lg text-[#002444]">+62 812 2824 4549</span>
                          </div>
                        </a>
                      </div>
                      <div className="flex items-center gap-4 md:gap-5">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#002444]/10 flex items-center justify-center shrink-0"><Mail size={18} className="text-[#002444] md:w-5 md:h-5" /></div>
                        <span className="font-inter text-base md:text-lg text-[#002444] break-all">{settings?.email_contact || 'ikamma@feb.ugm.ac.id'}</span>
                      </div>
                      <div className="flex items-start gap-4 md:gap-5">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#002444]/10 flex items-center justify-center shrink-0 mt-0.5"><MapPin size={18} className="text-[#002444] md:w-5 md:h-5" /></div>
                        <div className="font-inter text-sm md:text-base text-[#002444]/70 leading-relaxed">Gedung FEB UGM<br />Jl. Sosio Humaniora No.1, Bulaksumur<br />Yogyakarta 55281</div>
                      </div>
                    </div>
                  </div>
                  <div className="relative z-10 mt-12 pt-8 border-t border-white/[0.08]">
                    <div className="flex gap-3">
                      {SOCIAL_ICONS.map((social) => {
                        const Icon = social.icon;
                        return (
                           <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#002444]/[0.04] flex items-center justify-center transition-colors duration-300" title={social.label}><Icon size={16} /></a>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 sm:p-8 md:p-14 overflow-hidden">
                  <form 
                    name={formData.enquiry === 'Media Partnership' ? 'contact-media' : 'contact-external'}
                    method="POST"
                    data-netlify="true"
                    onSubmit={handleSubmit} 
                    className="space-y-6 h-full flex flex-col"
                  >
                    <input type="hidden" name="form-name" value={formData.enquiry === 'Media Partnership' ? 'contact-media' : 'contact-external'} />
                    
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[#002444]/50 text-sm font-inter mb-2">Name</label>
                        <input 
                          type="text" 
                          name="name"
                          value={formData.name} 
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                          required 
                          placeholder="John Doe" 
                          className="w-full px-0 py-3 bg-transparent border-b border-[#002444]/15 text-[#002444] placeholder-[#002444]/30 focus:outline-none focus:border-[#002444] transition-colors text-sm font-inter" 
                        />
                      </div>
                      <div>
                        <label className="block text-[#002444]/50 text-sm font-inter mb-2">Email</label>
                        <input 
                          type="email" 
                          name="email"
                          value={formData.email} 
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                          required 
                          placeholder="johndoe@example.com" 
                          className="w-full px-0 py-3 bg-transparent border-b border-[#002444]/15 text-[#002444] placeholder-[#002444]/30 focus:outline-none focus:border-[#002444] transition-colors text-sm font-inter" 
                        />
                      </div>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[#002444]/50 text-sm font-inter mb-2">Phone Number</label>
                        <input 
                          type="tel" 
                          name="phone"
                          value={formData.phone} 
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
                          placeholder="+62" 
                          className="w-full px-0 py-3 bg-transparent border-b border-[#002444]/15 text-[#002444] placeholder-[#002444]/30 focus:outline-none focus:border-[#002444] transition-colors text-sm font-inter" 
                        />
                      </div>
                      <div className="relative">
                        <label className="block text-[#002444]/50 text-sm font-inter mb-2">Type of Enquiry</label>
                        <input type="hidden" name="enquiry" value={formData.enquiry} />
                        <button 
                          type="button" 
                          onClick={() => setDropdownOpen(!dropdownOpen)} 
                          className="w-full px-0 py-3 bg-transparent border-b border-[#002444]/15 text-[#002444] placeholder-[#002444]/30 text-left focus:outline-none focus:border-[#002444] transition-colors text-sm font-inter flex items-center justify-between"
                        >
                          <span className={formData.enquiry ? 'text-[#002444]' : 'text-[#002444]/30'}>{formData.enquiry || 'Select type'}</span>
                          <ChevronDown size={16} className={`text-[#002444]/40 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {dropdownOpen && (
                            <motion.div 
                              initial={{ opacity: 0, y: -5 }} 
                              animate={{ opacity: 1, y: 0 }} 
                              exit={{ opacity: 0, y: -5 }} 
                              transition={{ duration: 0.15 }} 
                              className="absolute top-full left-0 right-0 mt-1 z-20 rounded-xl overflow-hidden border border-[#002444]/10 shadow-lg" 
                              style={{ background: 'rgba(255, 255, 255, 0.98)', backdropFilter: 'blur(20px)' }}
                            >
                              {ENQUIRY_TYPES.map((type) => (
                                <button 
                                  key={type} 
                                  type="button" 
                                  onClick={() => { setFormData({ ...formData, enquiry: type }); setDropdownOpen(false); }} 
                                  className={`w-full text-left px-4 py-3 text-sm font-inter transition-colors duration-150 ${formData.enquiry === type ? 'bg-[#002444]/10 text-[#002444] font-semibold' : 'text-[#002444]/60 hover:bg-[#002444]/5 hover:text-[#002444]'}`}
                                >
                                  {type}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-[#002444]/50 text-sm font-inter mb-2">Subject</label>
                      <input 
                        type="text" 
                        name="subject"
                        value={formData.subject} 
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })} 
                        placeholder="What's this about?" 
                        className="w-full px-0 py-3 bg-transparent border-b border-[#002444]/15 text-[#002444] placeholder-[#002444]/30 focus:outline-none focus:border-[#002444] transition-colors text-sm font-inter" 
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-[#002444]/50 text-sm font-inter mb-2">Message</label>
                      <textarea 
                        name="message"
                        value={formData.message} 
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })} 
                        required 
                        rows={4} 
                        placeholder="Write Your Message Here..." 
                        className="w-full px-0 py-3 bg-transparent border-b border-[#002444]/15 text-[#002444] placeholder-[#002444]/30 focus:outline-none focus:border-[#002444] transition-colors resize-none text-sm font-inter" 
                      />
                    </div>
                    
                    {submitted && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        className="bg-[#002444]/10 border border-[#002444]/30 text-[#002444] px-4 py-3 rounded-xl text-sm font-inter text-center"
                      >
                        ✓ Pesan Anda berhasil terkirim! Kami akan segera menghubungi Anda melalui email.
                      </motion.div>
                    )}

                    <div className="flex justify-end pt-4">
                      <motion.button 
                        type="submit" 
                        whileHover={{ scale: 1.02 }} 
                        whileTap={{ scale: 0.98 }} 
                        className="bg-[#002444] hover:bg-[#0a2545] text-white px-10 py-3.5 rounded-xl transition-all duration-300 flex items-center gap-2 font-inter font-semibold shadow-lg shadow-[#002444]/20 hover:shadow-xl hover:shadow-[#002444]/30"
                      >
                        Send Message <Send size={16} />
                      </motion.button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'event' && (
            <motion.div
              key="event"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
                {eventContacts.map((event, i) => (
                  <div key={i} className="p-6 md:p-8 rounded-2xl bg-[#f5f7fa] border border-[#081C36]/10 hover:border-[#081C36]/20 hover:shadow-lg transition-all duration-300 group">
                    <h3 className="font-inter font-bold text-2xl text-[#081C36] mb-1">{event.label}</h3>
                    <p className="text-[#081C36]/50 text-sm font-inter mb-8">{event.description}</p>
                    <div className="space-y-4 pt-6 border-t border-[#081C36]/10">
                      {event.contacts.map((c: any, j: number) => (
                        <div key={j} className="flex items-center gap-2 md:gap-3">
                          <span className="text-[#081C36] text-xs font-inter font-bold min-w-[70px] md:min-w-[80px] uppercase tracking-wider">{c.type}</span>
                          <span className="text-[#081C36]/60 text-xs sm:text-sm font-inter break-all">{c.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
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
