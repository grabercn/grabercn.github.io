import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import NotFound from './NotFound';
import App from '../App';
import PhotoHome from '../photography/PhotoHome';

const PageRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Fallback route for 404 */}
        <Route path='/' exact element={<App />} />
        <Route path="/photo" exact element={<PhotoHome />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default PageRoutes;
