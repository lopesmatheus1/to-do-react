/* eslint-disable react/prop-types */
import React from 'react'

const InputLabel = (props) => {
  return (
    <label className="text-brand-dark-blue text-sm font-semibold" {...props}>
      {props.children}
    </label>
  )
}

export default InputLabel
