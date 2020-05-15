import { startOfHour } from 'date-fns';
import Appointment from '../model/appointment.model';
import AppointmentsRepository from '../repositories/appointments.repositorie';

interface Request {
    provider: string;
    date: Date;
}

export default class CreateAppointmentService {
    private appointmentsRepository: AppointmentsRepository;

    constructor(appointmentRepository: AppointmentsRepository) {
        this.appointmentsRepository = appointmentRepository;
    }

    public execute({ provider, date }: Request): Appointment {
        const appointmentDate = startOfHour(date);
        const findAppointmentDate = this.appointmentsRepository.findByDate(
            appointmentDate,
        );

        if (findAppointmentDate) {
            throw Error('This appointment already booked.');
        }

        const appointment = this.appointmentsRepository.create({
            provider,
            date: appointmentDate,
        });

        return appointment;
    }
}
