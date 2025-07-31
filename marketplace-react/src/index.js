import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MarketplaceProvider } from './components/JavaScript/MarketplaceContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <MarketplaceProvider>
      <App />
    </MarketplaceProvider>
  </React.StrictMode>
);

// Si quieres medir el rendimiento de la app
reportWebVitals(console.log);
console.log("[DEBUG] App renderizada");


