import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar'; 

export default function Layout() {
  return (
    <div style={{ 
      display: 'flex', 
      width: '100vw', 
      minHeight: '100vh', 
      backgroundColor: '#f7fafc', 
      overflow: 'hidden',
      fontFamily: 'system-ui, sans-serif'
    }}>
      
      {/* 1. Sidebar Azul a la izquierda con ancho fijo */}
      <div style={{ width: '260px', flexShrink: 0 }}>
        <Sidebar />
      </div>

      {/* 2. Contenedor Dinámico que toma todo el resto de la pantalla con scroll propio */}
      <main style={{ 
        flexGrow: 1, 
        height: '100vh', 
        overflowY: 'auto', 
        backgroundColor: '#f7fafc',
        boxSizing: 'border-box'
      }}>
        {/* Aquí react-router-dom inyectará el Dashboard, Gestión de Alumnos o Control Conductual */}
        <Outlet />
      </main>

    </div>
  );
}