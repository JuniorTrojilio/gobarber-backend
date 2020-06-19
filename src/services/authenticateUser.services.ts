import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/user.model';

interface Request {
    email: string;
    password: string;
}
export default class AuthenticateUserService {
    public async execute({ email, password }: Request): Promise<void> {
        const usersRepository = getRepository(User);
    }
}
