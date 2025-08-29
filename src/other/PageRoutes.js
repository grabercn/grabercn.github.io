import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import NotFound from './NotFound';
import App from '../App';
import PhotoHome from '../subpages/photography/PhotoHome';
import MusicHome from '../subpages/music/MusicHome';
import DesktopLauncher from '../subpages/desktop/DesktopLauncher';
import LanguageMapHome from '../subpages/photo-map/PhotoMapHome'
import UIHome from '../subpages/ui-class/UIHome';

const PageRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Fallback route for 404 */}
        <Route path='/' element={<App />} />
        <Route path="/photo" element={<PhotoHome />} />
        <Route path='/music' element={<MusicHome />} />
        <Route path='/desktop' element={<DesktopLauncher />} />
        <Route path='/map' element={<LanguageMapHome />} />
        <Route path='/ui' element={<UIHome />} />
        {/* Add more routes as needed */}

        {/* Catch-all route for 404 errors */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default PageRoutes;
