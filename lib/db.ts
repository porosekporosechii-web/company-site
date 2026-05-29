import { PrismaClient } from '@prisma/client';

/**
 * Singleton Prisma client.
 * In dev, Next.js hot-reloads modules and would otherwise spawn a new client per HMR cycle.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;
