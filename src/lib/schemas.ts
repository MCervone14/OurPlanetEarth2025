import { z } from 'zod'

export const LoginUserSchema = z.object({
  email: z.string().min(1, { message: 'Must have at least 1 character' }).email({
    message: 'Must be a valid email',
  }),
  password: z.string().min(8, { message: 'Be at least 8 characters long' }),
  rememberMe: z.boolean().default(false),
})

export const ForgetPasswordSchema = z.object({
  email: z.string().min(1, { message: 'Must have at least 1 character' }).email({
    message: 'Must be a valid email',
  }),
})

export const RegisterUserSchema = z
  .object({
    email: z.string().min(1, { message: 'Must have at least 1 character' }).email({
      message: 'Must be a valid email',
    }),
    confirmPassword: z
      .string()
      .min(8, { message: 'Be at least 8 characters long' })
      .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
      .regex(/[0-9]/, { message: 'Contain at least one number.' })
      .regex(/[^a-zA-Z0-9]/, {
        message: 'Contain at least one special character.',
      })
      .trim(),
    password: z
      .string()
      .min(8, { message: 'Be at least 8 characters long' })
      .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
      .regex(/[0-9]/, { message: 'Contain at least one number.' })
      .regex(/[^a-zA-Z0-9]/, {
        message: 'Contain at least one special character.',
      })
      .trim(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
        path: ['confirmPassword'],
      })
    }
  })

export const ResetUserSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, { message: 'Be at least 8 characters long' })
      .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
      .regex(/[0-9]/, { message: 'Contain at least one number.' })
      .regex(/[^a-zA-Z0-9]/, {
        message: 'Contain at least one special character.',
      })
      .trim(),
    confirmNewPassword: z
      .string()
      .min(8, { message: 'Be at least 8 characters long' })
      .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
      .regex(/[0-9]/, { message: 'Contain at least one number.' })
      .regex(/[^a-zA-Z0-9]/, {
        message: 'Contain at least one special character.',
      })
      .trim(),
  })
  .superRefine(({ confirmNewPassword, newPassword }, ctx) => {
    if (confirmNewPassword !== newPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'The new passwords did not match',
        path: ['confirmNewPassword'],
      })
    }
  })
