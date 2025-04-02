import React, { useState } from "react";
import { supabase } from "../services/supabaseClient";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) throw error;
      setMensaje("Registro exitoso. Por favor verifica tu correo.");
    } catch (error) {
      setMensaje(`Error al registrarse: ${error.message}`);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Registro de Usuario</h1>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginBottom: "10px", padding: "8px", width: "200px" }}
        />
        <br />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: "10px", padding: "8px", width: "200px" }}
        />
        <br />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            color: "#fff",
            backgroundColor: "#494949",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Registrarse
        </button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

export default Register;