export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Log the error for debugging purposes
  console.error('Error:', {
    status: statusCode,
    message: message,
  });

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });

  // Call next middleware if needed
  next();
};
