import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    // Replace with real authentication logic
    localStorage.setItem('admin', 'true');
    navigate('/');
  };

  return (
    <section className="auth">
      <div className="auth__card">
        <h1 className="auth__title">Welcome Back</h1>
        <p className="auth__subtitle">Sign in to continue exploring our latest collections.</p>

        {error && <p className="auth__error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username or Email</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=""
            />
          </div>

          <button type="submit" className="form__submit">
            Sign In
          </button>

          <p className="form__toggle">
            Don&apos;t have an account? <span onClick={() => navigate('/register')}>Sign up</span>
          </p>
        </form>
      </div>
    </section>
  );
};

export default LoginForm;
