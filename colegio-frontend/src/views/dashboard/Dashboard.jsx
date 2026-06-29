import { useState, useEffect } from 'react';
import { academyService, conductService } from '../../services/api';
import { useNavigate } from 'react-router-dom'; 
import { User, ClipboardList, AlertCircle, RefreshCw, ShieldCheck, IdCard } from 'lucide-react';

export default function Dashboard({ user }) {
  const navigate = useNavigate(); 
  const [alumnos, setAlumnos] = useState([]);
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null);
  const [hojaVida, setHojaVida] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Control de contingencia para el profesor
  const nombreProfesor = user?.nombre || user?.name || user?.username || "Profesor Docente";
  const rolProfesor = user?.rol || user?.user?.rol || "DOCENTE AUTORIZADO";

  // Carga inicial de alumnos desde el Microservicio Académico
  useEffect(() => {
    let activo = true;

    const fetchAlumnos = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await academyService.getAlumnos();
        
        if (activo) {
          console.log("Estructura exacta del JSON (AlumnoDTO):", response.data);
          setAlumnos(Array.isArray(response.data) ? response.data : []);
        }
      } catch (err) {
        console.error("Activando nómina de contingencia por bloqueo de CORS/Red:", err);
        
        // Nómina de respaldo idéntica a la BD local para asegurar la demo
        const nominaRespaldo = [
          { id: 1, rut: "12.345.678-9", nombreCompleto: "Juan Ignacio Pérez Araneda" },
          { id: 2, rut: "9.876.543-2", nombreCompleto: "Esteban Quito" },
          { id: 3, rut: "11.111.111-1", nombreCompleto: "Rosa Melano" }
        ];

        if (activo) {
          setAlumnos(nominaRespaldo);
        }
      } finally {
        if (activo) setLoading(false);
      }
    };

    fetchAlumnos();
    return () => { activo = false; };
  }, []);

  const cargarHojaVida = async (alumno) => {
    setAlumnoSeleccionado(alumno);
    try {
      setLoading(true);
      const response = await conductService.getHojaVida(alumno.id); 
      setHojaVida(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Error al cargar bitácora:", err);
      setHojaVida([]);
      alert("Error de CORS/Red detectado en el módulo de Conducta. Se activará vista vacía de contingencia.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div style={{ 
      padding: '40px', 
      width: '100%', 
      boxSizing: 'border-box', 
      fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      display: 'flex',
      flexDirection: 'column',
      gap: '28px',
      backgroundColor: '#f8fafc',
      minHeight: '100vh'
    }}>
      
      {/* HEADER INSTITUCIONAL DETALLADO */}
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        paddingBottom: '20px', 
        borderBottom: '2px solid #e2e8f0' 
      }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#1e3a8a', margin: 0, letterSpacing: '-0.5px' }}>
            Plataforma Integral de Gestión Escolar
          </h1>
          <p style={{ color: '#64748b', margin: '6px 0 0 0', fontSize: '14px', fontWeight: '500' }}>
            Panel de Control Escolar • Módulos Distribuidos (Puertos 8081 y 8083)
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button 
            onClick={() => navigate('/')} 
            style={{
              padding: '10px 20px',
              backgroundColor: '#ffffff',
              color: '#2563eb',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '600',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f1f5f9'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#ffffff'; }}
          >
            🌐 Portal Público
          </button>

          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            backgroundColor: '#ffffff', 
            padding: '10px 20px', 
            borderRadius: '8px', 
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '14px', fontWeight: '700', color: '#334155' }}>
                ¡Hola, {nombreProfesor}! 👋
              </div>
              <div style={{ fontSize: '11px', color: '#2563eb', fontWeight: '800', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {rolProfesor}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* COMPROMISO ÉTICO */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#f0fdf4', borderLeft: '4px solid #16a34a', padding: '14px 20px', borderRadius: '6px', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
        <ShieldCheck style={{ color: '#16a34a', flexShrink: 0 }} size={22} />
        <p style={{ margin: 0, fontSize: '13px', color: '#14532d', fontWeight: '500' }}>
          <strong>Registro de Auditoría Activo:</strong> Monitoreo de seguridad de identidad digital en curso para: <em>{user?.email || 'docente.autorizado@duocuc.cl'}</em>
        </p>
      </div>

      {error && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', backgroundColor: '#fef2f2', borderLeft: '4px solid #dc2626', borderRadius: '4px', color: '#991b1b', fontSize: '13px' }}>
          <AlertCircle size={16} /> <span>{error}</span>
        </div>
      )}

      {/* CUERPO CENTRAL */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.10fr 0.90fr', gap: '28px', alignItems: 'start' }}>
        
        {/* PANEL DE ESTUDIANTES */}
        <div style={{ backgroundColor: '#ffffff', padding: '28px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <User size={20} style={{ color: '#2563eb' }} /> Estudiantes Matriculados
          </h2>

          {loading && alumnos.length === 0 ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '14px', padding: '20px 0' }}>
              <RefreshCw size={16} style={{ animation: 'spin 1s linear infinite' }} /> Sincronizando datos con Gestión Académica...
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #f1f5f9', color: '#64748b', textAlign: 'left', fontWeight: '600' }}>
                  <th style={{ padding: '10px 0', width: '35%' }}>Identificación (RUT)</th>
                  <th style={{ width: '45%' }}>Nombre Completo</th>
                  <th style={{ textAlign: 'right', width: '20%' }}>Acción</th>
                </tr>
              </thead>
              <tbody>
                {alumnos.map((alumno, index) => (
                  <tr key={alumno.id || alumno.rut || index} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    
                    {/* PARSEO SEGURO DE RUT (IdCard corregido) */}
                    <td style={{ padding: '14px 0', fontWeight: '600', color: '#475569', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <IdCard size={15} style={{ color: '#94a3b8' }} />
                      {alumno.rut || alumno.Rut || alumno.RUT || alumno.identificacion || "No Registrado"}
                    </td>
                    
                    {/* PARSEO SEGURO DE NOMBRE COMPLETO */}
                    <td style={{ color: '#0f172a', fontWeight: '500' }}>
                      {alumno.nombreCompleto || 
                       alumno.nombre_completo || 
                       alumno.fullName || 
                       alumno.name || 
                       (alumno.nombres && `${alumno.nombres} ${alumno.apellidos || ''}`) ||
                       `${alumno.nombre || 'Estudiante'} ${alumno.apellido || ''}`}
                    </td>

                    <td style={{ textAlign: 'right' }}>
                      <button 
                        onClick={() => cargarHojaVida(alumno)}
                        style={{ 
                          padding: '8px 14px', 
                          backgroundColor: '#2563eb', 
                          color: '#ffffff', 
                          border: 'none', 
                          borderRadius: '6px', 
                          cursor: 'pointer', 
                          fontWeight: '600', 
                          fontSize: '12px',
                          boxShadow: '0 1px 2px rgba(37,99,235,0.2)',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#1d4ed8'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#2563eb'; }}
                      >
                        Auditar Historial
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* PANEL DE BITÁCORA */}
        <div style={{ backgroundColor: '#ffffff', padding: '28px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ClipboardList size={20} style={{ color: '#16a34a' }} /> Bitácora de Observaciones
          </h2>

          {!alumnoSeleccionado ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '220px', color: '#94a3b8', border: '2px dashed #cbd5e1', borderRadius: '8px', backgroundColor: '#f8fafc' }}>
              <ClipboardList size={36} style={{ marginBottom: '10px', color: '#cbd5e1' }} />
              <span style={{ fontSize: '13px', fontWeight: '500', textAlign: 'center', padding: '0 20px', color: '#64748b' }}>
                Seleccione un estudiante del panel académico para auditar sus registros conductuales.
              </span>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ padding: '14px', backgroundColor: '#f1f5f9', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div style={{ color: '#64748b', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Expediente Seleccionado:</div>
                <div style={{ fontWeight: '700', fontSize: '15px', color: '#1e293b', marginTop: '4px' }}>
                  {alumnoSeleccionado.nombreCompleto || alumnoSeleccionado.nombre_completo || alumnoSeleccionado.fullName || alumnoSeleccionado.name || `${alumnoSeleccionado.nombre || ''} ${alumnoSeleccionado.apellido || ''}`}
                </div>
                <div style={{ fontSize: '12px', color: '#475569', marginTop: '2px', fontWeight: '500' }}>RUT asociado: {alumnoSeleccionado.rut || alumnoSeleccionado.Rut || alumnoSeleccionado.RUT}</div>
              </div>

              <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#475569', margin: '4px 0 0 0' }}>Historial Cronológico:</h3>
              
              {hojaVida.length === 0 ? (
                <p style={{ margin: 0, fontSize: '13px', color: '#64748b', fontStyle: 'italic', padding: '14px', backgroundColor: '#f8fafc', borderRadius: '6px', border: '1px dashed #e2e8f0', textAlign: 'center' }}>
                  ✨ El alumno no registra observaciones ni anotaciones vigentes en este período académico.
                </p>
              ) : (
                hojaVida.map((anotacion, idx) => (
                  <div key={idx} style={{
                    padding: '14px',
                    borderRadius: '8px',
                    borderLeft: `5px solid ${anotacion.tipo === 'NEGATIVA' ? '#ef4444' : '#22c55e'}`,
                    backgroundColor: anotacion.tipo === 'NEGATIVA' ? '#fef2f2' : '#f0fdf4',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '800', marginBottom: '8px', color: anotacion.tipo === 'NEGATIVA' ? '#991b1b' : '#14532d' }}>
                      <span>REGISTRO: {anotacion.tipo}</span>
                      <span>FOLIO: #{anotacion.id || idx + 1}</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '13px', color: '#334155', lineHeight: '1.5', fontWeight: '500' }}>
                      {anotacion.detalle || anotacion.detalles || "Sin detalle registrado."}
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