import { prisma } from '../config/prisma';
import bcrypt from "bcryptjs";
import { IUser } from '../models/user';

export const registerUserService = async (data: IUser) => {
    try {
        const existedUser = await prisma.user.findUnique({
            where: {
                email: data.email
            }
        })

        if (existedUser) {
            throw new Error(`User with email ${data.email} already exists`)
        }

        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(data.password, salt);

        const user = await prisma.user.create({
            data: {
                email: data.email,
                password: secPassword,
                name: data.name,
                role: data.role
            }
        })

        const { password, ...secureUserData } = user;

        return secureUserData
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`An error occured during user registration: ${error.message}`);
        } else {
            throw new Error('Unknown error during registration');
        }
    }
}