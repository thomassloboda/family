import { PrismaClient } from '@prisma/client';
import * as process from 'node:process';

const prisma = new PrismaClient();

const main = async () => {
  const email = process.env.SEED_ADMIN_EMAIL ?? 'foo@bar.org';
  await prisma.user.create({
    data: {
      email,
      is_verified: true,
      roles: {
        create: [
          {
            name: 'ADMIN',
          },
        ],
      },
    },
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
