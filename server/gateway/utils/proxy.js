// ===== UTILIDAD DE PROXY =====
// Esta función se encarga de reenviar las peticiones a los microservicios
// Es el "corazón" del API Gateway: toma la petición del cliente y la envía al servicio correcto

import axios from 'axios';

/**
 * Función que actúa como proxy entre el cliente y los microservicios
 * @param {Object} req - Request del cliente (Express request object)
 * @param {string} targetUrl - URL completa del microservicio (ej: http://localhost:4010/users)
 * @returns {Promise} - Respuesta del microservicio
 */
export const proxyRequest = async (req, targetUrl) => {
  try {
    // Configurar la petición que se enviará al microservicio
    const config = {
      method: req.method, // GET, POST, PUT, DELETE
      url: targetUrl, // URL del microservicio
      headers: { ...req.headers }, // Copiar todos los headers del cliente
      withCredentials: true, // Mantener cookies para autenticación
    };

    // Si la petición tiene body (POST, PUT), incluirlo
    if (req.body && Object.keys(req.body).length > 0) {
      config.data = req.body;
    }

    // Si hay query parameters (?param=value), incluirlos
    if (req.query && Object.keys(req.query).length > 0) {
      config.params = req.query;
    }
    console.log('🚀 ~ proxyRequest ~ config:', config);

    // Realizar la petición HTTP al microservicio
    console.log('⏳ ~ proxyRequest ~ Making request to:', config.url);
    console.log('⏳ ~ proxyRequest ~ Request method:', config.method);
    console.log('⏳ ~ proxyRequest ~ Request data:', config.data);
    console.log(config);
    const response = await axios(config);
    console.log('✅ ~ proxyRequest ~ Response received:', {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });

    // Retornar la respuesta del microservicio
    return {
      data: response.data,
      status: response.status,
      headers: response.headers,
    };
  } catch (error) {
    // Manejar errores de la petición
    console.error('❌ ~ proxyRequest ~ Error occurred:', {
      message: error.message,
      code: error.code,
      errno: error.errno,
      syscall: error.syscall,
      address: error.address,
      port: error.port,
    });

    if (error.response) {
      // El microservicio respondió con un error (4xx, 5xx)
      throw {
        data: error.response.data,
        status: error.response.status,
        headers: error.response.headers,
      };
    } else if (error.request) {
      // No se pudo conectar al microservicio
      throw {
        data: { message: 'No se pudo conectar al servicio' },
        status: 503, // Service Unavailable
        headers: {},
      };
    } else {
      // Error interno del gateway
      throw {
        data: { message: 'Error interno del gateway' },
        status: 500,
        headers: {},
      };
    }
  }
};

/**
 * Función auxiliar para construir URLs de microservicios
 * @param {string} baseUrl - URL base del servicio (ej: http://localhost:4010)
 * @param {string} path - Path de la petición (ej: /users/123)
 * @returns {string} - URL completa
 */
export const buildServiceUrl = (baseUrl, path) => {
  // Remover slash al final de baseUrl y al inicio de path para evitar duplicados
  const cleanBaseUrl = baseUrl.replace(/\/$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  return `${cleanBaseUrl}${cleanPath}`;
};
