import { Express, Router } from 'express'
import { AuthRequestRequest, AuthVerifyRequest } from '../types/auth.ts'
import { authRequest, verifyToken } from '../controllers/auth.controller.ts'

export const handleAuthRoutes = (server: Express) => {
    const router = Router()

    router.post<AuthRequestRequest>('/request', async (req, res) => {
        const { email } = req.body

        await authRequest({ email })

        res.send(`Requesting auth for email: ${email}`)
    })

    router.get<AuthVerifyRequest>('/verify', async (req, res) => {
        const { token } = req.query

        if (!token) {
            res.send('Token is required')
        }

        const savedToken = await verifyToken({ token: `${token}` })

        res.header('Authorization', `Bearer ${savedToken.value}`)
        res.header('X-USER-ID', savedToken.userId)
        res.cookie('auth', 'true', {
            httpOnly: true,
            expires: savedToken.expiresAt,
        })

        res.send(`Verifying token: ${token}`)
    })

    server.use('/auth', router)
}
