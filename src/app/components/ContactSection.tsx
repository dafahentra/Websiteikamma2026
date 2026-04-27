import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Linkedin, Send } from 'lucide-react';
import { motion } from 'motion/react';
import { useRef, useState } from 'react';
import { useInView } from 'motion/react';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    lines: ['ikamma@feb.ugm.ac.id', 'humas.ikamma@feb.ugm.ac.id'],
  },
  {
    icon: Phone,
    label: 'WhatsApp',
    lines: ['+62 812-3456-7890', '+62 856-9876-5432'],
  },
  {
    icon: MapPin,
    label: 'Alamat',
    lines: ['Gedung FEB UGM, Jl. Sosio Humaniora No.1', 'Bulaksumur, Yogyakarta 55281'],
  },
];

const socials = [
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Facebook, label: 'Facebook', href: '#' },
  { icon: Twitter, label: 'Twitter/X', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
];

export function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-0.5 bg-[#00A855]" />
            <span
              className="text-[#00A855] tracking-widest uppercase"
              style={{ fontSize: '12px' }}
            >
              Kontak
            </span>
            <div className="w-10 h-0.5 bg-[#00A855]" />
          </div>
          <h2
            className="font-caslon text-[#06244A] mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.15 }}
          >
            Hubungi Kami
          </h2>
          <p className="text-[#7684AD]" style={{ fontSize: '17px' }}>
            Ada pertanyaan atau ingin berkolaborasi? Kami dengan senang hati membantu Anda
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-7 mb-10">
              {contactInfo.map(({ icon: Icon, label, lines }, i) => (
                <div key={i} className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-[#06244A] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md">
                    <Icon className="text-[#00A855]" size={20} />
                  </div>
                  <div>
                    <div
                      className="font-caslon text-[#06244A] mb-1"
                      style={{ fontSize: '18px' }}
                    >
                      {label}
                    </div>
                    {lines.map((line, j) => (
                      <p key={j} className="text-[#7684AD]" style={{ fontSize: '15px' }}>
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Social media */}
            <div>
              <div className="font-caslon text-[#06244A] mb-4" style={{ fontSize: '18px' }}>
                Ikuti Kami
              </div>
              <div className="flex gap-3">
                {socials.map(({ icon: Icon, label, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    title={label}
                    className="w-11 h-11 bg-gray-100 hover:bg-[#06244A] text-[#7684AD] hover:text-white rounded-xl flex items-center justify-center transition-all hover:shadow-md"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="mt-8 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200" style={{ height: '200px' }}>
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="text-[#7684AD] mx-auto mb-2" size={28} />
                  <p className="text-[#7684AD]" style={{ fontSize: '14px' }}>
                    Gedung FEB UGM, Bulaksumur, Yogyakarta 55281
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-gray-50 border border-gray-100 rounded-2xl p-8 space-y-5"
            >
              {submitted && (
                <div className="bg-[#00A855]/10 border border-[#00A855]/30 text-[#00A855] px-4 py-3 rounded-xl" style={{ fontSize: '14px' }}>
                  ✓ Pesan Anda berhasil terkirim! Kami akan segera menghubungi Anda.
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label
                    className="block text-[#06244A] mb-2"
                    style={{ fontSize: '14px' }}
                  >
                    Nama Lengkap <span className="text-[#00A855]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="Nama Anda"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-[#06244A] placeholder-gray-400 focus:outline-none focus:border-[#00A855] focus:ring-2 focus:ring-[#00A855]/10 transition-all"
                    style={{ fontSize: '14px' }}
                  />
                </div>
                <div>
                  <label
                    className="block text-[#06244A] mb-2"
                    style={{ fontSize: '14px' }}
                  >
                    Alamat Email <span className="text-[#00A855]">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    placeholder="email@example.com"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-[#06244A] placeholder-gray-400 focus:outline-none focus:border-[#00A855] focus:ring-2 focus:ring-[#00A855]/10 transition-all"
                    style={{ fontSize: '14px' }}
                  />
                </div>
              </div>

              <div>
                <label
                  className="block text-[#06244A] mb-2"
                  style={{ fontSize: '14px' }}
                >
                  Subjek
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Topik pesan Anda"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-[#06244A] placeholder-gray-400 focus:outline-none focus:border-[#00A855] focus:ring-2 focus:ring-[#00A855]/10 transition-all"
                  style={{ fontSize: '14px' }}
                />
              </div>

              <div>
                <label
                  className="block text-[#06244A] mb-2"
                  style={{ fontSize: '14px' }}
                >
                  Pesan <span className="text-[#00A855]">*</span>
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  placeholder="Tulis pesan Anda di sini..."
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-[#06244A] placeholder-gray-400 focus:outline-none focus:border-[#00A855] focus:ring-2 focus:ring-[#00A855]/10 transition-all resize-none"
                  style={{ fontSize: '14px' }}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#06244A] text-white py-4 rounded-xl hover:bg-[#051d3b] transition-all hover:shadow-xl flex items-center justify-center gap-2"
              >
                Kirim Pesan <Send size={16} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}