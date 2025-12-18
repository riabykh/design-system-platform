import { hash, compare } from 'bcryptjs'
import { prisma } from './prisma'
import { cookies } from 'next/headers'

const SESSION_DURATION = 1000 * 60 * 60 * 24 * 7 // 7 days

export async function hashPassword(password: string) {
    return hash(password, 12)
}

export async function verifyPassword(password: string, hashed: string) {
    return compare(password, hashed)
}

export async function createSession(userId: string) {
    const expiresAt = new Date(Date.now() + SESSION_DURATION)
    const session = await prisma.session.create({
        data: {
            userId,
            expiresAt,
        },
    })

    const cookieStore = await cookies()
    cookieStore.set('session', session.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    })

    return session
}

export async function deleteSession() {
    const cookieStore = await cookies()
    const sessionId = cookieStore.get('session')?.value

    if (sessionId) {
        await prisma.session.deleteMany({
            where: { id: sessionId },
        })
    }

    cookieStore.delete('session')
}

export async function getSession() {
    const cookieStore = await cookies()
    const sessionId = cookieStore.get('session')?.value

    if (!sessionId) return null

    const session = await prisma.session.findUnique({
        where: { id: sessionId },
        include: { user: true },
    })

    if (!session || session.expiresAt < new Date()) {
        return null
    }

    return session
}
