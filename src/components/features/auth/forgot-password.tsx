'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import React, { useState } from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { ForgetPasswordSchema } from '@/lib/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { forgetPassword } from '@/lib/auth-client'

interface ForgetPasswordProps {
  setLoginFormDisabled: React.Dispatch<React.SetStateAction<boolean>>
}

export function ForgotPass({ setLoginFormDisabled }: ForgetPasswordProps) {
  const form = useForm<z.output<typeof ForgetPasswordSchema>>({
    resolver: zodResolver(ForgetPasswordSchema),
    defaultValues: {
      email: '',
    },
  })
  const [payloadMessage, setPayloadMessage] = useState('')
  const [payloadError, setPayloadError] = useState('')

  const onSubmit = async ({ email }: z.output<typeof ForgetPasswordSchema>) => {
    if (!email) {
      setPayloadMessage('Please provide a valid email')
    }

    const { data, error } = await forgetPassword({
      email,
      redirectTo: '/reset',
    })

    //const checkEmail = await VerifyUserEmail(email)

    // console.log(checkEmail)
    //
    // if (!checkEmail.success) {
    //   setPayloadError(checkEmail.errors[0].message)
    //   return
    // }

    //   const response = await ForgetPasswordRecovery(email)
    //   if (response?.message === 'Success') {
    //     setPayloadMessage('Reset email link was sent to the provided account.')
    //   } else {
    //     setPayloadError(
    //       'Failed to sent reset email to provided account. Make sure this is a valid email address.',
    //     )
    //   }
  }

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          form.reset()
          setPayloadError('')
          setPayloadMessage('')
        }
        setLoginFormDisabled(open)
      }}
    >
      <DialogTrigger className="hover:underline hover:cursor-pointer hover:text-blue-600">
        Forgot Password?
      </DialogTrigger>
      <DialogContent className="z-1002">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-green-900 text-3xl">Reset Your Password</DialogTitle>
          <DialogDescription>Enter your email to receive a reset link.</DialogDescription>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              onChange={() => {
                setPayloadMessage('')
                setPayloadError('')
              }}
            >
              <FormField
                control={form.control}
                name={'email'}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        className="py-5"
                        type="email"
                        placeholder="Enter your Email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                variant="default"
                type="submit"
                className="mt-6 px-6  flex mx-auto bg-green-900 hover:bg-green-800 hover:cursor-pointer "
              >
                {form.formState.isSubmitting ? 'Sending Link...' : 'Send Reset Link'}
              </Button>
              {payloadMessage && (
                <p className="text-sm text-green-600 mt-2 flex w-full justify-center">
                  {payloadMessage}
                </p>
              )}

              {payloadError && !payloadMessage && (
                <p className="text-destructive text-sm mt-2 flex w-full justify-center">
                  {payloadError}
                </p>
              )}
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
