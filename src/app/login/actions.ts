'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { prisma } from '../../lib/prisma'
import { hashPassword, verifyPassword, createSession, deleteSession, getSession } from '../../lib/auth'

export async function login(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const user = await prisma.user.findUnique({
        where: { email },
    })

    // If user not found or password mismatch
    if (!user || !(await verifyPassword(password, user.password))) {
        redirect('/login?error=Invalid credentials')
    }

    await createSession(user.id)

    revalidatePath('/', 'layout')
    redirect('/')
}

// export async function signup(formData: FormData) {
const email = formData.get('email') as string
const password = formData.get('password') as string

// check if user exists
const existingUser = await prisma.user.findUnique({
    where: { email },
})

if (existingUser) {
    redirect('/login?error=User already exists')
}

const hashedPassword = await hashPassword(password)

const user = await prisma.user.create({
    data: {
        email,
        password: hashedPassword,
    },
})

await createSession(user.id)

revalidatePath('/', 'layout')
redirect('/')
}

export async function logout() {
    await deleteSession()
    revalidatePath('/', 'layout')
    redirect('/login')
}

export async function checkAuth() {
    const session = await getSession()
    return {
        isAuthenticated: !!session,
        user: session?.user || null
    }
}
