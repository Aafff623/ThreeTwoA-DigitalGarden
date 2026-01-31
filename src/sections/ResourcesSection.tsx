import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Github, 
  Figma, 
  Palette, 
  Award, 
  FileCode, 
  GraduationCap, 
  Flame, 
  BookOpen,
  ExternalLink,
  Search,
  Filter
} from 'lucide-react';
import { resources, resourceCategories } from '@/data';

const iconMap: Record<string, React.ElementType> = {
  Code2,
  Github,
  Figma,
  Palette,
  Award,
  FileCode,
  GraduationCap,
  Flame,
  BookOpen,
};

const categoryColors: Record<string, string> = {
  '开发工具': '#00d4aa',
  '灵感来源': '#4facfe',
  '学习路径': '#f0c674',
};

export function ResourcesSection() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = resources.filter(r => {
    const matchesCategory = !activeCategory || r.category === activeCategory;
    const matchesSearch = !searchQuery || 
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getResourcesByCategory = (category: string) => {
    return filteredResources.filter((r) => r.category === category);
  };

  return (
    <section id="resources" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#00d4aa15] text-[#00d4aa] text-sm font-medium mb-4">
            Resources
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#f0f0f5] mb-4">
            🧰 资源库
          </h2>
          <p className="text-[#8a8a9a] max-w-xl mx-auto">
            收集有用的工具、灵感和学习资源，构建自己的知识宝库 🛠️
          </p>
        </motion.div>

        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mb-12"
        >
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5a5a6a]" />
            <input
              type="text"
              placeholder="搜索资源..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#ffffff08] border border-[#ffffff08] text-[#f0f0f5] placeholder-[#5a5a6a] focus:border-[#00d4aa50] focus:outline-none transition-colors"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-3 rounded-xl flex items-center gap-2 transition-all ${
                !activeCategory 
                  ? 'bg-[#00d4aa20] text-[#00d4aa]' 
                  : 'bg-[#ffffff08] text-[#8a8a9a] hover:bg-[#ffffff12]'
              }`}
            >
              <Filter className="w-4 h-4" />
              全部
            </button>
            {resourceCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-3 rounded-xl transition-all ${
                  activeCategory === cat 
                    ? 'bg-[#00d4aa20] text-[#00d4aa]' 
                    : 'bg-[#ffffff08] text-[#8a8a9a] hover:bg-[#ffffff12]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resourceCategories.map((category, catIndex) => {
            const categoryResources = getResourcesByCategory(category);
            if (categoryResources.length === 0) return null;
            
            const color = categoryColors[category];
            
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + catIndex * 0.1 }}
                className="space-y-4"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${color}15` }}
                  >
                    {category === '开发工具' ? (
                      <Code2 className="w-5 h-5" style={{ color }} />
                    ) : category === '灵感来源' ? (
                      <Palette className="w-5 h-5" style={{ color }} />
                    ) : (
                      <GraduationCap className="w-5 h-5" style={{ color }} />
                    )}
                  </div>
                  <h3 className="font-semibold text-[#f0f0f5]">{category}</h3>
                  <span className="px-2 py-0.5 rounded-full text-xs" style={{ backgroundColor: `${color}20`, color }}>
                    {categoryResources.length}
                  </span>
                </div>

                {/* Resource Items */}
                <div className="space-y-3">
                  {categoryResources.map((resource, idx) => {
                    const Icon = iconMap[resource.icon] || ExternalLink;
                    return (
                      <motion.a
                        key={resource.id}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="group flex items-start gap-4 p-4 rounded-xl bg-[#ffffff05] hover:bg-[#ffffff08] border border-transparent hover:border-[#ffffff08] transition-all duration-300"
                      >
                        {/* Icon */}
                        <div 
                          className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                          style={{ backgroundColor: `${color}10` }}
                        >
                          <Icon className="w-6 h-6" style={{ color: `${color}99` }} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-[#f0f0f5] group-hover:text-[#00d4aa] transition-colors">
                              {resource.name}
                            </h4>
                            <ExternalLink className="w-3.5 h-3.5 text-[#5a5a6a] opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <p className="text-sm text-[#8a8a9a] line-clamp-2">
                            {resource.description}
                          </p>
                        </div>

                        {/* Hover Glow */}
                        <div 
                          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                          style={{ boxShadow: `inset 0 0 0 1px ${color}30` }}
                        />
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredResources.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#ffffff08] flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-[#5a5a6a]" />
            </div>
            <p className="text-[#8a8a9a]">没有找到匹配的资源</p>
          </motion.div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-[#00d4aa20] to-[#4facfe20] border border-[#ffffff08]">
            <Flame className="w-5 h-5 text-[#f0c674]" />
            <span className="text-[#f0f0f5]">持续更新中，欢迎推荐优质资源</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
