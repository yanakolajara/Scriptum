// ===== RUTAS DE USER CONTEXT =====
// Estas rutas manejan el contexto adicional de los usuarios
// Como preferencias, configuraciones, historial, etc.

import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { proxyRequest, buildServiceUrl } from '../utils/proxy.js';
import { SERVICES } from '../config/services.js';

const router = express.Router();

// ===== TODAS LAS RUTAS REQUIEREN AUTENTICACIÓN =====
// El contexto de usuario siempre es información sensible

/**
 * GET /user-context/:userId - Obtener contexto de usuario
 */
router.get('/:userId', authenticateToken, async (req, res) => {
  try {
    const targetUrl = buildServiceUrl(SERVICES.USER_CONTEXT_SERVICE, `/user-context/${req.params.userId}`);
    const result = await proxyRequest(req, targetUrl);
    
    res.status(result.status).json(result.data);
    
  } catch (error) {
    res.status(error.status || 500).json(error.data || { 
      message: 'Error obteniendo contexto de usuario' 
    });
  }
});

/**
 * POST /user-context - Crear contexto inicial de usuario
 */
router.post('/', authenticateToken, async (req, res) => {
  try {
    const targetUrl = buildServiceUrl(SERVICES.USER_CONTEXT_SERVICE, '/user-context');
    const result = await proxyRequest(req, targetUrl);
    
    res.status(result.status).json(result.data);
    
  } catch (error) {
    res.status(error.status || 500).json(error.data || { 
      message: 'Error creando contexto de usuario' 
    });
  }
});

/**
 * PUT /user-context/:userId - Actualizar contexto de usuario
 */
router.put('/:userId', authenticateToken, async (req, res) => {
  try {
    const targetUrl = buildServiceUrl(SERVICES.USER_CONTEXT_SERVICE, `/user-context/${req.params.userId}`);
    const result = await proxyRequest(req, targetUrl);
    
    res.status(result.status).json(result.data);
    
  } catch (error) {
    res.status(error.status || 500).json(error.data || { 
      message: 'Error actualizando contexto de usuario' 
    });
  }
});

/**
 * GET /user-context/:userId/preferences - Obtener preferencias específicas
 */
router.get('/:userId/preferences', authenticateToken, async (req, res) => {
  try {
    const targetUrl = buildServiceUrl(SERVICES.USER_CONTEXT_SERVICE, `/user-context/${req.params.userId}/preferences`);
    const result = await proxyRequest(req, targetUrl);
    
    res.status(result.status).json(result.data);
    
  } catch (error) {
    res.status(error.status || 500).json(error.data || { 
      message: 'Error obteniendo preferencias de usuario' 
    });
  }
});

export default router;
