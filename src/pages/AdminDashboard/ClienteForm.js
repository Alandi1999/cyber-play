import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate para redirigir
import { supabase } from '../../services/supabaseClient';

function ClienteForm() {
  const [cliente, setCliente] = useState({
    dni: '',
    nombre: '',
    email: '',
    telefono: '',
    puntaje: 0,
  });
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate(); // Hook para redirigir al dashboard

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
    <div style={styles.container}>
      <h2 style={styles.title}>Registrar Cliente</h2>
      <form onSubmit={manejarSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="dni" style={styles.label}>
            DNI:
          </label>
          <input
            type="text"
            name="dni"
            id="dni"
            value={cliente.dni}
            onChange={manejarCambio}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="nombre" style={styles.label}>
            Nombre:
          </label>
          <input
            type="text"
            name="nombre"
            id="nombre"
            value={cliente.nombre}
            onChange={manejarCambio}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={cliente.email}
            onChange={manejarCambio}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="telefono" style={styles.label}>
            Teléfono:
          </label>
          <input
            type="text"
            name="telefono"
            id="telefono"
            value={cliente.telefono}
            onChange={manejarCambio}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="puntaje" style={styles.label}>
            Puntaje:
          </label>
          <input
            type="number"
            name="puntaje"
            id="puntaje"
            value={cliente.puntaje}
            onChange={manejarCambio}
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>Registrar</button>
      </form>
      {mensaje && <p style={styles.message}>{mensaje}</p>}

      {/* Estilos responsivos */}
      <style>
        {`
          @media (max-width: 430px) {
            .container {
              padding: 15px;
            }

            .title {
              font-size: 1.5em;
            }

            .form {
              display: flex;
              flex-direction: column;
              gap: 10px;
            }

            .formGroup {
              width: 100%;
            }

            .label {
              font-size: 14px;
              margin-bottom: 5px;
            }

            .input {
              font-size: 14px;
              width: 100%;
              padding: 10px;
              margin-bottom: 10px;
            }

            .button {
              font-size: 1em;
              padding: 10px;
              width: 100%;
            }
          }
        `}
      </style>
    </div>
  );
}

const styles = {
  container: {
    padding: '30px',
    textAlign: 'center',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    maxWidth: '300px',
  },
  label: {
    marginBottom: '5px',
    fontSize: '16px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#494949',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  message: {
    marginTop: '10px',
    color: 'red',
  },
};

export default ClienteForm;