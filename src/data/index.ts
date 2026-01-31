// Blog Posts Data
export interface BlogPost {
  id: string;
  title: string;
  date: string;
  tags: string[];
  summary: string;
  image: string;
  slug: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: '如何开始构建你的第一个"数字花园"',
    date: '2024-01-15',
    tags: ['#数字花园', '#思考', '#个人成长'],
    summary: '数字花园是一种新兴的知识管理和个人表达形式。与传统的博客不同，数字花园强调想法的持续生长和演化，而不是按时间顺序发布的 finished articles。在这篇文章中，我将分享构建数字花园的核心理念、工具选择以及起步的三个关键步骤。从选择合适的平台，到建立内容组织体系，再到养成持续耕耘的习惯，让我们一起开启这段数字种植之旅。',
    image: '/images/blog1-digital-garden.jpg',
    slug: 'how-to-build-digital-garden'
  },
  {
    id: '2',
    title: '在Vue.js项目中实践组件化设计的心得',
    date: '2024-01-08',
    tags: ['#前端', '#Vue.js', '#组件化'],
    summary: '组件化是现代前端开发的核心理念之一。在最近的一个Vue.js项目中，我深入实践了组件化设计模式，从原子化设计思想出发，构建了可复用、可维护的组件库。本文将分享我在组件拆分、Props设计、事件通信以及状态管理方面的心得体会，探讨如何在实际项目中平衡组件的通用性与特异性。',
    image: '/images/blog2-vue-component.png',
    slug: 'vue-component-design'
  },
  {
    id: '3',
    title: '阅读笔记：《黑客与画家》带给我的启发',
    date: '2024-01-02',
    tags: ['#读书', '#思考', '#编程'],
    summary: '保罗·格雷厄姆的《黑客与画家》是一本让我反复阅读的经典之作。书中关于黑客精神、创业思维、编程语言设计的观点，每一次阅读都有新的收获。这篇笔记整理了我最受启发的几个观点：为什么编程像绘画、如何创造财富、以及好设计的本质。这些思考不仅影响了我的编程实践，也塑造了我对产品和技术路线的理解。',
    image: '/images/blog3-reading-notes.jpg',
    slug: 'hackers-and-painters-notes'
  },
  {
    id: '4',
    title: 'Tailwind CSS 实战技巧总结',
    date: '2024-01-25',
    tags: ['#前端', '#CSS', '#Tailwind'],
    summary: 'Tailwind CSS 是当下最流行的 CSS 框架之一，它的实用类优先理念彻底改变了我的样式编写方式。本文总结了我使用 Tailwind 的一些实战技巧，包括自定义配置、插件开发、响应式设计、暗黑模式支持等。从原子化 CSS 的优势到实际项目中的最佳实践，希望能帮助你更高效地使用 Tailwind。',
    image: '/images/project4-css-animation.jpg',
    slug: 'tailwind-tips'
  },
  {
    id: '5',
    title: 'TypeScript 高级类型体操入门',
    date: '2024-01-20',
    tags: ['#TypeScript', '#前端', '#编程'],
    summary: 'TypeScript 的类型系统非常强大，掌握高级类型技巧可以让你的代码更加健壮和可维护。本文从泛型、条件类型、映射类型等基础概念出发，逐步深入到模板字面量类型、递归类型等高级用法。通过实际案例，带你领略 TypeScript 类型体操的魅力。',
    image: '/images/blog2-vue-component.png',
    slug: 'typescript-advanced-types'
  },
  {
    id: '6',
    title: '我的 2024 前端学习路线图',
    date: '2024-01-28',
    tags: ['#前端', '#学习', '#职业规划'],
    summary: '前端技术更新迭代很快，制定一个清晰的学习路线图非常重要。本文分享了我 2024 年的前端学习计划，包括核心基础巩固、框架深入、工程化实践、性能优化等方向。同时我也会分享一些学习资源和方法，希望能给同样在前端学习路上的你一些参考。',
    image: '/images/project2-color-generator.jpg',
    slug: 'frontend-learning-roadmap-2024'
  }
];

// Projects Data
export interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  image: string;
  link?: string;
  github?: string;
}

export const projects: Project[] = [
  {
    id: '1',
    name: '交互式数据可视化图表',
    description: '基于 D3.js 和 Vue 的动态数据可视化组件库，支持多种图表类型和实时数据更新。',
    techStack: ['D3.js', 'Vue', 'TypeScript'],
    image: '/images/project1-data-viz.jpg',
    link: '#',
    github: '#'
  },
  {
    id: '2',
    name: '个人网站色彩主题生成器',
    description: '一键生成和谐的色彩搭配方案，支持导出为 CSS Variables 和多种设计工具格式。',
    techStack: ['JavaScript', 'CSS Variables', 'React'],
    image: '/images/project2-color-generator.jpg',
    link: '#',
    github: '#'
  },
  {
    id: '3',
    name: '简约待办事项命令行工具',
    description: '用 Python 开发的轻量级 CLI 工具，支持任务管理、优先级设置和数据同步。',
    techStack: ['Python', 'Click', 'SQLite'],
    image: '/images/project3-cli-tool.png',
    link: '#',
    github: '#'
  },
  {
    id: '4',
    name: 'CSS创意动画合集',
    description: '收集和展示各种纯 CSS 实现的创意动画效果，包括加载动画、过渡效果和微交互。',
    techStack: ['HTML/CSS', 'Sass', 'Animation'],
    image: '/images/project4-css-animation.jpg',
    link: '#',
    github: '#'
  },
  {
    id: '5',
    name: 'React 组件库文档站点',
    description: '为团队内部 React 组件库搭建的文档站点，支持组件演示、Props 说明和代码示例。',
    techStack: ['React', 'Vite', 'MDX'],
    image: '/images/project1-data-viz.jpg',
    link: '#',
    github: '#'
  },
  {
    id: '6',
    name: 'Markdown 笔记编辑器',
    description: '支持实时预览的 Markdown 编辑器，具有语法高亮、自动保存和导出功能。',
    techStack: ['React', 'TypeScript', 'Marked'],
    image: '/images/project2-color-generator.jpg',
    link: '#',
    github: '#'
  }
];

// Plan Data
export interface PlanItem {
  id: string;
  title: string;
  description: string;
  deadline?: string;
  status: 'in-progress' | 'planned' | 'completed';
}

export const planItems: PlanItem[] = [
  {
    id: '1',
    title: '学习 Three.js 基础知识',
    description: '掌握 3D 图形编程基础，包括场景、相机、渲染器和基本几何体。',
    deadline: '2024-02-28',
    status: 'in-progress'
  },
  {
    id: '2',
    title: '开发一个浏览器插件',
    description: '开发一个提升工作效率的 Chrome 插件，实现标签页管理和快捷操作。',
    deadline: '2024-03-15',
    status: 'planned'
  },
  {
    id: '3',
    title: '为数字花园添加搜索功能',
    description: '集成全文搜索，支持按标签、内容和标题快速查找文章。',
    deadline: '2024-02-15',
    status: 'planned'
  },
  {
    id: '4',
    title: '部署本数字花园 V1.0',
    description: '完成基础功能开发，部署到 Vercel 并配置自定义域名。',
    deadline: '2024-01-30',
    status: 'completed'
  },
  {
    id: '5',
    title: '学习 Next.js App Router',
    description: '深入学习 Next.js 13+ 的 App Router，为后续项目迁移做准备。',
    deadline: '2024-03-01',
    status: 'planned'
  },
  {
    id: '6',
    title: '优化网站性能',
    description: '对网站进行性能优化，包括图片懒加载、代码分割、动画优化等。',
    deadline: '2024-02-20',
    status: 'in-progress'
  },
  {
    id: '7',
    title: '完善项目文档',
    description: '编写完整的项目文档，包括 README、使用指南、API 文档等。',
    deadline: '2024-01-28',
    status: 'completed'
  }
];

// ChatNotes Data
export interface ChatNote {
  id: string;
  topic: string;
  messages: {
    id: string;
    type: 'question' | 'thought' | 'answer';
    content: string;
    timestamp: string;
  }[];
  date: string;
}

export const chatNotes: ChatNote[] = [
  {
    id: '1',
    topic: '极简主义在Web设计中的利与弊',
    date: '2024-01-20',
    messages: [
      {
        id: '1-1',
        type: 'question',
        content: '为什么现在这么多网站都在追求极简设计？',
        timestamp: '10:30'
      },
      {
        id: '1-2',
        type: 'thought',
        content: '极简主义确实是一种趋势，但背后的原因值得思考。首先是移动优先的设计需求，简洁的界面在小屏幕上更易用。其次是性能考虑，减少元素意味着更快的加载速度。但极简不等于简单，如何在留白和功能之间找到平衡？',
        timestamp: '10:32'
      },
      {
        id: '1-3',
        type: 'answer',
        content: '极简主义的核心是"少即是多"，但需要警惕过度简化导致的功能隐藏。好的极简设计应该是直觉性的，用户无需思考就能找到所需功能。关键在于信息层级的清晰和交互反馈的及时。',
        timestamp: '10:35'
      }
    ]
  },
  {
    id: '2',
    topic: '如何平衡学业项目与个人兴趣项目的时间',
    date: '2024-01-18',
    messages: [
      {
        id: '2-1',
        type: 'question',
        content: '最近感觉时间不够用，学业压力和兴趣项目之间很难取舍。',
        timestamp: '15:20'
      },
      {
        id: '2-2',
        type: 'thought',
        content: '这是一个普遍的困境。学业项目有明确的截止日期和评分标准，而个人项目带来的是长期成长和满足感。也许问题不在于时间分配，而在于找到两者的交集？',
        timestamp: '15:23'
      },
      {
        id: '2-3',
        type: 'answer',
        content: '我的策略是：1) 将个人项目与学业结合，选择有重叠技术的课题；2) 设定固定的时间段，比如周末专注个人项目；3) 接受不完美，兴趣项目不需要一次性做到完美，持续迭代更重要。',
        timestamp: '15:28'
      }
    ]
  },
  {
    id: '3',
    topic: '关于学习新技术的思考',
    date: '2024-01-25',
    messages: [
      {
        id: '3-1',
        type: 'question',
        content: '前端技术更新这么快，怎么选择学习什么？',
        timestamp: '09:15'
      },
      {
        id: '3-2',
        type: 'thought',
        content: '这确实是个问题。每年都有新框架、新工具，如果什么都学，精力肯定不够。也许应该区分"需要深入掌握"和"了解即可"的技术。基础永远是最重要的，框架只是工具。',
        timestamp: '09:18'
      },
      {
        id: '3-3',
        type: 'answer',
        content: '我的学习优先级：1) 基础三件套（HTML/CSS/JS）永远排第一；2) 选择一个主流框架深入（React/Vue）；3) 根据项目需求学习工具链；4) 关注技术趋势但不必追逐每一个热点。',
        timestamp: '09:25'
      }
    ]
  }
];

// Resources Data
export interface Resource {
  id: string;
  name: string;
  description: string;
  url: string;
  icon: string;
  category: string;
}

export const resources: Resource[] = [
  {
    id: '1',
    name: 'VS Code',
    description: '强大的代码编辑器，丰富的插件生态',
    url: 'https://code.visualstudio.com',
    icon: 'Code2',
    category: '开发工具'
  },
  {
    id: '2',
    name: 'GitHub',
    description: '代码托管和协作开发平台',
    url: 'https://github.com',
    icon: 'Github',
    category: '开发工具'
  },
  {
    id: '3',
    name: 'Figma',
    description: '协作式界面设计工具',
    url: 'https://figma.com',
    icon: 'Figma',
    category: '开发工具'
  },
  {
    id: '4',
    name: 'Vercel',
    description: '前端应用部署平台，支持自动 CI/CD',
    url: 'https://vercel.com',
    icon: 'Code2',
    category: '开发工具'
  },
  {
    id: '5',
    name: 'Dribbble',
    description: '设计师作品展示和灵感平台',
    url: 'https://dribbble.com',
    icon: 'Palette',
    category: '灵感来源'
  },
  {
    id: '6',
    name: 'Awwwards',
    description: '优秀网站设计评选和展示',
    url: 'https://awwwards.com',
    icon: 'Award',
    category: '灵感来源'
  },
  {
    id: '7',
    name: 'CSS-Tricks',
    description: '前端开发技术博客和教程',
    url: 'https://css-tricks.com',
    icon: 'FileCode',
    category: '灵感来源'
  },
  {
    id: '8',
    name: 'Behance',
    description: 'Adobe 旗下的创意作品展示平台',
    url: 'https://behance.net',
    icon: 'Palette',
    category: '灵感来源'
  },
  {
    id: '9',
    name: 'Coursera',
    description: '在线课程学习平台',
    url: 'https://coursera.org',
    icon: 'GraduationCap',
    category: '学习路径'
  },
  {
    id: '10',
    name: 'freeCodeCamp',
    description: '免费的编程学习资源',
    url: 'https://freecodecamp.org',
    icon: 'Flame',
    category: '学习路径'
  },
  {
    id: '11',
    name: 'MDN Web Docs',
    description: '权威的 Web 技术文档',
    url: 'https://developer.mozilla.org',
    icon: 'BookOpen',
    category: '学习路径'
  },
  {
    id: '12',
    name: 'Frontend Masters',
    description: '高质量前端技术课程平台',
    url: 'https://frontendmasters.com',
    icon: 'GraduationCap',
    category: '学习路径'
  }
];

export const resourceCategories = ['开发工具', '灵感来源', '学习路径'];
