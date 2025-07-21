const mongoose = require('mongoose');
const schema = mongoose.Schema;

const UsersSchema = new schema(
    {
    name: {
        type: String,
        trim: true,
        maxlength: [15, 'Name must be at most 15 characters long']
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'Email is required'],
        unique: true,
        validate: {
            validator: (value) => 
                value === null ||
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            message: 'Invalid email format'
        },
    },
    password: {
            type: String,
            trim: true,
            required: [true, 'Password is required'],
            validate: {
                validator: (value) =>
                   value.length >= 6,
                message: 'Password must be at least 6 characters long.',
            },
        },
         status: {
            type: String,
            enum: ['active', 'inactive', 'pending', 'suspended'],
            default: 'active',
        },
    },
    { timestamps: true }
);
const usersModel = mongoose.model('users', UsersSchema);

module.exports = {
    usersModel,
};