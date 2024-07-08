import { Express, Request, Response } from 'express';
import { adminService } from '../services/admin.service';

export const registerAdminRoutes = (app: Express) => {
  app.get('/admin/waitlist', async (req: Request, res: Response) => {
    const token = req.cookies['access_token'];
    try {
      const { code, ...result } = await adminService.getUnverifiedUsers(token);
      return res.status(code).json({ ...result });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error });
    }
  });

  app.patch('/admin/users/verify', async (req: Request, res: Response) => {
    const token = req.cookies['access_token'];
    const { userIds } = req.body;
    try {
      const { code, ...result } = await adminService.verifyUsers(
        token,
        userIds,
      );
      return res.status(code).json({ ...result });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error });
    }
  });

  return app;
};
