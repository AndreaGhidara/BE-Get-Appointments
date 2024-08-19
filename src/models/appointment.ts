import mongoose, { Schema, Document } from 'mongoose';

interface IAppointment extends Document {
    dateAppointment: string;
    dateAppointmentHour: string;
    customerName: string;
    customerSurname: string;
    customerNumberPhone: string;
    customerService: string;
}

const AppointmentSchema: Schema = new Schema({
    dateAppointment: { type: String, required: true },
    dateAppointmentHour: { type: String, required: true },
    customerName: { type: String, required: true },
    customerSurname: { type: String, required: true },
    customerNumberPhone: { type: String, required: true },
    customerService: { type: String, required: false }
});

export const AppointmentModel = mongoose.model<IAppointment>('Appointment', AppointmentSchema);
