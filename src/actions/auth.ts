'use server'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { APIError } from 'payload'
import { getPayload } from 'payload'
import config from '@payload-config'

export const RequestLogin = async (formData: FormData) => {
  const cookie = await cookies()
  const email = formData.get('email')
  const password = formData.get('password')

  const res = await fetch('http://localhost:5000/api/users/login', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      password,
    }),
  })

  if (!res.ok) {
    throw new APIError('Login failed. Please try again.', 400, undefined)
  }
  const result = await res.json()
  cookie.set({
    name: 'payload-token',
    value: result.token,
  })
  redirect(`/`)
}

export const RegisterUser = async (formData: FormData) => {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  const payload = await getPayload({ config })

  if (password.toLowerCase() !== confirmPassword.toLowerCase()) {
    throw new APIError('The confirm password and password do not match', 400, undefined)
  }

  await payload.create({
    collection: 'users',
    data: {
      email,
      password,
    },
  })

  await RequestLogin(formData)

  redirect(`/`)
}
