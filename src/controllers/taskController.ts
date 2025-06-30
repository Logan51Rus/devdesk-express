import { Request, Response } from "express";
import { getTasksByUserId, createTaskForUser } from "../services/taskService";

export const getTasks = async (req: Request, res: Response) => {
    try {
        const { id } = req.user as { id: string };
        const tasks = await getTasksByUserId(id);

        res.status(200).json(tasks)
    } catch (error) {
        if (error instanceof Error) {
            console.error(error);
            res.status(500).json({ message: 'An error occured while receiving tasks.'})
        } 
    }
}

export const createTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.user as { id: string };
        const taskData = req.body;

        const task = await createTaskForUser(taskData, id);

        res.status(201).json({ message: 'New task was successfully created', data: task })
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'An error occured while creating new task'})
        } 
    }
}