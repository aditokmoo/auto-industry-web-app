import asyncHandler from "express-async-handler";
import User from "../models/User";

export const getUsers = asyncHandler(async (req, res) => {
    const { type } = req.query;

    const allowedRoles = ["customer", 'serviceProvider'];

    if(!allowedRoles.includes(type as string)) {
        res.status(400).json({ status: 'error', message: 'Invalid role type. Only "customer" and "serviceProvider" are allowed ' })
        return
    }

    const users = await User.find({ role: type }, 'name email id');

    res.status(200).json({ status: 'success', users });
});