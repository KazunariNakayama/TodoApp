// src/routes/tasks.ts
import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client';
import { getTasks } from '../model/tasksModel';
import { CustomError } from '../utils/customError';
const prisma = new PrismaClient();
const tasks = new Hono();
// タスク一覧の取得
tasks.get('/', async (c) => {
    //as any[]で、c.json(tasks)に配列型で返すように指定
    //awaitを実行することで、内部的に非同期で問い合わせを行い、結果が返るまで待ってもらいます
    //getTasksは、../model/tasksModel.tsで定義した関数
    const tasks = await getTasks();
    if (!tasks) {
        throw new CustomError('Failed to fetch tasks', 400);
    }
    return c.json(tasks);
    /*
    const tasks = await prisma.task.findMany({
      include: {
        subtasks: true
      }
    });
    return c.json(tasks);
  */
    //console.error('Error fetching tasks:', error);
    //return c.json({ error: 'Failed to fetch tasks' }, 500);
});
// タスクの作成
tasks.post('/', async (c) => {
    try {
        const body = await c.req.json();
        const task = await prisma.task.create({
            data: {
                title: body.title,
                detail: body.detail,
                due_date: new Date(body.due_date),
                status: 'TODO'
            }
        });
        return c.json(task);
    }
    catch (error) {
        console.error('Error creating task:', error);
        return c.json({ error: 'Failed to create task' }, 500);
    }
});
// タスクの更新
tasks.put('/:id', async (c) => {
    try {
        const id = parseInt(c.req.param('id'));
        const body = await c.req.json();
        const task = await prisma.task.update({
            where: { id },
            data: {
                title: body.title,
                detail: body.detail,
                due_date: new Date(body.due_date),
                status: body.status
            }
        });
        return c.json(task);
    }
    catch (error) {
        console.error('Error updating task:', error);
        return c.json({ error: 'Failed to update task' }, 500);
    }
});
// タスクの削除
tasks.delete('/:id', async (c) => {
    try {
        const id = parseInt(c.req.param('id'));
        await prisma.task.delete({
            where: { id }
        });
        return c.json({ message: 'Task deleted' });
    }
    catch (error) {
        console.error('Error deleting task:', error);
        return c.json({ error: 'Failed to delete task' }, 500);
    }
});
// サブタスクの一覧取得
tasks.get('/:id/subtasks', async (c) => {
    try {
        const taskId = parseInt(c.req.param('id'));
        const subtasks = await prisma.$queryRaw `SELECT * FROM "Subtask" WHERE "taskId" = ${taskId}`;
        /*
        const subtasks = await prisma.subtask.findMany({
          where: {
            taskId: taskId
          }
        });
        */
        return c.json(subtasks);
    }
    catch (error) {
        console.error('Error fetching subtasks:', error);
        return c.json({ error: 'Failed to fetch subtasks' }, 500);
    }
});
// サブタスクの作成
tasks.post('/:id/subtasks', async (c) => {
    try {
        const taskId = parseInt(c.req.param('id'));
        const body = await c.req.json();
        const subtask = await prisma.subtask.create({
            data: {
                taskId: taskId,
                title: body.title,
                detail: body.detail,
                status: body.status
            }
        });
        return c.json(subtask);
    }
    catch (error) {
        console.error('Error creating subtask:', error);
        return c.json({ error: 'Failed to create subtask' }, 500);
    }
});
export default tasks;
