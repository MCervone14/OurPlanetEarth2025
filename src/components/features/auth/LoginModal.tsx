'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { FaMeta, FaMicrosoft } from 'react-icons/fa6'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { LoginUserSchema } from '@/lib/schemas'
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { ForgetPass } from '@/components/features/auth/forget-password'
import OAuthButton from '@/components/features/buttons/OAuthButton'
import { FcGoogle } from 'react-icons/fc'
import { toast } from 'sonner'

export const LoginModal = () => {
  const router = useRouter()

  const [seePassword, setSeePassword] = useState(false)
  const [payloadMessage, setPayloadMessage] = useState('')
  const [payloadError, setPayloadError] = useState('')
  const [isFormDisabled, setIsFormDisabled] = useState(false)

  const form = useForm<z.output<typeof LoginUserSchema>>({
    resolver: isFormDisabled ? undefined : zodResolver(LoginUserSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  const onSubmit = async (data: z.output<typeof LoginUserSchema>) => {
    if (isFormDisabled) return

    const formData = new FormData()
    formData.append('email', data.email)
    formData.append('password', data.password)
    formData.append('rememberMe', data.rememberMe.toString())

    // const response = await LoginUser(formData)

    // if (!response?.success) {
    //   setPayloadError(response?.errors as string)
    // } else {
    //   setPayloadMessage(response?.message as string)
    //   router.back()
    //   toast('Logged In Successfully')
    // }
  }

  return (
    <Card className="flex-row w-full h-full rounded-none p-0 border-none justify-center admin-card">
      <div className="w-1/3 relative z-10 admin-image-div">
        <Image
          src="/uploads/Grass.jpg"
          blurDataURL={'/uploads/Grass.jpg'}
          alt="Grass"
          fill
          className="object-cover admin-image"
        />
      </div>
      <CardContent className="text-center h-[750px] flex flex-col justify-center items-center p-20 space-y-6 admin-card-content">
        <div className="flex flex-col items-center space-y-2">
          <CardTitle className="text-3xl font-bold admin-card-title">Sign In</CardTitle>
          <p className="text-sm text-gray-600">
            Welcome back! Please enter your details to sign in.
          </p>
        </div>
        <div className="flex justify-between space-x-4 admin-socials-div">
          <OAuthButton
            company={'microsoft'}
            callbackUrl={'/'}
            Icon={<FaMicrosoft className="w-5 h-5" />}
          />
          <OAuthButton
            company={'google'}
            callbackUrl={'/'}
            Icon={<FcGoogle className="w-5 h-5" />}
          />
          <OAuthButton
            company={'facebook'}
            callbackUrl={'/'}
            Icon={<FaMeta className="w-5 h-5" />}
          />
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
            onChange={() => {
              setPayloadMessage('')
              setPayloadError('')
            }}
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-full"
          >
            <FormField
              control={form.control}
              name={'email'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
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
                        id="password"
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
            <div className="flex items-center justify-between">
              <FormField
                control={form.control}
                name={'rememberMe'}
                render={({ field }) => (
                  <FormItem className="flex">
                    <FormControl>
                      <Checkbox
                        id="rememberMe"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">Remember me</FormLabel>
                  </FormItem>
                )}
              />
              <div className="text-sm text-gray-600 ">
                <ForgetPass setLoginFormDisabled={setIsFormDisabled} />
              </div>
            </div>
            <Button
              className="w-full hover:bg-green-700 hover:text-white text-white bg-green-800 hover:cursor-pointer "
              type="submit"
              variant="ghost"
            >
              {form.formState.isSubmitting ? 'Logging in...' : 'Submit'}
            </Button>
            {payloadMessage && <p className="text-sm text-green-600">{payloadMessage}</p>}

            {payloadError && !payloadMessage && (
              <p className="text-destructive text-sm">{payloadError}</p>
            )}
          </form>
        </Form>
        <p className="text-sm text-center text-gray-600">
          Don&#39;t have an account yet?{' '}
          <Link href="/auth/sign-up">
            <Button
              variant="ghost"
              className="font-medium hover:text-blue-600 hover:underline cursor-pointer hover:bg-white"
            >
              Sign Up
            </Button>
          </Link>
        </p>
      </CardContent>
      <div className="relative z-10 w-1/3 admin-image-div">
        <Image
          src="/uploads/CrackedEarth.jpg"
          blurDataURL={'/uploads/CrackedEarth.jpg'}
          alt="Grass"
          className="object-cover admin-image"
          fill
        />
      </div>
    </Card>
  )
}
