'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const SESSION_COOKIE = 'iasmart_admin_session'
const SESSION_VALUE = 'authenticated'
// 7 days in seconds
const SESSION_MAX_AGE = 60 * 60 * 24 * 7

export async function loginAction(formData: FormData) {
  const password = formData.get('password') as string
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminPassword) {
    return { error: 'ADMIN_PASSWORD is not configured on the server.' }
  }

  if (password !== adminPassword) {
    return { error: 'Contraseña incorrecta.' }
  }

  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, SESSION_VALUE, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_MAX_AGE,
    path: '/',
  })

  redirect('/editor')
}

export async function logoutAction() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
  redirect('/login')
}
