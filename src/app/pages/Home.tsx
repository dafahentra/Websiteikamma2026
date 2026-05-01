import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { EventsSection } from '../components/EventsSection';
import { UpcomingEventsSection } from '../components/UpcomingEventsSection';
import { NewsSection } from '../components/NewsSection';
import { ArticlesSection } from '../components/ArticlesSection';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';

export function Home() {
  return (
    <div className="min-h-screen bg-[#0C2340]">
      <Navbar />
      {/* Hero section underneath (z-20) */}
      <div className="relative z-20">
        <Hero />
      </div>

      {/* Events section ON TOP (z-30) slides UP with a CONCAVE TOP.
          This masks the bottom of the Hero section to look like a dome,
          without actually cutting the Hero section itself! */}
      <div 
        className="relative z-30 -mt-[2vh] bg-white"
        style={{ clipPath: "url(#events-curve)" }}
      >
        <EventsSection />
      </div>

      {/* Articles — sits BEHIND EventsSection (z-20) for curtain-reveal parallax.
          As EventsSection scrolls away, this section is revealed underneath. */}
      <div className="relative z-20">
        <ArticlesSection />
      </div>

      {/* Remaining sections on top */}
      <div className="relative z-30 flex flex-col">
        <NewsSection />
        <UpcomingEventsSection />
      </div>

      {/* Contact & Footer */}
      <div className="relative z-30 bg-white">
        <ContactSection />
        <Footer />
      </div>

      {/* SVG definition for the Events section's concave top edge */}
      <svg style={{ width: 0, height: 0, position: "absolute" }} aria-hidden="true" focusable="false">
        <clipPath id="events-curve" clipPathUnits="objectBoundingBox">
          {/* Top-left to top-right with a quadratic bezier dipping in the middle. Gentler curve (0.01) */}
          <path d="M 0,0 Q 0.5,0.01 1,0 L 1,1 L 0,1 Z" />
        </clipPath>
      </svg>
    </div>
  );
}
