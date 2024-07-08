import { roleDal, tokenDAL, userDAL } from '../dal';
import { ADMIN } from '../constants';
import { AuthControllerResult } from '../types/admin.types';

class AdminService {
  private async checkIsAdmin(token: string) {
    if (!token) {
      throw new Error(ADMIN.COMMON.TOKEN_MISSING);
    }

    const { userId } = await tokenDAL.getUserIdFromAccessToken(token);
    if (!userId) {
      throw new Error(ADMIN.COMMON.USER_NOT_FOUND);
    }

    const isAdmin = await roleDal.isUser('ADMIN', userId);
    if (!isAdmin) {
      throw new Error(ADMIN.COMMON.UNAUTHORIZED);
    }
  }

  async getUnverifiedUsers(token: string): Promise<AuthControllerResult> {
    await this.checkIsAdmin(token);

    const unverifiedUsers = await userDAL.getUnverifiedUsers();
    return { code: 200, message: 'OK', users: unverifiedUsers };
  }

  async verifyUsers(token: string, userIds: string[]) {
    await this.checkIsAdmin(token);

    await userDAL.verifyUsers(userIds);
    return { code: 200, message: 'OK' };
  }
}

export const adminService = new AdminService();
