import * as DialogPrimitive from '@radix-ui/react-dialog'; import { X } from 'lucide-react'; import { cn } from '@/lib/utils'
export const Dialog=DialogPrimitive.Root; export const DialogTrigger=DialogPrimitive.Trigger; export const DialogClose=DialogPrimitive.Close
export const DialogContent=({className,children,...props}:React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>)=>(
  <DialogPrimitive.Portal><DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60"/><DialogPrimitive.Content className={cn('fixed z-50 grid w-[95vw] max-w-md gap-4 border bg-neutral-900 p-6 shadow-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg',className)} {...props}>{children}<DialogPrimitive.Close className="absolute right-3 top-3 opacity-70"><X size={18}/></DialogPrimitive.Close></DialogPrimitive.Content></DialogPrimitive.Portal>) as any
export const DialogHeader=(p:React.HTMLAttributes<HTMLDivElement>)=><div className="flex flex-col space-y-1.5 text-left" {...p}/>
export const DialogTitle=(p:React.HTMLAttributes<HTMLHeadingElement>)=><h3 className="text-lg font-semibold" {...p}/>
export const DialogDescription=(p:React.HTMLAttributes<HTMLParagraphElement>)=><p className="text-sm text-gray-300" {...p}/>
