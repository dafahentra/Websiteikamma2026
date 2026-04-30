import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import LogoPutihRaw from '../../imports/LogoPutih.svg?raw';
import { SCRAPBOOK_PHOTOS } from '../../assets/photos';

// Extract SVG inner paths
const svgInner = LogoPutihRaw
  .replace(/<\?xml[^>]*\?>/g, '')
  .replace(/<svg[^>]*>/g, '')
  .replace(/<\/svg>/g, '')
  .trim();

function IkammaLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 749 538"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="IKAMMA"
      dangerouslySetInnerHTML={{ __html: svgInner }}
    />
  );
}

export function AboutIkamma() {
  return (
    <div className="min-h-screen bg-[#0C2340] text-white flex flex-col relative overflow-hidden">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 relative z-10 max-w-[1400px] mx-auto w-full px-6 md:px-12">
        
        {/* Section: Our Values */}
        <section className="mb-32">
          <div className="mb-16 flex items-center justify-center gap-3">
            <span className="text-[#0CA678] font-inter text-xl md:text-2xl">01</span>
            <span className="text-white/50 text-xl">—</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-white">
              <span className="font-caslon-italic">Our</span> <span className="font-inter font-bold">Values</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-5xl mx-auto">
            {[1, 2, 3, 4].map((i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border border-white/40 mb-6 flex items-center justify-center p-6 group-hover:border-[#0CA678] transition-colors duration-300">
                  <IkammaLogo className="w-full h-full text-white/50 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-inter font-bold text-xl mb-3">Logo</h3>
                <p className="font-inter text-sm text-white/60 leading-relaxed max-w-[200px]">
                  Lorem Ipsum Lorem Ipsum Acincong
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section: Our Team */}
        <section className="mb-32">
          <div className="mb-12 flex items-center gap-3">
            <span className="text-[#0CA678] font-inter text-xl md:text-2xl">01</span>
            <span className="text-white/50 text-xl">—</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-white">
              <span className="font-caslon-italic">Our</span> <span className="font-inter font-bold">Team</span>
            </h2>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full h-[400px] md:h-[600px] rounded-3xl overflow-hidden relative"
          >
            <img 
              src={SCRAPBOOK_PHOTOS[8]} // A group photo
              alt="IKAMMA Team" 
              className="w-full h-full object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C2340] via-transparent to-transparent opacity-80"></div>
          </motion.div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-12 mb-32">
          {/* Section: Our Mission (Left side) */}
          <section className="order-2 md:order-1">
            <div className="mb-12 flex items-center gap-3">
              <span className="text-[#0CA678] font-inter text-xl md:text-2xl">02</span>
              <span className="text-white/50 text-xl">—</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl text-white">
                <span className="font-caslon-italic">Our</span> <span className="font-inter font-bold">Mission</span>
              </h2>
            </div>

            <div className="flex flex-col gap-6">
              {[1, 2, 3].map((i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="w-full h-32 md:h-40 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/5 hover:bg-white/15 transition-colors"
                />
              ))}
            </div>
          </section>

          {/* Section: Our Vision (Right side) */}
          <section className="order-1 md:order-2 flex flex-col md:items-end text-left md:text-right">
            <div className="mb-8 flex items-center justify-start md:justify-end gap-3 w-full">
              <span className="text-[#0CA678] font-inter text-xl md:text-2xl">01</span>
              <span className="text-white/50 text-xl">—</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl text-white">
                <span className="font-caslon-italic">Our</span> <span className="font-inter font-bold">Vision</span>
              </h2>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-md"
            >
              <p className="font-inter text-xl md:text-2xl leading-relaxed text-white/90">
                Daya (kekuatan) jiwa yang mendorong makhluk hidup untuk berkehendak; kehendak; niat
              </p>
            </motion.div>
          </section>
        </div>

        {/* Section: Kabinet & Filosofi Logo */}
        <section className="mb-24 pt-24 border-t border-white/10">
          <div className="flex flex-col items-center justify-center mb-24">
             <div className="flex flex-wrap items-center justify-center gap-3 md:gap-5 text-4xl md:text-6xl lg:text-7xl">
                <span className="text-white/50 font-inter font-light">—</span>
                <span className="font-inter font-bold">Kabinet</span>
                <span className="font-caslon-italic text-[#0CA678]">Arsanafafifu</span>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Filosofi Text */}
            <div>
              <div className="mb-10 flex items-center gap-3">
                <span className="text-[#0CA678] font-inter text-xl md:text-2xl">01</span>
                <span className="text-white/50 text-xl">—</span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl text-white">
                  <span className="font-caslon-italic">Filosofi</span> <span className="font-inter font-bold">Logo</span>
                </h2>
              </div>
              
              <div className="mb-6 flex items-end gap-3">
                <h3 className="font-inter font-bold text-4xl md:text-5xl">Karsa</h3>
                <span className="font-inter font-light text-2xl md:text-3xl text-white/40 pb-1">[Kar·sa]</span>
              </div>
              
              <p className="font-inter text-xl md:text-2xl leading-relaxed text-white/80 max-w-lg">
                Daya (kekuatan) jiwa yang mendorong makhluk hidup untuk berkehendak; kehendak; niat
              </p>
            </div>

            {/* Logo Display */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full aspect-square md:aspect-auto md:h-[500px] rounded-[40px] border border-[#0CA678]/50 bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center p-12 relative overflow-hidden group"
            >
              {/* Vibrant Logo Placeholder representing Karsa */}
              <div className="relative w-full h-full max-w-[300px] max-h-[300px] flex items-center justify-center">
                {/* Glowing effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 via-orange-500 to-red-500 rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
                
                {/* Abstract Flower / Flame shapes to mimic the mockup */}
                <svg viewBox="0 0 100 100" className="w-full h-full relative z-10 drop-shadow-2xl overflow-visible">
                  <defs>
                    <linearGradient id="flame1" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ff4d4d" />
                      <stop offset="100%" stopColor="#ffb84d" />
                    </linearGradient>
                    <linearGradient id="flame2" x1="0%" y1="100%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="#3385ff" />
                      <stop offset="100%" stopColor="#00ccff" />
                    </linearGradient>
                    <linearGradient id="flame3" x1="100%" y1="100%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="#b30000" />
                      <stop offset="100%" stopColor="#ff3333" />
                    </linearGradient>
                  </defs>
                  
                  {/* Outer petals (blue) */}
                  <path d="M50 90 C 20 90, 10 60, 10 40 C 10 20, 30 10, 50 20 C 30 30, 25 50, 40 70 C 45 75, 50 90, 50 90 Z" fill="url(#flame2)" className="origin-bottom opacity-90" />
                  <path d="M50 90 C 80 90, 90 60, 90 40 C 90 20, 70 10, 50 20 C 70 30, 75 50, 60 70 C 55 75, 50 90, 50 90 Z" fill="url(#flame2)" className="origin-bottom opacity-90" />
                  
                  {/* Middle petals (red) */}
                  <path d="M50 85 C 25 85, 15 55, 20 35 C 25 15, 45 25, 50 40 C 40 45, 30 65, 50 85 Z" fill="url(#flame3)" className="origin-bottom opacity-90" />
                  <path d="M50 85 C 75 85, 85 55, 80 35 C 75 15, 55 25, 50 40 C 60 45, 70 65, 50 85 Z" fill="url(#flame3)" className="origin-bottom opacity-90" />
                  
                  {/* Inner flame (yellow/orange) */}
                  <path d="M50 75 C 35 75, 30 45, 50 15 C 70 45, 65 75, 50 75 Z" fill="url(#flame1)" className="origin-bottom" />
                  
                  {/* Core sun/circle */}
                  <circle cx="50" cy="45" r="10" fill="#ffcc00" className="drop-shadow-lg" />
                </svg>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
