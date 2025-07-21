const { validationResult } = require('express-validator');
const customError = require('./customError');

function validate(req) {
    const errors = validationResult(req).formatWith((error) => {
        return {
            field:
                error?.path == null || error?.path == ''
                    ? undefined
                    : error.path,
            message: error?.msg,
        };
    });

    if (!errors.isEmpty()) {
        // Throw a custom error with detailed validation errors
        throw customError(400, 'Validation Failed', errors.array());
    }
}

module.exports = validate;
