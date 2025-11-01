import * as React from 'react'; import { cn } from '@/lib/utils'
export const Input=React.forwardRef<HTMLInputElement,React.InputHTMLAttributes<HTMLInputElement>>(({className,...props},ref)=>(
  <input ref={ref} className={cn('h-9 w-full rounded-md bg-black/30 px-3 py-1 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500',className)} {...props}/>))
Input.displayName='Input'
