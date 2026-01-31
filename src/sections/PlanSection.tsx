import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Calendar, 
  Target,
  Zap,
  TrendingUp,
  AlertCircle,
  GripVertical
} from 'lucide-react';
import { planItems } from '@/data';

interface Task {
  id: string;
  title: string;
  description: string;
  deadline?: string;
  status: 'in-progress' | 'planned' | 'completed';
  progress: number;
  priority: 'P0' | 'P1' | 'P2';
  timeEstimate: number;
  timeSpent: number;
}

const initialTasks: Task[] = planItems.map(item => ({
  ...item,
  progress: item.status === 'completed' ? 100 : item.status === 'in-progress' ? 65 : 0,
  priority: item.status === 'in-progress' ? 'P0' : item.status === 'planned' ? 'P1' : 'P2',
  timeEstimate: item.status === 'completed' ? 20 : 15,
  timeSpent: item.status === 'completed' ? 20 : item.status === 'in-progress' ? 10 : 0,
}));

const priorityColors = {
  'P0': '#bc6c25', // Terracotta
  'P1': '#dda15e', // Wheat
  'P2': '#a3b18a', // Sage
};

const statusConfig = {
  'in-progress': {
    label: '生长中',
    icon: Circle,
    color: '#a3b18a',
    bgColor: 'rgba(163, 177, 138, 0.1)'
  },
  'planned': {
    label: '播种计划',
    icon: Clock,
    color: '#dda15e',
    bgColor: 'rgba(221, 161, 94, 0.1)'
  },
  'completed': {
    label: '已收获',
    icon: CheckCircle2,
    color: '#606c38',
    bgColor: 'rgba(96, 108, 56, 0.1)'
  },
};

export function PlanSection() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [draggedTask, setDraggedTask] = useState<string | null>(null);

  const columns = useMemo(() => ({
    'in-progress': tasks.filter(t => t.status === 'in-progress'),
    'planned': tasks.filter(t => t.status === 'planned'),
    'completed': tasks.filter(t => t.status === 'completed'),
  }), [tasks]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const inProgress = tasks.filter(t => t.status === 'in-progress').length;
    const totalTime = tasks.reduce((acc, t) => acc + t.timeSpent, 0);
    const estimatedTime = tasks.reduce((acc, t) => acc + t.timeEstimate, 0);
    return { total, completed, inProgress, totalTime, estimatedTime, progressPercent: Math.round((completed / total) * 100) };
  }, [tasks]);

  const handleDragEnd = (taskId: string, newStatus: 'in-progress' | 'planned' | 'completed') => {
    setTasks(prev => prev.map(task =>
      task.id === taskId
        ? { ...task, status: newStatus, progress: newStatus === 'completed' ? 100 : newStatus === 'in-progress' ? 50 : 0 }
        : task
    ));
    setDraggedTask(null);
  };

  return (
    <section id="plan" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--accent-primary)] text-[var(--bg-primary)] text-sm font-medium mb-6">
            Growth Roadmap
          </span>
          <h2 className="text-5xl sm:text-6xl font-serif text-[var(--text-primary)] mb-6">
            🗺️ 成长蓝图
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl font-light tracking-wide">
            追踪想法的萌发与成熟，管理时间的流向，见证每一颗创意的种子破土而出 🌱
          </p>
        </motion.div>

        {/* Stats Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          <div className="glass rounded-3xl p-6 border-none">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-4 h-4 text-[var(--accent-primary)]" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">Harvest Progress</span>
            </div>
            <div className="text-3xl font-serif text-[var(--text-primary)]">{stats.progressPercent}%</div>
            <div className="mt-4 h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[var(--accent-primary)] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${stats.progressPercent}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </div>
          <div className="glass rounded-3xl p-6 border-none">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-4 h-4 text-[var(--accent-secondary)]" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">Growing Now</span>
            </div>
            <div className="text-3xl font-serif text-[var(--text-primary)]">{stats.inProgress}</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] mt-2 opacity-40">Active Seeds</div>
          </div>
          <div className="glass rounded-3xl p-6 border-none">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-4 h-4 text-[#606c38]" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">Harvested</span>
            </div>
            <div className="text-3xl font-serif text-[var(--text-primary)]">{stats.completed}</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] mt-2 opacity-40">Mature Thoughts</div>
          </div>
          <div className="glass rounded-3xl p-6 border-none">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4 text-[var(--accent-tertiary)]" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">Time Cultivated</span>
            </div>
            <div className="text-3xl font-serif text-[var(--text-primary)]">{stats.totalTime}h</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] mt-2 opacity-40">/ {stats.estimatedTime}h Est.</div>
          </div>
        </motion.div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {(Object.keys(columns) as Array<keyof typeof columns>).map((status, columnIndex) => {
            const config = statusConfig[status];
            const columnTasks = columns[status];

            return (
              <motion.div
                key={status}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + columnIndex * 0.1 }}
                className="bg-[var(--bg-secondary)]/50 rounded-[2rem] p-6 border border-white/5"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const taskId = e.dataTransfer.getData('taskId');
                  if (taskId) handleDragEnd(taskId, status);
                }}
              >
                {/* Column Header */}
                <div className="flex items-center justify-between mb-8 px-2">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: config.bgColor }}
                    >
                      <config.icon className="w-5 h-5" style={{ color: config.color }} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--text-primary)]">{config.label}</h3>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] opacity-40">{columnTasks.length} Seeds</span>
                    </div>
                  </div>
                </div>

                {/* Task Cards */}
                <div className="space-y-4 min-h-[300px]">
                  <AnimatePresence mode="popLayout">
                    {columnTasks.map((task, index) => (
                      <motion.div
                        key={task.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        draggable
                        onDragStart={(e) => {
                          e.dataTransfer.setData('taskId', task.id);
                          setDraggedTask(task.id);
                        }}
                        className={`group relative bg-[var(--bg-card)] rounded-2xl p-6 cursor-grab active:cursor-grabbing border border-white/5 hover:border-[var(--accent-primary)]/20 transition-all duration-500 hover-lift ${
                          draggedTask === task.id ? 'opacity-50 scale-105 shadow-2xl z-20' : ''
                        }`}
                      >
                        {/* Drag Handle */}
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <GripVertical className="w-4 h-4 text-[var(--text-muted)]" />
                        </div>

                        {/* Priority Badge */}
                        <div className="flex items-center gap-3 mb-4">
                          <span 
                            className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest"
                            style={{ 
                              backgroundColor: `${priorityColors[task.priority]}20`,
                              color: priorityColors[task.priority]
                            }}
                          >
                            {task.priority}
                          </span>
                          {task.deadline && (
                            <span className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
                              <Calendar className="w-3 h-3" />
                              {task.deadline}
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h4 className="text-lg font-serif text-[var(--text-primary)] mb-3 group-hover:text-[var(--accent-primary)] transition-colors duration-500 leading-tight">
                          {task.title}
                        </h4>

                        {/* Description */}
                        <p className="text-xs text-[var(--text-secondary)] mb-6 line-clamp-2 font-light leading-relaxed">
                          {task.description}
                        </p>

                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-widest mb-2">
                            <span className="text-[var(--text-muted)]">Growth</span>
                            <span className="text-[var(--accent-primary)]">{task.progress}%</span>
                          </div>
                          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full rounded-full"
                              style={{ backgroundColor: config.color }}
                              initial={{ width: 0 }}
                              animate={{ width: `${task.progress}%` }}
                              transition={{ duration: 0.8, delay: 0.3 }}
                            />
                          </div>
                        </div>

                        {/* Time Stats */}
                        <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3 h-3" />
                            {task.timeSpent}H / {task.timeEstimate}H
                          </span>
                          <TrendingUp className="w-3 h-3 opacity-20" />
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Drop Zone Indicator */}
                {draggedTask && !columnTasks.find(t => t.id === draggedTask) && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-6 p-8 rounded-2xl border-2 border-dashed border-white/5 flex items-center justify-center text-[var(--text-muted)] text-[10px] font-bold uppercase tracking-widest"
                  >
                    Drop to plant
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Tip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] flex items-center justify-center gap-3 opacity-60">
            <AlertCircle className="w-4 h-4 text-[var(--accent-primary)]" />
            Drag cards to evolve their status
          </p>
        </motion.div>
      </div>
    </section>
  );
}
