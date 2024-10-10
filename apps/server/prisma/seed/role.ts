import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function seed() {
  await prisma.roles.upsert({
    where: { id: 'admin', name: '管理员' },
    update: {},
    create: {
      id: 'admin',
      name: '管理员',
    },
  });

  await prisma.roles.upsert({
    where: { id: 'user', name: '用户' },
    update: {},
    create: {
      id: 'user',
      name: '用户',
    },
  });

  process.stdout.write('role Seed your database successfully!\n');
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (_) => {
    await prisma.$disconnect();
    process.exit();
  });
