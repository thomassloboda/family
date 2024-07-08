import { PrismaClient } from '@prisma/client';
import { USER_ROLES } from '../constants';

class RoleDal {
  constructor(private prismaClient = new PrismaClient()) {}

  async isUser(role: USER_ROLES, userId: string) {
    const user = await this.prismaClient.user.findFirst({
      where: {
        id: { equals: userId },
      },
      include: { roles: true },
    });
    const isInRole = user.roles.find((_role) => _role.name === role);
    return Boolean(isInRole);
  }
}

export const roleDal = new RoleDal();
