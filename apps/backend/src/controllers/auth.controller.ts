import { Express, Request, Response } from 'express';
import { authService } from '../services';
import { SignInRequest } from '../types/auth.types';

export const registerAuthRoutes = (app: Express) => {
  app.post<SignInRequest>(
    '/auth/signin',
    async (req: Request, res: Response) => {
      try {
        const result = await authService.signIn(req.body);
        return res.status(result.code).json(result);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error });
      }
    },
  );

  app.get('/auth/verify/:token', async (req: Request, res: Response) => {
    try {
      const { token, ...result } = await authService.verifySignIn(
        req.params.token,
      );
      res.cookie('access_token', token);
      return res.status(result.code).json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error });
    }
  });

  return app;
};
