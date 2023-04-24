import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel';

// @route POST /api/users
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400).json({ errorCode: 100, message: 'Please add all fields' })
        throw new Error('Please add all fields');
    }

    // Check if user exists
    const userExists = await User.findOne({email});

    if (userExists) {
        res.status(400).json({ errorCode: 101, message: 'User already exists' })
        throw new Error('User already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    if (user) {
        res.status(201).json({
            name: user.name,
            email: user.email,
        });
        // _id: user.id,
        // token: generateToken(user._id),
    } else {
        res.status(400).json({ errorCode: 102, message: 'Invalid user data' });
        throw new Error('Invalid user data');
    }
});

// @route POST /api/users/login
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email });

    if (user && await bcrypt.compare(password, user.password)) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
    } else {
        res.status(400).json({ errorCode: 103, message: 'Invalid credentials' });
        throw new Error('Invalid credentials');
    }
});

// @route GET /api/users/me
const getMe = asyncHandler(async (req, res) => {
    const { _id, name, email } = await User.findById(req.user.id);

    res.status(200).json({
        id: _id,
        name,
        email,
    });
});

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

export {
    registerUser, 
    loginUser, 
    getMe
}
