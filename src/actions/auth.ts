// 'use server'
// import { redirect } from 'next/navigation'
// import { cookies } from 'next/headers'
// import { LoginUserSchema, RegisterUserSchema, ResetUserSchema } from '@/lib/schemas'
// import { getPayload } from '@/lib/getPayload'
// import { revalidatePath } from 'next/cache'
//
// const payload = await getPayload()
//
// export const LoginUser = async (formData: FormData) => {
//   const cookie = await cookies()
//   const data = Object.fromEntries(formData.entries())
//
//   const parsedData = {
//     ...data,
//     rememberMe: data.rememberMe === 'true',
//   }
//
//   const result = LoginUserSchema.safeParse(parsedData)
//
//   if (!result.success) {
//     return {
//       success: false,
//       errors: result.error.flatten().fieldErrors,
//       message: '',
//     }
//   }
//
//   try {
//     const res = await payload.betterAuth.api.signInEmail({
//       body: {
//         email: result.data.email,
//         password: result.data.password,
//       },
//       asResponse: true,
//     })
//     const resultRes = await res.json()
//
//     if (!res.ok) {
//       const errorMessage = resultRes.message || 'Authentication failed'
//       return {
//         success: false,
//         errors: errorMessage,
//         message: '',
//       }
//     }
//
//     return {
//       success: true,
//       errors: [],
//       message: '',
//     }
//   } catch (error: any) {
//     console.log(error?.message)
//   }
// }
//
// export const RegisterUser = async (params: Record<string, unknown>) => {
//
//   try {
//     const res = await payload.betterAuth.api.signUpEmail({
//       body: {
//         name: (params.name || '') as string,
//         email: params.email as string,
//         password: params.password as string,
//       },
//       asResponse: true,
//     })
//
//     const data = await res.json()
//     console.log('New Signup', data)
//
//     if (data.code === 'USER_ALREADY_EXISTS') {
//       return {
//         success: false,
//         errors: [data.message],
//         message: '',
//       }
//     }
//     return {
//       success: true,
//       errors: '',
//       message:
//         'A verification email was sent to your account. Also, please check your spam inbox as well.',
//     }
//   } catch (err) {
//     console.log(err)
//     return {
//       success: false,
//       errors:
//         'This Email is already in use. Try another email address or request a reset password link.',
//       message: '',
//     }
//   }
// }
//
// export const GetCurrentUser = async () => {
//   const cookie = await cookies()
//   const token = cookie.get('payload-token')?.value
//
//   if (!token) return { user: null, message: 'No token found' }
//
//   try {
//     const res = await fetch('http://localhost:5000/api/users/me', {
//       method: 'GET',
//       credentials: 'include',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//     })
//     const data = await res.json()
//     return data
//   } catch (error) {
//     console.log('error', error)
//   }
// }
//
// export const ForgetPasswordRecovery = async (email: string) => {
//   try {
//     const res = await fetch('http://localhost:5000/api/users/forgot-password', {
//       method: 'POST',
//       credentials: 'include',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         email,
//       }),
//     })
//     const data = await res.json()
//     return data as { message: string }
//   } catch (err) {
//     console.log(err)
//   }
// }
//
// export const ResetUserPassword = async (password: string, token: string) => {
//
//   try {
//     const res = await payload.betterAuth.api.resetPassword({
//       body: {
//         newPassword: password,
//         token,
//       },
//       asResponse: true,
//     })
//
//     const resultRes = await res.json()
//
//     console.log('reset password', resultRes)
//
//
//     if (!res.ok) {
//       return {
//         success: false,
//         message: 'Reset password failed. Please try again.',
//       }
//     }
//
//     return {
//       success: true,
//       errors: [],
//       message: 'Successfully reset password.',
//     }
//   } catch (err) {
//     console.log(err)
//   }
//
//   redirect(`/login`)
// }
