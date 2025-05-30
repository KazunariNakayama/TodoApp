"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const node_server_1 = require("@hono/node-server");
const server_1 = __importDefault(require("./server"));
require("dotenv/config");
//const port = Number(process.env.PORT || 3000);
const port = parseInt(process.env.PORT || '3000', 10);
(0, node_server_1.serve)({ fetch: server_1.default.fetch, port }, ({ port }) => {
    console.log(`🚀  Server running on http://localhost:${port}`);
});
