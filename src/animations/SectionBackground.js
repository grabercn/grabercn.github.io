import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const sectionThemes = [
  { // about
    gradient: 'radial-gradient(ellipse at 20% 50%, rgba(77, 4, 160, 0.08) 0%, transparent 70%)',
    accent: 'radial-gradient(circle at 80% 30%, rgba(176, 125, 255, 0.06) 0%, transparent 50%)',
  },
  { // experience
    gradient: 'radial-gradient(ellipse at 80% 50%, rgba(139, 44, 255, 0.08) 0%, transparent 70%)',
    accent: 'radial-gradient(circle at 20% 70%, rgba(77, 4, 160, 0.06) 0%, transparent 50%)',
  },
  { // projects
    gradient: 'radial-gradient(ellipse at 50% 30%, rgba(216, 80, 225, 0.07) 0%, transparent 70%)',
    accent: 'radial-gradient(circle at 70% 80%, rgba(77, 4, 160, 0.05) 0%, transparent 50%)',
  },
  { // coursework
    gradient: 'radial-gradient(ellipse at 30% 60%, rgba(77, 4, 160, 0.08) 0%, transparent 70%)',
    accent: 'radial-gradient(circle at 90% 20%, rgba(176, 125, 255, 0.06) 0%, transparent 50%)',
  },
  { // skills
    gradient: 'radial-gradient(ellipse at 60% 40%, rgba(139, 44, 255, 0.07) 0%, transparent 70%)',
    accent: 'radial-gradient(circle at 10% 80%, rgba(216, 80, 225, 0.05) 0%, transparent 50%)',
  },
  { // testimonials
    gradient: 'radial-gradient(ellipse at 40% 70%, rgba(77, 4, 160, 0.08) 0%, transparent 70%)',
    accent: 'radial-gradient(circle at 60% 10%, rgba(176, 125, 255, 0.06) 0%, transparent 50%)',
  },
  { // contact
    gradient: 'radial-gradient(ellipse at 70% 50%, rgba(139, 44, 255, 0.07) 0%, transparent 70%)',
    accent: 'radial-gradient(circle at 30% 30%, rgba(77, 4, 160, 0.05) 0%, transparent 50%)',
  },
];

const sectionThemesDark = [
  { // about
    gradient: 'radial-gradient(ellipse at 20% 50%, rgba(77, 4, 160, 0.18) 0%, transparent 70%)',
    accent: 'radial-gradient(circle at 80% 30%, rgba(176, 125, 255, 0.14) 0%, transparent 50%)',
  },
  { // experience
    gradient: 'radial-gradient(ellipse at 80% 50%, rgba(139, 44, 255, 0.18) 0%, transparent 70%)',
    accent: 'radial-gradient(circle at 20% 70%, rgba(77, 4, 160, 0.14) 0%, transparent 50%)',
  },
  { // projects
    gradient: 'radial-gradient(ellipse at 50% 30%, rgba(216, 80, 225, 0.16) 0%, transparent 70%)',
    accent: 'radial-gradient(circle at 70% 80%, rgba(77, 4, 160, 0.12) 0%, transparent 50%)',
  },
  { // coursework
    gradient: 'radial-gradient(ellipse at 30% 60%, rgba(77, 4, 160, 0.18) 0%, transparent 70%)',
    accent: 'radial-gradient(circle at 90% 20%, rgba(176, 125, 255, 0.14) 0%, transparent 50%)',
  },
  { // skills
    gradient: 'radial-gradient(ellipse at 60% 40%, rgba(139, 44, 255, 0.16) 0%, transparent 70%)',
    accent: 'radial-gradient(circle at 10% 80%, rgba(216, 80, 225, 0.12) 0%, transparent 50%)',
  },
  { // testimonials
    gradient: 'radial-gradient(ellipse at 40% 70%, rgba(77, 4, 160, 0.18) 0%, transparent 70%)',
    accent: 'radial-gradient(circle at 60% 10%, rgba(176, 125, 255, 0.14) 0%, transparent 50%)',
  },
  { // contact
    gradient: 'radial-gradient(ellipse at 70% 50%, rgba(139, 44, 255, 0.16) 0%, transparent 70%)',
    accent: 'radial-gradient(circle at 30% 30%, rgba(77, 4, 160, 0.12) 0%, transparent 50%)',
  },
];

const SectionBackground = ({ index = 0, children }) => {
  const ref = React.useRef(null);
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.getAttribute('data-theme') === 'dark');
    };
    checkTheme();

    // Watch for theme changes via MutationObserver
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  const themes = isDark ? sectionThemesDark : sectionThemes;
  const theme = themes[index % themes.length];

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Subtle parallax on the background blobs - they move slower than content
  const y1 = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <div ref={ref} style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background gradient layer 1 */}
      <motion.div
        style={{
          position: 'absolute',
          inset: '-50px',
          background: theme.gradient,
          y: y1,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      {/* Background gradient layer 2 - moves in opposite direction */}
      <motion.div
        style={{
          position: 'absolute',
          inset: '-50px',
          background: theme.accent,
          y: y2,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
};

export default SectionBackground;
