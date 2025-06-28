import axios from 'axios';

/**
 * Creates a pre-configured Axios instance for communicating with a specific microservice.
 *
 * @param {Object} options - Configuration options for the Axios instance.
 *
 * @param {string} options.serviceUrl - The base URL of the target microservice.
 * @param {Object} [options.headers] - Optional custom headers to include in each request.
 * @param {Object} [options.rest] - Any additional Axios configuration options.
 *
 * @returns {import('axios').AxiosInstance} Configured Axios instance.
 */
export const createAxiosInstance = (options) => {
  const { serviceUrl, headers = {}, ...rest } = options;

  return axios.create({
    baseURL: serviceUrl,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    ...rest,
  });
};
