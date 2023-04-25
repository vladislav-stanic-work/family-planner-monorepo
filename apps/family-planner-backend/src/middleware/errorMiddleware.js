const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

const responseWrapper = (res, statusCode, errorCode, data) => {
  res.status(statusCode).json({
    errorCode: errorCode,
    data: data,
    success: [200, 201].includes(statusCode),
  });
};

export { errorHandler, responseWrapper };
