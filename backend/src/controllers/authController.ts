import asyncHandler from 'express-async-handler';
import User from '../models/User';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
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
    const { email, password } = req.body;
    // Check if email and password is entered
    if(!email || !password) {
        res.status(400).json({ status: 'error', message: 'All fields are required' })
        return;
    }
    // Find user
    const user = await User.findOne({ email }).exec();
    // Check if user exist
    if(!user) {
        res.status(401).json({ status: 'error', message: "Unauthorized, user dosn't exist" })
        return;
    }
    // Check if user account is verified
    if(!user.confirmed) {
        res.status(401).json({ status: 'error', message: 'You need to verify first. Verification link is on your email' })
        return;
    }
    // Match passwords
    const match = await bcrypt.compare(password, user.password);
    // Check if password is matching
    if(!match) {
        res.status(401).json({ status: 'error', message: "Password dosn't match" })
        return;
    }

    // Create access token
    const accessToken = jwt.sign(
        {
            UserInfo: {
                username: user.username,
                role: user.role
            }
        },
        process.env.ACCESS_TOKEN!,
        { expiresIn: '30m' }
    );

    // Create refresh token
    const refreshToken = jwt.sign(
        { username: user.username },
        process.env.REFRESH_TOKEN!,
        { expiresIn: '1d' }
    );

    // Create secure cookie with refresh token
    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({ status: 'success', role: user.role, accessToken });
});

export const refresh = asyncHandler(async (req, res, next) => {
    const cookies = req.cookies;
    
    // Check if cookie exists
    if (!cookies?.jwt) {
        res.status(401).json({ status: 'error', message: "Unauthorized" });
        return;
    }

    const refreshToken = cookies.jwt;

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN!, async (err: VerifyErrors | null, decode: JwtPayload | string | undefined) => {
        if (err) {
            res.status(403).json({ status: 'error', message: 'Forbidden' });
            return;
        }

        // Ensure decode is a JwtPayload and not a string or undefined
        if (typeof decode !== 'object' || !decode) {
            res.status(403).json({ status: 'error', message: 'Invalid token' });
            return;
        }

        const username = (decode as JwtPayload).username;
        
        if (!username) {
            res.status(403).json({ status: 'error', message: 'Invalid token data' });
            return;
        }

        // Find user
        const user = await User.findOne({ username });
        if (!user) {
            res.status(401).json({ status: 'error', message: 'Unauthorized' });
            return;
        }

        // Create access token
        const accessToken = jwt.sign(
            {
                UserInfo: {
                    username: user.username,
                    role: user.role,
                },
            },
            process.env.ACCESS_TOKEN!,
            { expiresIn: '1d' }
        );
        
        res.status(200).json({ status: 'success', role: user.role, accessToken });
    });
});

export const logout = asyncHandler(async (req, res, next) => {
    const cookies = req.cookies;
    // Check if cookie exist
    if(!cookies?.jwt) {
        res.sendStatus(204)
        return;
    }
    // Clear cookie
    res.clearCookie('jwt', {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
    })
    // Send response
    res.status(200).json({ status: 'success', message: 'Cookie cleared' });
});