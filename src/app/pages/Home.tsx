import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { EventsSection } from '../components/EventsSection';
import { UpcomingEventsSection } from '../components/UpcomingEventsSection';
import { NewsSection } from '../components/NewsSection';
import { ArticlesSection } from '../components/ArticlesSection';
import { Footer } from '../components/Footer';

export function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* Hero section underneath (z-20) */}
      <div className="relative z-20">
        <Hero />
      </div>

      {/* Events section ON TOP (z-30) slides UP with a CONCAVE TOP.
          This masks the bottom of the Hero section to look like a dome,
          without actually cutting the Hero section itself! Increased -mt to shorten photo further */}
      <div 
        className="relative z-30 -mt-[5vh] bg-white"
        style={{ clipPath: "url(#events-curve)" }}
      >
        <EventsSection />
      </div>

      {/* Articles — now overlaps EventsSection (z-40) with a curved top.
          This creates a consistent premium transition effect. */}
      <div 
        className="relative z-40 -mt-[10vh] bg-white"
        style={{ clipPath: "url(#articles-curve)" }}
      >
        <ArticlesSection />
      </div>

      {/* Remaining sections on top */}
      <div className="relative z-30 flex flex-col">
        <NewsSection />
        <UpcomingEventsSection />
      </div>

      {/* Footer */}
      <div className="relative z-30">
        <Footer />
      </div>

      {/* SVG definition for the Events section's concave top edge */}
      <svg style={{ width: 0, height: 0, position: "absolute" }} aria-hidden="true" focusable="false">
        <clipPath id="events-curve" clipPathUnits="objectBoundingBox">
          {/* Top-left to top-right with a quadratic bezier dipping in the middle. Deeper curve (0.05) for premium look */}
          <path d="M 0,0 Q 0.5,0.05 1,0 L 1,1 L 0,1 Z" />
        </clipPath>
        <clipPath id="articles-curve" clipPathUnits="objectBoundingBox">
          {/* Consistent concave curve for the Articles transition */}
          <path d="M 0,0 Q 0.5,0.05 1,0 L 1,1 L 0,1 Z" />
        </clipPath>
      </svg>
    </div>
  );
}
