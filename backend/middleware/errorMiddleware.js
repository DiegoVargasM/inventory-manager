const errorHandler = (err, req, res, next) => {
  // Check if status code exists
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);

  // Set error message
  res.json({
    message: err.message,
    // Set error stack (location of error)
    // Only show in development mode
    stack: process.env.NODE_ENV === "development" ? err.stack : null,
  });
  next();
};

module.exports = { errorHandler };
