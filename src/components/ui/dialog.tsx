import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import * as React from 'react'

export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger
export const DialogClose = DialogPrimitive.Close

export const DialogContent = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>>(
  ({ className, children, ...props }, ref) => (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60" />
      <DialogPrimitive.Content ref={ref} className={cn('fixed z-50 grid w-[95vw] max-w-md gap-4 border bg-neutral-900 p-6 shadow-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg', className)} {...props}>
        {children}
        <DialogPrimitive.Close className="absolute right-3 top-3 opacity-70">
          <X size={18} />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
)
DialogContent.displayName = 'DialogContent'
export const DialogHeader = (props: React.HTMLAttributes<HTMLDivElement>) => <div className="flex flex-col space-y-1.5 text-left" {...props} />
export const DialogTitle = (props: React.HTMLAttributes<HTMLHeadingElement>) => <h3 className="text-lg font-semibold" {...props} />
export const DialogDescription = (props: React.HTMLAttributes<HTMLParagraphElement>) => <p className="text-sm text-gray-300" {...props} />
