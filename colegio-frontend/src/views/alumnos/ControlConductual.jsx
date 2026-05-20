import { useState } from 'react';
import { ClipboardCheck, FileText, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function ControlConductual() {
  const [incidencias, setIncidencias] = useState([
    { id: 101, alumno: "Esteban Quito", rut: "12345678-9", tipo: "NEGATIVA", detalle: "[GRAVEDAD/ADVERTENCIA]: El alumno interrumpe de forma reiterada la clase de programación distribuida." },
    { id: 102, alumno: "Rosa Melano", rut: "98765432-1", tipo: "POSITIVA", detalle: "[FELICITACIÓN]: Destacada participación en la resolución de desafíos del algoritmo de ordenamiento." }
  ]);

  const [alumno, setAlumno] = useState("12345678-9");
  const [tipo, setTipo] = useState("NEGATIVA");
  const [detalle, setDetalle] = useState("");

  const handleSimularFactory = (e) => {
    e.preventDefault();
    if (!detalle.trim()) return alert("Por favor, escribe el detalle de la incidencia.");

    // Mapeo manual del nombre según el RUT para la simulación en pantalla
    const nombreAlumno = alumno === "12345678-9" ? "Esteban Quito" : alumno === "98765432-1" ? "Rosa Melano" : "Alan Brito";
    
    // Simulamos el formateo que haría la Fábrica en Java
    const prefijo = tipo === "NEGATIVA" ? "[GRAVEDAD/ADVERTENCIA]: " : "[FELICITACIÓN]: ";

    const nuevaIncidencia = {
      id: Date.now(),
      alumno: nombreAlumno,
      rut: alumno,
      tipo: tipo,
      detalle: `${prefijo}${detalle}`
    };

    setIncidencias([nuevaIncidencia, ...incidencias]);
    setDetalle("");
    alert(`⚡ Éxito: Instanciado dinámicamente tipo [${tipo}] mediante Patrón Factory.`);
  };

  return (
    <div style={{ padding: '30px', width: '100%', boxSizing: 'border-box', fontFamily: 'system-ui, sans-serif', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      <header style={{ paddingBottom: '16px', borderBottom: '1px solid #e2e8f0' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a365d', margin: 0 }}>
          Control Conductual y Registro de Bitácoras
        </h1>
        <p style={{ color: '#718096', margin: '4px 0 0 0', fontSize: '13px' }}>
          Gestión Extensible de Expedientes • Microservicio Asistencia y Conducta (Puerto 8082)
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '24px', alignItems: 'start' }}>
        
        {/* PANEL IZQUIERDO: FORMULARIO GENERADOR */}
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', border: '1px solid #edf2f7' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: '#2d3748', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ClipboardCheck size={18} style={{ color: '#3182ce' }} /> Nueva Entrada Institucional
          </h2>

          <form onSubmit={handleSimularFactory} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#4a5568', marginBottom: '6px' }}>Estudiante</label>
              <select value={alumno} onChange={e => setAlumno(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e0', fontSize: '13px', backgroundColor: 'white' }}>
                <option value="12345678-9">Esteban Quito (12345678-9)</option>
                <option value="98765432-1">Rosa Melano (98765432-1)</option>
                <option value="11111111-1">Alan Brito (11111111-1)</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#4a5568', marginBottom: '6px' }}>Evaluación del Comportamiento</label>
              <select value={tipo} onChange={e => setTipo(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e0', fontSize: '13px', fontWeight: '600', backgroundColor: 'white' }}>
                <option value="NEGATIVA" style={{ color: '#dc3545' }}>🔴 Registro de Observación Negativa</option>
                <option value="POSITIVA" style={{ color: '#28a745' }}>🟢 Registro de Felicitación Destacada</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#4a5568', marginBottom: '6px' }}>Desglose de Hechos</label>
              <textarea value={detalle} onChange={e => setDetalle(e.target.value)} placeholder="Escriba los pormenores detectados en el aula académica..." rows="4" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e0', fontSize: '13px', boxSizing: 'border-box', fontFamily: 'inherit' }}></textarea>
            </div>

            <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#38a169', color: 'white', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 2px 4px rgba(56, 161, 105, 0.2)' }}>
              Procesar con Patrón Factory
            </button>
          </form>
        </div>

        {/* PANEL DERECHO: AUDITORÍA RECIENTE */}
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', border: '1px solid #edf2f7' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: '#2d3748', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={18} style={{ color: '#e53e3e' }} /> Registro Temporal de Auditoría (Demo)
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {incidencias.map((inc) => (
              <div key={inc.id} style={{
                padding: '14px',
                borderRadius: '6px',
                borderLeft: `5px solid ${inc.tipo === 'NEGATIVA' ? '#dc3545' : '#28a745'}`,
                backgroundColor: inc.tipo === 'NEGATIVA' ? '#fff5f5' : '#f4fbf7'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px' }}>
                  <span style={{ color: inc.tipo === 'NEGATIVA' ? '#c53030' : '#22543d', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {inc.tipo === 'NEGATIVA' ? <AlertTriangle size={12} /> : <ShieldCheck size={12} />} TIPO: {inc.tipo}
                  </span>
                  <span style={{ color: '#a0aec0' }}>ID: #{inc.id}</span>
                </div>
                <div style={{ fontSize: '12px', fontWeight: '700', color: '#4a5568', marginBottom: '4px' }}>
                  {inc.alumno} <span style={{ fontWeight: '400', color: '#718096', fontSize: '11px' }}>({inc.rut})</span>
                </div>
                <p style={{ margin: 0, fontSize: '12px', color: '#2d3748', lineHeight: '1.4' }}>
                  {inc.detalle}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}