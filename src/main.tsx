import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Global protections to disable selection, copying, right-clicking, dragging, and inspect-shortcuts
if (typeof window !== 'undefined') {
  // Redirect HTTP to HTTPS in production
  if (window.location.protocol === 'http:' && window.location.hostname !== 'localhost' && !window.location.hostname.includes('127.0.0.1')) {
    window.location.replace('https://' + window.location.hostname + window.location.pathname + window.location.search + window.location.hash);
  }

  // Prevent context menu (right click)
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });

  // Prevent copying text
  document.addEventListener('copy', (e) => {
    e.preventDefault();
  });

  // Prevent cutting text
  document.addEventListener('cut', (e) => {
    e.preventDefault();
  });

  // Prevent dragging images or text elements (prevents copy by dragging)
  document.addEventListener('dragstart', (e) => {
    e.preventDefault();
  });

  // Prevent keyboard shortcuts for inspection, view source, and copying
  document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    
    // Disable Ctrl+C or Cmd+C (Copy), Ctrl+X or Cmd+X (Cut)
    if ((e.ctrlKey || e.metaKey) && (key === 'c' || key === 'x')) {
      e.preventDefault();
    }

    // Disable Ctrl+U or Cmd+U (View Source)
    if ((e.ctrlKey || e.metaKey) && key === 'u') {
      e.preventDefault();
    }

    // Disable Ctrl+S or Cmd+S (Save Page)
    if ((e.ctrlKey || e.metaKey) && key === 's') {
      e.preventDefault();
    }

    // Disable F12 (Inspect Element)
    if (e.key === 'F12') {
      e.preventDefault();
    }

    // Disable Ctrl+Shift+I / Cmd+Opt+I (Inspect), Ctrl+Shift+J (Console), Ctrl+Shift+C (Element inspector)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (key === 'i' || key === 'j' || key === 'c')) {
      e.preventDefault();
    }
  });
}

createRoot(document.getElementById('root')!).render(
 <StrictMode>
 <App />
 </StrictMode>,
);
