import { PrismaClient } from "@prisma/client";

// A single shared Prisma instance — prevents opening a new DB connection
// on every request (a common beginner mistake with hot-reloading dev servers).
export const prisma = new PrismaClient();
