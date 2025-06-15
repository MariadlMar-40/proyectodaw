import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import RutaPrivada from './components/RutaPrivada';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Perfil from './pages/Perfil';
import MisEntrenamientos from './pages/MisEntrenamientos';
import CrearEntrenamiento from './pages/CrearEntrenamiento';
import EntrenamientosPublicos from './pages/EntrenamientosPublicos';
import EditarPerfil from './pages/EditarPerfil';

function App() {
  return (
    <>
      {/* <Navbar /> */}

      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/entrenamientosPublicos" element={<EntrenamientosPublicos />} />

        {/* Rutas protegidas */}
        <Route
          path="/perfil"
          element={
            // <RutaPrivada>
              <Perfil />
            // </RutaPrivada>
          }
        />
        <Route
          path="/editar-perfil"
          element={
            <RutaPrivada>
              <EditarPerfil />
            </RutaPrivada>
          }     
        />
        <Route
          path="/mis-entrenamientos"
          element={
            <RutaPrivada>
              <MisEntrenamientos />
            </RutaPrivada>
          }
        />
        <Route
          path="/crear"
          element={
            <RutaPrivada>
              <CrearEntrenamiento />
            </RutaPrivada>
          }
        />
      </Routes>
    </>
  );
}

export default App;
