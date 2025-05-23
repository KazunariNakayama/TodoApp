// src/server.ts
import { Hono } from 'hono';
import tasks from './backend/src/routes/tasks';
import { cors } from 'hono/cors';
import { handleError } from './backend/src/utils/errorHandler';
import { HTTPException } from 'hono/http-exception';

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
