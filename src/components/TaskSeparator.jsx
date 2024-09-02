import React from 'react'
import PropTypes from 'prop-types' // ES6

const TaskSeparator = ({ icon, text }) => {
  return (
    <div className="flex gap-3 border-b-2 border-solid border-brand-border pb-2">
      {icon}
      <p className="font-semibold text-brand-text-gray">{text}</p>
    </div>
  )
}

TaskSeparator.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
}

export default TaskSeparator
