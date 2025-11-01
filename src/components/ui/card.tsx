import * as React from 'react'
import { cn } from '@/lib/utils'

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('rounded-lg border bg-black/30', className)} {...props} />
}

export function CardHeader(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div className="p-4 border-b border-white/10" {...props} />
}

export function CardTitle(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className="text-lg font-semibold" {...props} />
}

export function CardContent(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div className="p-4" {...props} />
}
