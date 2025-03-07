'use client'

import { Button } from '@/components/ui/button'
import { useState, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { LucideMailbox } from 'lucide-react'
import { toast } from 'sonner'

const NewsletterForm = () => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState('')
  const [active, setActive] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const emailInput = email
    const button = buttonRef.current

    if (!emailInput || !button) return

    const res = await fetch('/api/subscribeUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: emailInput }),
    })

    const data = await res.json()

    if (data.error) {
      setError('Hey, you are already subscribed!')
      setSuccess(null)
      return
    }

    setSuccess(data)
    setError('')
    setEmail('')
  }

  return (
    <div className="w-full px-10 md:px-0 flex flex-col space-y-8 md:w-[400px]">
      <form onSubmit={handleSubmit} className="mt-10">
        <div className="group flex items-center gap-x-4 py-1 pr-1 rounded-[9px] relative">
          <span>
            <LucideMailbox className="absolute left-6 top-1/2 transform -translate-y-1/2 z-10 w-6 h-6 text-[#4B4C52] pointer-events-none" />
          </span>
          <Input
            id="email"
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white flex-1 text-[#4B4C52] text-sm sm:text-base outline-none placeholder-[#4B4C52] pl-10 focus:border-none"
            required
          />
          <Button
            className={`${
              active && 'active'
            } text-white p-0 px-3 text-sm md:text-base disabled:!bg-[#17141F] disabled:grayscale-[65%] disabled:opacity-50 disabled:cursor-not-allowed `}
            ref={buttonRef}
            disabled={!email}
          >
            <span>Subscribe</span>
          </Button>
        </div>
      </form>

      <div className="relative">
        {(success !== null || error) && (
          <div className="hidden">
            {success
              ? toast.success(`Success! 🎉 You are now subscribed to the newsletter.`)
              : toast.warning('Hey, you are already subscribed!')}
          </div>
        )}
      </div>
    </div>
  )
}

export default NewsletterForm
