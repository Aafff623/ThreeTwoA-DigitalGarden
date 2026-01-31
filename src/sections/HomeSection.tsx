import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, BookOpen, FolderGit2, Bookmark } from 'lucide-react';
import { blogPosts, projects, resources } from '@/data';

interface HomeSectionProps {
  onSectionChange: (section: string) => void;
}

const manifestoItems = [
  '正在构建交互式数据可视化...',
  '正在编写设计笔记与思考...',
  '正在培育创意项目种子...',
  '正在探索新技术边界...',
  '正在记录学习轨迹...',
];

export function HomeSection({ onSectionChange }: HomeSectionProps) {
  const [currentManifesto, setCurrentManifesto] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing effect for manifesto
  useEffect(() => {
    const currentText = manifestoItems[currentManifesto];
    const typingSpeed = isDeleting ? 30 : 80;
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentManifesto((prev) => (prev + 1) % manifestoItems.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentManifesto]);

  const latestBlog = blogPosts[0];
  const featuredProject = projects[0];
  const featuredResource = resources[0];

  return (
    <section id="home" className="relative min-h-screen flex flex-col z-10">
      {/* Hero Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="max-w-5xl mx-auto text-center">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-10"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-pulse" />
            <span className="text-sm text-[var(--text-muted)]">系统运行中</span>
            <Sparkles className="w-4 h-4 text-[var(--accent-primary)]" />
          </motion.div>

          {/* Main Title - Cutout Effect */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tighter">
              <span 
                className="block mb-2"
                style={{
                  background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 50%, var(--accent-primary) 100%)',
                  backgroundSize: '200% 200%',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  animation: 'gradient-shift 8s ease infinite',
                }}
              >
                ThreeTwoA
              </span>
              <span 
                className="block font-light tracking-[0.2em] uppercase text-sm sm:text-base md:text-lg"
                style={{
                  WebkitTextStroke: '1px var(--accent-primary)',
                  opacity: 0.4,
                  color: 'transparent',
                }}
              >
                Digital Garden
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-lg sm:text-xl text-[var(--text-secondary)] mb-6"
          >
            一个持续生长的大学生创意与思考空间
          </motion.p>

          {/* Manifesto with Typing Effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="h-8 mb-12"
          >
            <span className="text-[var(--accent-primary)] font-mono text-sm sm:text-base">
              &gt; {displayText}
              <span className="cursor-blink">|</span>
            </span>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
          >
            <button
              onClick={() => onSectionChange('projects')}
              className="group relative px-8 py-4 rounded-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#00d4aa] to-[#4facfe]" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#4facfe] to-[#00d4aa] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center justify-center gap-2 text-white font-medium">
                探索花园
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </span>
            </button>
            <button
              onClick={() => onSectionChange('blog')}
              className="px-8 py-4 rounded-xl border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)] transition-all duration-300"
            >
              阅读笔记
            </button>
          </motion.div>

          {/* Featured Cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto"
          >
            {/* Latest Blog */}
            <button
              onClick={() => onSectionChange('blog')}
              className="group text-left glass rounded-2xl p-5 hover:border-[var(--accent-primary)] transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent-primary)]/10 flex items-center justify-center group-hover:bg-[var(--accent-primary)]/20 transition-colors">
                  <BookOpen className="w-5 h-5 text-[var(--accent-primary)]" />
                </div>
                <span className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">最新文章</span>
              </div>
              <h3 className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors line-clamp-2">
                {latestBlog.title}
              </h3>
            </button>

            {/* Featured Project */}
            <button
              onClick={() => onSectionChange('projects')}
              className="group text-left glass rounded-2xl p-5 hover:border-[var(--accent-secondary)] transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent-secondary)]/10 flex items-center justify-center group-hover:bg-[var(--accent-secondary)]/20 transition-colors">
                  <FolderGit2 className="w-5 h-5 text-[var(--accent-secondary)]" />
                </div>
                <span className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">热门项目</span>
              </div>
              <h3 className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-secondary)] transition-colors line-clamp-2">
                {featuredProject.name}
              </h3>
            </button>

            {/* Featured Resource */}
            <button
              onClick={() => onSectionChange('resources')}
              className="group text-left glass rounded-2xl p-5 hover:border-[var(--accent-primary)] transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent-primary)]/10 flex items-center justify-center group-hover:bg-[var(--accent-primary)]/20 transition-colors">
                  <Bookmark className="w-5 h-5 text-[var(--accent-primary)]" />
                </div>
                <span className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">推荐资源</span>
              </div>
              <h3 className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors line-clamp-2">
                {featuredResource.name}
              </h3>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Gradient Animation Keyframes */}
      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </section>
  );
}
