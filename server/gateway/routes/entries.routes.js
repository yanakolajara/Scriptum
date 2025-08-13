// ===== RUTAS DE ENTRIES =====
// Estas rutas manejan todas las peticiones relacionadas con entradas/posts
// Todas las operaciones requieren autenticación

import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { proxyRequest, buildServiceUrl } from '../utils/proxy.js';
import { SERVICES } from '../config/services.js';

const router = express.Router();

// ===== TODAS LAS RUTAS DE ENTRIES REQUIEREN AUTENTICACIÓN =====

/**
 * GET /entries - Obtener todas las entries
 * Podría ser público o privado dependiendo de tu lógica de negocio
 */
router.get('/', authenticateToken, async (req, res) => {
  try {
    const targetUrl = buildServiceUrl(SERVICES.ENTRIES_SERVICE, '/entries');
    const result = await proxyRequest(req, targetUrl);
    
    res.status(result.status).json(result.data);
    
  } catch (error) {
    res.status(error.status || 500).json(error.data || { 
      message: 'Error obteniendo entries' 
    });
  }
});

/**
 * GET /entries/:id - Obtener entry por ID
 */
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const targetUrl = buildServiceUrl(SERVICES.ENTRIES_SERVICE, `/entries/${req.params.id}`);
    const result = await proxyRequest(req, targetUrl);
    
    res.status(result.status).json(result.data);
    
  } catch (error) {
    res.status(error.status || 500).json(error.data || { 
      message: 'Error obteniendo entry' 
    });
  }
});

/**
 * POST /entries - Crear nueva entry
 */
router.post('/', authenticateToken, async (req, res) => {
  try {
    const targetUrl = buildServiceUrl(SERVICES.ENTRIES_SERVICE, '/entries');
    const result = await proxyRequest(req, targetUrl);
    
    res.status(result.status).json(result.data);
    
  } catch (error) {
    res.status(error.status || 500).json(error.data || { 
      message: 'Error creando entry' 
    });
  }
});

/**
 * PUT /entries/:id - Actualizar entry
 */
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const targetUrl = buildServiceUrl(SERVICES.ENTRIES_SERVICE, `/entries/${req.params.id}`);
    const result = await proxyRequest(req, targetUrl);
    
    res.status(result.status).json(result.data);
    
  } catch (error) {
    res.status(error.status || 500).json(error.data || { 
      message: 'Error actualizando entry' 
    });
  }
});

/**
 * DELETE /entries/:id - Eliminar entry
 */
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const targetUrl = buildServiceUrl(SERVICES.ENTRIES_SERVICE, `/entries/${req.params.id}`);
    const result = await proxyRequest(req, targetUrl);
    
    res.status(result.status).json(result.data);
    
  } catch (error) {
    res.status(error.status || 500).json(error.data || { 
      message: 'Error eliminando entry' 
    });
  }
});

/**
 * GET /entries/user/:userId - Obtener entries de un usuario específico
 */
router.get('/user/:userId', authenticateToken, async (req, res) => {
  try {
    const targetUrl = buildServiceUrl(SERVICES.ENTRIES_SERVICE, `/entries/user/${req.params.userId}`);
    const result = await proxyRequest(req, targetUrl);
    
    res.status(result.status).json(result.data);
    
  } catch (error) {
    res.status(error.status || 500).json(error.data || { 
      message: 'Error obteniendo entries del usuario' 
    });
  }
});

export default router;
