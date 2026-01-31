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
          <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--accent-secondary)] opacity-[0.15] text-[var(--accent-secondary)] text-sm font-medium mb-4">
            Projects
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[var(--text-primary)] mb-4">
            项目陈列馆
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl">
            每一个项目都是一次探索，从概念到实现，记录创意的生长轨迹
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
              className="group relative glass rounded-2xl overflow-hidden cursor-pointer hover:border-[rgba(var(--accent-primary-rgb),0.3)] transition-all duration-500"
            >
              {/* Hero Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Dynamic Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/40 dark:opacity-[0.6] opacity-[0.2] to-transparent" />
                
                {/* Hover Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--accent-primary)]/20 to-transparent" />
                </div>

                {/* Project Number */}
                <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-[var(--bg-glass)] border border-[var(--border-color)] backdrop-blur-md flex items-center justify-center shadow-lg">
                  <span className="text-[var(--accent-primary)] font-bold text-sm">0{project.id}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 relative bg-gradient-to-b from-transparent to-[var(--bg-card)]/30">
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent-primary)] transition-colors duration-300">
                  {project.name}
                </h3>
                <p className="text-[var(--text-secondary)] text-sm mb-6 line-clamp-2 leading-relaxed opacity-90">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-color)]/50 text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-tight"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_0_1px_rgba(var(--accent-primary-rgb),0.3),0_0_30px_rgba(var(--accent-primary-rgb),0.1)]" />
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
                  className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[var(--bg-glass)] border border-[var(--border-color)] hover:bg-[var(--bg-tertiary)] flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-[var(--text-secondary)]" />
                </button>

                {/* Hero Section */}
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={selectedProjectData.image}
                    alt={selectedProjectData.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)] opacity-[0.8] to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h2 className="text-4xl font-bold text-[var(--text-primary)] mb-2">
                      {selectedProjectData.name}
                    </h2>
                    <p className="text-[var(--text-secondary)]">{selectedProjectData.description}</p>
                  </div>
                </div>

                <div className="p-8">
                  {/* Demo Section */}
                  <div className="mb-12">
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                      <Monitor className="w-5 h-5 text-[var(--accent-primary)]" />
                      实时演示
                    </h3>
                    <div className="relative rounded-2xl overflow-hidden border border-[var(--border-color)]">
                      {/* Device Frame */}
                      <div className="bg-[var(--bg-tertiary)] p-4">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-3 h-3 rounded-full bg-[#ff6b6b]" />
                          <div className="w-3 h-3 rounded-full bg-[#f0c674]" />
                          <div className="w-3 h-3 rounded-full bg-[#00d4aa]" />
                          <div className="flex-1 h-6 rounded-lg bg-[var(--border-color)] mx-4" />
                        </div>
                        <div className="aspect-video bg-gradient-to-br from-[var(--accent-primary)] opacity-[0.2] to-[var(--accent-secondary)] opacity-[0.2] rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <Code2 className="w-16 h-16 text-[var(--accent-primary)] mx-auto mb-4 opacity-50" />
                            <p className="text-[var(--text-secondary)]">Demo 加载中...</p>
                            <p className="text-[var(--text-muted)] text-sm mt-2">实际项目中嵌入交互式演示</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Detail Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                    <div className="glass rounded-xl p-6 hover:border-[var(--accent-primary)] transition-colors">
                      <div className="w-12 h-12 rounded-xl bg-[var(--accent-primary)]/15 flex items-center justify-center mb-4">
                        <Palette className="w-6 h-6 text-[var(--accent-primary)]" />
                      </div>
                      <h4 className="font-semibold text-[var(--text-primary)] mb-2">设计哲学</h4>
                      <p className="text-sm text-[var(--text-secondary)]">{selectedDetails.philosophy}</p>
                    </div>
                    <div className="glass rounded-xl p-6 hover:border-[var(--accent-secondary)] transition-colors">
                      <div className="w-12 h-12 rounded-xl bg-[var(--accent-secondary)]/15 flex items-center justify-center mb-4">
                        <Code2 className="w-6 h-6 text-[var(--accent-secondary)]" />
                      </div>
                      <h4 className="font-semibold text-[var(--text-primary)] mb-2">技术栈选型</h4>
                      <p className="text-sm text-[var(--text-secondary)]">{selectedDetails.techStack}</p>
                    </div>
                    <div className="glass rounded-xl p-6 hover:border-[var(--accent-tertiary)] transition-colors">
                      <div className="w-12 h-12 rounded-xl bg-[var(--accent-tertiary)]/15 flex items-center justify-center mb-4">
                        <Puzzle className="w-6 h-6 text-[var(--accent-tertiary)]" />
                      </div>
                      <h4 className="font-semibold text-[var(--text-primary)] mb-2">挑战与解决</h4>
                      <p className="text-sm text-[var(--text-secondary)]">{selectedDetails.challenges}</p>
                    </div>
                  </div>

                  {/* Gallery Grid */}
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                      <Layers className="w-5 h-5 text-[var(--accent-primary)]" />
                      细节画廊
                    </h3>
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                      {galleryItems.map((item, idx) => (
                        <motion.div
                          key={item.type}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.05 }}
                          className="group aspect-square glass rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[var(--accent-primary)] transition-all hover:scale-105"
                        >
                          <item.icon className="w-6 h-6 text-[var(--text-secondary)] group-hover:text-[var(--accent-primary)] transition-colors" />
                          <span className="text-xs text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] transition-colors">{item.label}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 mt-8">
                    <button className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#00d4aa] to-[#4facfe] text-white font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                      <ExternalLink className="w-4 h-4" />
                      查看演示
                    </button>
                    <button className="flex-1 py-3 rounded-xl bg-[var(--border-color)] text-[var(--text-primary)] font-medium flex items-center justify-center gap-2 hover:bg-[var(--bg-tertiary)] transition-colors border border-[var(--border-color)]">
                      <Github className="w-4 h-4" />
                      查看源码
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
