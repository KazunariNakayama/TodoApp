// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Node.js（開発環境）での複数インスタンス生成を防止（重要）
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query', 'error', 'warn'], // 任意
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
