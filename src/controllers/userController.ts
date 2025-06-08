import { Request, Response, NextFunction } from "express"
import { registerUserService } from "../services/userService";

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