import * as TabsPrimitive from '@radix-ui/react-tabs'; import { cn } from '@/lib/utils'
export const Tabs=TabsPrimitive.Root
export const TabsList=(p:React.ComponentProps<typeof TabsPrimitive.List>)=><TabsPrimitive.List className={cn('inline-flex h-10 items-center rounded-md bg-black/30 p-1',p.className)} {...p}/>
export const TabsTrigger=(p:React.ComponentProps<typeof TabsPrimitive.Trigger>)=><TabsPrimitive.Trigger className={cn('px-3 py-1.5 text-sm data-[state=active]:bg-white/10',p.className)} {...p}/>
export const TabsContent=(p:React.ComponentProps<typeof TabsPrimitive.Content>)=><TabsPrimitive.Content className={cn('mt-3',p.className)} {...p}/>
