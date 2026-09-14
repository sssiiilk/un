'use client'

import { PlusIcon } from 'lucide-react'
import {
  Dialog,
  DialogClose,
  DialogContainer,
  DialogContent,
  DialogDescription,
  DialogImage,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/linear-modal'

export type LinearCardItem = {
  id: number | string
  url: { src: string }
  title: string
  description: string
  tags?: string[]
  href?: string
}

export default function LinearCard({ items }: { items: LinearCardItem[] }) {
  return (
    <div className="flex flex-wrap items-stretch justify-center gap-4">
      {items.map((item) => (
        <Dialog
          key={item.id}
          transition={{
            type: 'spring',
            bounce: 0.05,
            duration: 0.5,
          }}
        >
          <DialogTrigger
            style={{ borderRadius: '12px' }}
            className="flex w-full max-w-[270px] flex-col overflow-hidden border border-neutral-200 bg-[#f3f0e8]"
          >
            <DialogImage
              src={item.url.src}
              alt=""
              className="h-48 w-full object-cover"
            />
            <div className="relative flex flex-grow flex-row items-end justify-between p-3">
              <DialogTitle
                className="pr-10 text-left text-xl leading-snug break-words text-zinc-950"
                style={{ fontFamily: 'var(--sans)' }}
              >
                {item.title}
              </DialogTitle>
              <span className="absolute right-2 bottom-2 rounded-full bg-neutral-800 p-2 text-white">
                <PlusIcon className="h-5 w-5" />
              </span>
            </div>
          </DialogTrigger>
          <DialogContainer>
            <DialogContent
              style={{ borderRadius: '24px' }}
              className="pointer-events-auto relative flex h-auto w-[min(800px,95vw)] flex-col overflow-hidden border border-neutral-200 bg-[#f3f0e8] lg:h-[400px] lg:flex-row"
            >
              <DialogImage
                src={item.url.src}
                alt=""
                className="h-56 w-full object-cover lg:h-full lg:w-[380px]"
              />
              <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-6">
                <DialogTitle
                  className="pr-10 text-2xl font-semibold leading-snug break-words text-zinc-950"
                  style={{ fontFamily: 'var(--sans)' }}
                >
                  {item.title}
                </DialogTitle>
                <DialogDescription
                  disableLayoutAnimation
                  variants={{
                    initial: { opacity: 0, scale: 0.8, y: 80 },
                    animate: { opacity: 1, scale: 1, y: 0 },
                    exit: { opacity: 0, scale: 0.8, y: 80 },
                  }}
                >
                  <p className="text-zinc-700">{item.description}</p>
                  {item.tags?.length ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-neutral-300 px-2 py-1 text-xs text-zinc-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  {item.href ? (
                    <a
                      href={item.href}
                      className="mt-5 inline-flex text-sm text-zinc-950 underline"
                    >
                      Открыть кейс
                    </a>
                  ) : null}
                </DialogDescription>
              </div>
              <DialogClose className="rounded-full bg-black p-1.5 text-white" />
            </DialogContent>
          </DialogContainer>
        </Dialog>
      ))}
    </div>
  )
}
