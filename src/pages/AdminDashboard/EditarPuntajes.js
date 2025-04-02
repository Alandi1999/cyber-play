import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate para redirigir
import { supabase } from '../../services/supabaseClient';

function EditarPuntaje() {
  const [dni, setDni] = useState('');
  const [puntaje, setPuntaje] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate(); // Hook para redirigir al dashboard

  const manejarCambioDni = (e) => {
    setDni(e.target.value);
  };

  const manejarCambioPuntaje = (e) => {
    setPuntaje(e.target.value);
  };

  const editarPuntaje = async (e) => {
    e.preventDefault();

    // Validación del DNI
    if (!/^\d+$/.test(dni)) {
      setMensaje('El DNI debe contener solo números');
      return;
    }

    if (dni.length !== 8) {
      setMensaje('El DNI debe tener exactamente 8 dígitos');
      return;
    }

    // Validación del puntaje
    if (isNaN(puntaje) || parseInt(puntaje) < 0) {
      setMensaje('El puntaje debe ser un número mayor o igual a 0');
      return;
    }

    try {
      // Llamada a Supabase para actualizar puntaje
      const { data, error } = await supabase
        .from('clientes')
        .update({ puntaje: parseInt(puntaje) }) // Actualizamos puntaje
        .eq('dni', dni) // Filtro por DNI
        .select(); // Devuelve los datos actualizados

      if (error) {
        console.error('Error editando puntaje:', error);
        setMensaje('Error al editar puntaje: ' + error.message);
        return;
      }

      if (!data || data.length === 0) {
        setMensaje('No se encontró ningún cliente con ese DNI');
        return;
      }

      // Mensaje de éxito
      console.log('Puntaje actualizado:', data);
      setMensaje('Puntaje actualizado exitosamente');
      setDni(''); // Reinicia el campo DNI
      setPuntaje(''); // Reinicia el campo Puntaje
    } catch (err) {
      console.error('Error en la actualización:', err);
      setMensaje('Error en la actualización: ' + err.message);
    }
  };

  return (
    <div style={{ padding: '30px' }}>
      <h2>Editar Puntaje</h2>
      <form onSubmit={editarPuntaje}>
        <label>
          DNI del Cliente:
          <input type="text" value={dni} onChange={manejarCambioDni} required />
        </label>
        <br />
        <label>
          Nuevo Puntaje:
          <input
            type="number"
            value={puntaje}
            onChange={manejarCambioPuntaje}
            required
          />
        </label>
        <br />
        <button type="submit">Actualizar Puntaje</button>
      </form>
      {mensaje && <p>{mensaje}</p>}

      {/* Botón para volver al AdminDashboard */}
      <button
        onClick={() => navigate('/admin/dashboard')}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          color: '#fff',
          backgroundColor: '#494949',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Volver al Panel de Administración
      </button>
    </div>
  );
}

export default EditarPuntaje;