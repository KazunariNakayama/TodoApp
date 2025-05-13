// src/utils/validator.ts
import { z } from 'zod';
export const taskInput = z.object({
    title: z.string().max(20),
    detail: z.string().max(255),
    due_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    status: z.enum(['未完了', '進行中', '完了']).optional()
});
export const subtaskInput = z.object({
    title: z.string().max(20),
    detail: z.string().max(255),
    status: z.enum(['未完了', '進行中', '完了']).optional()
});
