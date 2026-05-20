import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { LayoutDashboard, Users, ClipboardCheck, LogOut } from 'lucide-react';

export default function Sidebar() {
  const { logout } = useAuth();

  // Definimos las rutas correspondientes a cada apartado según tu AppRoutes
  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Inicio / Resumen', path: '/dashboard' },
    { icon: <Users size={20} />, label: 'Gestión de Alumnos', path: '/alumnos' },
    { icon: <ClipboardCheck size={20} />, label: 'Control Conductual', path: '/conducta' },
  ];

  // Estilo base idéntico a tus botones originales
  const baseButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    width: '100%',
    padding: '12px 16px',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    textAlign: 'left',
    textDecoration: 'none', // Evita que se subraye el texto por ser un enlace
    boxSizing: 'border-box'
  };

  return (
    <div style={{
      width: '260px',
      backgroundColor: '#1a365d',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      boxShadow: '2px 0 5px rgba(0,0,0,0.05)'
    }}>
      
      {/* SECCIÓN BRANDING: Redirección directa al Home público de noticias */}
      <Link 
        to="/home" 
        style={{ 
          padding: '24px', 
          borderBottom: '1px solid #2b6cb0', 
          textAlign: 'center',
          textDecoration: 'none', 
          color: 'white',         
          display: 'block',       
          transition: 'background 0.2s ease',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
      >
        <div style={{ fontSize: '32px', marginBottom: '8px' }}>🏫</div>
        <h2 style={{ fontSize: '18px', fontWeight: '700', margin: 0, lineHeight: '1.2' }}>
          Colegio B. O'Higgins
        </h2>
        <span style={{ fontSize: '11px', color: '#90cdf4', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
          Panel Administrativo
        </span>
      </Link>

      {/* Menú de Navegación Dinámico con NavLink */}
      <nav style={{ flex: 1, padding: '20px 12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            style={({ isActive }) => ({
              ...baseButtonStyle,
              backgroundColor: isActive ? '#3182ce' : 'transparent',
              color: isActive ? 'white' : '#e2e8f0',
              fontWeight: isActive ? '600' : '500'
            })}
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Botón de Cerrar Sesión fijo abajo */}
      <div style={{ padding: '16px 12px', borderTop: '1px solid #2b6cb0' }}>
        <button
          onClick={logout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            width: '100%',
            padding: '12px 16px',
            backgroundColor: 'transparent',
            color: '#feb2b2',
            border: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(245, 101, 101, 0.1)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <LogOut size={20} />
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}