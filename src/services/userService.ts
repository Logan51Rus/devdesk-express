import { Request, Response } from 'express';
import { prisma } from '../config/prisma';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
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

export const loginUserService = async (email: string, password: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (!user) {
            throw new Error('Incorrect email or password');
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const accessToken = jwt.sign({ id: user.id }, 'some-secret-access-key', { expiresIn: '2h' });
            const refreshToken = jwt.sign({ id: user.id }, 'some-secret-refresh-key', { expiresIn: '30d'});

            return {
                accessToken,
                refreshToken,
            }
        } else {
            throw new Error('Incorrect email or password')
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`An error occured during user authorization: ${error.message}`);
        } else {
            throw new Error('Unknown error during authorization');
        }
    }
}