import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { AboutSection } from '../components/AboutSection';
import { EventsSection } from '../components/EventsSection';
import { UpcomingEventsSection } from '../components/UpcomingEventsSection';
import { NewsSection } from '../components/NewsSection';
import { ArticlesSection } from '../components/ArticlesSection';
import { Footer } from '../components/Footer';

// ─────────────────────────────────────────────────────────────────────────────
// Clip-path polygon — same Figma Bezier bowl shape, but depth halved to 55px
// (was 110px from Figma). Both corners at y=0, centre dips to y=55px.
// y-values in px so depth is always consistent regardless of element height.
// ─────────────────────────────────────────────────────────────────────────────
const CURVED =
  'polygon(0% 0px, 1% 2px, 3% 6px, 7% 12px, 12% 20px, 18% 28px, 24% 36px, 31% 43px, 37% 50px, 44% 54px, 50% 55px, 56% 54px, 63% 50px, 69% 43px, 76% 36px, 82% 28px, 88% 20px, 93% 12px, 97% 6px, 99% 2px, 100% 0px, 100% 100%, 0% 100%)';

const STRAIGHT =
  'polygon(0% 0px, 1% 0px, 3% 0px, 7% 0px, 12% 0px, 18% 0px, 24% 0px, 31% 0px, 37% 0px, 44% 0px, 50% 0px, 56% 0px, 63% 0px, 69% 0px, 76% 0px, 82% 0px, 88% 0px, 93% 0px, 97% 0px, 99% 0px, 100% 0px, 100% 100%, 0% 100%)';

/**
 * Wraps a section with a scroll-driven clip-path animation:
 *   curved (Figma bowl) → straight  as the section scrolls into view.
 * On mobile (<768px): no clip-path, sections stack flat.
 * Overlap: -mt-[110px] on desktop matches the 110px curve depth.
 */
function CurvedSection({
  children,
  className,
  zIndexClass,
}: {
  children: React.ReactNode;
  className?: string;
  zIndexClass?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start start'],
  });

  const isMobile = useMotionValue(
    typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 0
  );

  useEffect(() => {
    const sync = () => isMobile.set(window.innerWidth < 768 ? 1 : 0);
    sync();
    window.addEventListener('resize', sync);
    return () => window.removeEventListener('resize', sync);
  }, [isMobile]);

  const desktopClip = useTransform(scrollYProgress, [0, 1], [CURVED, STRAIGHT]);

  const clipPath = useTransform(() =>
    isMobile.get() === 1 ? 'none' : desktopClip.get()
  );

  return (
    <motion.div
      ref={ref}
      className={`relative ${zIndexClass ?? ''} ${className ?? ''}`}
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
      const { count: articleCount } = await supabase
        .from('articles')
        .select('*', { count: 'exact', head: true });
      setHasArticles((articleCount || 0) > 0);

      const { count: eventCount } = await supabase
        .from('events')
        .select('*', { count: 'exact', head: true })
        .eq('type', 'upcoming');
      setHasUpcomingEvents((eventCount || 0) > 0);
    }
    checkData();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <div className="relative z-20">
        <Hero />
      </div>

      {/*
        About Section — "What is IKAMMA"
        Desktop/tablet: curved clip (55px deep bowl) animates to straight on scroll.
          -mt-[55px] matches the 55px curve depth exactly.
        Mobile: no clip, no overlap — stacks flat.
      */}
      <CurvedSection zIndexClass="z-30" className="md:-mt-[55px]">
        <AboutSection />
      </CurvedSection>

      {/* Events Section */}
      <CurvedSection zIndexClass="z-40" className="md:-mt-[55px]">
        <EventsSection />
      </CurvedSection>

      {/* Articles Section — only if content exists */}
      {hasArticles && (
        <CurvedSection zIndexClass="z-50" className="md:-mt-[55px]">
          <ArticlesSection />
        </CurvedSection>
      )}

      {/* News Section */}
      {!hasArticles ? (
        <CurvedSection zIndexClass="z-50" className="md:-mt-[55px]">
          <NewsSection />
        </CurvedSection>
      ) : (
        <div className="relative z-40 bg-white">
          <NewsSection />
        </div>
      )}

      {/* Upcoming Events */}
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
