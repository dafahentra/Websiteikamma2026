import { Instagram, Facebook, Twitter, Linkedin, Youtube, Send } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Info Mahasiswa', href: '#programs' },
  { label: 'Our Events', href: '#events' },
  { label: 'Contact Us', href: '#contact' },
];
const programs = [
  'Latihan Kepemimpinan (LKM)',
  'Study Group Manajemen',
  'Career Development Center',
  'Sociopreneur IKAMMA',
  'Pengabdian Masyarakat',
  'KOMKIS & Kompetisi',
];
const socialIcons = [
  { icon: Instagram, label: 'Instagram' },
  { icon: Facebook, label: 'Facebook' },
  { icon: Twitter, label: 'Twitter/X' },
  { icon: Linkedin, label: 'LinkedIn' },
  { icon: Youtube, label: 'YouTube' },
];

export function Footer() {
  return (
    <footer className="bg-[#03162e] text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-[#00A855] rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="font-caslon text-white" style={{ fontSize: '13px' }}>
                  IK
                </span>
              </div>
              <div>
                <div className="font-caslon text-white" style={{ fontSize: '18px', lineHeight: 1 }}>
                  IKAMMA
                </div>
                <div
                  className="text-white/40"
                  style={{ fontSize: '10px', lineHeight: 1.2, marginTop: 2 }}
                >
                  Manajemen FEB UGM
                </div>
              </div>
            </div>
            <p className="text-white/55 mb-6" style={{ fontSize: '14px', lineHeight: 1.7 }}>
              Ikatan Keluarga Mahasiswa Manajemen FEB UGM — wadah tumbuh, berkarya,
              dan berkontribusi bagi bangsa Indonesia.
            </p>
            <div className="flex gap-2 flex-wrap">
              {socialIcons.map(({ icon: Icon, label }, i) => (
                <button
                  key={i}
                  title={label}
                  className="w-9 h-9 bg-white/8 hover:bg-[#00A855] rounded-lg flex items-center justify-center transition-all hover:-translate-y-0.5"
                >
                  <Icon size={15} />
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-caslon text-white mb-5" style={{ fontSize: '17px' }}>
              Navigasi
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((item, i) => (
                <li key={i}>
                  <a
                    href={item.href}
                    className="text-white/55 hover:text-[#00A855] transition-colors"
                    style={{ fontSize: '14px' }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-caslon text-white mb-5" style={{ fontSize: '17px' }}>
              Program
            </h4>
            <ul className="space-y-2.5">
              {programs.map((item, i) => (
                <li key={i}>
                  <a
                    href="#programs"
                    className="text-white/55 hover:text-[#00A855] transition-colors"
                    style={{ fontSize: '14px' }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter + Contact */}
          <div>
            <h4 className="font-caslon text-white mb-5" style={{ fontSize: '17px' }}>
              Newsletter
            </h4>
            <p className="text-white/55 mb-4" style={{ fontSize: '14px', lineHeight: 1.65 }}>
              Dapatkan info terbaru seputar program, event, dan lowongan magang IKAMMA langsung ke inbox Anda.
            </p>
            <div className="flex gap-2 mb-8">
              <input
                type="email"
                placeholder="Email Anda"
                className="flex-1 min-w-0 bg-white/8 text-white px-3 py-2.5 rounded-lg placeholder-white/35 border border-white/10 focus:outline-none focus:border-[#00A855] transition-colors"
                style={{ fontSize: '13px' }}
              />
              <button className="bg-[#00A855] text-white p-2.5 rounded-lg hover:bg-[#008844] transition-colors flex-shrink-0">
                <Send size={15} />
              </button>
            </div>

            <h4 className="font-caslon text-white mb-3" style={{ fontSize: '16px' }}>
              Kontak Cepat
            </h4>
            <div className="space-y-1.5">
              <p className="text-white/55" style={{ fontSize: '14px' }}>
                ikamma@feb.ugm.ac.id
              </p>
              <p className="text-white/55" style={{ fontSize: '14px' }}>
                +62 812-3456-7890
              </p>
              <p className="text-white/55" style={{ fontSize: '14px' }}>
                Gedung FEB UGM, Bulaksumur, Yogyakarta
              </p>
            </div>
          </div>
        </div>

        {/* Divider with accent */}
        <div className="relative h-px bg-white/10 mb-8">
          <div className="absolute left-0 top-0 w-24 h-px bg-[#00A855]" />
        </div>

        {/* Partners row */}
        <div className="flex flex-wrap items-center gap-6 mb-8">
          <span className="text-white/35" style={{ fontSize: '12px', letterSpacing: '0.1em' }}>
            BAGIAN DARI:
          </span>
          {['FEB UGM', 'BEM FEB UGM', 'UGM', 'AIESEC UGM', 'HMMU UGM', 'PPA FEB UGM'].map((uni, i) => (
            <span
              key={i}
              className="text-white/30 hover:text-white/60 transition-colors cursor-pointer"
              style={{ fontSize: '13px' }}
            >
              {uni}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-white/35" style={{ fontSize: '13px' }}>
            &copy; 2026 IKAMMA — Ikatan Keluarga Mahasiswa Manajemen FEB UGM. All rights reserved.
          </p>
          <div className="flex gap-5" style={{ fontSize: '13px' }}>
            <a href="#" className="text-white/35 hover:text-white/60 transition-colors">
              Kebijakan Privasi
            </a>
            <a href="#" className="text-white/35 hover:text-white/60 transition-colors">
              Syarat & Ketentuan
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}