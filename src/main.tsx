import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import './index.css'
import { ConvexClientProvider } from './convex/ConvexClientProvider'

// Simple loading component
const LoadingSpinner = () => (
  <div className="min-h-screen bg-[#171738] flex items-center justify-center">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-custom-beige"></div>
  </div>
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConvexClientProvider>
      <Router>
        <Suspense fallback={<LoadingSpinner />}>
          <App />
        </Suspense>
      </Router>
    </ConvexClientProvider>
  </React.StrictMode>,
)
