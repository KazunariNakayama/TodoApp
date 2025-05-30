"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSubtask = exports.getSubTasks = exports.deleteTask = exports.updateVisibility = exports.updateTask = exports.createTask = exports.getTasksSearch = void 0;
const customError_1 = require("../utils/customError");
const prisma_1 = require("../lib/prisma");
// [INFO]タスクを取得・検索する
const getTasksSearch = async (rawid, title, status, due_date, visibility) => {
    const id = rawid ? parseInt(rawid, 10) : undefined;
    const where = {};
    if (id) {
        where.id = id;
    }
    if (title) {
        where.OR = [
            { title: { contains: title } },
            { detail: { contains: title } }
        ];
    }
    if (status) {
        where.status = status;
    }
    if (due_date) {
        const parsed = new Date(due_date);
        if (!isNaN(parsed.getTime())) {
            const endDate = new Date(parsed);
            endDate.setDate(endDate.getDate() + 1);
            endDate.setHours(0, 0, 0, 0);
            where.due_date = { lt: endDate };
        }
        else {
            throw new Error(`Invalid due_date format: ${due_date}`);
        }
    }
    if (visibility) {
        where.visibility = visibility;
    }
    const tasks = await prisma_1.prisma.task.findMany({
        where,
        include: {
            subtasks: true
        }
    });
    return tasks;
};
exports.getTasksSearch = getTasksSearch;
// [INFO]task作成
const createTask = async (body) => {
    const result = await prisma_1.prisma.$queryRaw `
        INSERT INTO "Task" (title, detail, due_date, status, created_at)
        VALUES (${body.title}, ${body.detail}, ${new Date(body.due_date)}, ${body.status}::"TaskStatus", NOW())
  RETURNING *;
`;
    return result[0];
};
exports.createTask = createTask;
// [INFO]Taskの更新
const updateTask = async (id, body) => {
    const task = (await prisma_1.prisma.$queryRaw `
        UPDATE "Task"
        SET title = ${body.title},
            detail = ${body.detail},
            due_date = ${new Date(body.due_date)},
            status = ${body.status}::"TaskStatus"
        WHERE id = ${parseInt(id)}
        RETURNING *
    `);
    return task;
};
exports.updateTask = updateTask;
// [INFO]Taskのアーカイブの変更処理
const updateVisibility = async (id, body) => {
    const task = (await prisma_1.prisma.$queryRaw `
        UPDATE "Task"
        SET visibility = ${body.visibility}::"TaskVisibility"
        WHERE id = ${parseInt(id)}
        RETURNING *
    `);
    return task;
};
exports.updateVisibility = updateVisibility;
// [INFO]Taskの削除
const deleteTask = async (id) => {
    // まずサブタスクを削除
    await prisma_1.prisma.$queryRaw `
        DELETE FROM "Subtask"
        WHERE "taskId" = ${parseInt(id)}
    `;
    // 次にタスクを削除
    const result = (await prisma_1.prisma.$queryRaw `
        DELETE FROM "Task"
        WHERE id = ${parseInt(id)}
        RETURNING id
    `);
    return result;
};
exports.deleteTask = deleteTask;
// [INFO]subtask取得
const getSubTasks = async (id) => {
    const subtasks = (await prisma_1.prisma.$queryRaw `SELECT * FROM "Subtask" WHERE "taskId" = ${parseInt(id)}`);
    if (subtasks.length === 0) {
        throw new customError_1.CustomError("SUbTask not found", 404);
    }
    return subtasks;
};
exports.getSubTasks = getSubTasks;
const createSubtask = async (taskId, body) => {
    const subtask = (await prisma_1.prisma.$queryRaw `
            INSERT INTO "Subtask" (title, detail, status, "taskId", created_at)
            VALUES (${body.title}, ${body.detail}, (${body.status || "TODO"})::"TaskStatus", ${parseInt(taskId)}, NOW())
            RETURNING *
        `);
    return subtask[0];
};
exports.createSubtask = createSubtask;
exports.default = {
    getSubTasks: exports.getSubTasks,
    createTask: exports.createTask,
    updateTask: exports.updateTask,
    deleteTask: exports.deleteTask,
    createSubtask: exports.createSubtask,
};
