import React from 'react';
import ReactDOM from 'react-dom/client';
import PageRoutes from './other/PageRoutes';
import './index.css';
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PageRoutes>
      <App /> {/* The various pages will be displayed by the `Main` component. */}
    </PageRoutes>
  </React.StrictMode>
);


