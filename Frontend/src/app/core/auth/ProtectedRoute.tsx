import { Navigate } from 'react-router-dom';
import { TokenService } from './token';
import { JSX } from 'react';

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const isAuthenticated = TokenService.isAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
