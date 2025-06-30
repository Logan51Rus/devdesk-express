import { prisma } from "../config/prisma";
import { TaskInput } from "../models/task";

export const getTasksByUserId = async (userId: string) => {
    try {
        const tasks = await prisma.task.findMany({
            where : {
                creatorId: userId
            }
        })

        const taskData = tasks.map(task => {
            const { creatorId, ...cleanedTask } = task;

            return cleanedTask;
        })

        return taskData;
    } catch (error) {
         if (error instanceof Error) {
            throw new Error(`An error occured while receiving tasks: ${error.message}`);
        } else {
            throw new Error('Unknown error occured while receiving tasks');
        }
    }
}

export const createTaskForUser = async (data: TaskInput, userId: string) => {
    const task = await prisma.task.create({
        data: {
            title: data.title,
            description: data.description,
            creatorId: userId,
            status: data.status,
            priority: data.priority
        }
    })

    return task;
}