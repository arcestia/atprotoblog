import React from 'react'

export function Link({
  href,
  children,
  className,
  target,
  rel,
  ...rest
}: {
  href: string
  children: React.ReactNode
  className?: string
  target?: string
  rel?: string
  [key: string]: any
}) {
  return (
    <a className={className || "text-500"} href={href} target={target} rel={rel} {...rest}>
      {children}
    </a>
  )
}
