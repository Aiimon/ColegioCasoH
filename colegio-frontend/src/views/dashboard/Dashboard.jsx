import { useState, useEffect } from 'react';
import { academyService, conductService } from '../../services/api';
import { useNavigate } from 'react-router-dom'; // 🛠️ CORRECTO: Hook oficial para navegación programática
import { User, ClipboardList, AlertCircle, RefreshCw, ShieldCheck } from 'lucide-react';

export default function Dashboard({ user }) {
  const navigate = useNavigate(); // 🔀 Inicialización del enrutador dinámico
  const [alumnos, setAlumnos] = useState([]);
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null);
  const [hojaVida, setHojaVida] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Control de contingencia para el perfil del profesor logueado
  const nombreProfesor = user?.nombre || user?.name || user?.username || "Profesor O'Higgins";
  const rolProfesor = user?.rol || user?.user?.rol || "DOCENTE AUTORIZADO";

  // Carga inicial de alumnos desde el Microservicio Académico
  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await academyService.getAlumnos();
        
        // 🔍 LOG DE AUDITORÍA: Muestra en la consola (F12) las variables exactas del AlumnoDTO
        console.log("Estructura exacta del JSON (AlumnoDTO):", response.data);
        
        setAlumnos(response.data);
      } catch (err) {
        console.error("Error al conectar con el Backend:", err);
        setError("Falla de conexión con el Microservicio Académico. Verifica que las instancias de Java estén arriba.");
      } finally {
        setLoading(false);
      }
    };

    fetchAlumnos();
  }, []);

  // Carga la Bitácora Conductual del alumno seleccionado
  const cargarHojaVida = async (alumno) => {
    setAlumnoSeleccionado(alumno);
    try {
      setLoading(true);
      const response = await conductService.getHojaVida(alumno.rut);
      setHojaVida(response.data);
    } catch (err) {
      console.error("Error al cargar bitácora:", err);
      setHojaVida([]);
      alert("No se pudo conectar con el microservicio de Asistencia y Conducta (Puerto 8082).");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div style={{ 
      padding: '30px', 
      width: '100%', 
      boxSizing: 'border-box', 
      fontFamily: 'system-ui, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    }}>
      
      {/* HEADER INSTITUCIONAL CON NAVEGACIÓN CRUZADA OPTIMIZADA */}
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        paddingBottom: '16px', 
        borderBottom: '1px solid #e2e8f0' 
      }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a365d', margin: 0 }}>
            Plataforma Integral de Gestión Escolar
          </h1>
          <p style={{ color: '#718096', margin: '4px 0 0 0', fontSize: '13px' }}>
            Arquitectura Distribuida con Servicios en Puertos Locales (8081 y 8082)
          </p>
        </div>

        {/* CONTENEDOR DE CONTROL: Perfil docente y botón de escape al Home */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          
          {/* 🌐 BOTÓN REVERSO AL PORTAL PÚBLICO (Forma Correcta con navigate) */}
          <button 
            onClick={() => navigate('/')} 
            style={{
              padding: '10px 16px',
              backgroundColor: '#edf2f7',
              color: '#2b6cb0',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '600',
              transition: 'all 0.2s ease',
              display: 'inline-flex',
              alignItems: 'center',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e2e8f0'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#edf2f7'}
          >
            🌐 Ver Portal Público
          </button>

          {/* RECUADRO DE PERFIL */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            backgroundColor: 'white', 
            padding: '10px 18px', 
            borderRadius: '8px', 
            boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
            border: '1px solid #edf2f7'
          }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#2d3748' }}>
                ¡Hola, {nombreProfesor}! 👋
              </div>
              <div style={{ fontSize: '11px', color: '#3182ce', fontWeight: '700', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {rolProfesor}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* COMPROMISO ÉTICO */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#f0fff4', borderLeft: '4px solid #38a169', padding: '12px 16px', borderRadius: '4px' }}>
        <ShieldCheck style={{ color: '#38a169', flexShrink: 0 }} size={20} />
        <p style={{ margin: 0, fontSize: '13px', color: '#22543d', fontWeight: '500' }}>
          <strong>Compromiso Ético y de Confidencialidad:</strong> Registro de auditoría activo para la consulta docente de hojas de vida. Log activo para: <em>{user?.email || 'profesor@colegio.cl'}</em>
        </p>
      </div>

      {error && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', backgroundColor: '#fff5f5', borderLeft: '4px solid #e53e3e', borderRadius: '4px', color: '#c53030', fontSize: '12px' }}>
          <AlertCircle size={16} /> <span>{error}</span>
        </div>
      )}

      {/* CUERPO DEL DASHBOARD MODULAR */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '24px', alignItems: 'start' }}>
        
        {/* PANEL IZQUIERDO: ESTUDIANTES */}
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: '#2d3748', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <User size={18} style={{ color: '#3182ce' }} /> Estudiantes Registrados (Módulo Académico)
          </h2>

          {loading && alumnos.length === 0 ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#718096', fontSize: '13px' }}><RefreshCw size={14} className="animate-spin" /> Cargando alumnos...</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #edf2f7', color: '#718096', textAlign: 'left' }}>
                  <th style={{ padding: '8px 0', width: '30%' }}>RUT</th>
                  <th style={{ width: '45%' }}>Nombre Completo</th>
                  <th style={{ textAlign: 'right', width: '25%' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {alumnos.map((alumno) => (
                  <tr key={alumno.rut} style={{ borderBottom: '1px solid #edf2f7' }}>
                    <td style={{ padding: '12px 0', fontWeight: '500', color: '#4a5568' }}>{alumno.rut}</td>
                    
                    <td style={{ color: '#2d3748', fontWeight: '500' }}>
                      {alumno.nombreCompleto || alumno.nombre_completo || alumno.fullName || alumno.name || `${alumno.nombre || ''} ${alumno.apellido || ''}`}
                    </td>

                    <td style={{ textAlign: 'right' }}>
                      <button 
                        onClick={() => cargarHojaVida(alumno)}
                        style={{ padding: '6px 12px', backgroundColor: '#3182ce', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '500', fontSize: '12px' }}
                      >
                        Consultar Historial
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* PANEL DERECHO: BITÁCORA */}
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: '#2d3748', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ClipboardList size={18} style={{ color: '#38a169' }} /> Bitácora de Conducta (Patrón Factory)
          </h2>

          {!alumnoSeleccionado ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '180px', color: '#a0aec0', border: '2px dashed #e2e8f0', borderRadius: '6px' }}>
              <ClipboardList size={32} style={{ marginBottom: '8px' }} />
              <span style={{ fontSize: '12px', textAlign: 'center', padding: '0 10px' }}>Selecciona un estudiante del panel izquierdo para auditar su expediente.</span>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ padding: '12px', backgroundColor: '#edf2f7', borderRadius: '6px', fontSize: '13px' }}>
                <div style={{ color: '#718096' }}>Estudiante:</div>
                <div style={{ fontWeight: 'bold', color: '#2d3748' }}>
                  {alumnoSeleccionado.nombreCompleto || alumnoSeleccionado.nombre_completo || alumnoSeleccionado.fullName || alumnoSeleccionado.name || `${alumnoSeleccionado.nombre || ''} ${alumnoSeleccionado.apellido || ''}`}
                </div>
                <div style={{ fontSize: '11px', color: '#4a5568' }}>RUT: {alumnoSeleccionado.rut}</div>
              </div>

              <h3 style={{ fontSize: '13px', fontWeight: 'bold', color: '#4a5568', margin: '4px 0 0 0' }}>Eventos Registrados:</h3>
              
              {hojaVida.length === 0 ? (
                <p style={{ margin: 0, fontSize: '12px', color: '#718096', fontStyle: 'italic' }}>
                  ✨ El estudiante mantiene una hoja de vida limpia sin anotaciones vigentes.
                </p>
              ) : (
                hojaVida.map((anotacion, idx) => (
                  <div key={idx} style={{
                    padding: '12px',
                    borderRadius: '6px',
                    borderLeft: `5px solid ${anotacion.tipo === 'NEGATIVA' ? '#dc3545' : '#28a745'}`,
                    backgroundColor: anotacion.tipo === 'NEGATIVA' ? '#fff5f5' : '#f4fbf7'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: anotacion.tipo === 'NEGATIVA' ? '#c53030' : '#22543d' }}>
                      <span>SISTEMA: {anotacion.tipo}</span>
                      <span>ID: #{anotacion.id}</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '13px', color: '#2d3748', lineHeight: '1.4' }}>
                      {anotacion.detalle || anotacion.detalles}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}