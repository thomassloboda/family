import { AuthControllerResult, SignInRequest } from '../types/auth.types';
import { AUTH } from '../constants';
import { tokenDAL, userDAL } from '../dal';
import { emailService } from './email.service';

class AuthService {
  async signIn(requestPayload: SignInRequest): Promise<AuthControllerResult> {
    const { email } = requestPayload;

    if (!email) {
      throw new Error(AUTH.SIGN_IN.EMAIL_MISSING);
    }

    let registeredUser = await userDAL.getUserIfExists(email);
    if (!registeredUser) {
      registeredUser = await userDAL.createUser(email);
    }

    let registeredSignInToken = await tokenDAL.getUserSignInTokenIfExists(
      registeredUser.id,
    );
    if (registeredSignInToken) {
      throw new Error(AUTH.SIGN_IN.TOKEN_ALREADY_EXISTS);
    }
    registeredSignInToken = await tokenDAL.createSignInToken(registeredUser.id);

    await emailService.sendSignInEmail(
      registeredUser.email,
      registeredSignInToken.value,
    );

    return { code: 200, message: 'OK' };
  }

  async verifySignIn(token: string): Promise<AuthControllerResult> {
    if (!token) {
      throw new Error(AUTH.VERIFY.TOKEN_MISSING);
    }

    const registeredSignInToken = await tokenDAL.getSignInTokenIfExists(token);
    if (!registeredSignInToken) {
      throw new Error(AUTH.VERIFY.TOKEN_NOT_FOUND);
    }

    await tokenDAL.deleteToken(registeredSignInToken.id);

    const registeredAccessToken = await tokenDAL.createAccessToken(
      registeredSignInToken.userId,
    );

    return { code: 200, message: 'OK', token: registeredAccessToken.value };
  }
}

export const authService = new AuthService();
