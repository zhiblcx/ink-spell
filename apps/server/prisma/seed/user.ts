import { ALL_BOOK } from '@/shared/constants';
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
import * as dayjs from 'dayjs';
import { env } from 'process';
import { appConfig } from '../../src/config/AppConfig';
const prisma = new PrismaClient();
async function seed() {
  await prisma.user.upsert({
    where: { username: 'nicole' },
    update: {},
    create: {
      username: 'nicole',
      account: 'nicole123',
      password: await hash('123456', Number(env.HASH_SALT_OR_ROUNDS)),
      avatar: appConfig.DEFAULT_AVATAR,
      rolesId: 'user',
      bookShelfs: {
        create: {
          label: ALL_BOOK,
          createTimer: dayjs().toDate(),
          allFlag: true,
          position: 1,
          cover: appConfig.DEFAULT_BOOK_SHELF_COVER,
        },
      },
    },
  });

  await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      account: 'admin123',
      password: await hash('123456', Number(env.HASH_SALT_OR_ROUNDS)),
      rolesId: 'admin',
      avatar: appConfig.DEFAULT_AVATAR,
    },
  });

  process.stdout.write('user Seed your database successfully!\n');
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (_) => {
    await prisma.$disconnect();
    process.exit();
  });
