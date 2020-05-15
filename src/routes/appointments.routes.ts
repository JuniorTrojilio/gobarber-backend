import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import Appointment from '../model/appointment.model';

const appointmentsRouter = Router();

const appointments: Appointment[] = [];

appointmentsRouter.post('/', (request, response) => {
    const { provider, date } = request.body;
    const parsedDate = parseISO(date);
    const appointmentDate = startOfHour(parsedDate);
    const findAppointmentWithSameDate = appointments.find(appointment => {
        return isEqual(appointmentDate, appointment.date);
    });

    if (findAppointmentWithSameDate) {
        return response
            .status(400)
            .json({ error: 'This appointment is already booked.' });
    }

    const appointment = new Appointment(provider, appointmentDate);

    appointments.push(appointment);

    return response.json(appointment);
});

export default appointmentsRouter;
