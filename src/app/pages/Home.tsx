import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { AboutSection } from '../components/AboutSection';
import { EventsSection } from '../components/EventsSection';
import { UpcomingEventsSection } from '../components/UpcomingEventsSection';
import { NewsSection } from '../components/NewsSection';
import { ArticlesSection } from '../components/ArticlesSection';
import { Footer } from '../components/Footer';

import { useMotionValue } from 'framer-motion';

function CurvedSection({ children, className, zIndexClass }: { children: React.ReactNode, className?: string, zIndexClass?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"]
  });

  const isMobileMV = useMotionValue(typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 0);
  
  useEffect(() => {
    const checkMobile = () => isMobileMV.set(window.innerWidth < 768 ? 1 : 0);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [isMobileMV]);

  const desktopCurve = [
    "polygon(0% 0%, 5% 0.48%, 10% 0.9%, 15% 1.28%, 20% 1.6%, 25% 1.88%, 30% 2.1%, 35% 2.28%, 40% 2.4%, 45% 2.48%, 50% 2.5%, 55% 2.48%, 60% 2.4%, 65% 2.28%, 70% 2.1%, 75% 1.88%, 80% 1.6%, 85% 1.28%, 90% 0.9%, 95% 0.48%, 100% 0%, 100% 100%, 0% 100%)",
    "polygon(0% 0%, 5% 0%, 10% 0%, 15% 0%, 20% 0%, 25% 0%, 30% 0%, 35% 0%, 40% 0%, 45% 0%, 50% 0%, 55% 0%, 60% 0%, 65% 0%, 70% 0%, 75% 0%, 80% 0%, 85% 0%, 90% 0%, 95% 0%, 100% 0%, 100% 100%, 0% 100%)"
  ];
  
  const mobileCurve = [
    "polygon(0% 0%, 5% 0.19%, 10% 0.36%, 15% 0.51%, 20% 0.64%, 25% 0.75%, 30% 0.84%, 35% 0.91%, 40% 0.96%, 45% 0.99%, 50% 1%, 55% 0.99%, 60% 0.96%, 65% 0.91%, 70% 0.84%, 75% 0.75%, 80% 0.64%, 85% 0.51%, 90% 0.36%, 95% 0.19%, 100% 0%, 100% 100%, 0% 100%)",
    "polygon(0% 0%, 5% 0%, 10% 0%, 15% 0%, 20% 0%, 25% 0%, 30% 0%, 35% 0%, 40% 0%, 45% 0%, 50% 0%, 55% 0%, 60% 0%, 65% 0%, 70% 0%, 75% 0%, 80% 0%, 85% 0%, 90% 0%, 95% 0%, 100% 0%, 100% 100%, 0% 100%)"
  ];

  const clipPathDesktop = useTransform(scrollYProgress, [0, 1], desktopCurve);
  const clipPathMobile = useTransform(scrollYProgress, [0, 1], mobileCurve);
  
  const clipPath = useTransform(() => {
    return isMobileMV.get() === 1 ? clipPathMobile.get() : clipPathDesktop.get();
  });

  return (
    <motion.div
      ref={ref}
      className={`relative bg-white ${zIndexClass} ${className}`}
      style={{ clipPath }}
    >
      {children}
    </motion.div>
  );
}

export function Home() {
  const [hasArticles, setHasArticles] = useState<boolean | null>(null);
  const [hasUpcomingEvents, setHasUpcomingEvents] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkData() {
      // Check for articles
      const { count: articleCount } = await supabase
        .from('articles')
        .select('*', { count: 'exact', head: true });
      setHasArticles((articleCount || 0) > 0);

      // Check for upcoming events
      const { count: eventCount } = await supabase
        .from('events')
        .select('*', { count: 'exact', head: true })
        .eq('type', 'upcoming');
      setHasUpcomingEvents((eventCount || 0) > 0);
    }
    checkData();
  }, []);

  // While checking, we can show a neutral state or just the hero
  const isLoading = hasArticles === null || hasUpcomingEvents === null;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero section underneath (z-20) */}
      <div className="relative z-20">
        <Hero />
      </div>

      {/* 
        About Section (What is IKAMMA)
      */}
      <CurvedSection zIndexClass="z-30" className="-mt-[10vh]">
        <AboutSection />
      </CurvedSection>

      {/* 
        Events Section 
        Always visible as it contains the flagship carousel.
      */}
      <CurvedSection zIndexClass="z-40" className="-mt-[10vh]">
        <EventsSection />
      </CurvedSection>

      {/* 
        Articles Section
        Only rendered if articles exist.
      */}
      {hasArticles && (
        <CurvedSection zIndexClass="z-50" className="-mt-[10vh]">
          <ArticlesSection />
        </CurvedSection>
      )}

      {/* 
        News Section
        If articles are hidden, this section takes the role of masking EventsSection.
      */}
      {!hasArticles ? (
        <CurvedSection zIndexClass="z-50" className="-mt-[10vh]">
          <NewsSection />
        </CurvedSection>
      ) : (
        <div className="relative z-40 bg-white">
          <NewsSection />
        </div>
      )}

      {/* 
        Upcoming Events Section
        Only rendered if events exist.
      */}
      {hasUpcomingEvents && (
        <div className="relative z-30">
          <UpcomingEventsSection />
        </div>
      )}

      {/* Footer */}
      <div className="relative z-30">
        <Footer />
      </div>


    </div>
  );
}
