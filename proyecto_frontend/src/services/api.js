// Base del backend (ajustar si se cambia de puerto o dominio)
const API_BASE = import.meta.env.VITE_BACKEND_URL;

/**
 * Realiza una petición GET autenticada (si hay token).
 */
export async function apiGet(endpoint, token) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: token
      ? { Authorization: `Bearer ${token}` }
      : undefined,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error al obtener datos');
  return data;
}

/**
 * Realiza una petición POST con datos en el body.
 */
export async function apiPost(endpoint, body, token) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error al enviar datos');
  return data;
}

/**
 * Actualiza datos en el backend con PUT.
 */
export async function apiPut(endpoint, body, token) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error al actualizar datos');
  return data;
}

/**
 * Elimina un recurso en el backend con DELETE.
 */
export async function apiDelete(endpoint, token) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: 'DELETE',
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error al eliminar recurso');
  return data;
}
