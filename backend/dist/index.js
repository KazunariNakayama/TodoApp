"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hono_1 = require("hono");
const node_server_1 = require("@hono/node-server");
const app = new hono_1.Hono();
app.get('/', (c) => c.text('Hello from Hono on Render!'));
// ✅ Renderから与えられるPORTを使用
const port = parseInt(process.env.PORT || '3000', 10);
console.log(`🚀 Server is running on http://localhost:${port}`);
(0, node_server_1.serve)({
    fetch: app.fetch,
    port, // ← ✅ これでクラッシュしない
});
