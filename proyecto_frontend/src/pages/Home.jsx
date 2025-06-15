import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Home.css";

function Home() {
  const { usuario, logout } = useAuth(); // Añadido logout

  return (
    <div className="home-wrapper">
      <h1 className="titulo-principal">Bienvenido a FreeSport 🏋️‍♀️</h1>

      <div className="imagen-principal">
        <img src="/img/entrenamiento2.jpg" alt="Entrenamiento destacado" />
      </div>

      <p className="eslogan">Comparte el deporte</p>

      <div className="botones-home">
        {usuario ? (
          <button onClick={logout} className="btn-outline">
            Cerrar sesión ({usuario.nombre || usuario.email})
          </button>
        ) : (
          <>
            <Link to="/register" className="btn">
              Regístrate
            </Link>
            <Link to="/login" className="btn">
              Iniciar sesión
            </Link>
          </>
        )}

        <Link to="/entrenamientosPublicos" className="btn-outline">
          Explorar entrenamientos públicos
        </Link>
      </div>
    </div>
  );
}

export default Home;
