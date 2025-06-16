import { prisma } from '../config/prisma';
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IUser, UserUpdateData } from '../models/user';

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
            const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN!, { expiresIn: '2h' });
            const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN!, { expiresIn: '30d'});

            return {
                accessToken,
                refreshToken,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
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

export const refreshTokenService = async (refreshToken: string) => {
    let payload;

    try {
        payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN!) as JwtPayload
        const { id } = payload;
        const accessToken = jwt.sign({ id }, process.env.ACCESS_TOKEN!, { expiresIn: '2h' });

        return {
             accessToken
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`An error occured during refresh of token: ${error.message}`);
        } else {
            throw new Error('Unknown error during refresh of token');
        }
    }
}

export const getUserById = async (userId: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!user) {
            throw new Error(`User with id ${userId} is not found.`)
        }

        const { password, ...userData } = user;

        return userData
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`An error occured while receiving user data: ${error.message}`);
        } else {
            throw new Error('Unknown error occured while receiving user data');
        }
    }
}

export const updateUserById = async (userId: string, data: UserUpdateData) => {
    try {
        const updatedUser = await prisma.user.update({
            where: {
                id: userId
            },
            data: data
        })

        const { password, ...updatedUserData } = updatedUser;

        return updatedUserData;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`An error occured while updating user data: ${error.message}`);
        } else {
            throw new Error('Unknown error occured while updating user data');
        }
    }
}

export const deleteUserById = async (userId: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!user) {
            throw new Error(`User with id ${userId} is not found.`)
        }

        await prisma.user.delete({
            where: {
                id: userId
            }
        })
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`An error occured while deleting user: ${error.message}`);
        } else {
            throw new Error('Unknown error occured while deleting user');
        }
    }
} 
