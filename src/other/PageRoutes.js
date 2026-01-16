import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import NotFound from './NotFound';
import App from '../App';
import PhotoHome from '../subpages/photography/PhotoHome';
import MusicHome from '../subpages/music/MusicHome';
import DesktopLauncher from '../subpages/desktop/DesktopLauncher';
import CookieClicker from '../subpages/cookie/Cookie';
import DataVisHome from '../subpages/data-vis/DataVisHome';
import CustomCursor from './CustomCursor';

const PageRoutes = () => {
  return (
    <Router>
      <CustomCursor />
      <Routes>
        {/* Fallback route for 404 */}
        <Route path='/' element={<App />} />
        <Route path="/photo" element={<PhotoHome />} />
        <Route path='/music' element={<MusicHome />} />
        <Route path='/desktop' element={<DesktopLauncher />} />
        <Route path='/datavis' element={<DataVisHome />} />
        <Route path='/cookie' element={<CookieClicker />} />
        {/* Add more routes as needed */}

        {/* Catch-all route for 404 errors */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default PageRoutes;
