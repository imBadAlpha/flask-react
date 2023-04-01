import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Books from './Books'
import CreateBook from './CreateBook';
import EditBook from './EditBook';
import Register from './auth/Register';
import Login from './auth/Login';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // check if user is logged in
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  function handleLogout() {
    // clear token and set logged out state
    localStorage.removeItem('token');
    setLoggedIn(false);
  }
  

  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/" className="navbar-brand">Public Library Registry</Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              
              {isLoggedIn ? (
                <>
                  <li className="nav-item">
                    <Link to="/logout" className="nav-link">Logout</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/books" className="nav-link">Books</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/create" className="nav-link">Create Book</Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="/register" className="nav-link">Register</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">Login</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Navigate to="/books" />} />
          {isLoggedIn ? (
            <>
              <Route path="/edit/:id" element={<EditBook />} />
              <Route path="/books" element={<Books />} />
              <Route path="/create" element={<CreateBook />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
          <Route path="/register" element={<Register />} />
          {!isLoggedIn ? (
            <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
          ) : (
            <Route path="*" element={<Navigate to="/" />} />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
