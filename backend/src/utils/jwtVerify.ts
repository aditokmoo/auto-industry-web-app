import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import User from "../models/User";

interface UserInfo {
    id: string;
    name: string;
    role: string;
}

interface DecodedToken {
    UserInfo: UserInfo;
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
    const authToken = req.headers.authorization as string || req.headers.Authorization as string;

    if (!authToken || !authToken.startsWith('Bearer ')) {
        return res.status(400).json({ status: 'error', message: 'NO TOKEN', authToken });
    }

    const token = authToken.split(' ')[1];

    jwt.verify(token as string, process.env.ACCESS_TOKEN!, (err, decode) => {
        if (err) {
            return res.status(400).json({ status: 'error', message: err.message });
        }

        const decoded = decode as DecodedToken;
        (req as any).id = decoded.UserInfo.id;
        (req as any).user = decoded.UserInfo.name;
        (req as any).role = decoded.UserInfo.role;
        next();
    });
};
