/* eslint-disable react/prop-types */
import React from 'react'

const Button = ({ children, variant = 'primary' }) => {
  const getVariantClasses = () => {
    if (variant === 'colorless') {
      return 'text-[#818181] bg-transparent'
    }
    if (variant === 'primary') {
      return 'bg-[#00ADB5] text-white'
    }
  }

  return (
    <button
      className={`text-xstext flex items-center gap-2 rounded-md px-3 py-1 font-semibold transition hover:opacity-80 ${getVariantClasses()}`}
    >
      {children}
    </button>
  )
}

export default Button
