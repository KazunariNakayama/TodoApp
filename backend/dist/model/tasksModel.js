import { PrismaClient } from '@prisma/client';
import { CustomError } from '../utils/customError';
const prisma = new PrismaClient();
export const getTasks = async () => {
    try {
        const tasks = await prisma.$queryRaw `SELECT * FROM "Task"`;
        if (!tasks || tasks.length === 0) {
            throw new CustomError('No tasks found', 404);
        }
        return tasks;
    }
    catch (error) {
        if (error instanceof CustomError) {
            throw error;
        }
        console.error('Error fetching tasks:', error);
        throw new CustomError('Failed to fetch tasks', 500);
    }
    /*
   const tasks = await prisma.task.findMany();
   if(!tasks){
    throw new CustomError('Failed to fetch tasks', 500);
   }
   return tasks;
   */
};
export default { getTasks };
