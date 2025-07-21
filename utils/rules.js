const { param, body, query, check } = require('express-validator');


const name = [
    body('name')
        .notEmpty()
        .withMessage('Name is required.')
        .custom((value) => {
            if (!/^[a-zA-Z][a-zA-Z\s]{3,48}[a-zA-Z]$/.test(value))
                throw new Error(
                    'Name can be 5 to 50 letters. Numbers, special characters not allowed.'
                );

            return true;
        }),
];
const email = [
    body('email')
        .notEmpty()
        .withMessage('Email is required.')
        .isEmail()
        .withMessage('Invalid email format.'),
];
const password = [
    body('password')
        .notEmpty()
        .withMessage('Password is required.')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long.'),
];

const id = [
    param('id')
        .isMongoId()
        .withMessage('Invalid ID format.'),
];


module.exports = {
    name,
    email,
    password,
    id
}