'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { ResetUserSchema } from '@/lib/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'

interface ResetPasswordProps {
  token: string
}

export const ResetPass = () => {
  const token = ''
  const [seeNewPassword, setSeeNewPassword] = useState(false)
  const [seeConfirmNewPassword, setSeeConfirmNewPassword] = useState(false)
  const [payloadMessage, setPayloadMessage] = useState('')
  const [payloadError, setPayloadError] = useState('')

  const form = useForm<z.output<typeof ResetUserSchema>>({
    resolver: zodResolver(ResetUserSchema),
    defaultValues: {
      newPassword: '',
      confirmNewPassword: '',
    },
  })

  const onSubmit = async (data: z.output<typeof ResetUserSchema>) => {
    const formData = new FormData()
    formData.append('newPassword', data.newPassword)
    formData.append('confirmNewPassword', data.confirmNewPassword)

    // const response = await ResetUserPassword(formData, token)
    //
    // if (!response.success) {
    //   setPayloadError(response?.errors as string)
    // } else {
    //   setPayloadMessage(response?.message as string)
    //   form.reset()
    // }
  }

  if (!token) {
    return (
      <div className="flex w-full h-full justify-center items-center">
        Token was no found. Please try again.
      </div>
    )
  }

  return (
    <div className="mx-auto space-y-10 w-1/3 h-[calc(100vh-500px)] flex flex-col justify-center ">
      <p className="text-3xl">Submit a new Password</p>
      <Form {...form}>
        <form
          className="space-y-10"
          onSubmit={form.handleSubmit(onSubmit)}
          onChange={() => {
            setPayloadError('')
            setPayloadMessage('')
          }}
        >
          <div className="relative">
            <FormField
              control={form.control}
              name={'newPassword'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      className="py-5"
                      type={!seeNewPassword ? 'password' : 'text'}
                      {...field}
                      placeholder="Enter your new password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div
              onClick={() => setSeeNewPassword(!seeNewPassword)}
              className="hover:cursor-pointer hover:text-gray-700 absolute right-0 pr-3 top-8 text-gray-400"
            >
              {seeNewPassword ? (
                <IoEyeOutline className="w-5 h-5 mr-2" />
              ) : (
                <IoEyeOffOutline className="w-5 h-5 mr-2" />
              )}
            </div>
          </div>

          <div className="relative">
            <FormField
              control={form.control}
              name={'confirmNewPassword'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <Input
                      className="py-5 ring-green-900"
                      {...field}
                      type={!seeConfirmNewPassword ? 'password' : 'text'}
                      placeholder="Confirm your new password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div
              onClick={() => setSeeConfirmNewPassword(!seeConfirmNewPassword)}
              className="hover:cursor-pointer hover:text-gray-700 absolute right-0 pr-3 top-8 text-gray-400"
            >
              {seeConfirmNewPassword ? (
                <IoEyeOutline className="w-5 h-5 mr-2" />
              ) : (
                <IoEyeOffOutline className="w-5 h-5 mr-2" />
              )}
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-green-900 text-white cursor-pointer hover:bg-green-800"
          >
            {form.formState.isSubmitting ? 'Submitting' : 'Submit'}
          </Button>
          {payloadMessage && (
            <p className="text-green-600 flex w-full justify-center">{payloadMessage}</p>
          )}

          {payloadError && !payloadMessage && (
            <p className="text-destructive flex w-full justify-center">{payloadError}</p>
          )}
        </form>
      </Form>
    </div>
  )
}
