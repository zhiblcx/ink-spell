import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function seed() {
  await prisma.user.upsert({
    where: { username: 'nicole' },
    update: {},
    create: {
      username: 'nicole',
      account: 'nicole123',
      password: '123456',
      avatar: process.env.DEFAULT_AVATAR,
    },
  });
  process.stdout.write('Seed your database successfully!\n');
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit();
  });
