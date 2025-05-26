// src/routes/tasks.ts
import { Hono } from 'hono';
import { PrismaClient, TaskStatus, } from '@prisma/client';
import { CustomError } from '../utils/customError';
const prisma = new PrismaClient(); 
  
//import { PrismaClient /*, TaskStatus */ } from '@prisma/client';
import {getTasks, createTask, updateTask, deleteTask, getSubtasks, createSubtask, getIdTasks, getIdSubTasks, getTasksSearch} from '../model/tasksModel'; 
import { stat } from 'fs';
import { duplexPair } from 'stream';
//import { CustomError } from '../utils/customError';
//const prisma = new PrismaClient();
const tasks = new Hono();

// タスク一覧の取得
tasks.get('/', async (c) => {
  //as any[]で、c.json(tasks)に配列型で返すように指定
  //awaitを実行することで、内部的に非同期で問い合わせを行い、結果が返るまで待ってもらいます
  //getTasksは、../model/tasksModel.tsで定義した関数
  const tasks = await getTasks();
  /*
  if(!tasks){
    throw new CustomError('Failed to fetch tasks', 400);
  }
    */
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


// // タスク一覧をsearchで取得
tasks.get('/search', async (c) => {

  const id = c.req.query('id') || ''; // 未指定でも安全なように空文字に
  const title = c.req.query('title') || ''; // 未指定でも安全なように空文字に
  const due_date = c.req.query('due_date') || ''; // 未指定でも安全なように空文字に
  const status = c.req.query('status') || ''; // 未指定でも安全なように空文字に


  const tasks = await getTasksSearch(id,title, status, due_date);

  //const tasks = await prisma.$queryRaw`SELECT * FROM "Task" WHERE title LIKE ${'%' + title + '%'}`as any[];

  // const tasks = await prisma.$queryRaw`
  //   SELECT * FROM "Task"
  //   WHERE title LIKE ${'%' + title + '%'}
  // ` as any[];

  return c.json(tasks);
});




// //指定タスクの取得
// tasks.get('/:id', async (c) => {
//   const id = parseInt(c.req.param('id'));
//   const tasks = await getIdTasks(id);
//   const subtasks = await getIdSubTasks(id);
//   return c.json({tasks,subtasks});
// });
//NOTE:指定タスクのサブタスクの取得
tasks.get('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const subtasks = await getIdSubTasks(id);
  return c.json(subtasks);
});



// タスクの作成
tasks.post('/', async (c) => {
  const body = await c.req.json();
  const task = await createTask(body);
  return c.json(task);
  /*
  try {
    const body = await c.req.json();
    const task = await createTask(body);
    return c.json(task);
  } catch (error) {
    throw new CustomError('Failed to create task', 500);
  }
  */
});

// タスクの更新
tasks.put('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const body = await c.req.json();
  const task = await updateTask(id, body);
  return c.json(task);
  /*
  try {
    const id = parseInt(c.req.param('id'));
    const body = await c.req.json();
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
    return c.json(task[0]);
  } catch (error: any) {
    console.error('Error updating task:', error);
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(`Failed to update task: ${error.message}`, 500);
  }
  */
});

// タスクの削除
tasks.delete('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const result = await deleteTask(id);
  return c.json(result);
  /*
  try {
    const id = parseInt(c.req.param('id'));
    const result = await prisma.$queryRaw`
      DELETE FROM "Task"
      WHERE id = ${id}
      RETURNING id
    ` as any[];
    if (!result || result.length === 0) {
      throw new CustomError('Task not found', 404);
    }
    return c.json({ message: 'Task deleted' });
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError('Failed to delete task', 500);
  }
  */
});

// サブタスクの一覧取得
tasks.get('/:id/subtasks', async (c) => {
  const taskId = parseInt(c.req.param('id'));
  const subtasks = await getSubtasks(taskId);
  return c.json(subtasks);
  /*
  try {
    const taskId = parseInt(c.req.param('id'));
    const subtasks = await prisma.$queryRaw`
      SELECT * FROM "Subtask"
      WHERE "taskId" = ${taskId}
    ` as any[];
    if (!subtasks || subtasks.length === 0) {
      throw new CustomError('No subtasks found', 404);
    }
    return c.json(subtasks);
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError('Failed to fetch subtasks', 500);
  }
  */
});

// サブタスクの作成
tasks.post('/:id/subtasks', async (c) => {
  const taskId = parseInt(c.req.param('id'));
  const body = await c.req.json();
  const subtask = await createSubtask(taskId, body);
  return c.json(subtask);
  /*
  try {
    const taskId = parseInt(c.req.param('id'));
    const body = await c.req.json();
    const subtask = await prisma.$queryRaw`
      INSERT INTO "Subtask" (title, detail, status, "taskId", created_at)
      VALUES (${body.title}, ${body.detail}, (${body.status || 'TODO'})::"TaskStatus", ${taskId}, NOW())
      RETURNING *
    ` as any[];
    return c.json(subtask[0]);
  } catch (error: any) {
    console.error('Error creating subtask:', error);
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(`Failed to create subtask: ${error.message}`, 500);
  }
  */
});

export default tasks;
