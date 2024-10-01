import express from 'express';
import { createAppointment, getAppointments } from '../controllers/appointmentController';

const router = express.Router();

router.get('/', getAppointments)
router.post('/create', createAppointment)

export default router;