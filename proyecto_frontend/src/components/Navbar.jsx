import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';


function Navbar() {
  const { usuario, logout } = useAuth();

  return (
    <nav className="navbar">
      <h3>FreeSport</h3>
      <div className="links">
        <Link to="/explorar">Explorar</Link>

        {usuario ? (
          <>
            <Link to="/mis-entrenamientos">Mis entrenamientos</Link>
            <Link to="/crear">Crear entrenamiento</Link>
            <Link to="/perfil">Perfil</Link>
            <button onClick={logout}>Cerrar sesión</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Registro</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
