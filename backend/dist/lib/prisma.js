"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
// lib/prisma.ts
const client_1 = require("@prisma/client");
const globalForPrisma = globalThis;
// Node.js（開発環境）での複数インスタンス生成を防止（重要）
exports.prisma = globalForPrisma.prisma ??
    new client_1.PrismaClient({
        log: ['query', 'error', 'warn'], // 任意
    });
if (process.env.NODE_ENV !== 'production')
    globalForPrisma.prisma = exports.prisma;
