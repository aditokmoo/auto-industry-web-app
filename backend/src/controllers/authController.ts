import asyncHandler from 'express-async-handler';
import User from '../models/User';
import crypto from 'crypto'
import sendEmail from '../utils/sendEmail';

export const createAccount = asyncHandler(async (req, res, next) => {
    const { username, email, password } = req.body;

    // Find user with same credentials
    const user = await User.findOne({ email });
    // Check if that user exist
    if(user) {
        res.status(400).json({ status: 'error', message: 'User already exist' });
        return;
    }
    // Create confirm token for account confirmation
    const confirmToken = crypto.randomBytes(12).toString('hex');
    // Hash confirm token
    const hashConfirmToken = crypto.createHash("sha256").update(confirmToken).digest('hex');
    // Create new user
    const new_user = await User.create({
        username,
        email,
        password,
        confirmToken: hashConfirmToken
    });

    // Send confirmation mail to confirm account
    await sendEmail(new_user, confirmToken)

    res.status(201).json({ status: 'success', message: 'Account has been created', user: new_user });
});

export const verifyAccount = asyncHandler(async (req, res, next) => {
    const { confirmToken } = req.params;
    // Check if confirmation token exist
    if(!confirmToken) {
        res.status(401).json({ status: 'error', message: 'Invalid token' })
        return;
    }
    // Hash confirm token
    const hashConfirmToken = crypto.createHash("sha256").update(confirmToken).digest('hex');
    // Find user
    const user = await User.findOne({ confirmToken: hashConfirmToken, confirmed: false });
    // Check if user exist
    if(!user) {
        res.status(401).json({ status: 'error', message: 'Invalid token, user dosnt exist' })
        return;
    }
    // After verification change data that is verified
    user.confirmed = true;
    user.confirmToken = undefined
    // Save user data
    await user?.save({ validateBeforeSave: false });
    // Send response
    res.status(200).json({ status: 'success', message: 'Account has been verified' });
});

export const login = asyncHandler(async (req, res, next) => {
    res.status(200).json({ status: 'success', message: 'Logged In' });
});

export const refresh = asyncHandler(async (req, res, next) => {
    res.status(200).json({ status: 'success', message: 'Refresh' });
});

export const logout = asyncHandler(async (req, res, next) => {
    res.status(200).json({ status: 'success', message: 'Cookie cleared' });
});