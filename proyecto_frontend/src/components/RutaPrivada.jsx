import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Componente de ruta protegida
export default function RutaPrivada({ children }) {
  const { usuario, cargando } = useAuth();

  // Mientras comprobamos si hay sesión, puedes mostrar algo
  if (cargando) return <p>Cargando...</p>;

  // Si no hay usuario, redirige a /login
  if (!usuario) return <Navigate to="/login" />;

  // Si hay usuario, muestra el contenido
  return children;
}
