import React from 'react';
import './app.css';
import { BrowserRouter as Router, Routes, Route, Link}
    from 'react-router-dom';

import Home from './pages/home.jsx';
import Editions from './pages/editions.jsx';
import Artifacts from './pages/artifacts.jsx';

//nav bar!!
export default function App() {
  return (
    <Router>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/editions">Editions</Link>
        <Link to="/artifacts">Artifacts</Link>
      </nav>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editions" element={<Editions />} />
          <Route path="/artifacts" element={<Artifacts />} />
        </Routes>
      </main>
    </Router>
  );
}