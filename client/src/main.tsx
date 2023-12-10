import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { DiagnosesProvider } from './context/DiagnosesContext.js';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DiagnosesProvider>
      <App />
    </DiagnosesProvider>
  </React.StrictMode>
);
