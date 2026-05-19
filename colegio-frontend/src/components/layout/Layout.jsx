// src/components/Layout.jsx
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', overflow: 'hidden', fontFamily: 'system-ui, sans-serif' }}>
      {/* Componente Fijo Lateral */}
      <Sidebar />

      {/* Contenedor del contenido derecho (Navbar + Pantalla Activa) */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Componente Fijo Superior */}
        <Navbar />

        {/* Espacio de trabajo dinámico grisáceo con scroll independiente */}
        <main style={{ 
          flex: 1, 
          backgroundColor: '#f7fafc', 
          padding: '32px', 
          overflowY: 'auto',
          boxSizing: 'border-box'
        }}>
          {/* Aquí react-router-dom inyectará automáticamente el <Dashboard /> o cualquier otra vista */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}