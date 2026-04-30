import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProgramsSection } from './components/ProgramsSection';
import { GallerySection } from './components/GallerySection';
import { EventsSection } from './components/EventsSection';
import { NewsSection } from './components/NewsSection';
import { CTASection } from './components/CTASection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0C2340]">
      <Navbar />
      <Hero />

      {/* The rest of the page sections */}
      <div className="relative bg-[#0C2340]" style={{ zIndex: 20 }}>
        
        {/* White background for the remaining sections */}
        <div className="bg-white">
          <EventsSection />
          <ProgramsSection />
          <GallerySection />
          <NewsSection />
          <CTASection />
          <ContactSection />
          <Footer />
        </div>
      </div>
    </div>
  );
}
