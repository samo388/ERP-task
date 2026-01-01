import { useEffect, useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { TokenService } from './core/auth/token';

type AuthView = 'login' | 'register';

export default function App() {
  const [authView, setAuthView] = useState<AuthView>('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(TokenService.isAuthenticated());
  }, []);

  if (!isAuthenticated) {
    return authView === 'login' ? (
      <Login onSwitchToRegister={() => setAuthView('register')} />
    ) : (
      <Register onSwitchToLogin={() => setAuthView('login')} />
    );
  }

  return <Dashboard />;
}
