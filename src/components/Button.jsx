/* eslint-disable react/prop-types */
import React from 'react'
import { tv } from 'tailwind-variants'

const Button = ({
  children,
  color = 'primary',
  size = 'small',
  className,
  ...rest
}) => {
  const button = tv({
    base: 'flex items-center justify-center gap-2 rounded-md px-3 font-semibold transition hover:opacity-80',
    variants: {
      color: {
        primary: 'bg-[#00ADB5] text-white',
        colorless: 'bg-transparent text-[#818181]',
        secondary: 'bg-[#EEE] text-[#35383E]',
      },
      size: {
        small: 'py-1 text-xs',
        large: 'py-2 text-sm',
      },
    },

    defaultVariants: {
      color: 'primary',
      size: 'small',
    },
  })

  return (
    <button className={button({ color, size, className })} {...rest}>
      {children}
    </button>
  )
}

export default Button
