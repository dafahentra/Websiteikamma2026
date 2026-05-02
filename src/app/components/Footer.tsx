import { MapPin, Mail, Phone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import Logo from '../../assets/Logo.svg';

/* ── Sleek Brand SVG Icons ────────────────────────────────────────── */
function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function YouTubeIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function XIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function TikTokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

function GmailIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.573l8.073-6.08c1.618-1.214 3.927-.059 3.927 1.964z" />
    </svg>
  );
}

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.653a11.815 11.815 0 005.684 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Info Mahasiswa', href: '/info-mahasiswa' },
  { label: 'Our Events', href: '/events' },
];

const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com/ikamma.ugm' },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/ikamma' },
  { label: 'Youtube', href: 'https://youtube.com/@ikamma' },
  { label: 'Tiktok', href: 'https://tiktok.com/@ikamma.ugm' },
  { label: 'X', href: 'https://x.com/ikamma_ugm' },
];

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 text-[#081C36] py-12 px-8 md:px-12 lg:px-24 font-inter">
      <div className="max-w-6xl mx-auto flex flex-col-reverse lg:flex-col gap-12">
        
        {/* Logo Section */}
        <div className="flex items-center gap-6">
          <img src={Logo} alt="IKAMMA Logo" className="w-24 md:w-32 object-contain" />
          <div className="flex flex-col gap-1">
            <h3 className="font-bold text-sm md:text-base text-[#081C36]">Ikatan Keluarga Mahasiswa Manajemen</h3>
            <p className="text-sm text-[#081C36]">Fakultas Ekonomika dan Bisnis</p>
            <p className="text-sm text-[#081C36]">Universitas Gadjah Mada</p>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 w-full lg:ml-[150px]">
          
          {/* Navigation */}
          <div className="col-span-1 flex flex-col gap-4">
            <h4 className="font-bold text-base">Navigation</h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li><Link to="/" className="hover:underline">Home</Link></li>
              <li><Link to="/about" className="hover:underline">About Us</Link></li>
              <li><Link to="/info-mahasiswa" className="hover:underline">Info Mahasiswa</Link></li>
              <li><Link to="/events" className="hover:underline">Our Events</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div className="col-span-1 flex flex-col gap-4">
            <h4 className="font-bold text-base">Social</h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li><a href="https://instagram.com/ikamma.ugm" target="_blank" rel="noopener noreferrer" className="hover:underline">Instagram</a></li>
              <li><a href="https://linkedin.com/company/ikamma" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a></li>
              <li><a href="https://youtube.com/@ikamma" target="_blank" rel="noopener noreferrer" className="hover:underline">Youtube</a></li>
              <li><a href="https://tiktok.com/@ikamma.ugm" target="_blank" rel="noopener noreferrer" className="hover:underline">Tiktok</a></li>
              <li><a href="https://x.com/ikamma_ugm" target="_blank" rel="noopener noreferrer" className="hover:underline">X</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 lg:col-span-1 flex flex-col gap-4">
            <h4 className="font-bold text-base">Contact</h4>
            <ul className="flex flex-col gap-4 text-sm">
              <li>
                <a href="mailto:dafahentra@gmail.com" className="flex items-center gap-2 hover:underline">
                  <GmailIcon size={18} />
                  <span>dafahentra@gmail.com</span>
                </a>
              </li>
              <li>
                <a href="https://wa.me/6281256720013" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
                  <WhatsAppIcon size={18} />
                  <span>+6281256720013</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Find Us At Maps */}
          <div className="col-span-2 lg:col-span-1 hidden md:flex flex-col gap-4">
            <h4 className="font-bold text-base">Find Us At Maps</h4>
            <div className="w-full h-32 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4905.445452541879!2d110.37635327591678!3d-7.770554077082666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a59b4c17e62a5%3A0xa7b0a99cf63441a6!2sFakultas%20Ekonomika%20dan%20Bisnis%20UGM!5e1!3m2!1sid!2sid!4v1777633924284!5m2!1sid!2sid" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="flex items-start gap-2 text-[11px] leading-tight text-[#081C36]">
              <MapPin size={16} className="shrink-0" />
              <p>
                Jl. Sosio Humaniora, Karang Malang,<br/>
                Caturtunggal, Depok, Sleman,<br/>
                Daerah Istimewa Yogyakarta
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-6xl mx-auto text-center border-t border-gray-200 pt-6 mt-12">
        <p className="text-sm text-[#081C36]/70">
          © 2026 IKAMMA FEB UGM, All Rights Reserved
        </p>
      </div>
    </footer>
  );
}