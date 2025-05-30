"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/tasks.ts
const hono_1 = require("hono");
const tasksModel_1 = require("../model/tasksModel");
const customError_1 = require("../utils/customError");
const tasks = new hono_1.Hono();
// // タスク一覧をsearchで取得
tasks.get('/fetch', async (c) => {
    const id = c.req.query('id') || ''; // 未指定でも安全なように空文字に
    const title = c.req.query('title') || ''; // 未指定でも安全なように空文字に
    const due_date = c.req.query('due_date') || ''; // 未指定でも安全なように空文字に
    const status = c.req.query('status') || ''; // 未指定でも安全なように空文字に
    const visibility = c.req.query('visibility') || ''; // 未指定でも安全なように空文字に
    const tasks = await (0, tasksModel_1.getTasksSearch)(id, title, status, due_date, visibility);
    return c.json(tasks);
});
// タスクの作成
tasks.post('/', async (c) => {
    const body = await c.req.json();
    if (body.title == "") {
        throw new customError_1.CustomError("Task title is not written", 500);
    }
    else if (body.detail == "") {
        throw new customError_1.CustomError("Task detail is not written", 500);
    }
    const task = await (0, tasksModel_1.createTask)(body);
    return c.json(task);
});
// タスクの更新
tasks.put('/:id', async (c) => {
    const id = c.req.param('id');
    const body = await c.req.json();
    const task = await (0, tasksModel_1.updateTask)(id, body);
    if (!task || task.length == 0) {
        throw new customError_1.CustomError("Task not found", 404);
    }
    return c.json(task[0]);
});
// タスクのアーカイブの変更処理
tasks.put('/archive/:id', async (c) => {
    const id = c.req.param('id');
    const body = await c.req.json();
    const task = await (0, tasksModel_1.updateVisibility)(id, body);
    if (!task || task.length == 0) {
        throw new customError_1.CustomError("Task not found", 404);
    }
    return c.json(task[0]);
});
// タスクの削除
tasks.delete('/:id', async (c) => {
    const id = c.req.param('id');
    const tasks = await (0, tasksModel_1.getTasksSearch)(id, '', '', '', 'ARCHIVED');
    if (!tasks || tasks.length === 0) {
        throw new customError_1.CustomError("Only archived tasks can be deleted or task not found", 400);
    }
    const result = await (0, tasksModel_1.deleteTask)(id);
    if (!result || result.length === 0) {
        throw new customError_1.CustomError("Task not found", 404);
    }
    return c.json(result[0]);
});
//NOTE:指定タスクのサブタスクの取得
tasks.get('/subtask/:id', async (c) => {
    const id = c.req.param('id') || '';
    const subtasks = await (0, tasksModel_1.getSubTasks)(id);
    return c.json(subtasks);
});
// サブタスクの一覧取得
tasks.get('/subtasks/:id', async (c) => {
    const taskId = c.req.param('id');
    const subtasks = await (0, tasksModel_1.getSubTasks)(taskId);
    return c.json(subtasks);
});
// サブタスクの作成
tasks.post('/subtasks/:id', async (c) => {
    const taskId = c.req.param('id');
    const body = await c.req.json();
    const subtask = await (0, tasksModel_1.createSubtask)(taskId, body);
    return c.json(subtask);
});
exports.default = tasks;
