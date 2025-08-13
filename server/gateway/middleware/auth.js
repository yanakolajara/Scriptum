// ===== MIDDLEWARE DE AUTENTICACIÓN =====
// Este middleware verifica si el usuario tiene un token JWT válido
// Se usa para proteger rutas que requieren autenticación

import jwt from 'jsonwebtoken';
import { JWT_CONFIG } from '../config/services.js';

/**
 * Middleware que verifica el JWT token
 * - Busca el token en cookies o en el header Authorization
 * - Si el token es válido, agrega la información del usuario a req.user
 * - Si no hay token o es inválido, devuelve error 401
 */
export const authenticateToken = (req, res, next) => {
  // Buscar el token en cookies primero, luego en headers
  const token = req.cookies.access_token || 
                (req.headers.authorization && req.headers.authorization.split(' ')[1]);

  // Si no hay token, denegar acceso
  if (!token) {
    return res.status(401).json({ 
      message: 'Token de acceso requerido' 
    });
  }

  try {
    // Verificar y decodificar el token
    const decoded = jwt.verify(token, JWT_CONFIG.SECRET);
    
    // Agregar información del usuario a la request
    // Esto permitirá que otros middlewares/rutas accedan a req.user
    req.user = decoded;
    
    // Continuar al siguiente middleware o ruta
    next();
  } catch (error) {
    // Token inválido o expirado
    return res.status(403).json({ 
      message: 'Token inválido o expirado' 
    });
  }
};

/**
 * Middleware opcional que verifica el token pero no falla si no existe
 * Útil para rutas que pueden funcionar con o sin autenticación
 */
export const optionalAuth = (req, res, next) => {
  // Buscar el token
  const token = req.cookies.access_token || 
                (req.headers.authorization && req.headers.authorization.split(' ')[1]);

  // Si no hay token, continuar sin usuario
  if (!token) {
    req.user = null;
    return next();
  }

  try {
    // Si hay token, intentar verificarlo
    const decoded = jwt.verify(token, JWT_CONFIG.SECRET);
    req.user = decoded;
  } catch (error) {
    // Si el token es inválido, continuar sin usuario
    req.user = null;
  }
  
  next();
};
