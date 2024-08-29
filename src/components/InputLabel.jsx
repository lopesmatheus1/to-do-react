/* eslint-disable react/prop-types */
import React from 'react'

const InputLabel = (props) => {
  return (
    <label className="text-sm font-semibold text-[#35383E]" {...props}>
      {props.children}
    </label>
  )
}

export default InputLabel
