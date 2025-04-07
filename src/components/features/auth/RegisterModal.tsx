'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FaApple, FaMeta } from 'react-icons/fa6'
import { FcGoogle } from 'react-icons/fc'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import Image from 'next/image'
import Link from 'next/link'
import { RegisterUserSchema } from '@/lib/schemas'
import { z } from 'zod'
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'

export default function RegisterModal() {
  const form = useForm<z.output<typeof RegisterUserSchema>>({
    resolver: zodResolver(RegisterUserSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })
  const [seePassword, setSeePassword] = useState(false)
  const [seeConfirmPassword, setSeeConfirmPassword] = useState(false)
  const [payloadMessage, setPayloadMessage] = useState('')
  const [payloadError, setPayloadError] = useState('')

  const onSubmit = async (data: z.output<typeof RegisterUserSchema>) => {
    const formData = new FormData()
    formData.append('email', data.email)
    formData.append('password', data.password)
    formData.append('confirmPassword', data.confirmPassword)

    // const response = await RegisterUser(formData)
    // console.log(response)
    // if (!response.success) {
    //   setPayloadError(response?.errors as string)
    // } else {
    //   setPayloadMessage(response?.message as string)
    //   form.reset()
    // }
  }

  return (
    <Card className="flex-row w-full h-full rounded-none p-0 border-none justify-center">
      <div className="w-1/3 relative z-10">
        <Image
          src="/uploads/wind.jpg"
          blurDataURL={'/uploads/wind.jpg'}
          alt="Grass"
          fill
          className="object-cover"
        />
      </div>
      <CardContent className="text-center flex flex-col justify-center items-center bg-white h-[750px] p-20 space-y-4">
        <div className="flex flex-col items-center space-y-2">
          <CardTitle className="text-3xl font-bold">Sign Up</CardTitle>
          <p className="text-sm text-gray-600">Welcome! Please enter your details to sign up.</p>
        </div>

        <div className="flex justify-between space-x-4">
          <Button variant="outline" className="flex-1 hover:bg-green-200 cursor-pointer">
            Apple <FaApple className="w-5 h-5 fill-[#A2AAAD]" />
          </Button>
          <Button variant="outline" className="flex-1 hover:bg-green-200 cursor-pointer">
            Google <FcGoogle className="w-5 h-5" />
          </Button>
          <Button variant="outline" className="flex-1 hover:bg-green-200 cursor-pointer">
            Meta
            <FaMeta className="w-5 h-5 fill-[#0081FB]" />
          </Button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500">OR</span>
          </div>
        </div>

        <Form {...form}>
          <form
            className="space-y-4 w-full"
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
            <div className="relative">
              <FormField
                control={form.control}
                name={'password'}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        className="py-5"
                        type={!seePassword ? 'password' : 'text'}
                        {...field}
                        placeholder="Enter your password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div
                onClick={() => setSeePassword(!seePassword)}
                className="hover:cursor-pointer hover:text-gray-700 absolute right-0 pr-3 top-8 text-gray-400"
              >
                {seePassword ? (
                  <IoEyeOutline className="w-5 h-5 mr-2" />
                ) : (
                  <IoEyeOffOutline className="w-5 h-5 mr-2" />
                )}
              </div>
            </div>

            <div className="relative">
              <FormField
                control={form.control}
                name={'confirmPassword'}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        className="py-5 ring-green-900"
                        {...field}
                        type={!seeConfirmPassword ? 'password' : 'text'}
                        placeholder="Confirm your password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div
                onClick={() => setSeeConfirmPassword(!seeConfirmPassword)}
                className="hover:cursor-pointer hover:text-gray-700 absolute right-0 pr-3 top-8 text-gray-400"
              >
                {seeConfirmPassword ? (
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
              {form.formState.isSubmitting ? 'Submitting' : 'Sign Up'}
            </Button>
            {payloadMessage && <p className="text-sm text-green-600">{payloadMessage}</p>}

            {payloadError && !payloadMessage && (
              <p className="text-destructive text-sm">{payloadError}</p>
            )}
          </form>
        </Form>

        <p className="text-sm text-center text-gray-600">
          Already have account?{' '}
          <Link href="/auth/sign-in">
            <Button
              variant="ghost"
              className="font-medium hover:text-blue-600 hover:underline cursor-pointer hover:bg-white"
            >
              Sign In
            </Button>
          </Link>
        </p>
      </CardContent>
      <div className="w-1/3 relative z-10">
        <Image
          src="/uploads/solar.jpg"
          blurDataURL={'/uploads/solar.jpg'}
          alt="Grass"
          fill
          className="object-cover"
        />
      </div>
    </Card>
  )
}
