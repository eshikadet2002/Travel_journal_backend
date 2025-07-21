const asyncWrapper = require('../utils/asyncWrapper');
const validate = require('../utils/validate');
const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');

// Get All Users
const getAllUsers = asyncWrapper(async (req, res) => {
    validate(req);

    const users = await userModel.find();

    if (!users || users.length === 0) {
        return res.status(404).json({
            status: false,
            message: 'No Users Found',
        });
    }

    return res.status(200).json({
        status: true,
        message: 'Users fetched successfully',
        data: users,
        metaData: {
            totalUsers: users.length,
            page: 1,
            totalPages: 1,
        }
    });
});

// Create New User
const createUser = asyncWrapper(async (req, res) => {
    validate(req);

    const { name, email, password } = req.body;

    const isUserExist = await userModel.findOne({ email });
    if (isUserExist) {
        return res.status(400).json({
            status: false,
            message: 'User already exists',
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
        name,
        email,
        password: hashedPassword,
        status: 'active',
    });

    if (!newUser) {
        return res.status(400).json({
            status: false,
            message: 'User not created',
        });
    }

    return res.status(201).json({
        status: true,
        message: 'User created successfully',
        data: newUser,
    });
});

// Get User by ID
const getUserById = asyncWrapper(async (req, res) => {
    validate(req);

    const { id } = req.params;

    const user = await userModel.findById(id);

    if (!user) {
        return res.status(404).json({
            status: false,
            message: 'User not found',
        });
    }

    return res.status(200).json({
        status: true,
        message: 'User found',
        data: user,
    });
});

// Update User
const updateUser = asyncWrapper(async (req, res) => {
    validate(req);

    const { id } = req.params;
    const { name, email, password, age } = req.body;

    if (!password || password.length < 6) {
        return res.status(400).json({
            status: false,
            message: 'Password must be at least 6 characters long',
        });
    }

    const user = await userModel.findById(id);
    if (!user) {
        return res.status(404).json({
            status: false,
            message: 'User not found',
        });
    }

    if (user.email !== email) {
        const emailExists = await userModel.findOne({ email });
        if (emailExists) {
            return res.status(400).json({
                status: false,
                message: 'Email already exists',
            });
        }
    }

    const updatedUser = await userModel.findByIdAndUpdate(
        id,
        {
            name,
            email,
            age,
            password: await bcrypt.hash(password, 10),
        },
        { new: true }
    );

    if (!updatedUser) {
        return res.status(400).json({
            status: false,
            message: 'User not updated',
        });
    }

    return res.status(200).json({
        status: true,
        message: 'User updated successfully',
        data: updatedUser,
    });
});

module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    updateUser
};