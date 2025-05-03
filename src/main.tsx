
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { optimizePerformance } from './utils/optimizePerformance.ts'
import { removeBrandingTag } from './utils/removeBranding.ts'

// Run performance optimizations as early as possible
optimizePerformance();
// Remove any branding tags if needed
removeBrandingTag();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
