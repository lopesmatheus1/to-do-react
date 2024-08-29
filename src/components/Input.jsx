/* eslint-disable react/prop-types */
import React from 'react'

const Input = ({ label, ...rest }) => {
  return (
    <div className="flex flex-col space-y-1 text-start">
      <label className="text-sm font-semibold text-[#35383E]" htmlFor={rest.id}>
        {label}
      </label>
      <input
        type="text"
        className="rounded-lg border border-solid border-[#ECECEC] px-4 py-3 outline-[#00ADB5] placeholder:text-sm placeholder:text-[#9A9C9F]"
        {...rest}
      />
    </div>
  )
}

export default Input
