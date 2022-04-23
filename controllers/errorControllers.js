const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // Operational trusted Error: Send message to the client
  if ((err, isOperational)) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    //   Programming or other unknownn errors: don't leak details to the client
  } else {
    //   1) Log the error
    console.error('Error ', err);

    // 2) S end generic message
    res.status(500).json({
      status: 'fail',
      message: 'Oops! Something went wrong',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    return sendErrorDev(err, res);
  } else if ((process.env.NODE_ENV = 'production')) {
    return sendErrorProd(err, res);
  }
};
