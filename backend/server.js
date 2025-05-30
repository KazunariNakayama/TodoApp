"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
const hono_1 = require("hono");
const tasks_1 = __importDefault(require("./src/routes/tasks"));
const cors_1 = require("hono/cors");
const errorHandler_1 = require("./src/utils/errorHandler");
const app = new hono_1.Hono();
// CORS対応
app.use('*', (0, cors_1.cors)());
// 共通エラーハンドラー
app.onError((err, c) => {
    return (0, errorHandler_1.handleError)(err, c);
});
// APIルーティング
app.route('/api/tasks', tasks_1.default);
exports.default = app;
