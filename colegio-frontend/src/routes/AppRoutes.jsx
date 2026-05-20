import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../views/auth/Login';
import Dashboard from '../views/dashboard/Dashboard';
import PrivateRoute from '../components/PrivateRoute';
import Layout from '../components/layout/Layout';
import Home from './Home';
import GestionAlumnos from '../views/alumnos/GestionAlumnos'; 
import ControlConductual from '../views/alumnos/ControlConductual'; 

export function AppRoutes() {
  return (
    <Routes>
      {/* 🌐 EL PORTAL PÚBLICO: Apuntando al componente que ahora sí se importa bien */}
      <Route path="/home" element={<Home />} />

      {/* 🔐 LOGIN */}
      <Route path="/login" element={<Login />} />

      {/* 🛡️ RUTAS PRIVADAS (Con Sidebar inyectado por Layout) */}
      <Route element={<PrivateRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/alumnos" element={<GestionAlumnos />} />
          <Route path="/conducta" element={<ControlConductual />} />
        </Route>
      </Route>

      {/* 🔀 DIRECCIONAMIENTO RAÍZ */}
      <Route path="/" element={<Navigate to="/home" replace />} />

      {/* 🔄 COMODÍN */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}