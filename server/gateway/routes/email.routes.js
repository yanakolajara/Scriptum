// ===== RUTAS DE EMAIL =====
// Estas rutas manejan el envío de correos electrónicos
// Como notificaciones, confirmaciones, recuperación de contraseña, etc.

import express from 'express';
import { authenticateToken, optionalAuth } from '../middleware/auth.js';
import { proxyRequest, buildServiceUrl } from '../utils/proxy.js';
import { SERVICES } from '../config/services.js';

const router = express.Router();

// ===== RUTAS SIN AUTENTICACIÓN =====
// Algunas funciones de email pueden no requerir autenticación (como reset password)

/**
 * POST /email/send-reset-password - Enviar email de reset de contraseña
 * No requiere autenticación porque es para usuarios que olvidaron su contraseña
 */
router.post('/send-reset-password', async (req, res) => {
  try {
    const targetUrl = buildServiceUrl(SERVICES.EMAIL_SERVICE, '/email/send-reset-password');
    const result = await proxyRequest(req, targetUrl);
    
    res.status(result.status).json(result.data);
    
  } catch (error) {
    res.status(error.status || 500).json(error.data || { 
      message: 'Error enviando email de recuperación' 
    });
  }
});

/**
 * POST /email/verify-email - Enviar email de verificación
 * Puede requerir autenticación opcional
 */
router.post('/verify-email', optionalAuth, async (req, res) => {
  try {
    const targetUrl = buildServiceUrl(SERVICES.EMAIL_SERVICE, '/email/verify-email');
    const result = await proxyRequest(req, targetUrl);
    
    res.status(result.status).json(result.data);
    
  } catch (error) {
    res.status(error.status || 500).json(error.data || { 
      message: 'Error enviando email de verificación' 
    });
  }
});

// ===== RUTAS CON AUTENTICACIÓN =====

/**
 * POST /email/send-notification - Enviar email de notificación
 * Requiere autenticación para enviar notificaciones personalizadas
 */
router.post('/send-notification', authenticateToken, async (req, res) => {
  try {
    const targetUrl = buildServiceUrl(SERVICES.EMAIL_SERVICE, '/email/send-notification');
    const result = await proxyRequest(req, targetUrl);
    
    res.status(result.status).json(result.data);
    
  } catch (error) {
    res.status(error.status || 500).json(error.data || { 
      message: 'Error enviando notificación' 
    });
  }
});

/**
 * GET /email/templates - Obtener plantillas de email disponibles
 * Requiere autenticación
 */
router.get('/templates', authenticateToken, async (req, res) => {
  try {
    const targetUrl = buildServiceUrl(SERVICES.EMAIL_SERVICE, '/email/templates');
    const result = await proxyRequest(req, targetUrl);
    
    res.status(result.status).json(result.data);
    
  } catch (error) {
    res.status(error.status || 500).json(error.data || { 
      message: 'Error obteniendo plantillas de email' 
    });
  }
});

export default router;
