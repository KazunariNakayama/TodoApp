import { CustomError } from "../utils/customError";
import { prisma } from "../lib/prisma";

type Task = {
    id: number;
    title: string;
    detail: string;
    due_date: string;
    status: string;
    visibility: string;
    created_at: string; // ← JSONとして返すなら string にする
};

// [INFO]タスクを取得・検索する
export const getTasksSearch = async (
    rawid: string,
    title: string,
    status: string,
    due_date: string,
    visibility: string
) => {
    const id = rawid ? parseInt(rawid, 10) : undefined;

    const where: any = {};

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
        } else {
            throw new Error(`Invalid due_date format: ${due_date}`);
        }
    }
    if (visibility) {
        where.visibility = visibility;
    }

    const tasks = await prisma.task.findMany({
        where,
        include: {
            subtasks: true
        }
    });

    return tasks;
};

// [INFO]task作成
export const createTask = async (body: {
    title: string;
    detail: string;
    due_date: string;
    status: string;
}): Promise<Task> => {
    const result = await prisma.$queryRaw<Task[]>`
        INSERT INTO "Task" (title, detail, due_date, status, created_at)
        VALUES (${body.title}, ${body.detail}, ${new Date(body.due_date)}, ${body.status
        }::"TaskStatus", NOW())
  RETURNING *;
`;
    return result[0];
};

// [INFO]Taskの更新
export const updateTask = async (
    id: string,
    body: { title: string; detail: string; due_date: string; status: string }
) => {
    const task = (await prisma.$queryRaw`
        UPDATE "Task"
        SET title = ${body.title},
            detail = ${body.detail},
            due_date = ${new Date(body.due_date)},
            status = ${body.status}::"TaskStatus"
        WHERE id = ${parseInt(id)}
        RETURNING *
    `) as any[];
    return task;
};

// [INFO]Taskのアーカイブの変更処理
export const updateVisibility = async (
    id: string,
    body: { visibility: string }
) => {
    const task = (await prisma.$queryRaw`
        UPDATE "Task"
        SET visibility = ${body.visibility}::"TaskVisibility"
        WHERE id = ${parseInt(id)}
        RETURNING *
    `) as any[];
    return task;
};

// [INFO]Taskの削除
export const deleteTask = async (id: string) => {
    // まずサブタスクを削除
    await prisma.$queryRaw`
        DELETE FROM "Subtask"
        WHERE "taskId" = ${parseInt(id)}
    `;

    // 次にタスクを削除
    const result = (await prisma.$queryRaw`
        DELETE FROM "Task"
        WHERE id = ${parseInt(id)}
        RETURNING id
    `) as any[];
    return result;
};

// [INFO]subtask取得
export const getSubTasks = async (id: string) => {
    const subtasks =
        (await prisma.$queryRaw`SELECT * FROM "Subtask" WHERE "taskId" = ${parseInt(id)}`) as any[];
    if (subtasks.length === 0) {
        throw new CustomError("SUbTask not found", 404);
    }
    return subtasks;
};

export const createSubtask = async (
    taskId: string,
    body: { title: string; detail: string; status?: string }
) => {
    const subtask = (await prisma.$queryRaw`
            INSERT INTO "Subtask" (title, detail, status, "taskId", created_at)
            VALUES (${body.title}, ${body.detail}, (${body.status || "TODO"
        })::"TaskStatus", ${parseInt(taskId)}, NOW())
            RETURNING *
        `) as any[];
    return subtask[0];
};

export default {
    getSubTasks,
    createTask,
    updateTask,
    deleteTask,
    createSubtask,
};
