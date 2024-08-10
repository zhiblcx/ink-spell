import { PrismaClient } from '@prisma/client';
import * as dayjs from 'dayjs';
import { appConfig } from '../../src/config/AppConfig';
const prisma = new PrismaClient();
async function seed() {
  await prisma.user.upsert({
    where: { username: 'nicole' },
    update: {},
    create: {
      username: 'nicole',
      account: 'nicole123',
      password: '123456',
      avatar: appConfig.DEFAULT_AVATAR,
      boofShlefs: {
        create: {
          label: '全部图书',
          createTimer: dayjs().toDate(),
          allFlag: true,
          position: 1,
        },
      },
    },
  });

  process.stdout.write('Seed your database successfully!\n');
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (_) => {
    await prisma.$disconnect();
    process.exit();
  });
