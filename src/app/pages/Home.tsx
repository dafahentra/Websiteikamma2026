import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { EventsSection } from '../components/EventsSection';
import { UpcomingEventsSection } from '../components/UpcomingEventsSection';
import { NewsSection } from '../components/NewsSection';
import { ArticlesSection } from '../components/ArticlesSection';
import { Footer } from '../components/Footer';

function CurvedSection({ children, className, zIndexClass }: { children: React.ReactNode, className?: string, zIndexClass?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"]
  });

  const clipPath = useTransform(scrollYProgress, [0, 1], [
    "polygon(0% 0%, 5% 0.48%, 10% 0.9%, 15% 1.28%, 20% 1.6%, 25% 1.88%, 30% 2.1%, 35% 2.28%, 40% 2.4%, 45% 2.48%, 50% 2.5%, 55% 2.48%, 60% 2.4%, 65% 2.28%, 70% 2.1%, 75% 1.88%, 80% 1.6%, 85% 1.28%, 90% 0.9%, 95% 0.48%, 100% 0%, 100% 100%, 0% 100%)",
    "polygon(0% 0%, 5% 0%, 10% 0%, 15% 0%, 20% 0%, 25% 0%, 30% 0%, 35% 0%, 40% 0%, 45% 0%, 50% 0%, 55% 0%, 60% 0%, 65% 0%, 70% 0%, 75% 0%, 80% 0%, 85% 0%, 90% 0%, 95% 0%, 100% 0%, 100% 100%, 0% 100%)"
  ]);

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
        Events Section (z-30) 
        Always visible as it contains the flagship carousel.
      */}
      <CurvedSection zIndexClass="z-30" className="-mt-[5vh]">
        <EventsSection />
      </CurvedSection>

      {/* 
        Articles Section (z-40)
        Only rendered if articles exist.
      */}
      {hasArticles && (
        <CurvedSection zIndexClass="z-40" className="-mt-[10vh]">
          <ArticlesSection />
        </CurvedSection>
      )}

      {/* 
        News Section (z-50 if articles are hidden, to ensure it masks Events correctly)
        If articles are hidden, this section takes the role of masking EventsSection.
      */}
      {!hasArticles ? (
        <CurvedSection zIndexClass="z-40" className="-mt-[10vh]">
          <NewsSection />
        </CurvedSection>
      ) : (
        <div className="relative z-30 bg-white">
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
