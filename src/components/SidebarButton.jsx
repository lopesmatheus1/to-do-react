/* eslint-disable react/prop-types */
import React from 'react'
import { tv } from 'tailwind-variants'
import PropTypes from 'prop-types'

const SidebarButton = ({ children, variant }) => {
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
    <a href="#" className={sideBarButton({ variant })}>
      {children}
    </a>
  )
}

SidebarButton.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['selected', 'unselected']),
}

export default SidebarButton
