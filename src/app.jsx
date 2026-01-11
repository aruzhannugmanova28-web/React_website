import React from 'react';
import './app.css';
import { HashRouter as Router, Routes, Route, Link}
    from 'react-router-dom';

import Home from './pages/home.jsx';
import Book from './pages/book.jsx';

export default function App() {
  return (
    <Router>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/book">Book</Link>
      </nav>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book" element={<Book />} />
        </Routes>
      </main>
    </Router>
  );
}