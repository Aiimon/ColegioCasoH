import { useState, useEffect } from 'react';
import { academyService } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import { User, ClipboardList, AlertCircle, RefreshCw, LogOut, ShieldCheck } from 'lucide-react';

export default function Dashboard({ user }) {
  const { logout } = useAuth(); // Rescatamos la función para deslogearse
  const [alumnos, setAlumnos] = useState([]);
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null);
  const [hojaVida, setHojaVida] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Carga inicial de alumnos desde el Microservicio Académico (vía BFF)
  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await academyService.getAlumnos();
        setAlumnos(response.data);
      } catch (err) {
        console.error("Error al conectar con el BFF:", err);
        setError("Falla de conexión con el API Gateway (BFF). Verifica que los puertos e instancias en Eureka estén arriba.");
      } finally {
        setLoading(false);
      }
    };

    fetchAlumnos();
  }, []);

  // Carga la Bitácora Conductual del alumno seleccionado usando el Patrón Factory del Backend
  const cargarHojaVida = async (alumno) => {
    setAlumnoSeleccionado(alumno);
    try {
      setLoading(true);
      // Le pegamos al endpoint del microservicio de conducta a través del Gateway (Puerto 8080)
      const response = await fetch(`http://localhost:8080/api/v1/conducta/alumno/${alumno.rut}`);
      if (!response.ok) {
        throw new Error(`Error de servidor: ${response.status}`);
      }
      const data = await response.json();
      setHojaVida(data);
    } catch (err) {
      console.error("Error al cargar bitácora:", err);
      setHojaVida([]);
      alert("No se pudo conectar con el microservicio de Asistencia y Conducta (503/500). Revisa que esté corriendo en el puerto 8082.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'system-ui, sans-serif', backgroundColor: '#f7fafc', minHeight: '100vh' }}>
      
      {/* HEADER INSTITUCIONAL CON LOGIN DINÁMICO */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid #e2e8f0', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1a365d', margin: 0 }}>
            🏫 Plataforma Integral de Gestión Escolar
          </h1>
          <p style={{ color: '#718096', margin: '4px 0 0 0', fontSize: '14px' }}>
            Arquitectura Distribuida React + Spring Cloud BFF (Port: 8080)
          </p>
        </div>

        {/* Info del Profesor Logeado */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', backgroundColor: 'white', padding: '10px 16px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#2d3748' }}>{user?.nombre}</div>
            <div style={{ fontSize: '12px', color: '#4a5568', fontWeight: '600' }}>🔬 ROL: {user?.rol}</div>
          </div>
          <button 
            onClick={logout} 
            title="Cerrar Sesión"
            style={{ padding: '8px', backgroundColor: '#fff5f5', border: '1px solid #fed7d7', borderRadius: '6px', color: '#c53030', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            <LogOut size={16} />
          </button>
        </div>
      </header>

      {/* COMPROMISO ÉTICO DE PRIVACIDAD */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#f0fff4', borderLeft: '4px solid #38a169', padding: '16px', borderRadius: '4px', marginBottom: '24px' }}>
        <ShieldCheck style={{ color: '#38a169', flexShrink: 0 }} size={24} />
        <p style={{ margin: 0, fontSize: '14px', color: '#22543d', fontWeight: '500' }}>
          <strong>Compromiso Ético y de Confidencialidad:</strong> Este sistema cumple con los estándares éticos de protección de datos del estudiante. La consulta de hojas de vida y antecedentes conductuales está estrictamente restringida a personal docente autorizado. Log de auditoría activo para: <em>{user?.email}</em>.
        </p>
      </div>

      {/* SECCIÓN DE ALERTA DE ERROR GLOBAL */}
      {error && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '16px', backgroundColor: '#fff5f5', borderLeft: '4px solid #e53e3e', borderRadius: '4px', color: '#c53030', fontSize: '14px', marginBottom: '24px' }}>
          <AlertCircle size={20} /> <span>{error}</span>
        </div>
      )}

      {/* CUERPO DEL DASHBOARD MODULAR */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        
        {/* PANEL IZQUIERDO: ESTUDIANTES (MÓDULO ACADÉMICO) */}
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#2d3748', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <User size={20} style={{ color: '#3182ce' }} /> Estudiantes Registrados (Módulo Académico)
          </h2>

          {loading && alumnos.length === 0 ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#718096' }}><RefreshCw size={16} className="animate-spin" /> Cargando alumnos...</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #edf2f7', color: '#718096', textAlign: 'left' }}>
                  <th style={{ padding: '10px 0' }}>RUT</th>
                  <th>Nombre Completo</th>
                  <th style={{ textAlign: 'right' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {alumnos.map((alumno) => (
                  <tr key={alumno.rut} style={{ borderBottom: '1px solid #edf2f7' }}>
                    <td style={{ padding: '12px 0', fontWeight: '500', color: '#4a5568' }}>{alumno.rut}</td>
                    <td style={{ color: '#2d3748' }}>{alumno.nombre} {alumno.apellido}</td>
                    <td style={{ textAlign: 'right' }}>
                      <button 
                        onClick={() => cargarHojaVida(alumno)}
                        style={{ padding: '6px 12px', backgroundColor: '#3182ce', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '500', fontSize: '13px' }}
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

        {/* PANEL DERECHO: BITÁCORA DE CONDUCTA (PATRÓN FACTORY) */}
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#2d3748', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ClipboardList size={20} style={{ color: '#38a169' }} /> Bitácora de Conducta (Patrón Factory)
          </h2>

          {!alumnoSeleccionado ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '200px', color: '#a0aec0', border: '2px dashed #e2e8f0', borderRadius: '6px' }}>
              <ClipboardList size={40} style={{ marginBottom: '8px' }} />
              <span style={{ fontSize: '14px' }}>Selecciona un alumno del panel izquierdo para auditar su expediente.</span>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ padding: '12px', backgroundColor: '#edf2f7', borderRadius: '6px', fontSize: '14px' }}>
                <div style={{ color: '#718096' }}>Estudiante:</div>
                <div style={{ fontWeight: 'bold', color: '#2d3748' }}>{alumnoSeleccionado.nombre} {alumnoSeleccionado.apellido}</div>
                <div style={{ fontSize: '12px', color: '#4a5568' }}>ID Escolar (RUT): {alumnoSeleccionado.rut}</div>
              </div>

              <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#4a5568', margin: '8px 0 0 0' }}>Eventos Registrados:</h3>
              
              {hojaVida.length === 0 ? (
                <p style={{ margin: 0, fontSize: '14px', color: '#718096', italic: 'true' }}>
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
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px', color: anotacion.tipo === 'NEGATIVA' ? '#c53030' : '#22543d' }}>
                      <span>SISTEMA: {anotacion.tipo}</span>
                      <span>ID REGISTRO: #{anotacion.id}</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '14px', color: '#2d3748', lineHeight: '1.4' }}>
                      {anotacion.detalles || anotacion.detalle}
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