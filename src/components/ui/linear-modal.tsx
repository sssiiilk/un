'use client'

import { cn } from '@/lib/utils'
import { XIcon } from 'lucide-react'
import {
  AnimatePresence,
  MotionConfig,
  type Transition,
  type Variant,
  motion,
} from 'motion/react'
import React, {
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'

interface DialogContextType {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  uniqueId: string
  triggerRef: React.RefObject<HTMLDivElement | null>
}

const DialogContext = React.createContext<DialogContextType | null>(null)

function useDialog() {
  const context = useContext(DialogContext)
  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider')
  }
  return context
}

function DialogProvider({
  children,
  transition,
}: {
  children: React.ReactNode
  transition?: Transition
}) {
  const [isOpen, setIsOpen] = useState(false)
  const uniqueId = useId()
  const triggerRef = useRef<HTMLDivElement>(null)

  const contextValue = useMemo(
    () => ({ isOpen, setIsOpen, uniqueId, triggerRef }),
    [isOpen, uniqueId],
  )

  return (
    <DialogContext.Provider value={contextValue}>
      <MotionConfig transition={transition}>{children}</MotionConfig>
    </DialogContext.Provider>
  )
}

function Dialog({
  children,
  transition,
}: {
  children: React.ReactNode
  transition?: Transition
}) {
  return <DialogProvider transition={transition}>{children}</DialogProvider>
}

function DialogTrigger({
  children,
  className,
  style,
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  const { setIsOpen, isOpen, uniqueId, triggerRef } = useDialog()

  const handleClick = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen, setIsOpen])

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        setIsOpen(!isOpen)
      }
    },
    [isOpen, setIsOpen],
  )

  return (
    <motion.div
      ref={triggerRef}
      layoutId={`dialog-${uniqueId}`}
      className={cn('relative cursor-pointer', className)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      style={style}
      role="button"
      tabIndex={0}
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      aria-controls={`dialog-content-${uniqueId}`}
    >
      {children}
    </motion.div>
  )
}

function DialogContent({
  children,
  className,
  style,
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  const { uniqueId } = useDialog()
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <motion.div
      ref={containerRef}
      layoutId={`dialog-${uniqueId}`}
      className={cn('overflow-hidden', className)}
      style={style}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`dialog-title-${uniqueId}`}
      aria-describedby={`dialog-description-${uniqueId}`}
    >
      {children}
    </motion.div>
  )
}

function DialogContainer({
  children,
  className,
  overlayClassName,
}: {
  children: React.ReactNode
  className?: string
  overlayClassName?: string
}) {
  const { isOpen, setIsOpen, uniqueId } = useDialog()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.classList.remove('overflow-hidden')
    }
  }, [isOpen, setIsOpen])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return createPortal(
    <AnimatePresence initial={false} mode="sync">
      {isOpen ? (
        <>
          <motion.div
            key={`backdrop-${uniqueId}`}
            className={cn(
              'fixed inset-0 z-50 h-full w-full bg-[#100f0c]/70 backdrop-blur-xl',
              overlayClassName,
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            className={cn(
              'pointer-events-none fixed inset-0 z-50 mx-auto flex w-fit items-center justify-center',
              className,
            )}
          >
            {children}
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}

function DialogTitle({
  children,
  className,
  style,
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  const { uniqueId } = useDialog()

  return (
    <motion.h3
      layoutId={`dialog-title-container-${uniqueId}`}
      className={className}
      style={style}
      layout
    >
      {children}
    </motion.h3>
  )
}

function DialogDescription({
  children,
  className,
  variants,
  disableLayoutAnimation,
}: {
  children: React.ReactNode
  className?: string
  disableLayoutAnimation?: boolean
  variants?: {
    initial: Variant
    animate: Variant
    exit: Variant
  }
}) {
  const { uniqueId } = useDialog()

  return (
    <motion.div
      key={`dialog-description-${uniqueId}`}
      layoutId={
        disableLayoutAnimation
          ? undefined
          : `dialog-description-content-${uniqueId}`
      }
      variants={variants}
      className={className}
      initial="initial"
      animate="animate"
      exit="exit"
      id={`dialog-description-${uniqueId}`}
    >
      {children}
    </motion.div>
  )
}

function DialogImage({
  src,
  alt,
  className,
  style,
}: {
  src: string
  alt: string
  className?: string
  style?: React.CSSProperties
}) {
  const { uniqueId } = useDialog()

  return (
    <motion.img
      src={src}
      alt={alt}
      className={cn(className)}
      layoutId={`dialog-img-${uniqueId}`}
      style={style}
    />
  )
}

function DialogClose({
  children,
  className,
  variants,
}: {
  children?: React.ReactNode
  className?: string
  variants?: {
    initial: Variant
    animate: Variant
    exit: Variant
  }
}) {
  const { setIsOpen, uniqueId } = useDialog()

  return (
    <motion.button
      onClick={() => setIsOpen(false)}
      type="button"
      aria-label="Close dialog"
      key={`dialog-close-${uniqueId}`}
      className={cn('absolute top-6 right-6 text-white', className)}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
    >
      {children || <XIcon size={24} />}
    </motion.button>
  )
}

export {
  Dialog,
  DialogClose,
  DialogContainer,
  DialogContent,
  DialogDescription,
  DialogImage,
  DialogTitle,
  DialogTrigger,
}
