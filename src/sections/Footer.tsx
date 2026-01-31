import { motion } from 'framer-motion';
import { Flower2, Heart, Github, Twitter, Mail, Rss, ArrowUp } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: '关于', href: '#' },
    { label: '联系', href: '#' },
    { label: 'RSS', href: '#' },
  ];

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Mail, href: '#', label: 'Email' },
    { icon: Rss, href: '#', label: 'RSS' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-16 px-4 sm:px-6 lg:px-8 border-t border-[var(--border-color)]">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--accent-primary)] opacity-[0.05] to-transparent pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          {/* Logo & Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00d4aa] to-[#4facfe] flex items-center justify-center">
                <Flower2 className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-lg text-[var(--text-primary)]">ThreeTwoA Digital Garden</span>
            </div>
            <p className="text-[var(--text-secondary)] text-sm max-w-sm">
              一个持续生长的大学生创意与思考空间。种植想法，培育项目，记录成长。
            </p>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-6"
          >
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[var(--text-secondary)] hover:text-[#00d4aa] transition-colors text-sm"
              >
                {link.label}
              </a>
            ))}
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3"
          >
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="w-10 h-10 rounded-lg bg-[var(--border-color)] hover:bg-[#00d4aa15] flex items-center justify-center transition-all duration-300 group"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5 text-[var(--text-secondary)] group-hover:text-[#00d4aa] transition-colors" />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[var(--border-color)] my-8" />

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm text-[var(--text-muted)] flex items-center gap-1">
            © {currentYear} ThreeTwoA Digital Garden. Made with
            <Heart className="w-4 h-4 text-[#ff6b6b] mx-1" />
            and curiosity.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-sm text-[var(--text-muted)]">一切都在生长中 🌱</span>
            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-lg bg-[var(--border-color)] hover:bg-[#00d4aa15] flex items-center justify-center transition-all group"
            >
              <ArrowUp className="w-4 h-4 text-[var(--text-secondary)] group-hover:text-[#00d4aa] transition-colors" />
            </button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
