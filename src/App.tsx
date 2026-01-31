import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from 'next-themes';
import { Navbar } from '@/components/Navbar';
import { ParticleBackground } from '@/components/ParticleBackground';
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
    <ThemeProvider attribute="class" defaultTheme="dark">
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] bg-[var(--bg-primary)] flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#00d4aa] to-[#4facfe] flex items-center justify-center mx-auto">
                  <span className="text-3xl font-bold text-white">3</span>
                </div>
              </motion.div>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 200 }}
                transition={{ duration: 1, ease: 'easeInOut' }}
                className="h-1 bg-gradient-to-r from-[#00d4aa] to-[#4facfe] rounded-full mx-auto"
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-4 text-[#8a8a9a] text-sm"
              >
                正在初始化数字花园...
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Particle Background */}
      <ParticleBackground />

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
    </ThemeProvider>
  );
}

export default App;
