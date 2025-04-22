'use client'

import { use, useContext, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

import type { AuthLocalization } from '@/lib/auth-localization'
import { AuthUIContext } from '@/components/features/providers/auth-ui-provider'
import { getErrorMessage } from '@/lib/get-error-message'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { UserAvatar } from '@/components/features/avatar/user-avatar'
import type { SettingsCardClassNames } from '@/types/settings-card'
import { SettingsCardFooter } from '@/components/features/cards/settings-card-footer'
import { SettingsCardHeader } from '@/components/features/cards/settings-card-header'
import { useBetterAuth } from '@/lib/auth'
import { authClient } from '@/lib/auth-client'

async function resizeAndCropImage(
  file: File,
  name: string,
  size: number,
  avatarExtension: string,
): Promise<File> {
  const image = await loadImage(file)

  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size

  const ctx = canvas.getContext('2d')

  const minEdge = Math.min(image.width, image.height)

  const sx = (image.width - minEdge) / 2
  const sy = (image.height - minEdge) / 2
  const sWidth = minEdge
  const sHeight = minEdge

  ctx?.drawImage(image, sx, sy, sWidth, sHeight, 0, 0, size, size)

  const quality = avatarExtension === 'png' ? undefined : 0.6

  const resizedImageBlob = await new Promise<Blob | null>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob)
        else reject(new Error(`Failed to create resized image blob.`))
      },
      `image/${avatarExtension}`,
      quality,
    )
  })

  return new File([resizedImageBlob as BlobPart], `${name}.${avatarExtension}`, {
    type: `image/${avatarExtension}`,
  })
}

async function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    const reader = new FileReader()

    reader.onload = (e) => {
      image.src = e.target?.result as string
    }

    image.onload = () => resolve(image)
    image.onerror = (err) => reject(err)

    reader.readAsDataURL(file)
  })
}

export interface UpdateAvatarCardProps {
  className?: string
  classNames?: SettingsCardClassNames
  isPending?: boolean
  localization?: AuthLocalization
}

export function UpdateAvatarCard({
  className,
  classNames,
  isPending: externalIsPending,
  localization,
}: UpdateAvatarCardProps) {
  const {
    hooks: { useSession },
    mutators: { updateUser },
    localization: authLocalization,
    optimistic,
    uploadAvatar,
    avatarSize,
    avatarExtension,
    toast,
  } = useContext(AuthUIContext)

  localization = { ...authLocalization, ...localization }
  const router = useRouter()
  const { sessionPromise, currentUserPromise } = useBetterAuth()
  const session = use(sessionPromise)
  const { data: sessionData, isPending: sessionPending } = useSession()
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [loading, setLoading] = useState(false)

  const handleAvatarChange = async (file: File) => {
    if (!session) return

    setLoading(true)
    const resizedFile = await resizeAndCropImage(
      file,
      session?.user.id,
      avatarSize,
      avatarExtension,
    )

    let image: string | undefined | null

    if (uploadAvatar) {
      image = await uploadAvatar(resizedFile)
    } else {
      image = await fileToBase64(resizedFile)
    }

    if (!image) {
      setLoading(false)
      return
    }

    if (optimistic && !uploadAvatar) setLoading(false)

    console.log(image)

    try {
      await authClient.updateUser({
        image: image,
        name: session?.user.name,
        fetchOptions: {
          onSuccess: () => {
            toast({ variant: 'success', message: 'Successfully Updated Your Avatar' })
          },
          onError: () => {
            toast({ variant: 'error', message: 'Error updating Avatar' })
          },
        },
      })
      router.refresh()
    } catch (error) {
      toast({
        variant: 'error',
        message: (getErrorMessage(error) || localization.requestFailed) as string,
      })
    }

    setLoading(false)
  }

  const openFileDialog = () => fileInputRef.current?.click()

  const isPending = externalIsPending || sessionPending

  return (
    <Card className={cn('w-full pb-0 text-start', className, classNames?.base)}>
      <input
        ref={fileInputRef}
        accept="image/*"
        disabled={loading}
        hidden
        type="file"
        onChange={(e) => {
          const file = e.target.files?.item(0)
          if (file) handleAvatarChange(file)
        }}
      />

      <div className="flex justify-between">
        <SettingsCardHeader
          className="grow self-start"
          title={localization.avatar}
          description={localization.avatarDescription}
          isPending={isPending}
          classNames={classNames}
        />

        <button className={cn('me-6')} type="button" onClick={openFileDialog}>
          {isPending || loading ? (
            <Skeleton className={cn('size-20 rounded-full', classNames?.avatar?.base)} />
          ) : (
            <UserAvatar
              key={session?.user?.image || ''}
              className="size-20 text-2xl"
              classNames={classNames?.avatar}
              user={session?.user}
            />
          )}
        </button>
      </div>

      <SettingsCardFooter
        className="!py-5"
        instructions={localization.avatarInstructions}
        classNames={classNames}
        isPending={isPending}
        isSubmitting={loading}
      />
    </Card>
  )
}

async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
