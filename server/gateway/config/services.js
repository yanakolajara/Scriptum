// ===== CONFIGURACIÓN DE SERVICIOS =====
// Este archivo centraliza todas las URLs de los microservicios
// Aquí defines dónde está cada servicio para que el gateway sepa a dónde enviar las peticiones

export const SERVICES = {
  // Servicio de usuarios - maneja registro, login, perfil, etc.
  USERS_SERVICE: process.env.USER_SERVICE_URL || 'http://localhost:4010',

  // Servicio de entries - maneja los posts/entradas de los usuarios
  ENTRIES_SERVICE: process.env.ENTRY_SERVICE_URL || 'http://localhost:4020',

  // Servicio de contexto de usuario - maneja información adicional del usuario
  USER_CONTEXT_SERVICE:
    process.env.USER_CONTEXT_SERVICE_URL || 'http://localhost:4030',

  // Servicio de chat - maneja mensajes y conversaciones
  CHAT_SERVICE: process.env.CHAT_SERVICE_URL || 'http://localhost:4040',

  // Servicio de email - maneja envío de correos
  EMAIL_SERVICE: process.env.EMAIL_SERVICE_URL || 'http://localhost:4050',
};

// Configuración JWT para el gateway
export const JWT_CONFIG = {
  SECRET:
    process.env.JWT_ACCESS_SECRET ||
    process.env.JWT_SECRET ||
    'secret-key-for-jwt',
  ALGORITHM: process.env.JWT_ALGORITHM || 'HS256',
};

// Configuración CORS para el gateway
export const CORS_CONFIG = {
  credentials: true,
  origin: [
    'http://localhost:3000',
    'https://scriptum-app.netlify.app',
    'https://www.scriptum-app.vercel.app',
    'https://scriptum-app.vercel.app',
  ],
  // origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  exposedHeaders: ['set-cookie'],
};
