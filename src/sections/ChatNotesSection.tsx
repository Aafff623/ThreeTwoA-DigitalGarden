import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Lightbulb, HelpCircle, Sparkles } from 'lucide-react';
import { chatNotes } from '@/data';

// Extract keywords for tag cloud
const extractKeywords = (notes: typeof chatNotes) => {
  const keywords = new Map<string, number>();
  const commonWords = ['的', '了', '是', '在', '我', '有', '和', '就', '不', '人', '都', '一', '一个', '上', '也', '很', '到', '说', '要', '去', '你', '会', '着', '没有', '看', '好', '自己', '这'];
  
  notes.forEach(note => {
    note.messages.forEach(msg => {
      const words = msg.content.split(/[\s,，.。!！?？;；:]+/);
      words.forEach(word => {
        if (word.length >= 2 && !commonWords.includes(word)) {
          keywords.set(word, (keywords.get(word) || 0) + 1);
        }
      });
    });
  });
  
  return Array.from(keywords.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([word, count]) => ({ word, count, size: Math.min(1 + count * 0.2, 2) }));
};

interface TypingMessage {
  id: string;
  content: string;
  displayContent: string;
  isComplete: boolean;
}

export function ChatNotesSection() {
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  const [typingMessages, setTypingMessages] = useState<TypingMessage[]>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const keywords = extractKeywords(chatNotes);

  const selectedNoteData = selectedNote 
    ? chatNotes.find(n => n.id === selectedNote) 
    : null;

  // Typing animation effect
  useEffect(() => {
    if (!selectedNoteData) {
      setTypingMessages([]);
      setCurrentMessageIndex(0);
      return;
    }

    const messages = selectedNoteData.messages.map((msg) => ({
      id: msg.id,
      content: msg.content,
      displayContent: '',
      isComplete: false,
    }));
    setTypingMessages(messages);
    setCurrentMessageIndex(0);
  }, [selectedNoteData]);

  useEffect(() => {
    if (typingMessages.length === 0) return;
    if (currentMessageIndex >= typingMessages.length) return;

    const currentMsg = typingMessages[currentMessageIndex];
    if (currentMsg.isComplete) {
      setCurrentMessageIndex(prev => prev + 1);
      return;
    }

    if (currentMsg.displayContent.length < currentMsg.content.length) {
      const timeout = setTimeout(() => {
        setTypingMessages(prev => prev.map((msg, idx) => 
          idx === currentMessageIndex 
            ? { 
                ...msg, 
                displayContent: msg.content.slice(0, msg.displayContent.length + 1)
              }
            : msg
        ));
      }, 30);
      return () => clearTimeout(timeout);
    } else {
      setTypingMessages(prev => prev.map((msg, idx) => 
        idx === currentMessageIndex 
          ? { ...msg, isComplete: true }
          : msg
      ));
    }
  }, [typingMessages, currentMessageIndex]);

  return (
    <section id="chatnotes" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--accent-secondary)] opacity-[0.15] text-[var(--accent-secondary)] text-sm font-medium mb-4">
            ChatNotes
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[var(--text-primary)] mb-4">
            思维显影板
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
            与自己的对话，让思考像照片一样逐渐显影
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Notes List */}
          <div className="lg:col-span-2 space-y-4">
            {!selectedNote ? (
              // Note Cards
              chatNotes.map((note, index) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onClick={() => setSelectedNote(note.id)}
                  className="group glass rounded-2xl p-6 cursor-pointer hover:border-[var(--accent-secondary)] transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--accent-secondary)] to-[#4facfe] flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent-secondary)] transition-colors">
                        {note.topic}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] mb-3">
                        {note.messages.length} 条对话 · {note.date}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {note.messages.slice(0, 2).map((msg, idx) => (
                          <span key={idx} className="text-xs text-[var(--text-muted)] line-clamp-1 max-w-[200px]">
                            {msg.content.slice(0, 50)}...
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-[var(--border-color)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Sparkles className="w-4 h-4 text-[var(--accent-secondary)]" />
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              // Selected Note - Typing Display
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass rounded-2xl p-6 min-h-[500px]"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setSelectedNote(null)}
                      className="w-10 h-10 rounded-lg bg-[var(--border-color)] hover:bg-[var(--bg-tertiary)] flex items-center justify-center transition-colors"
                    >
                      <span className="text-[var(--text-secondary)]">←</span>
                    </button>
                    <div>
                      <h3 className="text-xl font-semibold text-[var(--text-primary)]">
                        {selectedNoteData?.topic}
                      </h3>
                      <span className="text-sm text-[var(--text-muted)]">{selectedNoteData?.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[var(--accent-secondary)] animate-pulse" />
                    <span className="text-xs text-[var(--text-secondary)]">显影中...</span>
                  </div>
                </div>

                {/* Messages - Blackboard Style */}
                <div 
                  className="rounded-2xl p-8 min-h-[500px] border border-[var(--border-color)]"
                  style={{
                    background: 'var(--bg-tertiary)',
                    boxShadow: 'inset 0 2px 20px rgba(0,0,0,0.05)'
                  }}
                >
                  <div className="space-y-8">
                    {selectedNoteData?.messages.map((message, msgIndex) => {
                      const typingMsg = typingMessages[msgIndex];
                      const isVisible = msgIndex <= currentMessageIndex;
                      const isComplete = typingMsg?.isComplete;
                      
                      return (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, x: message.type === 'answer' ? 20 : -20 }}
                          animate={{ 
                            opacity: isVisible ? 1 : 0,
                            x: isVisible ? 0 : (message.type === 'answer' ? 20 : -20)
                          }}
                          transition={{ duration: 0.5 }}
                          className={`flex gap-4 ${
                            message.type === 'answer' ? 'flex-row-reverse' : ''
                          }`}
                        >
                          {/* Avatar */}
                          <div
                            className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${
                              message.type === 'question'
                                ? 'bg-[var(--accent-primary)]/10'
                                : message.type === 'thought'
                                ? 'bg-[var(--accent-secondary)]/10'
                                : 'bg-[var(--bg-secondary)] border border-[var(--border-color)]'
                            }`}
                          >
                            {message.type === 'question' ? (
                              <HelpCircle className="w-5 h-5 text-[var(--accent-primary)]" />
                            ) : message.type === 'thought' ? (
                              <Lightbulb className="w-5 h-5 text-[var(--accent-secondary)]" />
                            ) : (
                              <span className="text-[var(--text-secondary)] text-xs font-bold">ME</span>
                            )}
                          </div>

                          {/* Message Bubble */}
                          <div className={`max-w-[85%] ${message.type === 'answer' ? 'text-right' : ''}`}>
                            <div
                              className={`inline-block px-6 py-4 rounded-2xl text-sm leading-relaxed font-mono shadow-sm ${
                                message.type === 'question'
                                  ? 'bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border border-[var(--accent-primary)]/20'
                                  : message.type === 'thought'
                                  ? 'bg-[var(--accent-secondary)]/10 text-[var(--accent-secondary)] border border-[var(--accent-secondary)]/20'
                                  : 'bg-[var(--bg-card)] text-[var(--text-primary)] border border-[var(--border-color)]'
                              }`}
                            >
                              {typingMsg?.displayContent || ''}
                              {!isComplete && isVisible && (
                                <span className="cursor-blink ml-0.5 inline-block w-1.5 h-4 bg-[var(--accent-primary)] align-middle" />
                              )}
                            </div>
                            <div className="mt-2 text-[10px] text-[var(--text-muted)] font-bold tracking-widest uppercase">{message.timestamp}</div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Progress Indicator */}
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex gap-1">
                    {selectedNoteData?.messages.map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-8 h-1 rounded-full transition-colors ${
                          idx <= currentMessageIndex ? 'bg-[var(--accent-secondary)]' : 'bg-[var(--border-color)]'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-[var(--text-muted)]">
                    {Math.min(currentMessageIndex + 1, selectedNoteData?.messages.length || 0)} / {selectedNoteData?.messages.length}
                  </span>
                </div>
              </motion.div>
            )}
          </div>

          {/* 3D Tag Cloud */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[var(--accent-secondary)]" />
              思维关键词
            </h3>
            
            <div className="relative h-[400px] overflow-hidden">
              {keywords.map((keyword, index) => {
                const angle = (index / keywords.length) * Math.PI * 2;
                const radius = 120 + Math.sin(index * 0.5) * 40;
                const x = Math.cos(angle) * radius + 140;
                const y = Math.sin(angle) * radius * 0.6 + 180;
                const z = Math.sin(angle * 2) * 50;
                const scale = 0.8 + (z + 50) / 100 * 0.4;
                const opacity = 0.5 + (z + 50) / 100 * 0.5;
                
                return (
                  <motion.span
                    key={keyword.word}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity, 
                      scale: scale * keyword.size,
                      x,
                      y,
                    }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.05,
                      type: 'spring'
                    }}
                    className="absolute whitespace-nowrap cursor-pointer hover:text-[var(--accent-secondary)] transition-colors"
                    style={{
                      color: `var(--text-secondary)`,
                      opacity: opacity * 0.8,
                      fontSize: `${14 * keyword.size}px`,
                      textShadow: `0 0 ${5 + z / 10}px rgba(var(--accent-secondary-rgb), ${opacity * 0.3})`,
                    }}
                  >
                    {keyword.word}
                  </motion.span>
                );
              })}
            </div>

            <p className="text-xs text-[var(--text-muted)] text-center mt-4">
              从对话中自动提取的关键词云
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
