import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { AboutSection } from '../components/AboutSection';
import { EventsSection } from '../components/EventsSection';
import { UpcomingEventsSection } from '../components/UpcomingEventsSection';
import { NewsSection } from '../components/NewsSection';
import { ArticlesSection } from '../components/ArticlesSection';
import { Footer } from '../components/Footer';

/**
 * SVG wave divider placed at the TOP of a white section.
 * Path from Figma node 52-1288:
 *   M1728 160H0V0C0 0 523.863 110 864 110C1204.14 110 1728 0 1728 0V160Z
 *
 * Shape: a concave-up "bowl".
 * - Both left & right corners start at y=0 (the very top edge)
 * - The center dips DOWN to y=110 (68.75% of the 160px SVG height)
 * - This creates a smooth Bezier arc from edge to edge, like the inside of a circle
 *
 * The SVG fills the section's background color and sits above the previous section,
 * acting as a smooth wave cap. Hidden on mobile (sections stack flat).
 */
function WaveDivider({ fill = '#ffffff' }: { fill?: string }) {
  return (
    <div
      className="hidden md:block absolute top-0 left-0 w-full overflow-hidden leading-none z-10 pointer-events-none"
      style={{ height: '160px', marginTop: '-159px' }}
    >
      <svg
        viewBox="0 0 1728 160"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <path
          d="M1728 160H0V0C0 0 523.863 110 864 110C1204.14 110 1728 0 1728 0V160Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

/** Wraps a section and prepends the wave SVG cap above it on tablet/desktop. */
function CurvedSection({
  children,
  className,
  zIndexClass,
  waveFill = '#ffffff',
}: {
  children: React.ReactNode;
  className?: string;
  zIndexClass?: string;
  waveFill?: string;
}) {
  return (
    <div className={`relative ${zIndexClass ?? ''} ${className ?? ''}`}>
      <WaveDivider fill={waveFill} />
      {children}
    </div>
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

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero section */}
      <div className="relative z-20">
        <Hero />
      </div>

      {/*
        About Section (What is IKAMMA)
        On desktop/tablet: WaveDivider (white SVG bowl) caps the top, overlapping the Hero by ~159px.
        On mobile: no wave, sections stack flat.
      */}
      <CurvedSection zIndexClass="z-30" className="md:-mt-[159px]">
        <AboutSection />
      </CurvedSection>

      {/*
        Events Section
        WaveDivider matches the white background of EventsSection.
      */}
      <CurvedSection zIndexClass="z-40" className="md:-mt-[159px]">
        <EventsSection />
      </CurvedSection>

      {/*
        Articles Section — only if articles exist.
      */}
      {hasArticles && (
        <CurvedSection zIndexClass="z-50" className="md:-mt-[159px]">
          <ArticlesSection />
        </CurvedSection>
      )}

      {/*
        News Section
        If no articles: uses CurvedSection to mask EventsSection below.
        If articles exist: plain div (ArticlesSection already masks EventsSection).
      */}
      {!hasArticles ? (
        <CurvedSection zIndexClass="z-50" className="md:-mt-[159px]">
          <NewsSection />
        </CurvedSection>
      ) : (
        <div className="relative z-40 bg-white">
          <NewsSection />
        </div>
      )}

      {/* Upcoming Events Section */}
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
