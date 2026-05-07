import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import GlobalCursorGlow from '../animations/GlobalCursorGlow';
import KonamiCode from '../animations/KonamiCode';
import ErrorBoundary from './ErrorBoundary';
import { ThemeProvider } from './ThemeContext';

const App = lazy(() => import('../App'));
const PhotoHome = lazy(() => import('../subpages/photography/PhotoHome'));
const MusicHome = lazy(() => import('../subpages/music/MusicHome'));
const DesktopLauncher = lazy(() => import('../subpages/desktop/DesktopLauncher'));
const DataVisHome = lazy(() => import('../subpages/data-vis/DataVisHome'));
const CookieClicker = lazy(() => import('../subpages/cookie/Cookie'));
const ResumePage = lazy(() => import('../subpages/resume/ResumePage'));
const NotFound = lazy(() => import('./NotFound'));

// Standardized page transition
const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

const pageTransition = {
  duration: 0.35,
  ease: [0.25, 0.1, 0.25, 1], // cubic-bezier for smooth feel
};

const PageWrapper = ({ children }) => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={pageTransition}
  >
    {children}
  </motion.div>
);

// Loading fallback - dark/light aware
const LoadingFallback = () => {
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: isDark
        ? 'linear-gradient(135deg, #05010d 0%, #0a0118 50%, #0d0520 100%)'
        : 'linear-gradient(135deg, #f3e8f9 0%, #e8d5f5 100%)',
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        style={{ textAlign: 'center' }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            border: `3px solid ${isDark ? 'rgba(120, 70, 200, 0.2)' : 'rgba(77, 4, 160, 0.15)'}`,
            borderTopColor: isDark ? '#b07dff' : '#4D04A0',
            margin: '0 auto 16px',
          }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            color: isDark ? '#9a93a8' : '#4D04A0',
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}
        >
          Loading
        </motion.div>
      </motion.div>
    </div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><App /></PageWrapper>} />
        <Route path="/photo" element={<PageWrapper><PhotoHome /></PageWrapper>} />
        <Route path="/music" element={<PageWrapper><MusicHome /></PageWrapper>} />
        <Route path="/desktop" element={<PageWrapper><DesktopLauncher /></PageWrapper>} />
        <Route path="/datavis" element={<PageWrapper><DataVisHome /></PageWrapper>} />
        <Route path="/cookie" element={<PageWrapper><CookieClicker /></PageWrapper>} />
        <Route path="/resume" element={<PageWrapper><ResumePage /></PageWrapper>} />
        <Route path="/*" element={<PageWrapper><NotFound /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

const PageRoutes = () => {
  return (
    <ThemeProvider>
    <ErrorBoundary>
      <Router>
        <GlobalCursorGlow />
        <KonamiCode />
        <Suspense fallback={<LoadingFallback />}>
          <AnimatedRoutes />
        </Suspense>
      </Router>
    </ErrorBoundary>
    </ThemeProvider>
  );
};

export default PageRoutes;
