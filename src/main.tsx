import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { ConvexClientProvider } from './convex/ConvexClientProvider'
import { ErrorBoundary } from './components/ErrorBoundary'
import { Suspense } from 'react'

// Lazy load components
const App = React.lazy(() => import('./App'))
const Contact = React.lazy(() => import('./pages/Contact').then(module => ({ default: module.Contact })))
const Projects = React.lazy(() => import('./pages/Projects'))
const About = React.lazy(() => import('./pages/About'))
const Admin = React.lazy(() => import('./pages/Admin').then(module => ({ default: module.Admin })))

// Loading component
const LoadingFallback = () => (
  <div className="min-h-screen bg-[#171738] flex items-center justify-center">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-custom-beige"></div>
  </div>
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ConvexClientProvider>
        <Router>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/projects" element={<Layout><Projects /></Layout>} />
              <Route path="/about" element={<Layout><About /></Layout>} />
              <Route path="/contact" element={<Layout><Contact /></Layout>} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </Suspense>
        </Router>
      </ConvexClientProvider>
    </ErrorBoundary>
  </React.StrictMode>,
)
