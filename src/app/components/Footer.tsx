import { Mail, Phone } from 'lucide-react';
import { Link } from 'react-router';
import Logo from '../../assets/LogoIKAMMA/LogoHitam.svg';
import { supabase } from '../../lib/supabase';
import { useEffect, useState } from 'react';

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

export function Footer() {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase.from('site_settings').select('*').eq('id', 1).single();
      if (data) setSettings(data);
    };
    fetchSettings();
  }, []);

  const socialLinks = [
    { label: 'Instagram', href: settings?.instagram_url || 'https://instagram.com/ikamma.ugm' },
    { label: 'LinkedIn', href: settings?.linkedin_url || 'https://linkedin.com/company/ikamma' },
    { label: 'Youtube', href: settings?.youtube_url || 'https://youtube.com/@ikamma' },
    { label: 'Tiktok', href: settings?.tiktok_url || 'https://tiktok.com/@ikamma.ugm' },
    { label: 'X', href: settings?.x_url || 'https://x.com/ikamma_ugm' },
  ];

  return (
    <footer className="bg-white text-[#081C36] font-inter">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Column 1: Brand Identity */}
          <div className="lg:col-span-4 flex items-center gap-6">
            <img src={Logo} alt="IKAMMA Logo" className="w-20 md:w-24 lg:w-28 object-contain" />
            <div className="flex flex-col gap-0.5">
              <h3 className="font-bold text-base md:text-lg text-[#081C36] leading-tight">
                Ikatan Keluarga Mahasiswa Manajemen
              </h3>
              <p className="text-sm md:text-base text-[#081C36]/70">
                Fakultas Ekonomika dan Bisnis
              </p>
              <p className="text-sm md:text-base text-[#081C36]/70">
                Universitas Gadjah Mada
              </p>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="lg:col-span-2 flex flex-col gap-6 lg:pl-12">
            <h4 className="font-bold text-xs md:text-sm uppercase tracking-[0.2em] text-[#081C36]/40">Navigation</h4>
            <ul className="flex flex-col gap-3 text-sm md:text-base font-medium">
              <li><Link to="/" className="text-[#081C36]/60 hover:text-[#081C36] transition-all hover:translate-x-1 inline-block">Home</Link></li>
              <li><Link to="/about" className="text-[#081C36]/60 hover:text-[#081C36] transition-all hover:translate-x-1 inline-block">About Us</Link></li>
              <li><Link to="/info-mahasiswa" className="text-[#081C36]/60 hover:text-[#081C36] transition-all hover:translate-x-1 inline-block">Info Mahasiswa</Link></li>
              <li><Link to="/events" className="text-[#081C36]/60 hover:text-[#081C36] transition-all hover:translate-x-1 inline-block">Our Events</Link></li>
            </ul>
          </div>

          {/* Column 3: Social */}
          <div className="lg:col-span-3 flex flex-col gap-6 lg:pl-12">
            <h4 className="font-bold text-xs md:text-sm uppercase tracking-[0.2em] text-[#081C36]/40">Social</h4>
            <ul className="flex flex-col gap-3 text-sm md:text-base font-medium">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a href={social.href} target="_blank" rel="noopener noreferrer" className="text-[#081C36]/60 hover:text-[#081C36] transition-all hover:translate-x-1 inline-block">
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <h4 className="font-bold text-xs md:text-sm uppercase tracking-[0.2em] text-[#081C36]/40">Contact</h4>
            <ul className="flex flex-col gap-4 text-sm md:text-base font-medium">
              <li>
                <a href={`mailto:${settings?.email_contact || 'dafahentra@gmail.com'}`} className="group flex items-center gap-2 text-[#081C36]/60 hover:text-[#081C36] transition-all">
                  <div className="flex items-center justify-center w-5 h-5 group-hover:scale-110 transition-transform">
                    <GmailIcon size={14} />
                  </div>
                  <span className="break-all">{settings?.email_contact || 'dafahentra@gmail.com'}</span>
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${(settings?.phone_contact || '+6281256720013').replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-[#081C36]/60 hover:text-[#081C36] transition-all">
                  <div className="flex items-center justify-center w-5 h-5 group-hover:scale-110 transition-transform">
                    <WhatsAppIcon size={14} />
                  </div>
                  <span>{settings?.phone_contact || '+6281256720013'}</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider Line */}
        <div className="w-full h-px bg-gray-100 mt-16 mb-8" />

        {/* Bottom Bar: Copyright */}
        <div className="flex justify-center items-center text-[#081C36]/40 text-xs md:text-sm">
          <p>© 2026 IKAMMA FEB UGM. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
