import { MapPin, Phone, Mail, ShieldCheck, ExternalLink } from 'lucide-react';

export default function Footer() {
  const anioActual = new Date().getFullYear(); // Captura dinámicamente el año 2026

  return (
    <footer style={{
      backgroundColor: '#0f172a', // Gris oscuro/slate profundo
      color: '#94a3b8', // Texto secundario legible
      fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      padding: '40px',
      borderRadius: '16px',
      marginTop: '16px',
      boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.05)',
      display: 'flex',
      flexDirection: 'column',
      gap: '28px'
    }}>
      
      {/* SECCIÓN SUPERIOR: DATOS DE CONTACTO Y ENLACES */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '32px',
        alignItems: 'start'
      }}>
        
        {/* COLUMNA 1: IDENTIDAD */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3 style={{ 
            color: '#ffffff', 
            fontSize: '16px', 
            fontWeight: '700', 
            margin: 0,
            letterSpacing: '-0.3px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span>🏫</span> C.D. Bernardo O'Higgins
          </h3>
          <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.6', color: '#64748b' }}>
            Liderando la gestión educativa digital con excelencia, transparencia y compromiso metodológico con toda nuestra comunidad.
          </p>
        </div>

        {/* COLUMNA 2: CONTACTO DIRECTO */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h4 style={{ color: '#ffffff', fontSize: '14px', fontWeight: '700', margin: 0 }}>Contacto Institucional</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={14} style={{ color: '#3b82f6' }} /> Av. Concha y Toro, Puente Alto
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Phone size={14} style={{ color: '#16a34a' }} /> +56 2 2449 0000
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Mail size={14} style={{ color: '#38bdf8' }} /> contacto@cdbernardoohiggins.cl
            </span>
          </div>
        </div>

        {/* COLUMNA 3: PORTALES EXTERNOS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h4 style={{ color: '#ffffff', fontSize: '14px', fontWeight: '700', margin: 0 }}>Sistemas Vinculados</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
            <a href="https://www.mineduc.cl" target="_blank" rel="noreferrer" style={{ color: '#94a3b8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#ffffff'} onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}>
              Ministerio de Educación (MINEDUC) <ExternalLink size={12} />
            </a>
            <a href="https://www.demre.cl" target="_blank" rel="noreferrer" style={{ color: '#94a3b8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#ffffff'} onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}>
              Portal de Admisión DEMRE <ExternalLink size={12} />
            </a>
          </div>
        </div>

      </div>

      {/* DIVISOR INTERNO */}
      <hr style={{ border: 'none', borderTop: '1px solid #1e293b', margin: 0 }} />

      {/* SECCIÓN INFERIOR: COPYRIGHT Y POLÍTICAS */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '12px',
        color: '#64748b',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div>
          © {anioActual} Comunidad Digital Bernardo O'Higgins. Todos los derechos reservados.
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500' }}>
          <ShieldCheck size={14} style={{ color: '#16a34a' }} /> Puerto de Conexión Seguro Certificado
        </div>
      </div>

    </footer>
  );
}