import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock, ShieldAlert } from 'lucide-react';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const result = await login(email, password);
    
    if (result.success) {
      navigate('/dashboard', { replace: true });
    } else {
      setError(result.message);
      setIsSubmitting(false);
    }
  };

  return (
    /* Full-screen absolute wrapper with the dark background */
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: '#16171d', // Maintains the dark global background as a base
      display: 'flex',
      boxSizing: 'border-box'
    }}>
      
      {/* Full-height two-panel layout. 
        Instead of a fixed width (1126px), we now make the whole container 
        stretch from edge to edge to fill those grey gaps.
      */}
      <div style={{ 
        display: 'flex', 
        width: '100%', // Stretch to full width
        height: '100%', // Stretch to full height
        fontFamily: 'system-ui, sans-serif',
        boxSizing: 'border-box'
      }}>
        {/* Left Panel: College Branding (Stretches to fill left half) */}
        <div style={{ 
          flex: 1, // Stretches left half
          backgroundColor: '#1a365d', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center', // Center content horizontally within panel
          padding: '48px', 
          color: 'white',
          boxSizing: 'border-box'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏫</div>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', margin: '0 0 16px 0', lineHeight: '1.3', textAlign: 'center' }}>
            Colegio Bernardo O'Higgins
          </h1>
          <p style={{ fontSize: '18px', color: '#90cdf4', margin: 0, textAlign: 'center' }}>
            Plataforma Integral de Gestión Escolar y Control Conductual
          </p>
          <div style={{ marginTop: '40px', fontSize: '14px', color: '#cbd5e0', borderTop: '1px solid #2b6cb0', paddingTop: '20px', textAlign: 'center' }}>
            🔒 Acceso restringido exclusivamente a Personal Docente y Directivos Autorizados.
          </div>
        </div>

        {/* Right Panel: Form (Stretches to fill right half) */}
        <div style={{ 
          flex: 1, // Stretches right half
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center', // Center content horizontally within panel
          padding: '48px', 
          backgroundColor: 'white',
          boxSizing: 'border-box'
        }}>
          {/* Centered Form Wrapper to keep form inputs at original width */}
          <div style={{ width: '100%', maxWidth: '350px' }}> {/* Keep form compact */}
            <div style={{ marginBottom: '32px', textAlign: 'left' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#2d3748', margin: '0 0 8px 0' }}>Iniciar Sesión</h2>
              <p style={{ fontSize: '14px', color: '#718096', margin: 0 }}>Introduce tus credenciales institucionales</p>
            </div>

            {error && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', backgroundColor: '#fff5f5', borderLeft: '4px solid #e53e3e', borderRadius: '4px', color: '#c53030', fontSize: '14px', marginBottom: '20px' }}>
                <ShieldAlert size={18} /> <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#4a5568', marginBottom: '6px', textAlign: 'left' }}>Correo Institucional</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#a0aec0' }} />
                  <input 
                    type="email" 
                    placeholder="profesor@colegio.cl"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px 10px 40px', borderRadius: '6px', border: '1px solid #cbd5e0', fontSize: '14px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#4a5568', marginBottom: '6px', textAlign: 'left' }}>Contraseña</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#a0aec0' }} />
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px 10px 40px', borderRadius: '6px', border: '1px solid #cbd5e0', fontSize: '14px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  backgroundColor: isSubmitting ? '#a0aec0' : '#3182ce', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '6px', 
                  fontSize: '14px', 
                  fontWeight: 'bold', 
                  cursor: isSubmitting ? 'not-allowed' : 'pointer', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '8px', 
                  marginTop: '10px' 
                }}
              >
                <LogIn size={18} /> {isSubmitting ? 'Verificando...' : 'Ingresar al Sistema'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}