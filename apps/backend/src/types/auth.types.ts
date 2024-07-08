export type SignInRequest = {
  email: string;
};

export type AuthControllerResult = {
  code: number;
  message: string;
  token?: string;
};
