# ThreeTwoA Digital Garden 🌱

> **一切都在生长中，每一个像素都在跳动。**

[![Digital Garden](https://img.shields.io/badge/Digital-Garden-00f2ff?style=for-the-badge&logo=target)](https://github.com/Aafff623/ThreeTwoA-DigitalGarden)
[![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646cff?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Cyber Neon](https://img.shields.io/badge/Theme-Cyber_Neon-ff00d9?style=for-the-badge)](https://github.com/Aafff623/ThreeTwoA-DigitalGarden)

## ✨ 项目愿景

**ThreeTwoA Digital Garden** 是一个融合了 **"赛博霓虹 (Cyber Neon)"** 视觉美学与 **"数字种植 (Digital Gardening)"** 理念的个人空间。它不仅是一个展示作品的 Portfolio，更是一个持续演化、充满生命力的思想实验室。

在这里，代码、设计与思考不再是冰冷的静态页面，而是如同霓虹灯火般跃动，如同数字生命般在光影中生长。

---

## 🎨 核心设计与交互

### 🌌 赛博霓虹视觉体系 (Cyber Neon Theme)
- **极简深邃背景**: 使用 `#030303` 作为基底，衬托出霓虹色彩的爆发力。
- **高饱和荧光色**: 
  - 🧪 **Cyber Cyan (#00f2ff)**: 科技感的冷色调核心。
  - ⚡ **Electric Purple (#7000ff)**: 充满能量的电力紫。
  - 🌅 **Aurora Pink (#ff00d9)**: 迷幻的极光粉。
- **毛玻璃 2.0 (Glassmorphism)**: 优化了磨砂质感与边缘光晕，卡片更具浮空感与呼吸感。

### 👾 像素抽离交互 (Pixel Glitch Effect)
受 Trae.ai 启发，首页标题集成了基于 **Particle Physics (粒子物理)** 的实时交互效果：
- 鼠标滑过时，文字像素会像水波纹一样被推开，产生迷幻的抽离感。
- 物理引擎模拟了摩擦力、弹力与加速度，让每一次触碰都细腻自然。
- 采用 **Offscreen Canvas** 采样与 **requestAnimationFrame** 驱动，确保 60FPS 的极致流畅。

---

## 🚀 模块概览

### 1. 🌿 思想花园 (Digital Garden)
- **理念**: 摒弃线性时间轴，关注想法的交叉与演化。
- **视觉**: 杂志封面式卡片设计，支持首字下沉与沉浸式阅读模式。

### 2. 🚀 项目陈列馆 (Project Gallery)
- **布局**: 针对高密度信息流优化，每行展示 3-4 个精选项目。
- **交互**: 悬停时触发霓虹光晕反馈，卡片布局紧凑而不失美感。

### 3. 🎯 任务实验室 (Plan Section)
- **功能**: 优先级标签（P0/P1/P2）、时间追踪与状态看板。
- **动效**: 使用 Framer Motion 实现任务卡片的平滑过渡与入场动画。

### 4. 💬 思维显影板 (Chat Notes)
- **风格**: 模拟黑板笔记风格，支持打字机动画显影。
- **交互**: 沉浸式对话笔记展示，记录灵光一现的瞬间。

### 5. 🔍 资源库 (Resources)
- **管理**: 实时分类筛选，卡片式展示常用工具、灵感来源与学习路径。

---

## 🛠️ 技术栈

| 领域 | 技术方案 |
|------|----------|
| **核心框架** | React 19 + TypeScript 5 |
| **构建工具** | Vite 7 (高性能热更新) |
| **样式方案** | Tailwind CSS 3 + PostCSS |
| **动画引擎** | Framer Motion (手势交互与补间动画) |
| **UI 组件库** | Radix UI + Shadcn/ui (无障碍与高度可定制) |
| **物理动效** | Custom Canvas Particle Engine |
| **图标体系** | Lucide React |

---

## 📁 目录结构

```bash
ThreeTwoA-Digital-Garden/
├── src/
│   ├── components/      # 原子化 UI 组件与交互组件
│   │   ├── PixelGlitchText.tsx  # 核心像素抽离组件
│   │   └── ParticleBackground.tsx
│   ├── sections/        # 页面业务区块
│   ├── data/            # 响应式内容数据中心
│   ├── lib/             # 工具函数与动画配置
│   └── App.tsx          # 根组件
├── public/              # 静态资源
├── index.html
├── package.json
└── README.md
```

---

## 🚀 快速启动

### 1. 克隆项目
```bash
git clone https://github.com/Aafff623/ThreeTwoA-DigitalGarden.git
```

### 2. 安装依赖
```bash
npm install
```

### 3. 开启开发模式
```bash
npm run dev
```
访问 `http://localhost:5173` 即可开启你的数字花园之旅。

---

## 📄 许可证

本项目基于 **MIT License** 开源。

---

<p align="center">
  <b>Designed & Developed by ThreeTwoA with ❤️</b><br/>
  <i>Everything is growing... and glowing.</i>
</p>
