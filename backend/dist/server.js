// src/server.ts
import { Hono } from 'hono';
import tasks from './routes/tasks';
import { cors } from 'hono/cors';
import { handleError } from './utils/errorHandler';
const app = new Hono();
// CORS対応
app.use('*', cors());
// 共通エラーハンドラー
app.onError((err, c) => {
    return handleError(err, c);
});
// APIルーティング
app.route('/api/tasks', tasks);
// app.route('/api/subtasks', subtasks); // 追加予定があれば
export default app;
