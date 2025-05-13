import { PrismaClient, TaskStatus } from '@prisma/client';
import { CustomError } from '../utils/customError';

const prisma = new PrismaClient();

export const getTasks = async () => {
    const tasks = await prisma.$queryRaw`SELECT * FROM "Task"` as any[];
    if (!tasks || tasks.length === 0) {
        throw new CustomError('No tasks found', 404);
    }
    return tasks;
    /*
   const tasks = await prisma.task.findMany();
   if(!tasks){
    throw new CustomError('Failed to fetch tasks', 500);
   }
   return tasks;
   */
}

export const getIdTasks = async (id: number) => {
    const tasks = await prisma.$queryRaw`SELECT * FROM "Task" WHERE id = ${id}` as any[];
    if (tasks.length === 0) {
        throw new CustomError('Task not found', 404);
    }
    return tasks;
}

export const getIdSubTasks = async (id: number) => {
    const subtasks = await prisma.$queryRaw`SELECT * FROM "Subtask" WHERE "taskId" = ${id}` as any[];
    return subtasks;
}


export const createTask = async (body: { title: string; detail: string; due_date: string }) => {
    const task = await prisma.$queryRaw`
        INSERT INTO "Task" (title, detail, due_date, status, created_at)
        VALUES (${body.title}, ${body.detail}, ${new Date(body.due_date)}, 'TODO'::"TaskStatus", NOW())
        RETURNING *
    ` as any[];
    return task[0];
}

export const updateTask = async (id: number, body: { title: string; detail: string; due_date: string; status: string }) => {
    const task = await prisma.$queryRaw`
        UPDATE "Task"
        SET title = ${body.title},
            detail = ${body.detail},
            due_date = ${new Date(body.due_date)},
            status = ${body.status}::"TaskStatus"
        WHERE id = ${id}
        RETURNING *
    ` as any[];
    if (!task || task.length === 0) {
        throw new CustomError('Task not found', 404);
    }
    return task[0];
} 


export const deleteTask = async (id: number) => {
        const result = await prisma.$queryRaw`
            DELETE FROM "Task"
            WHERE id = ${id}
            RETURNING id
        ` as any[];
        if (!result || result.length === 0) {
            throw new CustomError('Task not found', 404);
        }
        return result[0];
}

export const getSubtasks = async (taskId: number) => {
        const subtasks = await prisma.$queryRaw`
            SELECT * FROM "Subtask"
            WHERE task_id = ${taskId}
        ` as any[];
        return subtasks;
} 

export const createSubtask = async (taskId: number, body: { title: string; detail: string; status?: string }) => {
        const subtask = await prisma.$queryRaw`
            INSERT INTO "Subtask" (title, detail, status, "taskId", created_at)
            VALUES (${body.title}, ${body.detail}, (${body.status || 'TODO'})::"TaskStatus", ${taskId}, NOW())
            RETURNING *
        ` as any[];
        return subtask[0];
}

export default { getTasks, getIdTasks, getIdSubTasks, createTask, updateTask, deleteTask, getSubtasks, createSubtask };    