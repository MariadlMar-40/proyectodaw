import { useState, useEffect } from 'react';
import supabase from '../supabase/supabaseClient';
import { useAuth } from '../context/AuthContext';
import './Chat.css';

function Chat() {
  const { usuario } = useAuth();
  const [mensaje, setMensaje] = useState('');
  const [mensajes, setMensajes] = useState([]);

  // Cargar mensajes al iniciar
  useEffect(() => {
    const obtenerMensajes = async () => {
      const { data, error } = await supabase
        .from('chat_mensajes')
        .select('*')
        .order('creado_en', { ascending: true });

      if (error) {
        console.error('Error al obtener mensajes:', error);
      } else {
        setMensajes(data);
      }
    };

    obtenerMensajes();
  }, []);

  // Enviar mensaje
  const enviarMensaje = async (e) => {
    e.preventDefault();
    if (!mensaje.trim()) return;

    const nuevo = {
      contenido: mensaje,
      usuario_id: usuario?.email || 'Anónimo',
      mensaje_responde_a: null, // sin respuestas por ahora
    };

    const { data, error } = await supabase
      .from('chat_mensajes')
      .insert([nuevo]);

    if (error) {
      console.error('Error al enviar mensaje:', error);
    } else {
      setMensajes((prev) => [...prev, ...data]);
      setMensaje('');
    }
  };

  return (
    <div className="chat-container">
      <h3>Chat</h3>

      <div className="chat-mensajes">
        {mensajes.length === 0 ? (
          <p className="vacio">No hay mensajes aún.</p>
        ) : (
          mensajes.map((msg) => (
            <div key={msg.id} className="mensaje">
              <strong>{msg.usuario_id}</strong>: {msg.contenido}
              <div className="fecha">
                {new Date(msg.creado_en).toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>

      <form onSubmit={enviarMensaje} className="chat-form">
        <input
          type="text"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          placeholder="Escribe un mensaje..."
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default Chat;
