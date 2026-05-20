import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 🛠️ INTEGRADO: Para poder saltar al Login/Dashboard
import { useAuth } from '../hooks/useAuth';   // 🛠️ INTEGRADO: Para saber si el usuario ya está logueado
import { 
  Newspaper, 
  Calendar,
  BookOpen, 
  Award, 
  Megaphone, 
  ArrowRight, 
  Clock, 
  MapPin,
  Lock 
} from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth(); // Detecta si hay una sesión docente activa

  // Simulación de las últimas noticias del colegio
  const [noticias] = useState([
    {
      id: 1,
      tag: "ACADÉMICO",
      color: "#3182ce",
      titulo: "¡Todo un éxito las actividades de la Semana del Libro 2026!",
      extracto: "Nuestra comunidad educativa participó activamente en los talleres literarios, concursos de microcuentos y representaciones teatrales.",
      fecha: "15 de Mayo, 2026"
    },
    {
      id: 2,
      tag: "INFRAESTRUCTURA",
      color: "#319795",
      titulo: "Avances en la remodelación de las zonas deportivas",
      extracto: "Las obras del nuevo techado multicancha entran en su fase final. Se proyecta su inauguración para la primera semana del próximo mes.",
      fecha: "12 de Mayo, 2026"
    },
    {
      id: 3,
      tag: "COMUNIDAD",
      color: "#b7791f",
      titulo: "Reunión General de Apoderados del Primer Trimestre",
      extracto: "Agradecemos la alta convocatoria y participación en los talleres de convivencia escolar dictados por nuestro equipo de orientación.",
      fecha: "08 de Mayo, 2026"
    }
  ]);

  // Simulación de circulares o avisos urgentes (Anuncios fijos)
  const [anuncios] = useState([
    { id: 1, texto: "🚨 Recordatorio: Suspensión de talleres extraprogramáticos por consejo técnico este viernes.", tipo: "urgente" },
    { id: 2, texto: "📌 Proceso de becas institucionales segundo semestre: Formularios disponibles en secretaría.", tipo: "info" }
  ]);

  // Simulación del calendario de eventos mensuales
  const [eventos] = useState([
    { id: 1, dia: "22", mes: "MAY", hora: "14:30", titulo: "Feria de Ciencias y Tecnología 2026", lugar: "Gimnasio Principal" },
    { id: 2, dia: "29", mes: "MAY", hora: "09:00", titulo: "Ensayo General PSU / PAES Escolar", lugar: "Salas de 3° y 4° Medio" },
    { id: 3, dia: "05", mes: "JUN", hora: "11:30", titulo: "Día Mundial del Medio Ambiente: Plantación Escolar", lugar: "Patios Interiores" }
  ]);

  // Maneja la redirección inteligente al panel administrativo
  const handleAccesoIntranet = () => {
    if (user) {
      navigate('/dashboard'); // Si ya inició sesión, entra directo
    } else {
      navigate('/login'); // Si no, va al login primero
    }
  };

  return (
    <div style={{ 
      padding: '30px', 
      width: '100%', 
      boxSizing: 'border-box', 
      fontFamily: 'system-ui, sans-serif',
      backgroundColor: '#f7fafc',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      gap: '30px'
    }}>
      
      {/* 1. SECCIÓN HERO: BIENVENIDA AL PORTAL CON ACCESO A INTRANET */}
      <div style={{ 
        backgroundColor: '#1a365d', 
        backgroundImage: 'linear-gradient(135deg, #1a365d 0%, #2a4365 100%)',
        color: 'white', 
        padding: '40px', 
        borderRadius: '12px',
        boxShadow: '0 4px 15px rgba(26, 54, 93, 0.15)',
        display: 'flex',
        justifyContent: 'space-between', // Separa el texto del botón de entrada
        alignItems: 'center',
        gap: '20px'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '36px' }}>🏫</span>
            <h1 style={{ fontSize: '32px', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>
              Comunidad Digital Bernardo O'Higgins
            </h1>
          </div>
          <p style={{ margin: 0, color: '#90cdf4', fontSize: '15px', fontWeight: '500', maxWidth: '600px', lineHeight: '1.5' }}>
            Bienvenido al canal oficial de comunicación para alumnos, apoderados y docentes. Infórmate sobre las últimas novedades de nuestro establecimiento.
          </p>
        </div>

        {/* 🔐 BOTÓN DE ACCESO PROFESORES / ADMIN */}
        <button
          onClick={handleAccesoIntranet}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            padding: '12px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: '600',
            transition: 'all 0.2s ease',
            whiteSpace: 'nowrap'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'white';
            e.currentTarget.style.color = '#1a365d';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.color = 'white';
          }}
        >
          <Lock size={15} /> Intranet Docente
        </button>
      </div>

      {/* 2. BARRA DE ANUNCIOS Y CIRCULARES DE ÚLTIMO MINUTO */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {anuncios.map((anuncio) => (
          <div key={anuncio.id} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px', 
            backgroundColor: anuncio.tipo === 'urgente' ? '#fff5f5' : '#ebf8ff', 
            borderLeft: `4px solid ${anuncio.tipo === 'urgente' ? '#e53e3e' : '#3182ce'}`, 
            padding: '14px 20px', 
            borderRadius: '6px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.01)'
          }}>
            <Megaphone size={18} style={{ color: anuncio.tipo === 'urgente' ? '#e53e3e' : '#3182ce', flexShrink: 0 }} />
            <p style={{ margin: 0, fontSize: '13px', color: anuncio.tipo === 'urgente' ? '#742a2a' : '#2b6cb0', fontWeight: '600' }}>
              {anuncio.texto}
            </p>
          </div>
        ))}
      </div>

      {/* 3. GRILLA PRINCIPAL: NOTICIAS VS CALENDARIO */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.6fr', gap: '30px', alignItems: 'start' }}>
        
        {/* COLUMNA IZQUIERDA: CRÓNICAS Y NOTICIAS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#2d3748', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Newspaper size={20} style={{ color: '#3182ce' }} /> Actualidad y Crónicas Escolares
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {noticias.map((noticia) => (
              <article key={noticia.id} style={{ 
                backgroundColor: 'white', 
                borderRadius: '8px', 
                border: '1px solid #edf2f7', 
                boxShadow: '0 4px 6px rgba(0,0,0,0.02)',
                overflow: 'hidden',
                transition: 'transform 0.2s',
                cursor: 'pointer'
              }}>
                <div style={{ padding: '24px' }}>
                  <span style={{ 
                    backgroundColor: noticia.color, 
                    color: 'white', 
                    padding: '3px 10px', 
                    borderRadius: '12px', 
                    fontSize: '10px', 
                    fontWeight: 'bold',
                    letterSpacing: '0.5px'
                  }}>
                    {noticia.tag}
                  </span>
                  
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1a365d', margin: '12px 0 8px 0', lineHeight: '1.3' }}>
                    {noticia.titulo}
                  </h3>
                  
                  <p style={{ fontSize: '13px', color: '#4a5568', margin: '0 0 16px 0', lineHeight: '1.5' }}>
                    {noticia.extracto}
                  </p>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #edf2f7', paddingTop: '12px', fontSize: '12px', color: '#a0aec0' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={13} /> {noticia.fecha}
                    </span>
                    <span style={{ color: '#3182ce', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      Leer más <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* COLUMNA DERECHA: CALENDARIO DE EVENTOS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#2d3748', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar size={20} style={{ color: '#38a169' }} /> Próximos Eventos
          </h2>

          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #edf2f7', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {eventos.map((evento) => (
              <div key={evento.id} style={{ display: 'flex', gap: '14px', alignItems: 'center', paddingBottom: '14px', borderBottom: evento.id !== 3 ? '1px solid #edf2f7' : 'none' }}>
                {/* Cuadro del día/mes estilo agenda */}
                <div style={{ 
                  backgroundColor: '#f0fff4', 
                  border: '1px solid #c6f6d5', 
                  borderRadius: '6px', 
                  width: '50px', 
                  height: '50px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <span style={{ fontSize: '16px', fontWeight: '800', color: '#22543d', lineHeight: '1' }}>{evento.dia}</span>
                  <span style={{ fontSize: '9px', fontWeight: '700', color: '#38a169', marginTop: '2px' }}>{evento.mes}</span>
                </div>

                {/* Detalles del evento */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <h4 style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: '#2d3748', lineHeight: '1.3' }}>
                    {evento.titulo}
                  </h4>
                  <div style={{ display: 'flex', gap: '10px', fontSize: '11px', color: '#718096', marginTop: '2px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><Clock size={12} /> {evento.hora}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><MapPin size={12} /> {evento.lugar}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ACCESOS DIRECTOS ÚTILES PARA ALUMNOS */}
          <div style={{ 
            backgroundColor: 'white', 
            padding: '20px', 
            borderRadius: '8px', 
            border: '1px solid #edf2f7', 
            boxShadow: '0 4px 6px rgba(0,0,0,0.02)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#4a5568', paddingBottom: '8px', borderBottom: '1px solid #edf2f7' }}>
              Enlaces de Utilidad
            </h3>
            <a href="#reglamento" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#4a5568', textDecoration: 'none', fontWeight: '500' }}>
              <BookOpen size={14} style={{ color: '#3182ce' }} /> Reglamento Interno de Convivencia
            </a>
            <a href="#proyecto" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#4a5568', textDecoration: 'none', fontWeight: '500' }}>
              <Award size={14} style={{ color: '#d69e2e' }} /> Proyecto Educativo Institucional (PEI)
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}