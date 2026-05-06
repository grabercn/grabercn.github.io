import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
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

const fade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 },
};

const PageRoutes = () => {
  return (
    <ThemeProvider>
    <ErrorBoundary>
      <Router>
        <GlobalCursorGlow />
        <KonamiCode />
        <Suspense
          fallback={
            <div
              style={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: '#f3e8f9',
              }}
            >
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 48, color: '#4D04A0' }} spin />}
                tip="Loading..."
              />
            </div>
          }
        >
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<motion.div {...fade}><App /></motion.div>} />
              <Route path="/photo" element={<motion.div {...fade}><PhotoHome /></motion.div>} />
              <Route path="/music" element={<motion.div {...fade}><MusicHome /></motion.div>} />
              <Route path="/desktop" element={<motion.div {...fade}><DesktopLauncher /></motion.div>} />
              <Route path="/datavis" element={<motion.div {...fade}><DataVisHome /></motion.div>} />
              <Route path="/cookie" element={<motion.div {...fade}><CookieClicker /></motion.div>} />
              <Route path="/resume" element={<motion.div {...fade}><ResumePage /></motion.div>} />
              <Route path="/*" element={<motion.div {...fade}><NotFound /></motion.div>} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </Router>
    </ErrorBoundary>
    </ThemeProvider>
  );
};

export default PageRoutes;
