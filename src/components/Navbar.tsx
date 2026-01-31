import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Leaf, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
}

const navItems = [
  { id: 'home', label: '首页', emoji: '🏠' },
  { id: 'projects', label: '项目', emoji: '🚀' },
  { id: 'blog', label: '博客', emoji: '📝' },
  { id: 'plan', label: '计划', emoji: '🎯' },
  { id: 'chatnotes', label: '笔记', emoji: '💬' },
  { id: 'resources', label: '资源', emoji: '🔍' },
];

export function Navbar({ currentSection, onSectionChange }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    }
    return 'dark';
  });
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const navRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Update indicator position when current section changes
  useEffect(() => {
    const currentIndex = navItems.findIndex(item => item.id === currentSection);
    const currentRef = navRefs.current[currentIndex];
    if (currentRef) {
      const parentRect = currentRef.parentElement?.getBoundingClientRect();
      const itemRect = currentRef.getBoundingClientRect();
      if (parentRect) {
        setIndicatorStyle({
          left: itemRect.left - parentRect.left,
          width: itemRect.width,
        });
      }
    }
  }, [currentSection]);

  const handleNavClick = (sectionId: string) => {
    onSectionChange(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled ? 'py-4' : 'py-10'
        }`}
      >
        <div className="max-w-[90rem] mx-auto px-4 sm:px-8 lg:px-12">
          <div
            className={`flex items-center justify-between transition-all duration-700 ${
              isScrolled
                ? 'glass rounded-full px-10 py-4'
                : 'bg-transparent px-6'
            }`}
          >
            {/* Logo */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-4 group"
            >
              <div className="w-12 h-12 rounded-full bg-[var(--accent-primary)] flex items-center justify-center group-hover:rotate-12 transition-transform duration-500 shadow-lg shadow-[var(--glow-primary)]">
                <Leaf className="w-6 h-6 text-[var(--bg-primary)]" />
              </div>
              <span className={`font-serif text-2xl hidden lg:block transition-colors ${
                isScrolled ? 'text-[var(--text-primary)]' : 'text-[var(--text-primary)]'
              }`}>
                ThreeTwoA
              </span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4 relative">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  ref={(el) => { navRefs.current[index] = el; }}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-5 py-3 text-sm font-bold uppercase tracking-widest transition-all duration-500 flex items-center gap-2 ${
                    currentSection === item.id
                      ? 'text-[var(--accent-primary)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <span className="text-lg">{item.emoji}</span>
                  <span>{item.label}</span>
                </button>
              ))}
              
              {/* Flowing Indicator */}
              <motion.div
                className="absolute bottom-0 h-1 bg-[var(--accent-primary)] rounded-full shadow-[0_0_10px_var(--glow-primary)]"
                animate={{
                  left: indicatorStyle.left + 20,
                  width: indicatorStyle.width - 40,
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

            {/* Right Actions */}
            <div className="hidden md:flex items-center gap-6">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-3 rounded-full glass hover:bg-[var(--accent-primary)] hover:text-[var(--bg-primary)] transition-all duration-500 group"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-6 h-6 text-[var(--accent-primary)] group-hover:text-[var(--bg-primary)]" />
                ) : (
                  <Moon className="w-6 h-6 text-[var(--accent-primary)] group-hover:text-[var(--bg-primary)]" />
                )}
              </button>

              {/* CTA Button */}
              <button className="px-8 py-3 rounded-full bg-transparent hover:bg-[var(--accent-primary)] text-[var(--text-primary)] hover:text-[var(--bg-primary)] text-sm font-bold uppercase tracking-widest border border-[var(--border-color)] hover:border-[var(--accent-primary)] transition-all duration-500 shadow-lg">
                订阅 📬
              </button>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-4 md:hidden">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full glass"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-[var(--accent-primary)]" />
                ) : (
                  <Moon className="w-5 h-5 text-[var(--accent-primary)]" />
                )}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-full hover:bg-[var(--bg-secondary)] transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-[var(--text-primary)]" />
                ) : (
                  <Menu className="w-6 h-6 text-[var(--text-primary)]" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-32 left-4 right-4 glass rounded-[2.5rem] p-10"
            >
              <div className="flex flex-col gap-6">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`px-6 py-4 text-left rounded-2xl transition-all flex items-center gap-4 ${
                      currentSection === item.id
                        ? 'bg-[var(--accent-primary)] text-[var(--bg-primary)] font-bold'
                        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'
                    }`}
                  >
                    <span className="text-2xl">{item.emoji}</span>
                    <span className="text-lg font-bold uppercase tracking-wider">{item.label}</span>
                  </button>
                ))}
                <hr className="my-4 border-[var(--border-color)] opacity-50" />
                <button className="px-6 py-5 rounded-2xl bg-[var(--accent-secondary)] text-white font-bold uppercase tracking-widest shadow-xl">
                  订阅更新 📬
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

