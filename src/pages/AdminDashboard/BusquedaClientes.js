import React, { useState } from 'react';
import { supabase } from '../../services/supabaseClient';


function ClienteBusqueda() {
  const [dni, setDni] = useState('');
  const [cliente, setCliente] = useState(null);
  const [mensaje, setMensaje] = useState('');

  const manejarCambio = (e) => {
    setDni(e.target.value);
  };

  const buscarCliente = async (e) => {
    e.preventDefault();

    // Llamada a la base de datos Supabase
    const { data, error } = await supabase
      .from('clientes')
      .select('*')
      .eq('dni', dni); // Filtro por DNI

    if (error) {
      console.error('Error buscando cliente:', error);
      setMensaje('Error al buscar cliente');
      setCliente(null);
    } else if (data.length === 0) {
      setMensaje('No se encontró ningún cliente con ese DNI');
      setCliente(null);
    } else {
      setCliente(data[0]); // El primer cliente encontrado
      setMensaje('');
    }
  };

  return (
    <div>
      <h2>Buscar Cliente</h2>
      <form onSubmit={buscarCliente}>
        <label>
          DNI:
          <input type="text" value={dni} onChange={manejarCambio} required />
        </label>
        <button type="submit">Buscar</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
      {cliente && (
        <div>
          <h3>Información del Cliente:</h3>
          <p><strong>Nombre:</strong> {cliente.nombre}</p>
          <p><strong>Email:</strong> {cliente.email}</p>
          <p><strong>Teléfono:</strong> {cliente.telefono}</p>
          <p><strong>Puntaje:</strong> {cliente.puntaje}</p>
        </div>
      )}
    </div>
  );
}

export default ClienteBusqueda;
