import { PrismaClient } from '@prisma/client';

class UserDal {
  constructor(private databaseClient = new PrismaClient()) {}

  async getUserIfExists(email: string) {
    return this.databaseClient.user.findFirst({
      where: {
        email,
      },
    });
  }

  async getUnverifiedUsers() {
    return this.databaseClient.user.findMany({
      where: {
        is_verified: { equals: false },
      },
    });
  }

  async createUser(email: string) {
    return this.databaseClient.user.create({
      data: {
        email,
      },
    });
  }

  async verifyUsers(userIds: string[]) {
    return Promise.all(
      userIds.map((userId) =>
        this.databaseClient.user.update({
          data: {
            is_verified: true,
          },
          where: {
            id: userId,
          },
        }),
      ),
    );
  }
}

export const userDAL = new UserDal();
