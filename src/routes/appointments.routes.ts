import { Router } from 'express';
import { uuid } from 'uuidv4';
import { startOfHour, parseISO, isEqual } from 'date-fns';

interface Appointment {
    id: string;
    provider: string;
    date: Date;
}

const appointmentsRouter = Router();

const appointments: Appointment[] = [];

appointmentsRouter.post('/', (request, response) => {
    const { provider, date } = request.body;
    const parsedDate = parseISO(date);
    const appointmentDate = startOfHour(parsedDate);
    const findAppointmentWithSameDate = appointments.find(appointment => {
        return isEqual(parsedDate, appointment.date);
    });

    if (findAppointmentWithSameDate) {
        return response
            .status(400)
            .json({ error: 'This appointment is already booked.' });
    }

    const appointment = {
        id: uuid(),
        provider,
        date,
    };

    appointments.push(appointment);

    return response.json(appointment);
});

export default appointmentsRouter;
