import { Router } from 'express';
import AuthenticateUserService from '../services/authenticateUser.services';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
    try {
        const { email, password } = request.body;
        const authenticateUserService = new AuthenticateUserService();
        await authenticateUserService.execute({
            email,
            password,
        });

        return response.json({ message: 'hello' });
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default sessionsRouter;
