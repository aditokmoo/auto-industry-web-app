import express, { Express } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Routes
import authRoutes from './routes/authRoutes'
import userRoutes from './routes/userRoutes'

const app: Express = express()

// middlewares
app.use(cors({
    origin: process.env.FRONTEND_BASE_URL,
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes )

// Unhandled routes

export default app;