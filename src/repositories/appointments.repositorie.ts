import { isEqual } from 'date-fns';
import Appointment from '../model/appointment.model';

interface CreateAppointmentDTO {
    provider: string;
    date: Date;
}

export default class AppointmentsRepository {
    private appointments: Appointment[];

    constructor() {
        this.appointments = [];
    }

    public all(): Appointment[] {
        return this.appointments;
    }

    public findByDate(date: Date): Appointment | null {
        const findAppointmentDate = this.appointments.find(appointment => {
            return isEqual(date, appointment.date);
        });
        return findAppointmentDate || null;
    }

    public create({ provider, date }: CreateAppointmentDTO): Appointment {
        const appointment = new Appointment({ provider, date });
        this.appointments.push(appointment);
        return appointment;
    }
}
