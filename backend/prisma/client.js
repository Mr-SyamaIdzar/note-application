// prisma/client.js — Singleton Prisma Client

const { PrismaClient } = require('@prisma/client');

let databaseUrl = process.env.DATABASE_URL;

// Jika Cloud Run menyediakan variabel DB_*, kita rangkai menjadi DATABASE_URL
if (process.env.DB_HOST && process.env.DB_NAME && process.env.DB_USER) {
  const dbPass = process.env.DB_PASS || '';
  databaseUrl = `mysql://${process.env.DB_USER}:${dbPass}@${process.env.DB_HOST}:3306/${process.env.DB_NAME}`;
}

const prisma = new PrismaClient({
  log: ['query', 'error', 'warn'],
  ...(databaseUrl && {
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
  }),
});

module.exports = prisma;