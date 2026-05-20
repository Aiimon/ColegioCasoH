import { useState, useEffect } from 'react';
import { UserPlus, Users, GraduationCap, RefreshCw, AlertCircle } from 'lucide-react';

export default function GestionAlumnos() {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Simulación de carga desde el Microservicio Académico (Puerto 8081)
  useEffect(() => {
    const fetchCursos = async () => {
      try {
        setLoading(true);
        setError(null);
        // Simulamos un delay de red de 600ms para que se aprecie el spinner de carga en la demo
        await new Promise(resolve => setTimeout(resolve, 600));
        
        setCursos([
          { id: 1, grado: "1° Medio A", matriculados: 32, profesorJefe: "Prof. Carlos Muñoz", sala: "Sala 104" },
          { id: 2, grado: "2° Medio B", matriculados: 28, profesorJefe: "Prof. María José Silva", sala: "Sala 201" },
          { id: 3, grado: "3° Medio A", matriculados: 35, profesorJefe: "Prof. Andrés O'Higgins", sala: "Sala 102" },
          { id: 4, grado: "4° Medio C", matriculados: 30, profesorJefe: "Prof. Patricia Toledo", sala: "Laboratorio B" }
        ]);
      } catch (err) {
        console.error("Error modular:", err);
        setError("Falla al conectar con el endpoint de asignaciones del Microservicio Académico.");
      } finally {
        setLoading(false);
      }
    };

    fetchCursos();
  }, []);

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
      
      {/* HEADER DETALLADO */}
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        paddingBottom: '16px', 
        borderBottom: '1px solid #e2e8f0' 
      }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a365d', margin: 0 }}>
            Administración de Cursos y Matrículas
          </h1>
          <p style={{ color: '#718096', margin: '4px 0 0 0', fontSize: '13px' }}>
            Módulo de Carga Síncrona • Microservicio Académico (Instancia Puerto 8081)
          </p>
        </div>

        {/* Botón de acción rápido para rellenar la interfaz */}
        <button 
          onClick={() => alert("Simulación: Apertura de formulario de inscripción / Matrícula 2026")}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 16px',
            backgroundColor: '#3182ce',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '13px',
            boxShadow: '0 2px 4px rgba(49, 130, 206, 0.2)'
          }}
        >
          <UserPlus size={16} /> Matricular Estudiante
        </button>
      </header>

      {error && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', backgroundColor: '#fff5f5', borderLeft: '4px solid #e53e3e', borderRadius: '4px', color: '#c53030', fontSize: '12px' }}>
          <AlertCircle size={16} /> <span>{error}</span>
        </div>
      )}

      {/* VISTA DE CARGA O GRILLA DE CURSOS */}
      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#718096', fontSize: '14px', padding: '40px 0' }}>
          <RefreshCw size={18} className="animate-spin" /> Cargando niveles académicos activos...
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '24px' 
        }}>
          {cursos.map((curso) => (
            <div 
              key={curso.id} 
              style={{ 
                backgroundColor: 'white', 
                padding: '24px', 
                borderRadius: '8px', 
                boxShadow: '0 4px 6px rgba(0,0,0,0.02)', 
                border: '1px solid #edf2f7',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'between'
              }}
            >
              {/* Bloque Superior de la Tarjeta */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#2d3748', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <GraduationCap style={{ color: '#3182ce' }} size={20} /> {curso.grado}
                  </h3>
                  <span style={{ fontSize: '11px', color: '#a0aec0', fontWeight: '500' }}>{curso.sala}</span>
                </div>
                
                <span style={{ 
                  backgroundColor: '#ebf8ff', 
                  color: '#2b6cb0', 
                  padding: '4px 10px', 
                  borderRadius: '12px', 
                  fontSize: '11px', 
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <Users size={12} /> {curso.matriculados} Alumnos
                </span>
              </div>

              {/* Detalle del Profesor */}
              <div style={{ 
                padding: '12px', 
                backgroundColor: '#f7fafc', 
                borderRadius: '6px', 
                fontSize: '13px', 
                color: '#4a5568',
                marginBottom: '20px' 
              }}>
                <span style={{ color: '#718096', display: 'block', fontSize: '11px' }}>Profesor Jefe:</span>
                <strong>{curso.profesorJefe}</strong>
              </div>

              {/* Botón de Gestión */}
              <button 
                onClick={() => alert(`Cargando nómina síncrona para ${curso.grado}...`)}
                style={{ 
                  width: '100%', 
                  padding: '10px', 
                  backgroundColor: '#edf2f7', 
                  color: '#2b6cb0', 
                  border: 'none', 
                  borderRadius: '6px', 
                  fontSize: '12px', 
                  fontWeight: '700', 
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                  marginTop: 'auto'
                }}
              >
                Ver Libro de Clases completo
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}