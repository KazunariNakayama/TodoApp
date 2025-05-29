// src/routes/tasks.ts
import { Hono } from 'hono';
import { createTask, updateTask, deleteTask, createSubtask, getSubTasks, getTasksSearch, updateVisibility } from '../model/tasksModel';
import { CustomError } from '../utils/customError';


const tasks = new Hono();


// // タスク一覧をsearchで取得
tasks.get('/fetch', async (c) => {
  const id = c.req.query('id') || ''; // 未指定でも安全なように空文字に
  const title = c.req.query('title') || ''; // 未指定でも安全なように空文字に
  const due_date = c.req.query('due_date') || ''; // 未指定でも安全なように空文字に
  const status = c.req.query('status') || ''; // 未指定でも安全なように空文字に
  const visibility = c.req.query('visibility') || ''; // 未指定でも安全なように空文字に
  const tasks = await getTasksSearch(id, title, status, due_date, visibility);
  return c.json(tasks);
});

// タスクの作成
tasks.post('/', async (c) => {
  const body = await c.req.json();
  if (body.title == "") {
    throw new CustomError("Task title is not written", 500);
  }
  else if (body.detail == "") {
    throw new CustomError("Task detail is not written", 500);
  }
  const task = await createTask(body);
  return c.json(task);
});

// タスクの更新
tasks.put('/:id', async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json();
  const task = await updateTask(id, body);
  if (!task || task.length == 0) {
    throw new CustomError("Task not found", 404);
  }
  return c.json(task[0]);
});

// タスクのアーカイブの変更処理
tasks.put('/archive/:id', async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json();
  const task = await updateVisibility(id, body);
  if (!task || task.length == 0) {
    throw new CustomError("Task not found", 404);
  }
  return c.json(task[0]);
});

// タスクの削除
tasks.delete('/:id', async (c) => {
  const id = c.req.param('id');
  const tasks = await getTasksSearch(id, '', '', '', 'ARCHIVED');
  if (!tasks || tasks.length === 0) {
    throw new CustomError("Only archived tasks can be deleted or task not found", 400);
  }
  const result = await deleteTask(id);
  if (!result || result.length === 0) {
    throw new CustomError("Task not found", 404);
  }
  return c.json(result[0]);
});

//NOTE:指定タスクのサブタスクの取得
tasks.get('/subtask/:id', async (c) => {
  const id = c.req.param('id') || '';
  const subtasks = await getSubTasks(id);
  return c.json(subtasks);
});

// サブタスクの一覧取得
tasks.get('/subtasks/:id', async (c) => {
  const taskId = c.req.param('id');
  const subtasks = await getSubTasks(taskId);
  return c.json(subtasks);
});

// サブタスクの作成
tasks.post('/subtasks/:id', async (c) => {
  const taskId = c.req.param('id');
  const body = await c.req.json();
  const subtask = await createSubtask(taskId, body);
  return c.json(subtask);
});

export default tasks;
