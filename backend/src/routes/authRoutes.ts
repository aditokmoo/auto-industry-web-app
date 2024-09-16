import express from 'express';
import { createAccount, verifyAccount, login, refresh, logout } from '../controllers/authController';
import loginLimiter from '../utils/loginLimiter';

const router = express.Router();

router.post('/signup', createAccount);
router.post('/login', loginLimiter, login);
router.get('/verify/:confirmToken', verifyAccount);
router.get('/refresh', refresh);
router.post('/logout', logout)

export default router;