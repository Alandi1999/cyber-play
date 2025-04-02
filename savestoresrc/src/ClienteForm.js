import React, { useState } from 'react';
import { supabase } from './supabaseClient';


function ClienteForm() {
  const [cliente, setCliente] = useState({
    dni: '',
    nombre: '',
    email: '',
    telefono: '',
    puntaje: 0,
  });
  const [mensaje, setMensaje] = useState('');

  const manejarCambio = (e) => {
    const { name, value } = e.target; // Extrae el nombre y valor del campo
    setCliente({ ...cliente, [name]: value }); // Actualiza el estado del cliente
  };
  
  const manejarSubmit = async (e) => {
    e.preventDefault();
  
    if (!/^\d+$/.test(cliente.dni)) {
      setMensaje('El DNI debe contener solo números');
      return;
    }
  
    if (cliente.dni.length !== 8) {
      setMensaje('El DNI debe tener exactamente 8 dígitos');
      return;
    }
  
    // Verificar si ya existe un cliente con el mismo DNI
    const { data: existente, error: errorExistente } = await supabase
      .from('clientes')
      .select('*')
      .eq('dni', cliente.dni);

    if (errorExistente) {
      console.error('Error verificando DNI existente:', errorExistente);
      setMensaje('Error al verificar el DNI');
      return;
    }

    if (existente.length > 0) {
      setMensaje('Ya existe un cliente con este DNI');
      return;
    }

    // Registro del cliente en Supabase
    const { data, error } = await supabase.from('clientes').insert([cliente]);

    if (error) {
      console.error('Error al registrar cliente:', error);
      setMensaje('Error al registrar cliente: ' + error.message);
    } else {
      console.log('Cliente registrado exitosamente:', data);
      setMensaje('Cliente registrado exitosamente');
      setCliente({ dni: '', nombre: '', email: '', telefono: '', puntaje: 0 }); // Reinicia el formulario
    }
  };
  return (
    <div>
      <h2>Registrar Cliente</h2>
      <form onSubmit={manejarSubmit}>
        <label>
          DNI:
          <input type="text" name="dni" value={cliente.dni} onChange={manejarCambio} required />
        </label>
        <br />
        <label>
          Nombre:
          <input type="text" name="nombre" value={cliente.nombre} onChange={manejarCambio} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" value={cliente.email} onChange={manejarCambio} />
        </label>
        <br />
        <label>
          Teléfono:
          <input type="text" name="telefono" value={cliente.telefono} onChange={manejarCambio} />
        </label>
        <br />
        <label>
          Puntaje:
          <input type="number" name="puntaje" value={cliente.puntaje} onChange={manejarCambio} />
        </label>
        <br />
        <button type="submit">Registrar</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

export default ClienteForm;
