// src/routes/AppRoutes.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../views/auth/Login';
import Dashboard from '../views/dashboard/Dashboard';
import PrivateRoute from '../components/PrivateRoute';
import Layout from '../components/layout/Layout'; // Asegúrate de que la ruta apunte a tu Layout real

export function AppRoutes() {
  return (
    <Routes>
      {/* Ruta Pública: Login */}
      <Route path="/login" element={<Login />} />

      {/* Rutas Privadas Protegidas bajo el Guardián */}
      <Route element={<PrivateRoute />}>
        {/* El Layout envuelve las pantallas para mantener fijo el Sidebar y Navbar */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Aquí irás agregando tus próximas vistas, por ejemplo:
          <Route path="/alumnos" element={<AlumnosLista />} />
          <Route path="/conducta" element={<RegistroConducta />} />
          */}
        </Route>
      </Route>

      {/* Redirección por defecto si escriben cualquier otra ruta en la URL */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}