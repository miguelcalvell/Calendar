import * as React from 'react'; import { cn } from '@/lib/utils'
export function Card(p:React.HTMLAttributes<HTMLDivElement>){ return <div className={cn('rounded-lg border border-white/10 bg-black/30',p.className)} {...p}/>}
export const CardHeader=(p:React.HTMLAttributes<HTMLDivElement>)=><div className="p-4 border-b border-white/10" {...p}/>
export const CardTitle=(p:React.HTMLAttributes<HTMLHeadingElement>)=><h3 className="text-lg font-semibold" {...p}/>
export const CardContent=(p:React.HTMLAttributes<HTMLDivElement>)=><div className="p-4" {...p}/>
