exports.errorMiddleware = (err, req, res, next) => {
  const errorArray = Array.isArray(err.message) ? err.message : [err.message];

  return res.status(err.status || 500).json({
    success: false,
    message: errorArray,
    data: {},
  });
};
