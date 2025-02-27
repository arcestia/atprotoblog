import React from 'react'

export function Link({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <a className="text-500" href={href}>
      {children}
    </a>
  )
}
