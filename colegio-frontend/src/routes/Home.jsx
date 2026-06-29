import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useAuth } from '../hooks/useAuth';
import Footer from '../components/layout/Footer';
import { 
  Newspaper, 
  Calendar,
  BookOpen, 
  Award, 
  Megaphone, 
  ArrowRight, 
  Clock, 
  MapPin,
  Lock,
  GraduationCap,
  Users,
  Building2,
  ExternalLink
} from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth(); 

  // Noticia Escolar Sincronizada 2026
  const [noticias] = useState([
    {
      id: 1,
      tag: "ACADÉMICO",
      color: "#2563eb",
      titulo: "¡Todo un éxito las actividades de la Semana del Libro 2026!",
      extracto: "Nuestra comunidad educativa participó activamente en los talleres literarios, concursos de microcuentos y representaciones teatrales corporativas.",
      fecha: "15 de Mayo, 2026"
    },
    {
      id: 2,
      tag: "INFRAESTRUCTURA",
      color: "#0d9488",
      titulo: "Avances en la remodelación de las zonas deportivas y recreacionales",
      extracto: "Las obras del nuevo techado multicancha entran en su fase final. Se proyecta su inauguración oficial para la primera semana del próximo mes.",
      fecha: "12 de Mayo, 2026"
    },
    {
      id: 3,
      tag: "COMUNIDAD",
      color: "#d97706",
      titulo: "Reunión General de Apoderados del Primer Trimestre",
      extracto: "Agradecemos la alta convocatoria y participación en los talleres de convivencia escolar dictados por nuestro departamento de orientación.",
      fecha: "08 de Mayo, 2026"
    }
  ]);

  const [anuncios] = useState([
    { id: 1, texto: "🚨 Recordatorio: Suspensión de talleres extraprogramáticos por consejo técnico este viernes.", tipo: "urgente" },
    { id: 2, texto: "📌 Proceso de becas institucionales segundo semestre: Formularios de postulación disponibles en secretaría.", tipo: "info" }
  ]);

  const [eventos] = useState([
    { id: 1, dia: "22", mes: "MAY", hora: "14:30", titulo: "Feria de Ciencias y Tecnología 2026", lugar: "Gimnasio Principal" },
    { id: 2, dia: "29", mes: "MAY", hora: "09:00", titulo: "Ensayo General PSU / PAES Escolar", lugar: "Salas de 3° y 4° Medio" },
    { id: 3, dia: "05", mes: "JUN", hora: "11:30", titulo: "Día Mundial del Medio Ambiente: Plantación Colectiva", lugar: "Patios Interiores" }
  ]);

  const handleAccesoIntranet = () => {
    if (user) {
      navigate('/dashboard'); 
    } else {
      navigate('/login'); 
    }
  };

  return (
    <div style={{ 
      padding: '40px', 
      width: '100%', 
      boxSizing: 'border-box', 
      fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      gap: '32px'
    }}>
      
      {/* 1. SECCIÓN HERO DE BIENVENIDA */}
      <div style={{ 
        backgroundColor: '#1e3a8a', 
        backgroundImage: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
        color: 'white', 
        padding: '48px 54px', 
        borderRadius: '16px',
        boxShadow: '0 10px 25px -5px rgba(30, 58, 138, 0.2)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '30px'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{ fontSize: '40px' }}>🏫</span>
            <h1 style={{ fontSize: '34px', fontWeight: '800', margin: 0, letterSpacing: '-0.75px', lineHeight: '1.2' }}>
              Comunidad Digital Bernardo O'Higgins
            </h1>
          </div>
          <p style={{ margin: 0, color: '#93c5fd', fontSize: '16px', fontWeight: '500', maxWidth: '700px', lineHeight: '1.6' }}>
            Establecimiento Educacional • Portal oficial de comunicación académica para alumnos, apoderados y el cuerpo docente del establecimiento.
          </p>
        </div>

        <button
          onClick={handleAccesoIntranet}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: '#ffffff',
            color: '#1e3a8a',
            border: 'none',
            padding: '14px 24px',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '700',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            transition: 'all 0.2s ease',
            whiteSpace: 'nowrap'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f1f5f9';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#ffffff';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <Lock size={16} /> Acceder a Intranet Docente
        </button>
      </div>

      {/* 2. TARJETAS DE MÉTRICAS INSTITUCIONALES (Aporta peso visual corporativo) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
        {[
          { icon: <GraduationCap size={24} />, valor: "94.5%", desc: "Rendimiento General 2026", bg: "#eff6ff", color: "#1e40af" },
          { icon: <Users size={24} />, valor: "1,240", desc: "Estudiantes Matriculados", bg: "#f0fdf4", color: "#166534" },
          { icon: <Building2 size={24} />, valor: "36", desc: "Aulas de Aprendizaje Activo", bg: "#f0fdfa", color: "#0f766e" }
        ].map((metrica, i) => (
          <div key={i} style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: metrica.bg, color: metrica.color }}>{metrica.icon}</div>
            <div>
              <div style={{ fontSize: '22px', fontWeight: '800', color: '#0f172a' }}>{metrica.valor}</div>
              <div style={{ fontSize: '13px', fontWeight: '500', color: '#64748b', marginTop: '2px' }}>{metrica.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. BARRA DE ANUNCIOS CRÍTICOS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {anuncios.map((anuncio) => (
          <div key={anuncio.id} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '14px', 
            backgroundColor: anuncio.tipo === 'urgente' ? '#fef2f2' : '#f0f9ff', 
            borderLeft: `5px solid ${anuncio.tipo === 'urgente' ? '#ef4444' : '#3b82f6'}`, 
            padding: '16px 24px', 
            borderRadius: '10px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
          }}>
            <Megaphone size={20} style={{ color: anuncio.tipo === 'urgente' ? '#ef4444' : '#3b82f6', flexShrink: 0 }} />
            <p style={{ margin: 0, fontSize: '14px', color: anuncio.tipo === 'urgente' ? '#991b1b' : '#1e3a8a', fontWeight: '600', lineHeight: '1.4' }}>
              {anuncio.texto}
            </p>
          </div>
        ))}
      </div>

      {/* 4. GRILLA INFORMATIVA: ACTUALIDAD VS AGENDA */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.7fr', gap: '32px', alignItems: 'start' }}>
        
        {/* COLUMNA NOTICIAS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#1e293b', margin: 0, display: 'flex', alignItems: 'center', gap: '10px', letterSpacing: '-0.3px' }}>
            <Newspaper size={22} style={{ color: '#2563eb' }} /> Crónicas y Actualidad Escolar
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {noticias.map((noticia) => (
              <article 
                key={noticia.id} 
                style={{ 
                  backgroundColor: 'white', 
                  borderRadius: '12px', 
                  border: '1px solid #e2e8f0', 
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                  overflow: 'hidden',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05)';
                }}
              >
                <div style={{ padding: '28px' }}>
                  <span style={{ 
                    backgroundColor: noticia.color, 
                    color: 'white', 
                    padding: '4px 12px', 
                    borderRadius: '20px', 
                    fontSize: '11px', 
                    fontWeight: '700',
                    letterSpacing: '0.5px'
                  }}>
                    {noticia.tag}
                  </span>
                  
                  <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#1e3a8a', margin: '14px 0 10px 0', lineHeight: '1.4', letterSpacing: '-0.3px' }}>
                    {noticia.titulo}
                  </h3>
                  
                  <p style={{ fontSize: '14px', color: '#475569', margin: '0 0 20px 0', lineHeight: '1.6', fontWeight: '500' }}>
                    {noticia.extracto}
                  </p>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '16px', fontSize: '13px', color: '#94a3b8', fontWeight: '500' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Clock size={14} /> {noticia.fecha}
                    </span>
                    <span style={{ color: '#2563eb', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      Leer artículo completo <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* COLUMNA AGENDA Y ENLACES */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          
          {/* PRÓXIMOS EVENTOS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#1e293b', margin: 0, display: 'flex', alignItems: 'center', gap: '10px', letterSpacing: '-0.3px' }}>
              <Calendar size={22} style={{ color: '#16a34a' }} /> Agenda Mensual
            </h2>

            <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {eventos.map((evento, i) => (
                <div key={evento.id} style={{ display: 'flex', gap: '16px', alignItems: 'center', paddingBottom: i !== eventos.length - 1 ? '16px' : '0', borderBottom: i !== eventos.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                  {/* Bloque tipo Calendario Escolar */}
                  <div style={{ 
                    backgroundColor: '#f0fdf4', 
                    border: '1px solid #bbf7d0', 
                    borderRadius: '8px', 
                    width: '54px', 
                    height: '54px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <span style={{ fontSize: '18px', fontWeight: '800', color: '#166534', lineHeight: '1' }}>{evento.dia}</span>
                    <span style={{ fontSize: '10px', fontWeight: '700', color: '#16a34a', marginTop: '3px', letterSpacing: '0.3px' }}>{evento.mes}</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#1e293b', lineHeight: '1.4' }}>
                      {evento.titulo}
                    </h4>
                    <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: '#64748b', fontWeight: '500' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={13} /> {evento.hora}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={13} /> {evento.lugar}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DOCUMENTACIÓN E INSTANCIAS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ 
              backgroundColor: '#ffffff', 
              padding: '24px', 
              borderRadius: '12px', 
              border: '1px solid #e2e8f0', 
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px'
            }}>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#334155', paddingBottom: '10px', borderBottom: '1px solid #f1f5f9' }}>
                Documentos Institucionales
              </h3>
              
              <a href="#reglamento" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px', color: '#475569', textDecoration: 'none', fontWeight: '600', padding: '8px 0', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#2563eb'} onMouseLeave={e => e.currentTarget.style.color = '#475569'}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <BookOpen size={16} style={{ color: '#2563eb' }} /> Reglamento Interno y Convivencia
                </div>
                <ExternalLink size={14} style={{ color: '#94a3b8' }} />
              </a>

              <a href="#proyecto" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px', color: '#475569', textDecoration: 'none', fontWeight: '600', padding: '8px 0', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#d97706'} onMouseLeave={e => e.currentTarget.style.color = '#475569'}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Award size={16} style={{ color: '#d97706' }} /> Proyecto Educativo (PEI)
                </div>
                <ExternalLink size={14} style={{ color: '#94a3b8' }} />
              </a>
            </div>
          </div>

        </div>

      </div>
      <Footer />
    </div>
  );
}