import './index.css'

import React, { Suspense, lazy } from 'react'

import ReactDOM from 'react-dom/client'

// Lazy load the Options component
const Options = lazy(() => import('./Options'))

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <Suspense fallback={<div className="loading">Loading options...</div>}>
      <Options />
    </Suspense>
  </React.StrictMode>,
)
