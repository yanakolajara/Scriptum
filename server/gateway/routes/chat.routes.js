// ===== RUTAS DE CHAT =====
// Estas rutas manejan mensajes y conversaciones entre usuarios
// Todas requieren autenticación para proteger la privacidad

import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { proxyRequest, buildServiceUrl } from '../utils/proxy.js';
import { SERVICES } from '../config/services.js';

const router = express.Router();

// ===== TODAS LAS RUTAS REQUIEREN AUTENTICACIÓN =====

/**
 * GET /chat/conversations/:userId - Obtener conversaciones de un usuario
 */
router.get('/conversations/:userId', authenticateToken, async (req, res) => {
  try {
    const targetUrl = buildServiceUrl(SERVICES.CHAT_SERVICE, `/chat/conversations/${req.params.userId}`);
    const result = await proxyRequest(req, targetUrl);
    
    res.status(result.status).json(result.data);
    
  } catch (error) {
    res.status(error.status || 500).json(error.data || { 
      message: 'Error obteniendo conversaciones' 
    });
  }
});

/**
 * GET /chat/messages/:conversationId - Obtener mensajes de una conversación
 */
router.get('/messages/:conversationId', authenticateToken, async (req, res) => {
  try {
    const targetUrl = buildServiceUrl(SERVICES.CHAT_SERVICE, `/chat/messages/${req.params.conversationId}`);
    const result = await proxyRequest(req, targetUrl);
    
    res.status(result.status).json(result.data);
    
  } catch (error) {
    res.status(error.status || 500).json(error.data || { 
      message: 'Error obteniendo mensajes' 
    });
  }
});

/**
 * POST /chat/messages - Enviar nuevo mensaje
 */
router.post('/messages', authenticateToken, async (req, res) => {
  try {
    const targetUrl = buildServiceUrl(SERVICES.CHAT_SERVICE, '/chat/messages');
    const result = await proxyRequest(req, targetUrl);
    
    res.status(result.status).json(result.data);
    
  } catch (error) {
    res.status(error.status || 500).json(error.data || { 
      message: 'Error enviando mensaje' 
    });
  }
});

/**
 * POST /chat/conversations - Crear nueva conversación
 */
router.post('/conversations', authenticateToken, async (req, res) => {
  try {
    const targetUrl = buildServiceUrl(SERVICES.CHAT_SERVICE, '/chat/conversations');
    const result = await proxyRequest(req, targetUrl);
    
    res.status(result.status).json(result.data);
    
  } catch (error) {
    res.status(error.status || 500).json(error.data || { 
      message: 'Error creando conversación' 
    });
  }
});

export default router;
