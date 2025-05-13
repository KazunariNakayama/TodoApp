/*
// src/routes/subtasks.ts
import { Hono } from 'hono';
import { PrismaClient, TaskStatus } from '@prisma/client';

const prisma = new PrismaClient();
const subtasks = new Hono();

// サブタスク一覧の取得
subtasks.get('/', async (c) => {
  const subtasks = await prisma.task.findMany({
    where: {
      taskId: {
        not: null
      }
    },
    include: {
      parent: true
    }
  });
  return c.json(subtasks);
});

// サブタスクの作成
subtasks.post('/', async (c) => {
  const body = await c.req.json();
  const subtask = await prisma.task.create({
    data: {
      title: body.title,
      detail: body.detail,
      taskId: body.parentId,
      status: body.status || TaskStatus.TODO
    }
  });
  return c.json(subtask);
});

// サブタスクの更新
subtasks.put('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const body = await c.req.json();
  const subtask = await prisma.task.update({
    where: { id },
    data: {
      title: body.title,
      detail: body.detail,
      status: body.status
    }
  });
  return c.json(subtask);
});

// サブタスクの削除
subtasks.delete('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  await prisma.task.delete({
    where: { id }
  });
  return c.json({ message: 'Subtask deleted' });
});

export default subtasks;

*/