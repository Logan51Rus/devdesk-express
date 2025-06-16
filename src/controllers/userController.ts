import { Request, Response, NextFunction } from "express"
import { registerUserService, loginUserService, refreshTokenService, getUserById, updateUserById, deleteUserById } from "../services/userService";

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, ...data } = req.body;
        const user = await registerUserService(data);

        res.status(201).json(user)
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).send({ error: error.message })
        } else {
            res.status(500).send({ error: 'Unexpected error' });
        }
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const { accessToken, refreshToken, user } = await loginUserService(email, password);

        res.cookie('REFRESH_TOKEN', refreshToken, {
            sameSite: 'lax',
            secure: true,
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
        })
        res.status(200).json({ accessToken, user })
    } catch (error) {
        if (error instanceof Error) {
            res.status(401).send({ message: error.message })
        } 
    }
} 

export const refreshToken = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = req.cookies.REFRESH_TOKEN;

        if (!token) {
            res.status(400).json({ message: 'No refresh token provided'})
            return;
        }

        const { accessToken } = await refreshTokenService(token);

        res.status(200).json({ accessToken });
    } catch (error) {
        if (error instanceof Error) {
            res.status(401).send({ message: error.message })
        } 
    }
}

export const logoutUser = async (_req: Request, res: Response) => {
    res.clearCookie('REFRESH_TOKEN', {
        sameSite: 'lax',
        secure: true,
        httpOnly: true,
    })

    res.status(204).json({ message: 'User successfully logged out'});
}

export const getUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.user as { id: string };
        const user = await getUserById(id);

        res.status(200).json(user)
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).send({ message: error.message })
        } 
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.user as { id: string };
        const data = req.body;

        const updatedUser = await updateUserById(id, data);

        res.status(200).json(updatedUser)
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).send({ message: error.message})
        }
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.user as { id: string };
        
        await deleteUserById(id);

        res.status(204).send('User has been succesfully deleted')
    } catch (error) {
         if (error instanceof Error) {
            res.status(404).send({ message: error.message })
        } 
    }
}