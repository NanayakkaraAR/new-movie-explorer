import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here (e.g., API call or redirect)
    console.log('Logging in with:', email, password);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back</h2>
        <p>Log in to explore movies</p>

        <form onSubmit={handleSubmit} className="login-form">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

        <div className="form-options">
            <div>
            <label className="remember-me">
            <input type="checkbox" /> Remember me
            </label>
            </div>
            <a href="/forgot-password">Forgot Password?</a>
        </div>

          <button type="submit" className="login-button">
            Log In
          </button>
        </form>

        <div className="signup-link">
          Don't have an account? <a href="/register">Sign Up</a>
        </div>
      </div>
    </div>
  );
};

export default Login;