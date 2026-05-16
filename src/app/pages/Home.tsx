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

export function Home() {
  const [hasArticles, setHasArticles] = useState<boolean | null>(null);
  const [hasUpcomingEvents, setHasUpcomingEvents] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkData() {
      const { count: articleCount } = await supabase
        .from('articles')
        .select('*', { count: 'exact', head: true });
      setHasArticles((articleCount || 0) > 0);

      const { data: upcomingEvents } = await supabase
        .from('events')
        .select('end_date')
        .eq('type', 'upcoming');

      let hasValidUpcoming = false;
      if (upcomingEvents && upcomingEvents.length > 0) {
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        hasValidUpcoming = upcomingEvents.some(e => {
          const end = e.end_date ? new Date(e.end_date) : null;
          if (end) end.setHours(0, 0, 0, 0);
          return !end || now <= end;
        });
      }
      setHasUpcomingEvents(hasValidUpcoming);
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
      */}
      <div className="relative z-30">
        <AboutSection />
      </div>

      {/* Events Section */}
      <div className="relative z-40">
        <EventsSection />
      </div>

      {/* Articles Section — only if content exists */}
      {hasArticles && (
        <div className="relative z-50">
          <ArticlesSection />
        </div>
      )}

      {/* News Section */}
      <div className="relative z-40 bg-white">
        <NewsSection />
      </div>

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
