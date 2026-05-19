// src/components/Sidebar.jsx
import { useAuth } from '../../hooks/useAuth';
import { LayoutDashboard, Users, ClipboardCheck, LogOut } from 'lucide-react';

export default function Sidebar() {
  const { logout } = useAuth();

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Inicio / Resumen', active: true },
    { icon: <Users size={20} />, label: 'Gestión de Alumnos', active: false },
    { icon: <ClipboardCheck size={20} />, label: 'Control Conductual', active: false },
  ];

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
      {/* Header del Sidebar: Branding */}
      <div style={{ padding: '24px', borderBottom: '1px solid #2b6cb0', textAlign: 'center' }}>
        <div style={{ fontSize: '32px', marginBottom: '8px' }}>🏫</div>
        <h2 style={{ fontSize: '18px', fontWeight: '700', margin: 0, lineHeight: '1.2' }}>
          Colegio B. O'Higgins
        </h2>
        <span style={{ fontSize: '11px', color: '#90cdf4', letterSpacing: '0.5px', uppercase: 'true' }}>
          Panel Administrativo
        </span>
      </div>

      {/* Menú de Navegación */}
      <nav style={{ flex: 1, padding: '20px 12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {menuItems.map((item, index) => (
          <button
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              width: '100%',
              padding: '12px 16px',
              backgroundColor: item.active ? '#3182ce' : 'transparent',
              color: item.active ? 'white' : '#e2e8f0',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: item.active ? '600' : '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              textAlign: 'left'
            }}
          >
            {item.icon}
            {item.label}
          </button>
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
          onMouseEnter={(e) => e.target.style.backgroundColor = '#rgba(245, 101, 101, 0.1)'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
        >
          <LogOut size={20} />
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}