import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Leaf, BookOpen, FolderGit2, Bookmark } from 'lucide-react';
import { blogPosts, projects, resources } from '@/data';
import { PixelGlitchText } from '@/components/PixelGlitchText';

interface HomeSectionProps {
  onSectionChange: (section: string) => void;
}

const manifestoItems = [
  '构建交互式数据可视化',
  '记录设计笔记与思考',
  '培育创意项目种子',
  '探索新技术的边界',
  '留存学习的轨迹',
];

export function HomeSection({ onSectionChange }: HomeSectionProps) {
  const [currentManifesto, setCurrentManifesto] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentManifesto((prev) => (prev + 1) % manifestoItems.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const latestBlog = blogPosts[0];
  const featuredProject = projects[0];
  const featuredResource = resources[0];

  return (
    <section id="home" className="relative min-h-screen flex flex-col z-10 noise-bg">
      {/* Hero Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="max-w-5xl mx-auto text-center">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-12"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] animate-pulse" />
            <span className="text-xs font-medium tracking-widest text-[var(--text-secondary)] uppercase">Thoughts evolving... 🧠</span>
            <Leaf className="w-3.5 h-3.5 text-[var(--accent-primary)] opacity-60" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10 flex flex-col items-center"
          >
            <PixelGlitchText 
                text="ThreeTwoA"
                fontSize={isMobile ? 60 : 120}
                particleColor="#00f2ff"
                className="mb-2"
                forceMultiplier={4}
                mouseRadius={100}
              />
              <PixelGlitchText 
                text="Digital Garden"
                fontSize={isMobile ? 40 : 80}
                italic
                particleColor="#7000ff"
                className="opacity-80"
                forceMultiplier={3}
                mouseRadius={80}
              />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-lg sm:text-xl text-[var(--text-secondary)] mb-8 font-light tracking-wide max-w-2xl mx-auto"
          >
            一个持续生长的创意与思考空间，记录在数字世界里的每一次呼吸与生长 🌈
          </motion.p>

          {/* Manifesto with Smooth Fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="h-12 mb-16 flex items-center justify-center"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={currentManifesto}
                initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(8px)' }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-[var(--accent-primary)] font-serif italic text-xl sm:text-2xl tracking-widest drop-shadow-[0_0_8px_var(--glow-primary)]"
              >
                {manifestoItems[currentManifesto]}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          {/* CTA Buttons - Refined */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-24"
          >
            <button
              onClick={() => onSectionChange('projects')}
              className="group relative px-10 py-4 bg-[var(--accent-primary)] hover:bg-[var(--accent-tertiary)] text-[var(--bg-primary)] rounded-full transition-all duration-500 overflow-hidden"
            >
              <span className="relative flex items-center justify-center gap-2 font-semibold tracking-wide">
                🚀 探索花园
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </span>
            </button>
            <button
              onClick={() => onSectionChange('blog')}
              className="px-10 py-4 rounded-full border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-all duration-500 tracking-wide"
            >
              📖 阅读笔记
            </button>
          </motion.div>

          {/* Featured Cards - Bento Style */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {/* Latest Blog */}
            <button
              onClick={() => onSectionChange('blog')}
              className="group text-left glass rounded-3xl p-6 hover:bg-[var(--bg-tertiary)] transition-all duration-500 hover-lift border-none"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <BookOpen className="w-6 h-6 text-[var(--accent-primary)]" />
                </div>
                <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-[0.2em]">Latest Note</span>
              </div>
              <h3 className="text-lg font-serif leading-tight text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors line-clamp-2">
                {latestBlog.title}
              </h3>
            </button>

            {/* Featured Project */}
            <button
              onClick={() => onSectionChange('projects')}
              className="group text-left glass rounded-3xl p-6 hover:bg-[var(--bg-tertiary)] transition-all duration-500 hover-lift border-none"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <FolderGit2 className="w-6 h-6 text-[var(--accent-secondary)]" />
                </div>
                <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-[0.2em]">Featured Project</span>
              </div>
              <h3 className="text-lg font-serif leading-tight text-[var(--text-primary)] group-hover:text-[var(--accent-secondary)] transition-colors line-clamp-2">
                {featuredProject.name}
              </h3>
            </button>

            {/* Featured Resource */}
            <button
              onClick={() => onSectionChange('resources')}
              className="group text-left glass rounded-3xl p-6 hover:bg-[var(--bg-tertiary)] transition-all duration-500 hover-lift border-none"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <Bookmark className="w-6 h-6 text-[var(--accent-tertiary)]" />
                </div>
                <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-[0.2em]">Recommended</span>
              </div>
              <h3 className="text-lg font-serif leading-tight text-[var(--text-primary)] group-hover:text-[var(--accent-tertiary)] transition-colors line-clamp-2">
                {featuredResource.name}
              </h3>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
