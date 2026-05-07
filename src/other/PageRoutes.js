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

import LoadingSpinner from '../animations/LoadingSpinner';

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
        <Suspense fallback={<LoadingSpinner message="Loading" />}>
          <AnimatedRoutes />
        </Suspense>
      </Router>
    </ErrorBoundary>
    </ThemeProvider>
  );
};

export default PageRoutes;
