import type { ReactNode } from 'react'

interface PageContainerProps {
  children: ReactNode
  className?: string
}

export function PageContainer({ children, className = '' }: PageContainerProps) {
  return (
    <div
      className={`mx-auto w-full min-w-0 max-w-6xl px-3 py-3 sm:px-6 sm:py-4 lg:px-8 ${className}`}
    >
      {children}
    </div>
  )
}
