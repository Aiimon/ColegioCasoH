import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function PrivateRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', fontFamily: 'system-ui' }}>
        <p>Cargando plataforma...</p>
      </div>
    );
  }

  // Si está logeado, da paso libre. Si no, redirige al login.
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}