import { Request, Response } from "express";
import { AppointmentModel } from "../models/appointment";

class AppointmentController {

    createAppointment = async (req: Request, res: Response) => {
        console.log(req.body);

        const {
            dateAppointment,
            dateAppointmentHour,
            customerName,
            customerSurname,
            customerNumberPhone,
            customerService
        } = req.body;

        if (!dateAppointment || !dateAppointmentHour || !customerName || !customerSurname || !customerNumberPhone) {
            return res.status(400).json({ message: "Mancano dati importanti" });
        }

        try {
            const existingAppointment = await AppointmentModel.findOne({
                dateAppointment: dateAppointment,
                dateAppointmentHour: dateAppointmentHour,
                customerName: customerName,
                customerSurname: customerSurname
            });

            if (existingAppointment) {
                return res.status(409).json({ message: "L'appuntamento esiste già" });
            }

            const newAppointment = await AppointmentModel.create({
                dateAppointment,
                dateAppointmentHour,
                customerName,
                customerSurname,
                customerNumberPhone,
                customerService
            });

            return res.status(201).json(newAppointment);
        } catch (error) {
            console.error("Errore nella creazione dell'appuntamento:", error);
            return res.status(500).json({ message: "Errore del server" });
        }
    };

    getAllAppointments = async (req: Request, res: Response) => {
        try {
            const appointments = await AppointmentModel.find();

            console.log(appointments);

            const appointmentBlocked = appointments.map(appointment => {
                return {
                    dateAppointment: appointment.dateAppointment,
                    dateAppointmentHour: appointment.dateAppointmentHour,
                }
            })

            return res.status(200).json(appointmentBlocked);
        } catch (error) {
            console.error("Errore nel recupero degli appuntamenti:", error);
            return res.status(500).json({ message: "Errore del server" });
        }
    }
}


export const appointmentController = new AppointmentController();
