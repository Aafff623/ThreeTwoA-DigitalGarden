import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Flower2, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

interface NavbarProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
}

const navItems = [
  { id: 'home', label: '首页' },
  { id: 'blog', label: '博客' },
  { id: 'projects', label: '项目' },
  { id: 'plan', label: '计划' },
  { id: 'chatnotes', label: '笔记' },
  { id: 'resources', label: '资源' },
];

export function Navbar({ currentSection, onSectionChange }: NavbarProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

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
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex items-center justify-between transition-all duration-500 ${
              isScrolled
                ? 'glass rounded-2xl px-6 py-3'
                : 'bg-transparent px-2'
            }`}
          >
            {/* Logo */}
            <button 
              onClick={() => onSectionChange('home')}
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00d4aa] to-[#4facfe] flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(0,212,170,0.3)] transition-all">
                <Flower2 className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-[var(--text-primary)]">ThreeTwoA</span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1 relative">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  ref={(el) => { navRefs.current[index] = el; }}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    currentSection === item.id
                      ? 'text-[var(--accent-primary)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              {/* Flowing Indicator */}
              <motion.div
                className="absolute bottom-0 h-0.5 bg-gradient-to-r from-[#00d4aa] to-[#4facfe] rounded-full"
                animate={{
                  left: indicatorStyle.left,
                  width: indicatorStyle.width,
                }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

            {/* CTA Button & Theme Toggle */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2.5 rounded-xl bg-[var(--border-color)] hover:bg-[var(--bg-tertiary)] text-[var(--text-primary)] border border-[var(--border-color)] hover:border-[var(--accent-primary)]/30 transition-all duration-300"
                aria-label="Toggle Theme"
              >
                {mounted && (theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />)}
              </button>
              <button className="px-5 py-2 rounded-lg bg-[var(--border-color)] hover:bg-[var(--bg-tertiary)] text-[var(--text-primary)] text-sm font-medium border border-[var(--border-color)] hover:border-[var(--accent-primary)]/30 transition-all duration-300">
                订阅
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-[#ffffff08] transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-[#f0f0f5]" />
              ) : (
                <Menu className="w-5 h-5 text-[#f0f0f5]" />
              )}
            </button>
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
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-20 left-4 right-4 glass rounded-2xl p-6"
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`px-4 py-3 text-left rounded-xl transition-all ${
                      currentSection === item.id
                        ? 'bg-[#00d4aa15] text-[#00d4aa] font-medium'
                        : 'text-[#8a8a9a] hover:bg-[#ffffff08]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <hr className="my-2 border-[var(--border-color)]" />
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[var(--border-color)] text-[var(--text-secondary)] font-medium"
                  >
                    {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    {theme === 'dark' ? '亮色' : '暗色'}
                  </button>
                  <button className="px-4 py-3 rounded-xl bg-gradient-to-r from-[#00d4aa] to-[#4facfe] text-white font-medium">
                    订阅更新
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
