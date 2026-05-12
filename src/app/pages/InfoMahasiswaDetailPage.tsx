import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { supabase } from '../../lib/supabase';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { createSlug } from '../../lib/slugify';
import { INFO_MAHASISWA_PHOTOS } from '../../assets/photos';
import { ArrowLeft, CalendarDays, ExternalLink, Facebook, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

// Custom X (Twitter) Icon
const XIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
  </svg>
);

export function InfoMahasiswaDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [info, setInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchInfoData = async () => {
      setLoading(true);
      const { data } = await supabase
        .from('info_mahasiswa')
        .select('*');
      
      if (data) {
        const match = data.find((e: any) => createSlug(e.title) === slug);
        setInfo(match || null);
      }
      setLoading(false);
    };
    fetchInfoData();
  }, [slug]);

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  const shareOnX = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(info?.title || '')}`, '_blank');
  };

  const shareOnWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent((info?.title || '') + ' ' + window.location.href)}`, '_blank');
  };

  if (loading) {
    return (
      <div className="bg-white min-h-screen">
        <Navbar />
        <div className="relative h-[60vh] bg-gray-200 animate-pulse flex items-end px-6 pb-16">
          <div className="max-w-4xl w-full">
            <div className="h-12 w-3/4 bg-gray-300 rounded-xl mb-4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!info) {
    return (
      <div className="bg-[#081C36] min-h-screen text-white flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-4xl font-bold font-inter mb-6">Informasi Not Found</h1>
        <Link to="/info-mahasiswa" className="px-8 py-3 bg-white text-[#081C36] rounded-full font-bold hover:bg-white/90 inline-flex items-center gap-2 mx-auto">
          <ArrowLeft size={20} /> Back to Info Mahasiswa
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen font-inter overflow-x-hidden">
      <Helmet>
        <title>{info.title} - IKAMMA FEB UGM</title>
        <meta name="description" content={info.description?.replace(/<[^>]*>?/gm, '').substring(0, 160) || "Informasi Mahasiswa IKAMMA FEB UGM."} />
        <meta property="og:title" content={`${info.title} - IKAMMA FEB UGM`} />
        <meta property="og:description" content={info.description?.replace(/<[^>]*>?/gm, '').substring(0, 160) || "Informasi Mahasiswa IKAMMA FEB UGM."} />
        <meta property="og:image" content={info.poster_url || INFO_MAHASISWA_PHOTOS[0]} />
      </Helmet>
      <Navbar />

      {/* Hero Header */}
      <section className="relative h-[60vh] md:h-[70vh] min-h-[400px] bg-[#081C36] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={info.poster_url || INFO_MAHASISWA_PHOTOS[0]} 
            alt={info.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#081C36] via-transparent to-transparent opacity-80" />
        </div>

        {/* Back Button */}
        <div className="absolute top-32 left-6 md:left-12 z-20">
          <button 
            onClick={() => navigate('/info-mahasiswa')}
            className="group flex items-center gap-2 bg-white/10 backdrop-blur-xl hover:bg-white text-white hover:text-[#081C36] px-6 py-3 rounded-full transition-all duration-500 border border-white/20 shadow-2xl"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold text-xs uppercase tracking-[0.2em]">Kembali</span>
          </button>
        </div>

        <div className="container mx-auto px-6 md:px-12 pb-16 md:pb-24 relative z-10">
          <div className="max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
              <div className="flex flex-wrap items-center gap-2 relative mb-8">
                {(() => {
                  const now = new Date();
                  now.setHours(0, 0, 0, 0);
                  
                  const parseIKAMMADate = (str: string) => {
                    if (!str) return null;
                    const parts = str.split(' ');
                    if (parts.length !== 3) return null;
                    const day = parseInt(parts[0]);
                    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
                    const month = months.indexOf(parts[1]);
                    const year = parseInt(parts[2]);
                    if (month === -1) return null;
                    return new Date(year, month, day);
                  };

                  const deadline = info.deadline_date ? new Date(info.deadline_date) : parseIKAMMADate(info.period_end);
                  if (deadline) deadline.setHours(0, 0, 0, 0);

                  const isActuallyClosed = (deadline && now > deadline) || info.status === 'closed';

                  if (isActuallyClosed) {
                    return (
                      <span className="relative inline-block bg-white/10 backdrop-blur-xl text-white px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] shadow-[0_8px_32px_rgba(0,0,0,0.2)] border border-white/20">
                        CLOSED
                      </span>
                    );
                  } else {
                    return (
                      <span className="relative flex items-center gap-2 bg-white/10 backdrop-blur-xl text-white px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] shadow-[0_8px_32px_rgba(0,0,0,0.2)] border border-white/30">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
                        OPEN
                      </span>
                    );
                  }
                })()}

                <span className="relative inline-block bg-white/10 backdrop-blur-xl text-white px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] shadow-[0_8px_32px_rgba(0,0,0,0.2)] border border-white/30">
                  {info.category || 'Info Mahasiswa'}
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-[1.1] tracking-tight drop-shadow-2xl">
                {info.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Metadata Bar */}
      <div className="bg-white border-b border-gray-100 sticky top-20 z-30 backdrop-blur-xl bg-white/80">
        <div className="container mx-auto px-6 md:px-12 py-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-[#081C36]/80 text-sm md:text-base font-medium">
          <div className="flex items-center gap-3">
            <CalendarDays size={20} className="text-[#081C36]/50 shrink-0" />
            <span>
              {info.period_start === info.period_end 
                ? info.period_start 
                : `${info.period_start} - ${info.period_end}`}
            </span>
          </div>
          {info.organizer && (
            <div className="flex items-center gap-3 md:justify-end">
              <span className="font-semibold text-[#081C36]">Oleh: {info.organizer}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <section className="py-20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <div 
              className="prose prose-lg md:prose-xl max-w-none prose-slate prose-headings:font-inter prose-headings:font-bold prose-headings:text-[#081C36] prose-p:text-gray-700 prose-p:leading-[1.8] prose-img:rounded-2xl"
              dangerouslySetInnerHTML={{ __html: info.full_description || info.description }}
            />

            {/* CTA Button */}
            <div className="mt-12">
              {info.status === 'open' ? (
                <a
                  href={info.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 md:py-5 bg-[#081C36] text-white font-inter font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-[#0a2545] transition-colors duration-300 rounded-xl shadow-xl"
                >
                  Buka Tautan Pendaftaran <ExternalLink size={16} />
                </a>
              ) : (
                <div className="w-full py-4 md:py-5 bg-red-50 text-red-500 font-inter font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 cursor-not-allowed rounded-xl border border-red-100">
                  PENDAFTARAN DITUTUP
                </div>
              )}
            </div>

            {/* Social Share */}
            <div className="mt-20 pt-10 border-t border-gray-100 flex items-center justify-between">
              <span className="text-lg font-bold text-[#081C36]">Bagikan Informasi Ini:</span>
              <div className="flex items-center gap-3">
                <button onClick={shareOnFacebook} className="w-12 h-12 flex items-center justify-center bg-gray-50 text-[#081C36] rounded-full hover:bg-[#3b5998] hover:text-white transition-all border border-gray-100 group">
                  <Facebook size={20} fill="currentColor" className="group-hover:scale-110 transition-transform" />
                </button>
                <button onClick={shareOnX} className="w-12 h-12 flex items-center justify-center bg-gray-50 text-[#081C36] rounded-full hover:bg-black hover:text-white transition-all border border-gray-100 group">
                  <XIcon size={20} className="group-hover:scale-110 transition-transform" />
                </button>
                <button onClick={shareOnWhatsApp} className="w-12 h-12 flex items-center justify-center bg-gray-50 text-[#081C36] rounded-full hover:bg-[#25D366] hover:text-white transition-all border border-gray-100 group">
                  <MessageCircle size={20} fill="currentColor" className="group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
