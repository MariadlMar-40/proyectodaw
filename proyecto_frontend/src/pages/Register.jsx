import './Register.css';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Register() {
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mensaje, setMensaje] = useState('');

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, contraseña }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMensaje('❌ ' + (data.error || 'Error al registrarse'));
      } else {
        try {
          await login({ email, contraseña });
        } catch (errorLogin) {
          setMensaje('❌ Usuario creado, pero error al iniciar sesión: ' + errorLogin.message);
        }
      }
    } catch (err) {
      console.error(err);
      setMensaje('❌ Error al conectar con el servidor');
    }
  };

  return (
    <>
      <form onSubmit={handleRegister}>
        <h2>Registro</h2>

        <input
          type="email"
          placeholder="Correo electrónico"
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

        <button type="submit">Registrarse</button>
        {mensaje && <p>{mensaje}</p>}
      </form>

      {/* 🔙 Botón para volver a inicio */}
      <Link to="/" className="btn">⬅️ Volver a inicio</Link>
    </>
  );
}

export default Register;
