import React, { useState, useEffect } from 'react';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Books from './Books'
import CreateBook from './CreateBook';
import EditBook from './EditBook';

function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/" className="navbar-brand">React Flask CRUD</Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/books" className="nav-link">Books</Link>
              </li>
              <li className="nav-item">
                <Link to="/create" className="nav-link">Create Book</Link>
              </li>
            </ul>
          </div>
        </nav>

        <Routes>
          <Route path="/books" element={<Books />} /> 
          <Route path="/create" element={<CreateBook />} />
          <Route path="/edit/:id" element={<EditBook />} />
        </Routes>
      </div>
    </Router>
  );
}



export default App;