import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Leaf, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
}

const navItems = [
  { id: 'home', label: '🏡 首页' },
  { id: 'blog', label: '✍️ 博客' },
  { id: 'projects', label: '🚀 项目' },
  { id: 'plan', label: '📅 计划' },
  { id: 'chatnotes', label: '📝 笔记' },
  { id: 'resources', label: '📚 资源' },
];

export function Navbar({ currentSection, onSectionChange }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const navRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          isScrolled ? 'py-6' : 'py-10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex items-center justify-between transition-all duration-700 ${
              isScrolled
                ? 'glass rounded-full px-10 py-5'
                : 'bg-transparent px-4'
            }`}
          >
            {/* Logo */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-full bg-[var(--accent-primary)] flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
                <Leaf className="w-5 h-5 text-[var(--bg-primary)]" />
              </div>
              <span className={`font-serif text-xl hidden sm:block transition-colors ${
                isScrolled ? 'text-[var(--text-primary)]' : 'text-[var(--text-primary)]'
              }`}>
                ThreeTwoA
              </span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2 relative">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  ref={(el) => { navRefs.current[index] = el; }}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-2 text-sm font-bold uppercase tracking-widest transition-all duration-500 ${
                    currentSection === item.id
                      ? 'text-[var(--accent-primary)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              {/* Flowing Indicator */}
              <motion.div
                className="absolute bottom-0 h-0.5 bg-[var(--accent-primary)] rounded-full"
                animate={{
                  left: indicatorStyle.left + 16,
                  width: indicatorStyle.width - 32,
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

            {/* CTA Button & Theme Toggle */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button className="px-6 py-2 rounded-full bg-transparent hover:bg-[var(--accent-primary)] text-[var(--text-primary)] hover:text-[var(--bg-primary)] text-xs font-bold uppercase tracking-widest border border-[var(--border-color)] hover:border-[var(--accent-primary)] transition-all duration-500">
                订阅
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
               <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-full hover:bg-[var(--bg-secondary)] transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-[var(--text-primary)]" />
                ) : (
                  <Menu className="w-5 h-5 text-[var(--text-primary)]" />
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
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-24 left-4 right-4 glass rounded-3xl p-8"
            >
              <div className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`px-4 py-3 text-left rounded-2xl transition-all ${
                      currentSection === item.id
                        ? 'bg-[var(--accent-primary)] text-[var(--bg-primary)] font-bold'
                        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <hr className="my-2 border-[var(--border-color)]" />
                <button className="px-4 py-4 rounded-2xl bg-[var(--accent-secondary)] text-white font-bold uppercase tracking-widest">
                  订阅更新
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
