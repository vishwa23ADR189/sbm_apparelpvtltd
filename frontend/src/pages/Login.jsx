import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || (isSignup && !name)) {
      setMessage('Please fill all required fields');
      return;
    }

    // Admin login (for backward compatibility)
    if (!isSignup && email === 'admin@shop.com' && password === 'admin123') {
      localStorage.clear();
      localStorage.setItem('admin', 'true');
      setMessage('Admin login successful! Redirecting...');
      setTimeout(() => navigate('/'), 1500);
      return;
    }

    try {
      const endpoint = isSignup ? '/api/users/signup' : '/api/users/login';
      const res = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');

      // Extract user name from response
      const userName = isSignup ? name : (data.user?.name || email.split('@')[0]);
      const userToken = data.token || 'user-token';

      // Use AuthContext to store user data
      login(userName, userToken, email);

      // Also store in localStorage for Cart functionality
      localStorage.setItem('user', JSON.stringify({ name: userName, email }));

      setMessage(`${data.message} Redirecting...`);
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setMessage(`${err.message}`);
    }
  };

  return (
    <section className="auth">
      <div className="auth__card">
        <h1 className="auth__title">{isSignup ? 'Create Your Account' : 'Welcome Back'}</h1>
        <p className="auth__subtitle">
          {isSignup
            ? 'Create an account to unlock exclusive offers and save your favorites.'
            : 'Sign in to continue exploring our latest collections.'}
        </p>

        {message && <p className="auth__error">{message}</p>}

        <form onSubmit={handleSubmit}>
          {isSignup && (
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="form__submit">
            {isSignup ? 'Create Account' : 'Sign In'}
          </button>

          <p className="form__toggle">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
            <span onClick={() => setIsSignup((prev) => !prev)}>
              {isSignup ? 'Sign In' : 'Sign Up'}
            </span>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
