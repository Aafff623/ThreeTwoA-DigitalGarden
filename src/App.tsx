import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { GardenBackground } from '@/components/ParticleBackground';
import { HomeSection } from '@/sections/HomeSection';
import { BlogSection } from '@/sections/BlogSection';
import { ProjectsSection } from '@/sections/ProjectsSection';
import { PlanSection } from '@/sections/PlanSection';
import { ChatNotesSection } from '@/sections/ChatNotesSection';
import { ResourcesSection } from '@/sections/ResourcesSection';
import { Footer } from '@/sections/Footer';
import './App.css';

function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const mainRef = useRef<HTMLDivElement>(null);

  // Loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Handle section navigation
  const handleSectionChange = (sectionId: string) => {
    setCurrentSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Update current section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'blog', 'projects', 'plan', 'chatnotes', 'resources'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[100] bg-[var(--bg-primary)] flex items-center justify-center noise-bg"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="mb-12"
              >
                <div className="w-24 h-24 rounded-full bg-[var(--accent-primary)] flex items-center justify-center mx-auto shadow-2xl">
                  <span className="text-4xl font-serif italic text-[var(--bg-primary)]">3</span>
                </div>
              </motion.div>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 160 }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
                className="h-[1px] bg-[var(--accent-primary)] rounded-full mx-auto opacity-40"
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-6 text-[var(--text-muted)] text-[10px] font-bold uppercase tracking-[0.3em]"
              >
                Cultivating thoughts...
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Garden Background */}
      <GardenBackground />

      {/* Main Content */}
      <div className="relative min-h-screen">
        {/* Navigation */}
        <Navbar 
          currentSection={currentSection} 
          onSectionChange={handleSectionChange} 
        />

        {/* Sections */}
        <main ref={mainRef} className="relative z-10">
          <HomeSection onSectionChange={handleSectionChange} />
          <ProjectsSection />
          <BlogSection />
          <PlanSection />
          <ChatNotesSection />
          <ResourcesSection />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

export default App;
