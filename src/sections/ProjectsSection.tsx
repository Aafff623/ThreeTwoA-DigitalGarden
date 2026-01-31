import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, 
  Github, 
  Code2, 
  Palette, 
  Lightbulb, 
  Puzzle,
  X,
  ChevronRight,
  Monitor,
  Cpu,
  Layers
} from 'lucide-react';
import { projects } from '@/data';

interface ProjectDetail {
  philosophy: string;
  techStack: string;
  challenges: string;
}

const projectDetails: Record<string, ProjectDetail> = {
  '1': {
    philosophy: '数据可视化的核心在于让复杂信息变得直观可感。通过交互设计，让用户能够探索数据背后的故事。',
    techStack: '选择 D3.js 作为底层渲染引擎，配合 Vue 的响应式系统，实现数据驱动视图的自动更新。',
    challenges: '处理大规模数据时的性能优化是主要挑战。通过虚拟滚动和 Canvas 渲染解决了十万级数据点的流畅展示。'
  },
  '2': {
    philosophy: '色彩是设计的第一语言。一个好的配色方案能够瞬间传达品牌的情感和调性。',
    techStack: '基于色彩理论算法（如互补色、三角色、分裂互补等）生成和谐配色，使用 CSS Variables 实现主题切换。',
    challenges: '如何让生成的配色既符合理论又具有创意性？通过引入随机扰动和人工精选预设解决了这个问题。'
  },
  '3': {
    philosophy: '命令行工具的魅力在于其纯粹和高效。去除一切视觉干扰，专注于任务本身。',
    techStack: 'Python + Click 框架构建 CLI 接口，SQLite 本地存储，支持数据导出和云端同步。',
    challenges: '跨平台兼容性处理，特别是 Windows 终端的颜色和字符显示问题。'
  },
  '4': {
    philosophy: '动画是界面的灵魂。好的动画能够引导用户注意力，提供操作反馈，创造愉悦体验。',
    techStack: '纯 CSS 实现，利用 transform 和 opacity 保证性能，使用 CSS Variables 实现参数化配置。',
    challenges: '在保持动画流畅的同时控制代码复杂度，建立了可复用的动画关键帧库。'
  }
};

// Gallery items for each project
const galleryItems = [
  { type: 'code', label: '核心代码', icon: Code2 },
  { type: 'ui', label: 'UI细节', icon: Monitor },
  { type: 'architecture', label: '架构图', icon: Layers },
  { type: 'interaction', label: '交互演示', icon: Cpu },
  { type: 'flow', label: '用户流程', icon: ChevronRight },
  { type: 'performance', label: '性能分析', icon: Code2 },
  { type: 'design', label: '设计稿', icon: Palette },
  { type: 'tech', label: '技术文档', icon: Code2 },
  { type: 'challenge', label: '挑战记录', icon: Lightbulb },
];

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const selectedProjectData = selectedProject 
    ? projects.find(p => p.id === selectedProject) 
    : null;
  const selectedDetails = selectedProject 
    ? projectDetails[selectedProject] 
    : null;

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--accent-primary)] bg-opacity-10 text-[var(--accent-primary)] text-xs font-bold uppercase tracking-[0.2em] mb-6">
            Creative Portfolio
          </span>
          <h2 className="text-5xl sm:text-6xl font-serif text-[var(--text-primary)] mb-6">
            🖼️ 项目陈列馆
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl font-light tracking-wide">
            每一个项目都是一次探索，从概念到实现，记录创意在数字土壤里的生长轨迹 🌱
          </p>
        </motion.div>

        {/* Projects Grid - 调整为每行 3-4 个 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1] 
              }}
              onClick={() => setSelectedProject(project.id)}
              className="group relative glass rounded-3xl overflow-hidden cursor-pointer border-none hover-lift"
            >
              {/* Hero Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/40 to-transparent" />
                
                {/* Project Number */}
                <div className="absolute top-6 left-6 w-10 h-10 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center border border-white/10">
                  <span className="text-[var(--accent-primary)] font-serif italic text-sm">{project.id}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="text-2xl font-serif text-[var(--text-primary)] mb-3 group-hover:text-[var(--accent-primary)] transition-colors duration-500">
                  {project.name}
                </h3>
                <p className="text-[var(--text-secondary)] text-sm mb-6 line-clamp-2 font-light leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full bg-white/5 text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Border Glow Effect */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute inset-0 rounded-3xl shadow-[inset_0_0_0_1px_rgba(163,177,138,0.2)]" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project Detail Modal */}
        <AnimatePresence>
          {selectedProject && selectedProjectData && selectedDetails && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              {/* Backdrop */}
              <div 
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={() => setSelectedProject(null)}
              />
              
              {/* Modal Content */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 50 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-6xl max-h-[90vh] overflow-auto glass rounded-3xl"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[#ffffff08] hover:bg-[#ffffff15] flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-[#8a8a9a]" />
                </button>

                {/* Hero Section */}
                <div className="relative h-96 overflow-hidden">
                  <img
                    src={selectedProjectData.image}
                    alt={selectedProjectData.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-12">
                    <h2 className="text-4xl sm:text-5xl font-serif text-[var(--text-primary)] mb-4">
                      {selectedProjectData.name}
                    </h2>
                    <p className="text-[var(--text-secondary)] font-light tracking-wide max-w-2xl">{selectedProjectData.description}</p>
                  </div>
                </div>

                <div className="p-12">
                  {/* Demo Section */}
                  <div className="mb-16">
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] mb-6 flex items-center gap-3">
                      <div className="w-1 h-1 rounded-full bg-[var(--accent-primary)]" />
                      Live Demonstration
                    </h3>
                    <div className="relative rounded-[2.5rem] overflow-hidden border border-white/5 bg-[var(--bg-secondary)] p-2 shadow-2xl">
                      {/* Device Frame Decoration */}
                      <div className="bg-[var(--bg-primary)] rounded-[2rem] overflow-hidden">
                        <div className="flex items-center justify-between px-6 py-4 bg-[var(--bg-card)] border-b border-white/5">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-white/5" />
                            <div className="w-3 h-3 rounded-full bg-white/5" />
                            <div className="w-3 h-3 rounded-full bg-white/5" />
                          </div>
                          <div className="px-4 py-1 rounded-full bg-white/5 text-[9px] font-bold uppercase tracking-widest text-[var(--text-muted)] flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-[var(--accent-primary)]" />
                            Interactive Module
                          </div>
                          <div className="w-12 h-1 bg-white/5 rounded-full" />
                        </div>
                        <div className="aspect-video bg-[var(--bg-primary)] relative flex items-center justify-center overflow-hidden group/demo">
                          <div className="text-center relative z-20">
                            <Code2 className="w-16 h-16 text-[var(--accent-primary)] mx-auto mb-6 opacity-20 group-hover/demo:opacity-40 transition-opacity duration-700" />
                            <p className="text-[var(--text-muted)] font-serif italic text-xl tracking-wide">Growing the interface...</p>
                            <p className="text-[var(--text-muted)] text-[10px] font-bold uppercase tracking-widest mt-4 opacity-40">Ready for Interaction</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Detail Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    <div className="bg-[var(--bg-secondary)] rounded-3xl p-8 hover:bg-[var(--bg-tertiary)] transition-all duration-500 border border-white/5 hover-lift">
                      <div className="w-12 h-12 rounded-2xl bg-[var(--bg-primary)] flex items-center justify-center mb-6">
                        <Palette className="w-6 h-6 text-[var(--accent-primary)]" />
                      </div>
                      <h4 className="text-sm font-bold uppercase tracking-widest text-[var(--text-primary)] mb-4">设计哲学</h4>
                      <p className="text-sm text-[var(--text-secondary)] font-light leading-relaxed">{selectedDetails.philosophy}</p>
                    </div>
                    <div className="bg-[var(--bg-secondary)] rounded-3xl p-8 hover:bg-[var(--bg-tertiary)] transition-all duration-500 border border-white/5 hover-lift">
                      <div className="w-12 h-12 rounded-2xl bg-[var(--bg-primary)] flex items-center justify-center mb-6">
                        <Code2 className="w-6 h-6 text-[var(--accent-secondary)]" />
                      </div>
                      <h4 className="text-sm font-bold uppercase tracking-widest text-[var(--text-primary)] mb-4">技术栈选型</h4>
                      <p className="text-sm text-[var(--text-secondary)] font-light leading-relaxed">{selectedDetails.techStack}</p>
                    </div>
                    <div className="bg-[var(--bg-secondary)] rounded-3xl p-8 hover:bg-[var(--bg-tertiary)] transition-all duration-500 border border-white/5 hover-lift">
                      <div className="w-12 h-12 rounded-2xl bg-[var(--bg-primary)] flex items-center justify-center mb-6">
                        <Puzzle className="w-6 h-6 text-[var(--accent-tertiary)]" />
                      </div>
                      <h4 className="text-sm font-bold uppercase tracking-widest text-[var(--text-primary)] mb-4">挑战与解决</h4>
                      <p className="text-sm text-[var(--text-secondary)] font-light leading-relaxed">{selectedDetails.challenges}</p>
                    </div>
                  </div>

                  {/* Gallery Grid */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] mb-8 flex items-center gap-3">
                      <div className="w-1 h-1 rounded-full bg-[var(--accent-primary)]" />
                      Architecture & Details
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      {galleryItems.map((item, idx) => (
                        <motion.div
                          key={item.type}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.05 }}
                          className="group aspect-square bg-[var(--bg-secondary)] rounded-2xl flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-[var(--bg-tertiary)] transition-all duration-500 hover-lift overflow-hidden relative border border-white/5"
                        >
                          <item.icon className="w-6 h-6 text-[var(--text-muted)] group-hover:text-[var(--accent-primary)] transition-colors duration-500 relative z-10" />
                          <span className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors duration-500 relative z-10 font-bold">{item.label}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-6 mt-16">
                    <button className="flex-1 py-4 rounded-full bg-[var(--accent-primary)] text-[var(--bg-primary)] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </button>
                    <button className="flex-1 py-4 rounded-full bg-transparent text-[var(--text-primary)] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[var(--bg-secondary)] transition-all border border-white/10">
                      <Github className="w-4 h-4" />
                      Source Code
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
