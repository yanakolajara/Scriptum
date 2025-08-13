import { createProxyMiddleware } from 'http-proxy-middleware';

export const getHealth = (req, res, next) => {
  const target = `${process.env.USER_SERVICE_URL}/health`;
  createProxyMiddleware({
    target,
    changeOrigin: true,
  })(req, res, next);
};

export const createUser = (req, res, next) => {
  const target = `${process.env.USER_SERVICE_URL}`;
  createProxyMiddleware({
    target,
    changeOrigin: true,
  })(req, res, next);
};

export const getUser = (req, res, next) => {
  const target = `${process.env.USER_SERVICE_URL}/${req.params.id}`;
  createProxyMiddleware({
    target,
    changeOrigin: true,
  })(req, res, next);
};
export const getUserByEmail = (req, res, next) => {
  const target = `${process.env.USER_SERVICE_URL}/email/${req.params.email}`;
  createProxyMiddleware({
    target,
    changeOrigin: true,
  })(req, res, next);
};
export const editUser = (req, res, next) => {
  const target = `${process.env.USER_SERVICE_URL}/${req.params.id}`;
  createProxyMiddleware({
    target,
    changeOrigin: true,
  })(req, res, next);
};
export const deleteUser = (req, res, next) => {
  const target = `${process.env.USER_SERVICE_URL}/${req.params.id}`;
  createProxyMiddleware({
    target,
    changeOrigin: true,
  })(req, res, next);
};
