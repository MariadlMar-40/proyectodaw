const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Acceso denegado: formato de token inválido' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verifica el token con la clave que usaste para firmarlo
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'R7dh3nA$Wz@#iU9lq2fT$6j#3Pvs8Bkz');

    // Asigna correctamente los datos que necesitas
    req.user = {
      id: decoded.userId,
      email: decoded.email,
    };

    next();
  } catch (err) {
    console.error('Error al verificar el token:', err.message);
    return res.status(403).json({ error: 'Token inválido o expirado' });
  }
};

module.exports = requireAuth;
