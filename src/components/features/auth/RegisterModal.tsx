'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { FaApple, FaMeta } from 'react-icons/fa6'
import { LuEye } from 'react-icons/lu'
import { FcGoogle } from 'react-icons/fc'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { RegisterUser } from '@/actions/auth'

export default function RegisterModal() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [seePassword, setSeePassword] = useState(false)
  const [seeConfirmPassword, setSeeConfirmPassword] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
  }

  return (
    <Card className="flex-row w-full h-full rounded-none p-0 border-none">
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
          <CardTitle className="text-3xl font-bold">Register</CardTitle>
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

        <form action={RegisterUser} className="space-y-4 w-full ">
          <Input
            className="py-5"
            name="email"
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="relative">
            <Input
              name="password"
              className="py-5"
              type={!seePassword ? 'password' : 'text'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div
              onClick={() => setSeePassword(!seePassword)}
              className="hover:cursor-pointer hover:text-gray-700 absolute inset-y-0 right-0 flex my-auto items-center pr-3 text-gray-400"
            >
              <LuEye className="w-5 h-5 mr-2" />
            </div>
          </div>

          <div className="relative">
            <Input
              name="confirmPassword"
              className="py-5 ring-green-900"
              type={!seeConfirmPassword ? 'password' : 'text'}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <div
              onClick={() => setSeeConfirmPassword(!seeConfirmPassword)}
              className="hover:cursor-pointer hover:text-gray-700 absolute inset-y-0 right-0 flex my-auto items-center pr-3 text-gray-400"
            >
              <LuEye className="w-5 h-5 mr-2" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <label htmlFor="remember" className="text-sm text-gray-600">
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm text-gray-600 hover:underline">
              Forgot password?
            </a>
          </div>
          <Button
            type="submit"
            className="w-full bg-green-900 text-white cursor-pointer hover:bg-green-800"
          >
            Sign Up
          </Button>
        </form>

        <p className="text-sm text-center text-gray-600">
          Already have account?{' '}
          <Link href="/login">
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
