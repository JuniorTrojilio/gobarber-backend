import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentRepository from '../repositories/appointments.repositorie';
import CreateAppointmentService from '../services/createAppointment.services';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentRepository();

appointmentsRouter.get('/', (request, response) => {
    const appointments = appointmentsRepository.all();
    return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
    const { provider, date } = request.body;
    const parsedDate = parseISO(date);
    try {
        const createAppointment = new CreateAppointmentService(
            appointmentsRepository,
        );
        const appointment = createAppointment.execute({
            provider,
            date: parsedDate,
        });
        return response.json(appointment);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default appointmentsRouter;
