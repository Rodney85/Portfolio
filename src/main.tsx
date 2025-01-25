import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Contact } from './pages/Contact'
import Projects from './pages/Projects'
import About from './pages/About'
import { Admin } from './pages/Admin'
import { Layout } from './components/Layout'
import { ConvexClientProvider } from './convex/ConvexClientProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConvexClientProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/projects" element={<Layout><Projects /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </ConvexClientProvider>
  </React.StrictMode>,
)
