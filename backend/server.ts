// src/server.ts
import { Hono } from 'hono';
import tasks from './src/routes/tasks';
import { cors } from 'hono/cors';
import { handleError } from './src/utils/errorHandler';

const app = new Hono();

// CORS対応
app.use('*', cors());

// 共通エラーハンドラー
app.onError((err, c) => {
  return handleError(err, c);
});

// APIルーティング
app.route('/api/tasks', tasks);

export default app;
