import { useState, useEffect } from 'react';
// 🚀 Centralizado a través de tu API Gateway
import api from '../../services/api'; 
import { 
  ClipboardCheck, 
  FileText, 
  AlertTriangle, 
  ShieldCheck, 
  RefreshCw, 
  BookOpen, 
  Calendar,
  Send
} from 'lucide-react';

export default function ControlConductual() {
  // 📊 Estados para el Filtro de Cursos
  const [cursos, setCursos] = useState([]);
  const [cursoSeleccionadoId, setCursoSeleccionadoId] = useState("");
  const [loadingCursos, setLoadingCursos] = useState(true);

  // 👥 Estados para los Alumnos
  const [alumnosAcademicos, setAlumnosAcademicos] = useState([]);
  const [alumnoIdSeleccionado, setAlumnoIdSeleccionado] = useState("");
  const [loadingAlumnos, setLoadingAlumnos] = useState(false);

  // 📑 Estados para el Historial de Conducta
  const [incidencias, setIncidencias] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✍️ Estados para el Formulario de Nueva Anotación
  const [tipoAnotacion, setTipoAnotacion] = useState("NEGATIVA");
  const [detalle, setDetalle] = useState("");
  const [subiendo, setSubiendo] = useState(false);

  // 📥 A. CARGA INICIAL DE CURSOS (Puerto 8080 -> Microservicio 8081)
  useEffect(() => {
    let activo = true;
    const cargarCursosFiltro = async () => {
      try {
        setLoadingCursos(true);
        const response = await api.get('/academica/cursos/anio/2026');
        const listaCursos = Array.isArray(response.data) ? response.data : [];
        
        if (activo) {
          setCursos(listaCursos);
          if (listaCursos.length > 0) {
            setCursoSeleccionadoId(listaCursos[0].id.toString());
          }
        }
      } catch (err) {
        console.warn("Error al cargar cursos, activando respaldo local:", err);
        const cursosRespaldo = [
          { id: 1, nombre: "1° Medio A" },
          { id: 2, nombre: "2° Medio B" }
        ];
        if (activo) {
          setCursos(cursosRespaldo);
          setCursoSeleccionadoId(cursosRespaldo[0].id.toString());
        }
      } finally {
        if (activo) setLoadingCursos(false);
      }
    };

    cargarCursosFiltro();
    return () => { activo = false; };
  }, []);

  // 📥 B. CARGA DE ALUMNOS FILTRADOS POR CURSO (Reactiva al cambiar el curso)
  useEffect(() => {
    let activo = true;
    const cargarAlumnosPorCursoDinamico = async () => {
      if (!cursoSeleccionadoId) return;
      try {
        setLoadingAlumnos(true);
        const response = await api.get(`/academica/alumnos/curso/${cursoSeleccionadoId}`);
        const listaAlumnos = Array.isArray(response.data) ? response.data : [];

        if (activo) {
          setAlumnosAcademicos(listaAlumnos);
          if (listaAlumnos.length > 0) {
            const primerAlumno = listaAlumnos[0];
            const idInicial = primerAlumno.id || primerAlumno.alumnoId || primerAlumno.idAlumno;
            if (idInicial) setAlumnoIdSeleccionado(idInicial.toString());
          } else {
            setAlumnoIdSeleccionado("");
            setIncidencias([]);
          }
        }
      } catch (err) {
        console.warn("Error al traer alumnos, activando nómina de respaldo:", err);
        const respaldo = [
          { id: 1, nombreCompleto: "Juan Ignacio Pérez Araneda", rut: "12.345.678-9" },
          { id: 2, rut: "9.876.543-2", nombreCompleto: "Esteban Quito" },
          { id: 3, rut: "11.111.111-1", nombreCompleto: "Rosa Melano" }
        ];
        if (activo && cursoSeleccionadoId === "1") {
          setAlumnosAcademicos(respaldo);
          setAlumnoIdSeleccionado(respaldo[0].id.toString());
        } else if (activo) {
          setAlumnosAcademicos([]);
          setAlumnoIdSeleccionado("");
        }
      } finally {
        if (activo) setLoadingAlumnos(false);
      }
    };

    cargarAlumnosPorCursoDinamico();
    return () => { activo = false; };
  }, [cursoSeleccionadoId]);

  // 📥 C. CARGA DE BITÁCORA CONDUCTAL (Reactiva al cambiar el alumno)
  useEffect(() => {
    let activo = true;
    const cargarHistorialBD = async () => {
      if (!alumnoIdSeleccionado) {
        if (activo) setIncidencias([]);
        return;
      }
      try {
        setLoading(true);
        const response = await api.get(`/conducta/conducta/alumno/${alumnoIdSeleccionado}`);
        if (activo) {
          setIncidencias(Array.isArray(response.data) ? response.data : []);
        }
      } catch (err) {
        console.error("Error al traer anotaciones de conducta:", err);
        if (activo) setIncidencias([]);
      } finally {
        if (activo) setLoading(false);
      }
    };

    cargarHistorialBD();
    return () => { activo = false; };
  }, [alumnoIdSeleccionado]);

  // 🚀 ENVÍO DE ANOTACIÓN POST (Corregido para hacer match con AnotacionDTO y ruteo del Gateway)
const handleIngresarAnotacion = async (e) => {
    e.preventDefault();
    if (!alumnoIdSeleccionado || !detalle.trim()) {
      alert("Por favor, seleccione un alumno y describa los hechos.");
      return;
    }

    try {
      setSubiendo(true);

      const payload = {
        tipo: tipoAnotacion, 
        detalle: detalle.trim(),
        alumnoId: parseInt(alumnoIdSeleccionado, 10),
        profesorId: 1, 
        cursoId: parseInt(cursoSeleccionadoId, 10) || 1
      };

      // ⚡ Envío unificado usando la ruta espejo del Gateway
      const response = await api.post('/conducta/conducta/anotacion', payload);
      
      if (response.status === 200 || response.status === 201) {
        alert("⚡ Éxito: Objeto instanciado por la fábrica y persistido en la Base de Datos.");
        setDetalle("");
        
        // Refresco inmediato
        const refetch = await api.get(`/conducta/conducta/alumno/${alumnoIdSeleccionado}`);
        setIncidencias(Array.isArray(refetch.data) ? refetch.data : []);
      }
    } catch (err) {
      console.error("Error al registrar anotación con patrón Factory:", err);
      alert("Error de coincidencia de rutas en el Gateway.");
    } finally {
      setSubiendo(false);
    }
  };

  return (
    <div style={{ 
      padding: '40px', 
      width: '100%', 
      boxSizing: 'border-box', 
      fontFamily: "'Segoe UI', Roboto, sans-serif",
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      gap: '30px'
    }}>
      
      {/* Encabezado */}
      <header style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '16px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#1e3a8a', margin: 0 }}>
          Control y Bitácora Conductual
        </h1>
        <p style={{ color: '#64748b', margin: '4px 0 0 0', fontSize: '14px' }}>
          Módulo de Inspección General • Gestión Integrada de Observaciones Escolares
        </p>
      </header>

      {/* Grid de Paneles */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', alignItems: 'start' }}>
        
        {/* PANEL IZQUIERDO: FILTROS Y FORMULARIO */}
        <section style={{ backgroundColor: '#ffffff', padding: '28px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BookOpen size={20} style={{ color: '#2563eb' }} /> Selección de Alumno y Filtros
          </h2>

          {/* SELECTORES EN PARALELO CON COLORES ESTANDARIZADOS */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {/* Selector de Cursos */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: '1', minWidth: '150px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569' }}>1. Filtrar por Curso:</label>
              <select
                value={cursoSeleccionadoId}
                onChange={(e) => setCursoSeleccionadoId(e.target.value)}
                disabled={loadingCursos}
                style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', backgroundColor: 'white', color: '#1e3a8a', fontWeight: '700', outline: 'none' }}
              >
                {loadingCursos && <option style={{ color: '#0f172a' }}>Cargando cursos...</option>}
                {cursos.map((c) => (
                  <option key={c.id} value={c.id} style={{ color: '#0f172a' }}>{c.nombre || `Curso ${c.id}`}</option>
                ))}
              </select>
            </div>

            {/* Selector de Alumnos */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: '2', minWidth: '220px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569' }}>2. Seleccionar Estudiante:</label>
              <select
                value={alumnoIdSeleccionado}
                onChange={(e) => setAlumnoIdSeleccionado(e.target.value)}
                disabled={loadingAlumnos}
                style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', backgroundColor: 'white', color: '#1e3a8a', fontWeight: '700', outline: 'none' }}
              >
                {loadingAlumnos && <option style={{ color: '#0f172a' }}>Sincronizando alumnos...</option>}
                {!loadingAlumnos && alumnosAcademicos.length === 0 && <option value="" style={{ color: '#0f172a' }}>No hay alumnos en este curso</option>}
                {alumnosAcademicos.map((al) => (
                  <option key={al.id} value={al.id} style={{ color: '#0f172a' }}>
                    {al.nombreCompleto || `${al.nombres} ${al.apellidos || ''}`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '10px 0' }} />

          {/* Formulario de Registro */}
          <form onSubmit={handleIngresarAnotacion} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#1e3a8a', margin: 0 }}>
              Registrar Nueva Observación
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569' }}>Tipo de Hoja:</label>
              <select
                value={tipoAnotacion}
                onChange={(e) => setTipoAnotacion(e.target.value)}
                style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', backgroundColor: 'white', color: '#1e3a8a', fontWeight: '700', outline: 'none' }}
              >
                <option value="NEGATIVA" style={{ color: '#dc2626', fontWeight: '600' }}>🔴 Observación Negativa</option>
                <option value="POSITIVA" style={{ color: '#16a34a', fontWeight: '600' }}>🟢 Observación Positiva</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569' }}>Descripción de los Hechos:</label>
              <textarea
                value={detalle}
                onChange={(e) => setDetalle(e.target.value)}
                placeholder="Escriba los pormenores observados en el aula o patio de la institución..."
                rows={4}
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', resize: 'vertical', fontFamily: 'inherit', outline: 'none' }}
              />
            </div>

            <button
              type="submit"
              disabled={subiendo || !alumnoIdSeleccionado}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '12px',
                backgroundColor: alumnoIdSeleccionado ? '#2563eb' : '#94a3b8',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '700',
                cursor: alumnoIdSeleccionado ? 'pointer' : 'not-allowed',
                boxShadow: '0 2px 4px rgba(37,99,235,0.2)',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={e => { if(alumnoIdSeleccionado) e.currentTarget.style.backgroundColor = '#1d4ed8'; }}
              onMouseLeave={e => { if(alumnoIdSeleccionado) e.currentTarget.style.backgroundColor = '#2563eb'; }}
            >
              {subiendo ? (
                <>
                  <RefreshCw size={16} style={{ animation: 'spin 1s linear infinite' }} /> Guardando en MySQL...
                </>
              ) : (
                <>
                  <Send size={16} /> Subir Registro de Incidencia
                </>
              )}
            </button>
          </form>
        </section>

        {/* PANEL DERECHO: HISTORIAL DE OBSERVACIONES */}
        <section style={{ backgroundColor: '#ffffff', padding: '28px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', minHeight: '400px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={20} style={{ color: '#1e3a8a' }} /> Historial y Hoja de Vida Cronológica
          </h2>

          {loading ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#64748b', fontSize: '14px', padding: '40px 0', justifyContent: 'center' }}>
              <RefreshCw size={18} style={{ animation: 'spin 1s linear infinite' }} /> Conectando al Microservicio de Conducta...
            </div>
          ) : incidencias.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '260px', color: '#94a3b8', border: '2px dashed #e2e8f0', borderRadius: '8px', padding: '20px', textAlign: 'center' }}>
              <ClipboardCheck size={44} style={{ marginBottom: '10px', color: '#cbd5e1' }} />
              <p style={{ margin: 0, fontWeight: '600', fontSize: '15px' }}>Hoja de vida limpia</p>
              <p style={{ margin: '4px 0 0 0', fontSize: '13px' }}>El alumno seleccionado no registra anotaciones vigentes en el sistema.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxHeight: '480px', overflowY: 'auto', paddingRight: '4px' }}>
              {incidencias.map((item, index) => {
                // ⚡ Ajustado para leer 'item.tipo' devuelto por tu entidad Anotacion de Java
                const esNegativa = item.tipo === "NEGATIVA";
                return (
                  <div 
                    key={item.id || index} 
                    style={{ 
                      padding: '16px', 
                      borderRadius: '8px', 
                      backgroundColor: esNegativa ? '#fef2f2' : '#f0fdf4',
                      borderLeft: `5px solid ${esNegativa ? '#dc2626' : '#16a34a'}`,
                      borderTop: '1px solid #f1f5f9',
                      borderRight: '1px solid #f1f5f9',
                      borderBottom: '1px solid #f1f5f9'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ 
                        fontSize: '11px', 
                        fontWeight: '800', 
                        padding: '2px 8px', 
                        borderRadius: '12px',
                        backgroundColor: esNegativa ? '#ffeeee' : '#e6fded',
                        color: esNegativa ? '#b91c1c' : '#15803d',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        {esNegativa ? <AlertTriangle size={12} /> : <ShieldCheck size={12} />}
                        ANOTACIÓN {item.tipo}
                      </span>
                      <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={13} /> {item.fecha || "Vigente"}
                      </span>
                    </div>
                    <p style={{ margin: 0, fontSize: '13.5px', color: '#334155', lineHeight: '1.5', fontWeight: '500' }}>
                      {item.detalle}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}