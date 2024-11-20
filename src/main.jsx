import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Import your App component
import './index.css'; // Optional: Import your global styles

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);