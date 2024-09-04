import { AuthRequestDto, VerifyTokenDto } from '../types/auth.ts'
import { PrismaClient } from '@prisma/client'
import { TokenKind } from '../types/token.ts'
import { nanoid } from 'nanoid'

const prismaClient = new PrismaClient()

const createUserIfNotExists = async (email: string) => {
    const user = await prismaClient.users.findUnique({
        where: {
            email,
        },
    })
    if (user) return user
    return prismaClient.users.create({
        data: {
            email,
        },
    })
}

const createAuthRequestToken = async (userId: string) => {
    await prismaClient.tokens.deleteMany({
        where: {
            userId,
            kind: TokenKind.AUTH_REQUEST,
        },
    })

    return prismaClient.tokens.create({
        data: {
            userId,
            kind: TokenKind.AUTH_REQUEST,
            value: nanoid(64),
            expiresAt: new Date(Date.now() + 1000 * 60 * 15),
        },
    })
}

const getAuthRequestToken = async (value: string) => {
    const token = await prismaClient.tokens.findFirst({
        where: {
            value,
            kind: TokenKind.AUTH_REQUEST,
        },
    })
    await prismaClient.tokens.delete({
        where: {
            id: token.id,
        },
    })
    return token
}

const createVerifyToken = async (userId: string) => {
    return prismaClient.tokens.create({
        data: {
            userId,
            kind: TokenKind.AUTH_VERIFY,
            value: nanoid(64),
            expiresAt: new Date(Date.now() + 1000 * 60 * 60),
        },
    })
}

export const registerAuthRequest = async ({ email }: AuthRequestDto) => {
    const user = await createUserIfNotExists(email)
    const token = await createAuthRequestToken(user.id)
    return {
        email: user.email,
        token: token.value,
        expiresAt: token.expiresAt,
    }
}

export const verifyAuthToken = async ({ token }: VerifyTokenDto) => {
    const authRequestToken = await getAuthRequestToken(token)

    if (!authRequestToken) {
        throw new Error('Token not found')
    }
    if (authRequestToken.expiresAt < new Date()) {
        throw new Error('Token expired')
    }

    const user = await prismaClient.users.findUnique({
        where: {
            id: authRequestToken.userId,
        },
    })
    if (!user) {
        throw new Error('User not found')
    }
    const verifyToken = await createVerifyToken(user.id)

    return {
        userId: user.id,
        value: verifyToken.value,
        expiresAt: verifyToken.expiresAt,
    }
}
