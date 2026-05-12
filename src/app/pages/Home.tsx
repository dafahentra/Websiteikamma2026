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

  // Desktop: percentage-based curve animated via scroll.
  // Formula: y = 8% × sin²(π × x). Symmetric, smooth bell. ~80px deep on a 1000px element.
  const desktopCurve = [
    "polygon(0% 0%, 5% 0.2%, 10% 0.76%, 15% 1.65%, 20% 2.76%, 25% 4%, 30% 5.23%, 35% 6.34%, 40% 7.24%, 45% 7.8%, 50% 8%, 55% 7.8%, 60% 7.24%, 65% 6.34%, 70% 5.23%, 75% 4%, 80% 2.76%, 85% 1.65%, 90% 0.76%, 95% 0.2%, 100% 0%, 100% 100%, 0% 100%)",
    "polygon(0% 0%, 5% 0%, 10% 0%, 15% 0%, 20% 0%, 25% 0%, 30% 0%, 35% 0%, 40% 0%, 45% 0%, 50% 0%, 55% 0%, 60% 0%, 65% 0%, 70% 0%, 75% 0%, 80% 0%, 85% 0%, 90% 0%, 95% 0%, 100% 0%, 100% 100%, 0% 100%)"
  ];

  // Mobile (<768px): no curve at all — sections stack flat, no clip-path applied.
  // Tablet/Desktop (≥768px): animated percentage-based curve via scroll.
  const clipPathDesktopMV = useTransform(scrollYProgress, [0, 1], desktopCurve);

  const clipPath = useTransform(() => {
    return isMobileMV.get() === 1 ? 'none' : clipPathDesktopMV.get();
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
      {/* On mobile: sections stack flat (no margin, no curve). On tablet/desktop: curved overlap. */}
      <CurvedSection zIndexClass="z-30" className="md:-mt-[10vh]">
        <AboutSection />
      </CurvedSection>

      {/* 
        Events Section 
        Always visible as it contains the flagship carousel.
      */}
      <CurvedSection zIndexClass="z-40" className="md:-mt-[10vh]">
        <EventsSection />
      </CurvedSection>

      {/* 
        Articles Section
        Only rendered if articles exist.
      */}
      {hasArticles && (
        <CurvedSection zIndexClass="z-50" className="md:-mt-[10vh]">
          <ArticlesSection />
        </CurvedSection>
      )}

      {/* 
        News Section
        If articles are hidden, this section takes the role of masking EventsSection.
      */}
      {!hasArticles ? (
        <CurvedSection zIndexClass="z-50" className="md:-mt-[10vh]">
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
