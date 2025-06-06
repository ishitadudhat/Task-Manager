const blacklistTokenModel = require('../Models/blacklistToken.model');
const userModel = require('../Models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');

module.exports.registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    // create a user using three values
    const { fullname, email, password } = req.body;
    // Strong password using hashPassword method created in user.model.js
    const hashPassword = await userModel.hashPassword(password);
    // register user using userService
    const user = await userService.createUser({
        fullname,
        email,
        password: hashPassword
    });

    // generate token using generateAuthToken method created in user.model.js
    const token = user.generateAuthToken();
    res.status(201).json({ token, user });
}

module.exports.loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    // login user using email and password
    const { email, password } = req.body;
    // find user using email
    const user = await userModel.findOne({ email }).select('+password');
    if (!user) {
        return res.status(401).json({
            message: 'Invalid email'
        });
    }
    // compare password using comparePassword method created in user.model.js
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({
            message: 'Invalid password'
        });
    }
    // generate token using generateAuthToken method created in user.model.js
    const token = user.generateAuthToken();
    res.cookie('token', token);

    res.status(200).json({ token, user });
}

module.exports.getUserProfile = async (req, res) => {
    res.status(200).json(req.user);
}

module.exports.logoutUser = async (req, res) => {
    res.clearCookie('token');

    const token = req.cookies.token || req.headers.authorization.split(' ')[1]

    await blacklistTokenModel.create({ token });
    res.status(200).json({
        message: 'Logged out successfully'
    });
}