import "./Login.css";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [mensaje, setMensaje] = useState("");
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login({ email, contraseña });
      setMensaje("✅ Sesión iniciada correctamente");
    } catch (error) {
      setMensaje("❌ Error al iniciar sesión: " + error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <h2>Iniciar sesión</h2>

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          required
        />

        <button type="submit">Entrar</button>

        {mensaje && <p>{mensaje}</p>}
      </form>

      {/* 🔙 Botón para volver a inicio */}
      <Link to="/" className="btn">⬅️ Volver a inicio</Link>
    </>
  );
}

export default Login;
