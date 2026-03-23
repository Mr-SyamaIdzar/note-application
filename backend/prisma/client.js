// prisma/client.js — Singleton Prisma Client

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['query', 'error', 'warn'],
});

module.exports = prisma;