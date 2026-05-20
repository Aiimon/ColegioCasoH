import { useAuth } from '../../hooks/useAuth';
import { User, Bell } from 'lucide-react';

export default function Navbar() {
  const { user } = useAuth();

  return (
    <header style={{
      height: '70px',
      backgroundColor: 'white',
      borderBottom: '1px solid #e2e8f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 32px',
      boxSizing: 'border-box'
    }}>
      {/* Saludo Izquierdo */}
      <div>
        <h3 style={{ margin: 0, fontSize: '16px', color: '#4a5568', fontWeight: '500' }}>
          ¡Hola, <span style={{ fontWeight: '700', color: '#2d3748' }}>{user?.name || 'Profesor'}</span>! 👋
        </h3>
      </div>

      {/* Panel Derecha: Notificaciones y Perfil */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        {/* Botón de Notificaciones Ficticio */}
        <button style={{ background: 'none', border: 'none', color: '#a0aec0', cursor: 'pointer', position: 'relative' }}>
          <Bell size={20} />
          <span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', backgroundColor: '#e53e3e', borderRadius: '50%' }}></span>
        </button>

        {/* Badge del Usuario */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '13px', fontWeight: '600', color: '#2d3748' }}>{user?.email}</div>
            <div style={{ fontSize: '11px', color: '#3182ce', fontWeight: '700', textTransform: 'uppercase' }}>
              {user?.role === 'docente' ? 'Docente Autorizado' : user?.role}
            </div>
          </div>
          <div style={{
            width: '40px',
            height: '40px',
            backgroundColor: '#ebf8ff',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#3182ce',
            border: '1px solid #bee3f8'
          }}>
            <User size={20} />
          </div>
        </div>
      </div>
    </header>
  );
}