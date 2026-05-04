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
        style={{ clipPath: "polygon(0% 0%, 5% 0.48%, 10% 0.9%, 15% 1.28%, 20% 1.6%, 25% 1.88%, 30% 2.1%, 35% 2.28%, 40% 2.4%, 45% 2.48%, 50% 2.5%, 55% 2.48%, 60% 2.4%, 65% 2.28%, 70% 2.1%, 75% 1.88%, 80% 1.6%, 85% 1.28%, 90% 0.9%, 95% 0.48%, 100% 0%, 100% 100%, 0% 100%)" }}
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
          style={{ clipPath: "polygon(0% 0%, 5% 0.48%, 10% 0.9%, 15% 1.28%, 20% 1.6%, 25% 1.88%, 30% 2.1%, 35% 2.28%, 40% 2.4%, 45% 2.48%, 50% 2.5%, 55% 2.48%, 60% 2.4%, 65% 2.28%, 70% 2.1%, 75% 1.88%, 80% 1.6%, 85% 1.28%, 90% 0.9%, 95% 0.48%, 100% 0%, 100% 100%, 0% 100%)" }}
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
        style={!hasArticles ? { clipPath: "polygon(0% 0%, 5% 0.48%, 10% 0.9%, 15% 1.28%, 20% 1.6%, 25% 1.88%, 30% 2.1%, 35% 2.28%, 40% 2.4%, 45% 2.48%, 50% 2.5%, 55% 2.48%, 60% 2.4%, 65% 2.28%, 70% 2.1%, 75% 1.88%, 80% 1.6%, 85% 1.28%, 90% 0.9%, 95% 0.48%, 100% 0%, 100% 100%, 0% 100%)" } : {}}
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


    </div>
  );
}
