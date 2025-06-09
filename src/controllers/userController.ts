import { Request, Response, NextFunction } from "express"
import { registerUserService, loginUserService } from "../services/userService";

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, ...data } = req.body;
        const user = await registerUserService(data);

        res.status(201).json(user)
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message})
        } else {
            res.status(500).json({ error: 'Unexpected error' });
        }
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const { accessToken, refreshToken, user } = await loginUserService(email, password);

        res.cookie("REFRESH_TOKEN", refreshToken, {
            sameSite: 'lax',
            secure: true,
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
        })
        res.status(200).send({ accessToken, user })
    } catch (error) {
        if (error instanceof Error) {
            res.status(401).send({ message: error.message})
        } 
    }
} 