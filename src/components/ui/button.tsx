import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
const buttonVariants = cva('inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50',{
  variants:{ variant:{ default:'bg-white/10 hover:bg-white/20 text-white', outline:'border bg-transparent hover:bg-white/10', secondary:'bg-indigo-600 hover:bg-indigo-700 text-white' },
    size:{ default:'h-9 px-4', sm:'h-8 px-3', lg:'h-10 px-8', icon:'h-9 w-9' }}, defaultVariants:{ variant:'default', size:'default' } })
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref)=>(
  <button ref={ref} className={cn(buttonVariants({variant,size,className}))} {...props} />
)); Button.displayName='Button'
