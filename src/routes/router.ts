import express, { Request, Response } from 'express';
import { appointmentController } from '../controllers/appointmentController';

const router = express.Router();

router.post('/calendar/createAppointment', appointmentController.createAppointment)
router.get('/calendar/getAppointments', appointmentController.getAllAppointments)

export default router;