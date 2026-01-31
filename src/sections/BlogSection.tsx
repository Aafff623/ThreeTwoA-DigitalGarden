import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Tag, ArrowRight, X, Clock, Eye, BookOpen } from 'lucide-react';
import { blogPosts } from '@/data';

// Extended blog content for detail view
const blogContent: Record<string, { content: string; quote: string }> = {
  '1': {
    quote: '数字花园不是一座博物馆，而是一片正在生长的森林。',
    content: `
数字花园（Digital Garden）是一种新兴的知识管理和个人表达形式。与传统的博客不同，数字花园强调想法的持续生长和演化，而不是按时间顺序发布的 finished articles。

## 什么是数字花园？

想象一个真实的花园：你种下种子，浇水施肥，看着它们慢慢生长。有些植物茁壮成长，有些则需要修剪或移除。数字花园也是如此——你的想法、笔记、项目就像植物一样，需要持续的照料和培育。

## 核心理念

**1. 持续生长**
内容不是一次性完成的，而是持续迭代和完善的。一篇文章可以从一个简单的想法开始，随着时间的推移不断丰富和深化。

**2. 相互连接**
花园中的植物通过路径和小径相互连接。同样，数字花园中的内容也应该通过链接形成网络，让读者能够自由探索。

**3. 不完美之美**
花园不需要完美。有些区域可能杂草丛生，有些植物可能还在幼苗阶段。这种不完美正是真实和生动的体现。

## 如何开始？

**第一步：选择工具**
- Notion：灵活的数据库和页面系统
- Obsidian：强大的双向链接功能
- 自建网站：完全自定义，如本站点

**第二步：建立结构**
不要过度设计结构。从一个简单的分类开始，让结构随着内容的增长自然演化。

**第三步：养成习惯**
定期回顾和更新旧内容。数字花园的价值在于持续的维护，而不是一次性的创建。
    `
  },
  '2': {
    quote: '好的组件设计，是在通用性和特异性之间找到平衡。',
    content: `
在最近的一个 Vue.js 项目中，我深入实践了组件化设计模式。从原子化设计思想出发，我构建了可复用、可维护的组件库。

## 组件拆分的艺术

**原子化设计**
将界面拆分为原子（Atoms）、分子（Molecules）、有机体（Organisms）、模板（Templates）和页面（Pages）五个层级。这种分层方法帮助我们建立清晰的组件依赖关系。

**单一职责原则**
每个组件只负责一个功能。当一个组件开始处理太多事情时，就是拆分的时候了。

## Props 设计的思考

**明确的数据流**
Props 应该只向下传递，事件只向上冒泡。这种单向数据流让组件的行为更加可预测。

**合理的默认值**
为每个 prop 提供有意义的默认值，减少使用组件时的配置负担。

## 事件通信的最佳实践

**$emit 还是 Pinia？**
- 父子组件：使用 $emit
- 跨层级组件：考虑 provide/inject
- 全局状态：使用 Pinia

## 状态管理的取舍

**本地状态 vs 全局状态**
- 只在组件内部使用的数据 → 本地状态
- 多个组件共享的数据 → 全局状态
- 服务端数据 → 结合请求库管理
    `
  },
  '3': {
    quote: '黑客精神不是破坏，而是创造性地解决问题。',
    content: `
保罗·格雷厄姆的《黑客与画家》是一本让我反复阅读的经典之作。每次阅读都有新的收获，这本书塑造了我对编程、设计和创业的理解。

## 黑客与画家

**编程是一门艺术**
格雷厄姆将编程比作绘画，两者都需要：
- 扎实的基本功
- 不断的练习
- 对美的追求
- 创新的勇气

**好的设计是简单的**
"简单是复杂的终极形式。"好的设计看起来毫不费力，但背后是无数次的迭代和打磨。

## 如何创造财富

**创造财富 vs 掠夺财富**
真正的财富创造是通过创新解决人们的问题，而不是从别人那里夺取。

**创业的本质**
创业不是关于融资、上市或退出，而是关于创造有价值的东西。

## 编程语言的选择

**语言的表达能力**
不同的编程语言有不同的表达能力。选择适合问题的语言，能够大幅提升开发效率。

**Lisp 的启示**
Lisp 虽然古老，但其宏系统和代码即数据的思想仍然影响深远。

## 对我的影响

这本书让我重新思考：
- 什么是好的代码
- 如何创造真正的价值
- 为什么简洁如此重要

这些思考不仅影响了我的编程实践，也塑造了我的产品思维。
    `
  }
};

export function BlogSection() {
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [readingMode, setReadingMode] = useState(false);

  useEffect(() => {
    if (readingMode) {
      document.body.classList.add('reading-mode');
    } else {
      document.body.classList.remove('reading-mode');
    }
    return () => document.body.classList.remove('reading-mode');
  }, [readingMode]);

  const selectedPostData = selectedPost 
    ? blogPosts.find(p => p.id === selectedPost) 
    : null;
  const selectedContent = selectedPost 
    ? blogContent[selectedPost] 
    : null;

  return (
    <section id="blog" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--accent-primary)] bg-opacity-10 text-[var(--accent-primary)] text-xs font-bold uppercase tracking-[0.2em] mb-6">
            Garden Journal
          </span>
          <h2 className="text-5xl sm:text-6xl font-serif text-[var(--text-primary)] mb-6">
            💡 思想花园
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto font-light tracking-wide">
            记录学习轨迹，分享技术心得，沉淀在数字花园里的每一次思考与生长 📖
          </p>
        </motion.div>

        {/* Blog Grid - Magazine Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1] 
              }}
              onClick={() => setSelectedPost(post.id)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
              style={{ minHeight: '400px' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--glow-primary)] to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/80 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-8">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-[var(--bg-secondary)] backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)] border border-[var(--border-muted)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-serif text-[var(--text-primary)] mb-4 line-clamp-2 group-hover:text-[var(--accent-primary)] transition-colors duration-500">
                  {post.title}
                </h3>

                {/* Summary */}
                <p className="text-sm text-[var(--text-secondary)] mb-6 line-clamp-2 font-light leading-relaxed">
                  {post.summary}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between pt-4 border-t border-[var(--border-muted)]">
                  <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[var(--accent-primary)] group-hover:gap-2 transition-all">
                    Read More
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_0_1px_var(--border-color)]" />
              </div>
            </motion.article>
          ))}
        </div>

        {/* Article Detail Modal */}
        <AnimatePresence>
          {selectedPost && selectedPostData && selectedContent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`fixed inset-0 z-50 ${readingMode ? '' : 'flex items-center justify-center p-4'}`}
            >
              {/* Backdrop */}
              <div 
                className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                onClick={() => setSelectedPost(null)}
              />
              
              {/* Article Content */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`relative w-full ${readingMode ? 'h-full overflow-auto' : 'max-w-4xl max-h-[90vh] overflow-auto rounded-3xl'} bg-[var(--bg-primary)]`}
              >
                {/* Reading Progress Bar */}
                <div className="sticky top-0 left-0 right-0 h-1 bg-[var(--bg-secondary)] z-20">
                  <motion.div 
                    className="h-full bg-[var(--accent-primary)]"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Header */}
                <div className="relative h-96 overflow-hidden">
                  <img
                    src={selectedPostData.image}
                    alt={selectedPostData.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/40 to-transparent" />
                  
                  {/* Controls */}
                  <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedPost(null)}
                      className="w-12 h-12 rounded-full bg-[var(--bg-card)]/40 backdrop-blur-md flex items-center justify-center hover:bg-[var(--bg-card)]/60 transition-all border border-[var(--border-muted)]"
                    >
                      <X className="w-6 h-6 text-[var(--text-primary)]" />
                    </button>
                    <button
                      onClick={() => setReadingMode(!readingMode)}
                      className="px-6 py-2.5 rounded-full bg-[var(--bg-card)]/40 backdrop-blur-md text-xs font-bold uppercase tracking-widest text-[var(--text-primary)] hover:bg-[var(--bg-card)]/60 transition-all border border-[var(--border-muted)] flex items-center gap-2"
                    >
                      <BookOpen className="w-4 h-4" />
                      {readingMode ? '退出阅读' : '沉浸模式'}
                    </button>
                  </div>

                  {/* Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-12">
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedPostData.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full bg-[var(--accent-primary)]/20 text-[10px] font-bold uppercase tracking-widest text-[var(--accent-primary)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-serif text-[var(--text-primary)] mb-6 leading-tight">
                      {selectedPostData.title}
                    </h1>
                    <div className="flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                      <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[var(--accent-primary)]" />
                        {selectedPostData.date}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[var(--accent-primary)]" />
                        5 MIN READ
                      </span>
                    </div>
                  </div>
                </div>

                {/* Article Body */}
                <div className="p-12 sm:p-20">
                  {/* Quote Block */}
                  <blockquote className="border-l-2 border-[var(--accent-primary)] pl-8 py-2 mb-12">
                    <p className="text-2xl font-serif italic text-[var(--text-secondary)] leading-relaxed">
                      "{selectedContent.quote}"
                    </p>
                  </blockquote>

                  {/* Content with Drop Cap */}
                  <div className="prose prose-slate dark:prose-invert prose-lg max-w-none">
                    <div 
                      className="drop-cap text-[var(--text-secondary)] leading-[2] whitespace-pre-line text-justify tracking-wide font-light"
                      style={{ 
                        fontSize: '1.125rem',
                        fontFamily: "var(--font-sans)"
                      }}
                      dangerouslySetInnerHTML={{ 
                        __html: selectedContent.content
                          .replace(/## (.*)/g, '<h2 class="text-3xl font-serif text-[var(--text-primary)] mt-16 mb-8 pb-4 border-b border-[var(--border-muted)]">$1</h2>')
                          .replace(/\*\*(.*?)\*\*/g, '<strong class="text-[var(--text-primary)] font-bold">$1</strong>')
                          .replace(/`([^`]+)`/g, '<code class="px-2 py-1 rounded bg-[var(--bg-secondary)] text-[var(--accent-primary)] text-sm font-mono">$1</code>')
                      }}
                    />
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-3 mt-20 pt-10 border-t border-[var(--border-muted)]">
                    {selectedPostData.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-5 py-2 rounded-full bg-[var(--bg-secondary)] text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors cursor-pointer"
                      >
                        {tag}
                      </span>
                    ))}
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
