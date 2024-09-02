/* eslint-disable react/prop-types */
import React, { forwardRef } from 'react'
import InputLabel from './InputLabel'

const Input = forwardRef(({ label, errorMessage, ...rest }, ref) => {
  return (
    <div className="flex flex-col space-y-1 text-start">
      <InputLabel htmlFor={rest.id}>{label}</InputLabel>
      <input
        type="text"
        className="rounded-lg border border-solid border-brand-border px-4 py-3 outline-brand-primary placeholder:text-sm placeholder:text-brand-text-gray"
        ref={ref}
        {...rest}
      />
      {errorMessage && (
        <p className="text-left text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input
