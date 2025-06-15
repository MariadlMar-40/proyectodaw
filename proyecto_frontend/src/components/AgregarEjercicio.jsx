import { useState } from 'react';

function AgregarEjercicio({ onAdd }) {
  const [ejercicio, setEjercicio] = useState({
    nombre: '',
    descripcion: '',
    tipo: '',
    grupo_muscular: '',
    duracion: '',
    imagen: '',
    series: '',
    repeticiones: '',
    tiempo: '',
  });

  const handleChange = (e) => {
    setEjercicio({ ...ejercicio, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    console.log("esta llegando")
    e.preventDefault();

    // Filtrar campos vacíos y convertir numéricos
    const ejercicioLimpio = {};
    for (const [key, valor] of Object.entries(ejercicio)) {
      if (valor === '' || valor == null) continue;

      // Convertir si es número
      ejercicioLimpio[key] = ['duracion', 'series', 'repeticiones', 'tiempo'].includes(key)
        ? parseInt(valor)
        : valor.trim();
    }

    if (!ejercicioLimpio.nombre) {
      alert('El nombre del ejercicio es obligatorio');
      return;
    }

    onAdd(ejercicioLimpio);

    // Limpiar solo después de enviar
    setEjercicio({
      nombre: '',
      descripcion: '',
      tipo: '',
      grupo_muscular: '',
      duracion: '',
      imagen: '',
      series: '',
      repeticiones: '',
      tiempo: '',
    });
  };

  return (
    <div className="agregar-ejercicio">
      <input name="nombre" value={ejercicio.nombre} onChange={handleChange} placeholder="Nombre" required />
      <input name="descripcion" value={ejercicio.descripcion} onChange={handleChange} placeholder="Descripción" />
      <input name="tipo" value={ejercicio.tipo} onChange={handleChange} placeholder="Tipo" />
      <input name="grupo_muscular" value={ejercicio.grupo_muscular} onChange={handleChange} placeholder="Grupo muscular" />
      <input name="duracion" type="number" value={ejercicio.duracion} onChange={handleChange} placeholder="Duración (min)" />
      <input name="imagen" value={ejercicio.imagen} onChange={handleChange} placeholder="URL imagen" />
      <input name="series" type="number" value={ejercicio.series} onChange={handleChange} placeholder="Series"/>
      <input name="repeticiones" type="number" value={ejercicio.repeticiones} onChange={handleChange} placeholder="Repeticiones"/>
      <input name="tiempo" type="number" value={ejercicio.tiempo} onChange={handleChange} placeholder="Tiempo (segundos)"/>
      
      <button type="button" onClick={handleSubmit}>Agregar ejercicio</button>
    </div>
  );
}

export default AgregarEjercicio;
