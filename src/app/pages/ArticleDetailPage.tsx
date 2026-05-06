import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { supabase } from '../../lib/supabase';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ArrowLeft, Clock, CalendarDays, User, Tag, ChevronRight, Facebook, MessageCircle, Share2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Custom X (Twitter) Icon
const XIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
  </svg>
);

export function ArticleDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<any>(null);
  const [relatedArticles, setRelatedArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchArticleData = async () => {
      setLoading(true);
      
      const { data: currentArticle } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .single();
      
      if (currentArticle) {
        setArticle(currentArticle);
        
        const { data: related } = await supabase
          .from('articles')
          .select('*')
          .eq('category', currentArticle.category)
          .neq('id', id)
          .limit(4);
        
        setRelatedArticles(related || []);
      }
      
      setLoading(false);
    };
    fetchArticleData();
  }, [id]);

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  const shareOnX = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article?.title || '')}`, '_blank');
  };

  const shareOnWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent((article?.title || '') + ' ' + window.location.href)}`, '_blank');
  };

  if (loading) {
    return (
      <div className="bg-[#081C36] min-h-screen text-white flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-t-white border-[#081C36] rounded-full animate-spin"></div>
          <p className="mt-4 text-white/50 font-inter">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="bg-[#081C36] min-h-screen text-white flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-inter mb-6 text-white">Article Not Found</h1>
        <p className="text-white/60 mb-10 max-w-md mx-auto">Sorry, the article you are looking for might have been moved or deleted.</p>
        <Link to="/articles" className="px-8 py-3 bg-white text-[#081C36] rounded-full font-bold hover:bg-white/90 transition-colors inline-flex items-center gap-2 mx-auto">
          <ArrowLeft size={20} />
          Back to Articles
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen font-inter overflow-x-hidden">
      <Navbar />

      {/* ── Sector Seven Style: Premium Hero Header ────────────────── */}
      <section className="relative h-[70vh] md:h-[80vh] min-h-[500px] bg-[#081C36] flex items-end overflow-hidden">
        {article.image_url && (
          <div className="absolute inset-0">
            <img 
              src={article.image_url} 
              alt={article.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#081C36] via-transparent to-transparent opacity-80" />
          </div>
        )}

        {/* Back Button */}
        <div className="absolute top-32 left-6 md:left-12 z-20">
          <button 
            onClick={() => navigate('/articles')}
            className="group flex items-center gap-2 bg-white/10 backdrop-blur-xl hover:bg-white text-white hover:text-[#081C36] px-6 py-3 rounded-full transition-all duration-500 border border-white/20 shadow-2xl"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold text-xs uppercase tracking-[0.2em]">Kembali</span>
          </button>
        </div>

        <div className="container mx-auto px-6 md:px-12 pb-16 md:pb-24 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Liquid Glass Pill */}
              <div className="inline-block relative mb-8">
                <span className="relative inline-block bg-white/10 backdrop-blur-xl text-white px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] border border-white/30 shadow-lg">
                  {article.category}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-[1.1] tracking-tight font-inter drop-shadow-2xl">
                {article.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Metadata Bar ─────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100 sticky top-20 z-30 backdrop-blur-xl bg-white/80">
        <div className="container mx-auto px-6 md:px-12 py-6 md:py-8 grid grid-cols-2 md:grid-cols-4 items-center gap-y-4 text-[#081C36]/80 text-sm md:text-lg font-medium">
          {/* 1. Date (Always Left) */}
          <div className="flex items-center gap-3 order-1">
            <CalendarDays size={20} className="text-[#081C36]/20 shrink-0" />
            <span className="whitespace-nowrap">{article.date}</span>
          </div>

          {/* 2. Penulis (Mobile: Right, Tablet: Center/Left) */}
          <div className="flex items-center gap-3 order-2 justify-end md:justify-start">
            <User size={20} className="text-[#081C36]/20 shrink-0" />
            <span className="truncate">Penulis: <span className="font-bold text-[#081C36]">{article.author}</span></span>
          </div>

          {/* 3. Editor (Mobile: Left, Tablet: Right) */}
          <div className="flex items-center gap-3 order-3 md:justify-end">
            <User size={20} className="text-[#081C36]/20 shrink-0" />
            <span className="truncate">Editor: <span className="font-bold text-[#081C36]">{article.editor || "IKAMMA Team"}</span></span>
          </div>

          {/* 4. Read Time (Always Right) */}
          <div className="flex items-center gap-3 order-4 justify-end">
            <Clock size={20} className="text-[#081C36]/20 shrink-0" />
            <span className="font-bold text-[#081C36] whitespace-nowrap">{article.read_time}</span>
          </div>
        </div>
      </div>

      {/* ── Main Content Area ────────────────────────────────────── */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-20">
            
            {/* Left side: Article Content */}
            <div className="lg:w-2/3">
              <div 
                className="prose prose-lg md:prose-2xl max-w-none prose-slate prose-headings:font-inter prose-headings:font-bold prose-headings:text-[#081C36] prose-p:text-gray-700 prose-p:leading-[1.8] prose-img:rounded-[2rem] prose-a:text-[#081C36] prose-a:font-bold prose-blockquote:border-l-[#081C36] prose-blockquote:bg-gray-50 prose-blockquote:py-4 prose-blockquote:px-8 prose-blockquote:rounded-r-3xl prose-blockquote:font-serif prose-blockquote:italic"
                dangerouslySetInnerHTML={{ __html: article.content || article.description }}
              />

              {/* ── UGM Style Footer: Tags & Social Share ──────────── */}
              <div className="mt-24 pt-12 border-t border-gray-100">
                {/* Tags */}
                <div className="flex flex-wrap items-center gap-4 mb-12">
                  <span className="text-lg font-bold text-[#081C36] mr-4">Tagar:</span>
                  <Link to="/articles" className="px-6 py-2 bg-gray-50 text-[#081C36] text-sm font-bold rounded-full hover:bg-[#081C36] hover:text-white transition-all border border-gray-100">
                    {article.category}
                  </Link>
                  <Link to="/articles" className="px-6 py-2 bg-gray-50 text-[#081C36] text-sm font-bold rounded-full hover:bg-[#081C36] hover:text-white transition-all border border-gray-100">
                    IKAMMA FEB UGM
                  </Link>
                </div>

                {/* Social Share */}
                <div className="flex items-center gap-4">
                  <span className="text-lg font-bold text-[#081C36] mr-4">Bagikan:</span>
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

            {/* Right side: UGM Style Related News List */}
            <div className="lg:w-1/3">
              <div className="sticky top-40">
                <div className="relative mb-12 pl-6 border-l-4 border-[#081C36]">
                  <h2 className="text-4xl text-[#081C36] tracking-tighter">
                    <span className="font-serif italic mr-2">Berita</span>
                    <span className="font-bold font-inter">Terkait</span>
                  </h2>
                </div>

                <div className="space-y-10">
                  {relatedArticles.length > 0 ? (
                    relatedArticles.map((item) => (
                      <Link 
                        key={item.id} 
                        to={`/articles/${item.id}`}
                        className="group block py-2"
                      >
                        <h3 className="text-xl font-bold text-[#081C36] group-hover:text-[#081C36]/60 transition-colors leading-tight mb-3 font-inter tracking-tight">
                          {item.title}
                        </h3>
                        <p className="text-sm font-medium text-gray-400 uppercase tracking-widest">
                          {item.date}
                        </p>
                      </Link>
                    ))
                  ) : (
                    <p className="text-gray-400 text-sm italic font-serif">Belum ada berita terkait lainnya.</p>
                  )}
                </div>

                <div className="mt-16">
                  <Link to="/articles" className="inline-flex items-center gap-4 bg-[#081C36] text-white px-10 py-4 rounded-full text-sm font-bold uppercase tracking-[0.2em] hover:bg-[#081C36]/90 transition-all shadow-xl group">
                    Lihat Semua Berita 
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
