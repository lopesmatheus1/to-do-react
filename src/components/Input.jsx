/* eslint-disable react/prop-types */
import React from 'react'
import InputLabel from './InputLabel'

const Input = ({ label, errorMessage, ...rest }) => {
  return (
    <div className="flex flex-col space-y-1 text-start">
      <InputLabel htmlFor={rest.id}>{label}</InputLabel>
      <input
        type="text"
        className="rounded-lg border border-solid border-[#ECECEC] px-4 py-3 outline-[#00ADB5] placeholder:text-sm placeholder:text-[#9A9C9F]"
        {...rest}
      />
      {errorMessage && (
        <p className="text-left text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  )
}

export default Input
