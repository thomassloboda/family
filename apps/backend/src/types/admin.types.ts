import { User } from '@prisma/client';

export type AuthControllerResult = {
  code: number;
  message: string;
  users?: User[];
};
