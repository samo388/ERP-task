import { useState } from 'react';
import { AuthAPI } from '../core/api/auth.api';
import { TokenService } from '../core/auth/token';
import '../../styles/auth.css';

type LoginProps = {
  onSwitchToRegister: () => void;
};

export default function Login({ onSwitchToRegister }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await AuthAPI.login({ email, password });
      TokenService.save(res.access_token);
      window.location.reload();
    } catch (err: any) {
      setError(err?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">TM</div>

        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-subtitle">
          Sign in to your account to continue
        </p>

        <form onSubmit={handleSubmit}>
          <div className="auth-field">
            <label>Email</label>
            <input
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="auth-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <div className="auth-error">{error}</div>}

          <div className="auth-actions">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <span className="auth-link">Forgot password?</span>
          </div>

          <button className="auth-button" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="auth-footer">
          Don’t have an account?{' '}
          <span className="auth-link" onClick={onSwitchToRegister}>
            Sign up
          </span>
        </div>
      </div>
    </div>
  );
}
