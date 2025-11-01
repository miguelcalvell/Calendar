import * as SelectPrimitive from '@radix-ui/react-select'
import { ChevronDown, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import * as React from 'react'

export const Select = SelectPrimitive.Root
export const SelectValue = SelectPrimitive.Value
export const SelectTrigger = React.forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>>(
  ({ className, children, ...props }, ref) => (
    <SelectPrimitive.Trigger ref={ref} className={cn('inline-flex items-center justify-between rounded-md border bg-black/30 px-3 py-2 text-sm', className)} {...props}>
      {children}
      <SelectPrimitive.Icon><ChevronDown size={16} /></SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
)
SelectTrigger.displayName = 'SelectTrigger'

export const SelectContent = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>>(
  ({ className, children, ...props }, ref) => (
    <SelectPrimitive.Content ref={ref} className={cn('z-50 min-w-[8rem] overflow-hidden rounded-md border bg-neutral-900 text-white shadow-md', className)} {...props}>
      <SelectPrimitive.Viewport className="p-1">{children}</SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  )
)
SelectContent.displayName = 'SelectContent'

export const SelectItem = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>>(
  ({ className, children, ...props }, ref) => (
    <SelectPrimitive.Item ref={ref} className={cn('relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-white/10', className)} {...props}>
      <span className="mr-2"><SelectPrimitive.ItemIndicator><Check size={14} /></SelectPrimitive.ItemIndicator></span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
)
SelectItem.displayName = 'SelectItem'
