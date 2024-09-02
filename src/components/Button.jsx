/* eslint-disable react/prop-types */
import React from 'react'

const Button = ({
  children,
  variant = 'primary',
  size = 'small',
  className,
  ...rest
}) => {
  const getVariantClasses = () => {
    if (variant === 'colorless') {
      return 'text-brand-dark-gray bg-transparent'
    }
    if (variant === 'primary') {
      return 'bg-brand-primary text-white'
    }

    if (variant === 'secondary') {
      return 'bg-brand-light-gray text-brand-dark-blue'
    }
  }

  const getSizeClasses = () => {
    if (size === 'small') {
      return ' py-1 text-xs'
    }

    if (size === 'large') {
      return ' py-2 text-sm'
    }
  }
  return (
    <button
      className={`text-xstext flex items-center justify-center gap-2 rounded-md px-3 font-semibold transition hover:opacity-80 ${getVariantClasses()} ${getSizeClasses()} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
