import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ProgramsSection } from './components/ProgramsSection';
import { GallerySection } from './components/GallerySection';
import { EventsSection } from './components/EventsSection';
import { NewsSection } from './components/NewsSection';
import { CTASection } from './components/CTASection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />

      <div
        className="relative bg-white"
        style={{ zIndex: 20 }}
      >
        {/* Wave SVG — ∪ shape */}
        <div
          className="absolute left-0 right-0 pointer-events-none"
          style={{ top: '-120px', height: '120px' }}
        >
          <svg
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            style={{ width: '100%', height: '100%', display: 'block' }}
          >
            <path
              d="M 0,0 C 280,0 560,120 720,120 C 880,120 1160,0 1440,0 L 1440,120 L 0,120 Z"
              fill="white"
            />
          </svg>
        </div>

        <AboutSection />
        <ProgramsSection />
        <GallerySection />
        <EventsSection />
        <NewsSection />
        <CTASection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
}
