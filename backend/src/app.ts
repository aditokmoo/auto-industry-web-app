import express, { Express } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Routes
import authRoutes from './routes/authRoutes'

const app: Express = express()

// Global middlewares
app.use(cors({
    origin: process.env.FRONTEND_BASE_URL,
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes)

// Unhandled routes

export default app;