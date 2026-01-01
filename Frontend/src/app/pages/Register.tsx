import { useState } from 'react';
import { AuthAPI } from '../core/api/auth.api';
import '../../styles/auth.css';

type RegisterProps = {
  onSwitchToLogin: () => void;
};

export default function Register({ onSwitchToLogin }: RegisterProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await AuthAPI.register({ name, email, password });
      setSuccess('Account created successfully');
    } catch (err: any) {
      setError(err?.message || 'Registration failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">TM</div>

        <h1 className="auth-title">Create account</h1>
        <p className="auth-subtitle">
          Start managing your tasks today
        </p>

        <form onSubmit={handleSubmit}>
          <div className="auth-field">
            <label>Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="auth-field">
            <label>Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="auth-field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <div className="auth-error">{error}</div>}
          {success && <div style={{ color: 'green' }}>{success}</div>}

          <button className="auth-button">Sign up</button>
        </form>

        <div className="auth-footer">
          Already have an account?{' '}
          <span className="auth-link" onClick={onSwitchToLogin}>
            Sign in
          </span>
        </div>
      </div>
    </div>
  );
}
