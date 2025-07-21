function customError(statusCode = 500, message = 'Internal Server Error', validationError = null) {
    const error = new Error(message);
    error.statusCode = statusCode;
    error.validationError = validationError; 
    return error;
  }
  
  module.exports = customError;
  