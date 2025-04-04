import React, { useState } from "react";
import { supabase } from "../../services/supabaseClient";

function EditarCliente() {
  const [dni, setDni] = useState("");
  const [cliente, setCliente] = useState(null);
  const [mensaje, setMensaje] = useState("");

  const buscarCliente = async () => {
    if (!dni || dni.length !== 8) {
      setMensaje("Ingrese un DNI válido de 8 dígitos.");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("clientes")
        .select("*")
        .eq("dni", dni);

      if (error || !data.length) {
        setMensaje("No se encontró ningún cliente con ese DNI.");
        setCliente(null);
        return;
      }

      setCliente(data[0]);
      setMensaje("");
    } catch (err) {
      console.error("Error al buscar cliente:", err);
      setMensaje("Error al buscar cliente.");
    }
  };

  const editarCliente = async () => {
    try {
      const { data, error } = await supabase
        .from("clientes")
        .update({
          nombre: cliente.nombre,
          email: cliente.email,
          telefono: cliente.telefono,
          puntaje: cliente.puntaje,
        })
        .eq("dni", dni);

      if (error) {
        console.error("Error al editar cliente:", error);
        setMensaje("Error al editar cliente.");
        return;
      }

      setMensaje("Cliente editado exitosamente.");
    } catch (err) {
      console.error("Error en la actualización:", err);
      setMensaje("Error en la actualización.");
    }
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setCliente({ ...cliente, [name]: value });
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Editar Cliente</h1>
      <div>
        <input
          type="text"
          placeholder="Ingrese DNI"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
          style={{ marginBottom: "10px", padding: "8px", width: "200px" }}
        />
        <button
          onClick={buscarCliente}
          style={{
            marginLeft: "10px",
            padding: "10px",
            fontSize: "16px",
            backgroundColor: "#494949",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Buscar Cliente
        </button>
      </div>
      {mensaje && <p>{mensaje}</p>}
      {cliente && (
        <div>
          <form>
            <label>Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={cliente.nombre}
              onChange={manejarCambio}
              style={{ marginBottom: "10px", padding: "8px", width: "200px" }}
            />
            <br />
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={cliente.email}
              onChange={manejarCambio}
              style={{ marginBottom: "10px", padding: "8px", width: "200px" }}
            />
            <br />
            <label>Teléfono:</label>
            <input
              type="text"
              name="telefono"
              value={cliente.telefono}
              onChange={manejarCambio}
              style={{ marginBottom: "10px", padding: "8px", width: "200px" }}
            />
            <br />
            <label>Puntaje:</label>
            <input
              type="number"
              name="puntaje"
              value={cliente.puntaje}
              onChange={manejarCambio}
              style={{ marginBottom: "10px", padding: "8px", width: "200px" }}
            />
            <br />
            <button
              onClick={editarCliente}
              type="button"
              style={{
                marginTop: "10px",
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: "#494949",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Guardar Cambios
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default EditarCliente;