/* eslint-disable react/prop-types */
import React from 'react'

const TaskSeparator = ({ icon, text }) => {
  return (
    <div className="flex gap-3 border-b-2 border-solid border-brand-border pb-2">
      {icon}
      <p className="font-semibold text-brand-text-gray">{text}</p>
    </div>
  )
}

export default TaskSeparator
