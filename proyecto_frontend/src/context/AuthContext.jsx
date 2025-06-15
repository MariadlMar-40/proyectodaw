import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiGet, apiPost } from "../services/api";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [entrenamientos, setEntrenamientos] = useState([]); // NUEVO estado
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getPerfil = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setCargando(false);
        return;
      }

      try {
        const data = await apiGet('/auth/perfil', token);
        setUsuario(data.perfil);                  //perfil del usuario
        setEntrenamientos(data.entrenamientos);   //lista de entrenamientos
      } catch (err) {
        console.error('Error al obtener el perfil:', err.message);
        localStorage.removeItem('token');
        setUsuario(null);
        setEntrenamientos([]); // limpiar si hay error
      } finally {
        setCargando(false);
      }
    };

    getPerfil();
  }, []);

  const login = async (credenciales) => {
  try {
    const res = await apiPost('/auth/login', credenciales);
    localStorage.setItem('token', res.token);

    // ✅ Volvemos a cargar perfil completo con entrenamientos
    const perfil = await apiGet('/auth/perfil', res.token);

    setUsuario(perfil.perfil);
    setEntrenamientos(perfil.entrenamientos);
    navigate('/perfil');
  } catch (err) {
    console.error('Error en login:', err.message);
    throw err;
  }
};


  const logout = () => {
    localStorage.removeItem('token');
    setUsuario(null);
    setEntrenamientos([]); // Limpiar entrenamientos al salir
    navigate('/');
  };

  return (
    <AuthContext.Provider
      value={{ usuario,  setUsuario, entrenamientos, cargando, login, logout }} 
    >
      {children}
    </AuthContext.Provider>
  );
};
