import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotFound from './NotFound';
import App from '../App';

const PageRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Fallback route for 404 */}
        <Route path='/' element={<App/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default PageRoutes;
