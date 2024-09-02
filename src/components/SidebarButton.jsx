/* eslint-disable react/prop-types */
import React from 'react'
import { tv } from 'tailwind-variants'

const SidebarButton = ({ children, variant, className }) => {
  const sideBarButton = tv({
    base: 'flex items-center gap-2 rounded-lg px-6 py-3',
    variants: {
      variant: {
        selected: 'bg-brand-primary/10 text-brand-primary',
        unselected: 'text-brand-dark-blue',
      },
    },
  })

  return (
    <a href="#" className={sideBarButton({ variant, className })}>
      {children}
    </a>
  )
}

export default SidebarButton
