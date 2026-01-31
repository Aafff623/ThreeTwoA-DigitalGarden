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
  'P0': '#ff6b6b',
  'P1': '#f0c674',
  'P2': '#00d4aa',
};

const statusConfig = {
  'in-progress': { 
    label: '进行中', 
    icon: Circle, 
    color: '#00d4aa',
    bgColor: '#00d4aa15'
  },
  'planned': { 
    label: '计划中', 
    icon: Clock, 
    color: '#4facfe',
    bgColor: '#4facfe15'
  },
  'completed': { 
    label: '已完成', 
    icon: CheckCircle2, 
    color: '#22c55e',
    bgColor: '#22c55e15'
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
          className="mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--accent-primary)] opacity-[0.15] text-[var(--accent-primary)] text-sm font-medium mb-4">
            Plan
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[var(--text-primary)] mb-4">
            任务实验室
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl">
            追踪进度，管理时间，让每一刻都产生价值
          </p>
        </motion.div>

        {/* Stats Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-[var(--accent-primary)]" />
              <span className="text-xs text-[var(--text-secondary)]">总进度</span>
            </div>
            <div className="text-2xl font-bold text-[var(--text-primary)]">{stats.progressPercent}%</div>
            <div className="mt-2 h-1.5 bg-[var(--border-color)] rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-[#00d4aa] to-[#4facfe] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${stats.progressPercent}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </div>
          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-[#f0c674]" />
              <span className="text-xs text-[var(--text-secondary)]">进行中</span>
            </div>
            <div className="text-2xl font-bold text-[var(--text-primary)]">{stats.inProgress}</div>
            <div className="text-xs text-[var(--text-muted)] mt-1">个活跃任务</div>
          </div>
          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-[#22c55e]" />
              <span className="text-xs text-[var(--text-secondary)]">已完成</span>
            </div>
            <div className="text-2xl font-bold text-[var(--text-primary)]">{stats.completed}</div>
            <div className="text-xs text-[var(--text-muted)] mt-1">个任务</div>
          </div>
          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-[#4facfe]" />
              <span className="text-xs text-[var(--text-secondary)]">时间投入</span>
            </div>
            <div className="text-2xl font-bold text-[var(--text-primary)]">{stats.totalTime}h</div>
            <div className="text-xs text-[var(--text-muted)] mt-1">/ {stats.estimatedTime}h 预估</div>
          </div>
        </motion.div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                className="glass rounded-2xl p-5"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const taskId = e.dataTransfer.getData('taskId');
                  if (taskId) handleDragEnd(taskId, status);
                }}
              >
                {/* Column Header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: config.bgColor }}
                    >
                      <config.icon className="w-5 h-5" style={{ color: config.color }} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[var(--text-primary)]">{config.label}</h3>
                      <span className="text-xs text-[var(--text-muted)]">{columnTasks.length} 个任务</span>
                    </div>
                  </div>
                </div>

                {/* Task Cards */}
                <div className="space-y-3 min-h-[200px]">
                  <AnimatePresence mode="popLayout">
                    {columnTasks.map((task, index) => (
                      <motion.div
                        key={task.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        draggable
                        onDragStartCapture={(e) => {
                          setDraggedTask(task.id);
                          e.dataTransfer.setData('taskId', task.id);
                        }}
                        className={`group relative bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-5 cursor-move hover:border-[var(--accent-primary)] transition-all duration-300 shadow-sm hover:shadow-md ${
                          draggedTask === task.id ? 'opacity-50 scale-105 shadow-xl shadow-[var(--glow-primary)] border-[var(--accent-primary)]' : ''
                        }`}
                      >
                        {/* Drag Handle */}
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <GripVertical className="w-4 h-4 text-[var(--text-muted)]" />
                        </div>

                        {/* Priority Badge */}
                        <div className="flex items-center gap-2 mb-3">
                          <span 
                            className="px-2 py-0.5 rounded text-xs font-mono"
                            style={{ 
                              backgroundColor: `${priorityColors[task.priority]}20`,
                              color: priorityColors[task.priority]
                            }}
                          >
                            {task.priority}
                          </span>
                          {task.deadline && (
                            <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                              <Calendar className="w-3 h-3" />
                              {task.deadline}
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h4 className="font-medium text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent-primary)] transition-colors">
                          {task.title}
                        </h4>

                        {/* Description */}
                        <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-2">
                          {task.description}
                        </p>

                        {/* Progress Bar */}
                        <div className="mb-3">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-[var(--text-muted)]">进度</span>
                            <span className="text-[var(--accent-primary)]">{task.progress}%</span>
                          </div>
                          <div className="h-1.5 bg-[var(--border-color)] rounded-full overflow-hidden">
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
                        <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {task.timeSpent}h / {task.timeEstimate}h
                          </span>
                          <TrendingUp className="w-3 h-3" />
                        </div>

                        {/* Glow Effect on Drag */}
                        {draggedTask === task.id && (
                          <div 
                            className="absolute inset-0 rounded-xl opacity-30"
                            style={{ 
                              boxShadow: `0 0 30px ${config.color}`,
                              pointerEvents: 'none'
                            }}
                          />
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Drop Zone Indicator */}
                {draggedTask && !columnTasks.find(t => t.id === draggedTask) && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-3 p-4 rounded-xl border-2 border-dashed border-[#ffffff15] flex items-center justify-center text-[#5a5a6a] text-sm"
                  >
                    拖放到此处
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
          className="mt-8 text-center"
        >
          <p className="text-sm text-[#5a5a6a] flex items-center justify-center gap-2">
            <AlertCircle className="w-4 h-4" />
            拖拽任务卡片可在不同状态间移动
          </p>
        </motion.div>
      </div>
    </section>
  );
}
