export const errorHandler = (err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({
      message: err.status === 500 ? 'Internal server error' : err.message,
      error: err.message,
    });
};
