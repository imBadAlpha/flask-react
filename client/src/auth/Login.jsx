import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Login({ setLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !password) {
      // Display error message
      setError('Please enter your email and password.');
      return;
    }
    // Make API call to login endpoint
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    .then(response => {
      if (response.ok) {
        // Save JWT token to localStorage
        localStorage.setItem('token', response.token);
        // Navigate to home page
        navigate('/');
      } else {
        // Display error message
        setError('Invalid email or password.');
      }
    })
    .catch(error => {
      console.error(error);
      // Display error message
      setError('An error occurred. Please try again later.');
    });
  };
  
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

export default Login