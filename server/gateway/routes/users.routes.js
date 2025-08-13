import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { SERVICES } from '../config/services.js';
import { createProxyMiddleware } from 'http-proxy-middleware';

const router = express.Router();
const proxyConfig = { target: SERVICES.USERS_SERVICE, changeOrigin: true };

router.get('/health', createProxyMiddleware(proxyConfig));
router.post('/', createProxyMiddleware(proxyConfig));

router.use(authenticateToken);

router.get('/:id', createProxyMiddleware(proxyConfig));
router.get('/email/:email', createProxyMiddleware(proxyConfig));
router.put('/:id', createProxyMiddleware(proxyConfig));
router.delete('/:id', createProxyMiddleware(proxyConfig));

export default router;
