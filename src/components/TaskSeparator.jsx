/* eslint-disable react/prop-types */
import React from 'react'

const TaskSeparator = ({ icon, text }) => {
  return (
    <div className="border-[#F4F4F5 ] flex gap-3 border-b-2 border-solid pb-2">
      {icon}
      <p className="font-semibold text-[#9A9C9F]">{text}</p>
    </div>
  )
}

export default TaskSeparator
