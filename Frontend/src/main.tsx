import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import { Toaster } from 'react-hot-toast';
import "./styles/index.css";


ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
).render(
  <React.StrictMode>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
      }}
    />
  </React.StrictMode>
);
