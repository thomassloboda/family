import { PrismaClient } from '@prisma/client';
import { TOKEN_KIND } from '../constants';
import { randomBytes } from 'crypto';

class TokenDal {
  constructor(private databaseClient = new PrismaClient()) {}

  async getSignInTokenIfExists(value: string) {
    return this.databaseClient.token.findFirst({
      where: {
        value,
        kind: TOKEN_KIND.SIGN_IN,
      },
    });
  }

  async deleteToken(id: string) {
    return this.databaseClient.token.delete({
      where: {
        id,
      },
    });
  }

  async getUserSignInTokenIfExists(userId: string) {
    return this.databaseClient.token.findFirst({
      where: {
        userId,
        kind: TOKEN_KIND.SIGN_IN,
      },
    });
  }

  async getUserIdFromAccessToken(token: string) {
    return this.databaseClient.token.findFirst({
      where: {
        value: token,
        kind: TOKEN_KIND.ACCESS,
      },
      select: {
        userId: true,
      },
    });
  }

  async createSignInToken(userId: string) {
    return this.databaseClient.token.create({
      data: {
        kind: TOKEN_KIND.SIGN_IN,
        value: randomBytes(64).toString('hex'),
        userId,
      },
    });
  }

  async createAccessToken(userId: string) {
    return this.databaseClient.token.create({
      data: {
        kind: TOKEN_KIND.ACCESS,
        value: randomBytes(64).toString('hex'),
        userId,
      },
    });
  }
}

export const tokenDAL = new TokenDal();
