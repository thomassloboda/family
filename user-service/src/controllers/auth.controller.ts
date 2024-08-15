import { AuthRequestDto, VerifyTokenDto } from '../types/auth.ts'
import {
    registerAuthRequest,
    verifyAuthToken,
} from '../services/auth.service.ts'

export const authRequest = async ({ email }: AuthRequestDto) => {
    return await registerAuthRequest({ email })
}

export const verifyToken = async ({ token }: VerifyTokenDto) => {
    return await verifyAuthToken({ token })
}
