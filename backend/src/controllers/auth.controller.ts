import { AuthRequestDto, VerifyTokenDto } from '../types/auth.ts'
import {
    registerAuthRequest,
    verifyAuthToken,
} from '../services/auth.service.ts'
import { sendAuthenticationEmail } from '../services/mail.service.ts'

const HOST = process.env.HTTP_HOST || 'localhost'
const PORT = parseInt(process.env.HTTP_PORT || '3000')
const PROTOCOL = process.env.HTTP_PROTOCOL || 'http'

export const authRequest = async ({
    email: requestedEmail,
}: AuthRequestDto) => {
    const { token, email, expiresAt } = await registerAuthRequest({
        email: requestedEmail,
    })

    await sendAuthenticationEmail(
        email,
        `${PROTOCOL}://${HOST}:${PORT}/auth/verify?token=${token}`
    )

    return {
        token,
        email,
        expiresAt,
    }
}

export const verifyToken = async ({ token }: VerifyTokenDto) => {
    return await verifyAuthToken({ token })
}
