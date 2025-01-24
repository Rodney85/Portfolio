import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Contact } from './pages/Contact.tsx'
import Projects from './pages/Projects.tsx'
import About from './pages/About.tsx'
import { Layout } from './components/Layout.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/projects" element={<Layout><Projects /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)
