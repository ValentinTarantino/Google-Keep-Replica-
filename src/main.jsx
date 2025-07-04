import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App.jsx'
import './i18n';
import { SettingsProvider } from './context/SettingsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <SettingsProvider> 
      <App />            
    </SettingsProvider>
  </React.StrictMode>
);
