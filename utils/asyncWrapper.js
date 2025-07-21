const customError = require('./customError');

function asyncWrapper(fn) {
    return (req, res, next) => {
        fn(req, res, next).catch((error) => {
            console.error('Caught error:', error);

            if (error.statusCode === 400) {
                // Validation error
                return res.status(error.statusCode).json({
                    status: false,
                    message: error.validationError[0]?.message, // Send first validation error message
                    error: error.validationError, // Include the full validation error array
                });
            } else {
                // Other errors (e.g., server errors)
                if (!error.statusCode) {
                    error = customError(500, 'Internal Server Error', error);
                }

                return res.status(error.statusCode).json({
                    status: false,
                    message: 'Internal Server Error',
                    error: error, // Send the full error details
                });
            }
        });
    };
}

module.exports = asyncWrapper;