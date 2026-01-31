import React, { useRef, useEffect, useCallback, useMemo } from 'react';

interface PixelGlitchTextProps {
  text: string;
  className?: string;
  fontSize?: number;
  fontFamily?: string;
  particleColor?: string;
  gridSize?: number;
  mouseRadius?: number;
  forceMultiplier?: number;
  returnSpeed?: number;
  italic?: boolean;
}

class Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  size: number;
  vx: number;
  vy: number;
  color: string;
  friction: number;
  ease: number;

  constructor(x: number, y: number, size: number, color: string, ease: number) {
    this.x = x;
    this.y = y;
    this.originX = x;
    this.originY = y;
    this.size = size;
    this.color = color;
    this.vx = 0;
    this.vy = 0;
    this.friction = 0.85; // 进一步增加阻力，使运动更沉稳
    this.ease = ease;
  }

  update(mouseX: number, mouseY: number, radius: number, forceMultiplier: number) {
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const distanceSq = dx * dx + dy * dy;
    const radiusSq = radius * radius;

    if (distanceSq < radiusSq) {
      const distance = Math.sqrt(distanceSq);
      const force = (radius - distance) / radius;
      const angle = Math.atan2(dy, dx);
      // 被鼠标推开
      this.vx -= Math.cos(angle) * force * forceMultiplier;
      this.vy -= Math.sin(angle) * force * forceMultiplier;
    }

    // 回弹到原始位置
    this.vx += (this.originX - this.x) * this.ease;
    this.vy += (this.originY - this.y) * this.ease;

    this.vx *= this.friction;
    this.vy *= this.friction;

    this.x += this.vx;
    this.y += this.vy;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
}

export const PixelGlitchText: React.FC<PixelGlitchTextProps> = React.memo(({
  text,
  className = "",
  fontSize = 80,
  fontFamily = "'Instrument Serif', serif",
  particleColor = "#f5f5f0",
  gridSize = 3,
  mouseRadius = 100,
  forceMultiplier = 4,
  returnSpeed = 0.15,
  italic = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: -2000, y: -2000 });
  const containerRef = useRef<HTMLDivElement>(null);

  // 渲染文字到离屏 Canvas 并提取像素
  const initParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const fontStr = `${italic ? 'italic' : ''} ${fontSize}px ${fontFamily}`;
    ctx.font = fontStr;
    const textMetrics = ctx.measureText(text);
    
    const padding = 60;
    const width = textMetrics.width + padding * 2;
    const height = fontSize * 1.5 + padding;

    // 处理高分屏 (Retina)
    const dpr = window.devicePixelRatio || 1;
    // Only update dimensions if they changed to avoid clearing canvas unnecessarily
    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    }
    
    ctx.scale(dpr, dpr);

    // 重新绘制文字用于提取像素
    ctx.clearRect(0, 0, width, height);
    ctx.font = fontStr;
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'white';
    ctx.fillText(text, padding, height / 2);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const newParticles: Particle[] = [];

    // 采样像素点时考虑 DPR
    const step = gridSize * dpr;
    for (let py = 0; py < canvas.height; py += step) {
      for (let px = 0; px < canvas.width; px += step) {
        const index = (Math.floor(py) * canvas.width + Math.floor(px)) * 4;
        const alpha = data[index + 3];
        if (alpha > 128) {
          const x = px / dpr;
          const y = py / dpr;
          const ease = returnSpeed; // 移除随机性，使回弹更统一稳重
          newParticles.push(new Particle(x, y, gridSize - 0.5, particleColor, ease));
        }
      }
    }
    particles.current = newParticles;

    // Immediately draw the initial state to prevent flash
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
    newParticles.forEach(p => p.draw(ctx));
  }, [text, fontSize, fontFamily, gridSize, particleColor, italic, returnSpeed]);

  useEffect(() => {
    initParticles();

    let animationId: number;
    const animate = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (canvas && ctx) {
        // 每次重绘前重置变换并清空，然后再应用缩放
        const dpr = window.devicePixelRatio || 1;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
        
        particles.current.forEach(p => {
          p.update(mouse.current.x, mouse.current.y, mouseRadius, forceMultiplier);
          p.draw(ctx);
        });
      }
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => cancelAnimationFrame(animationId);
  }, [initParticles, mouseRadius, forceMultiplier]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      mouse.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  const handleMouseLeave = () => {
    mouse.current = { x: -2000, y: -2000 };
  };

  return (
    <div ref={containerRef} className={`relative flex justify-center items-center ${className}`}>
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="max-w-full h-auto"
        style={{ 
          imageRendering: 'pixelated',
          display: 'block'
        }}
      />
    </div>
  );
});
