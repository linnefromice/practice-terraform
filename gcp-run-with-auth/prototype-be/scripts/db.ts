import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const data = await prisma.user.count();
  console.log(data);
}

// 4
main()
  // 5
  .finally(async () => {
    await prisma.$disconnect();
  });
