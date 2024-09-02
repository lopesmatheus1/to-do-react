import React, { forwardRef } from 'react'
import InputLabel from './InputLabel'
import PropTypes from 'prop-types'

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

Input.propTypes = {
  label: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.string.isRequired,
}
export default Input
