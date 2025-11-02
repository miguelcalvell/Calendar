import * as React from 'react'
import { cn } from '@/lib/utils'

export function Card(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('rounded-lg border border-white/10 bg-black/30', props.className)} {...props} />
}

export const CardHeader = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <div className="border-b border-white/10 p-4" {...props} />
)

export const CardTitle = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className="text-lg font-semibold" {...props} />
)

export const CardContent = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <div className="p-4" {...props} />
)

export const CardDescription = (props: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn('text-sm text-slate-400', props.className)} {...props} />
)
