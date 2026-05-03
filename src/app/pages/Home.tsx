import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { EventsSection } from '../components/EventsSection';
import { UpcomingEventsSection } from '../components/UpcomingEventsSection';
import { NewsSection } from '../components/NewsSection';
import { ArticlesSection } from '../components/ArticlesSection';
import { Footer } from '../components/Footer';

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
      <div 
        className="relative z-30 -mt-[5vh] bg-white"
        style={{ clipPath: "url(#events-curve)" }}
      >
        <EventsSection />
      </div>

      {/* 
        Articles Section (z-40)
        Only rendered if articles exist.
      */}
      {hasArticles && (
        <div 
          className="relative z-40 -mt-[10vh] bg-white"
          style={{ clipPath: "url(#articles-curve)" }}
        >
          <ArticlesSection />
        </div>
      )}

      {/* 
        News Section (z-50 if articles are hidden, to ensure it masks Events correctly)
        If articles are hidden, this section takes the role of masking EventsSection.
      */}
      <div 
        className={`relative bg-white ${!hasArticles ? 'z-40 -mt-[10vh]' : 'z-30'}`}
        style={!hasArticles ? { clipPath: "url(#articles-curve)" } : {}}
      >
        <NewsSection />
      </div>

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

      {/* SVG definition for the concave transitions */}
      <svg style={{ width: 0, height: 0, position: "absolute" }} aria-hidden="true" focusable="false">
        <clipPath id="events-curve" clipPathUnits="objectBoundingBox">
          <path d="M 0,0 Q 0.5,0.05 1,0 L 1,1 L 0,1 Z" />
        </clipPath>
        <clipPath id="articles-curve" clipPathUnits="objectBoundingBox">
          <path d="M 0,0 Q 0.5,0.05 1,0 L 1,1 L 0,1 Z" />
        </clipPath>
      </svg>
    </div>
  );
}
