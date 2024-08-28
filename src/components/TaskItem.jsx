/* eslint-disable react/prop-types */
import React from 'react'
import CheckIcon from '../assets/icons/check.svg?react'
import LoaderIcon from '../assets/icons/loader-circle.svg?react'
import DetailsIcon from '../assets/icons/Group.svg?react'

const TaskItem = ({ task, HandleTaskCheckBoxClick }) => {
  const getStatusClasses = () => {
    if (task.status === 'done') {
      return 'bg-[#00acb5]  text-[#00acb5] '
    }

    if (task.status === 'in_progress') {
      return 'bg-[#FFAA04]  text-[#FFAA04]'
    }

    if (task.status === 'not_started') {
      return 'bg-[#35383E] bg-opacity-10 text-[#35383E]'
    }
  }

  return (
    <div
      className={`flex items-center justify-between rounded-lg bg-opacity-10 px-4 py-3 text-sm transition ${getStatusClasses()}`}
    >
      <div className="flex items-center gap-2">
        <label
          className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg text-sm ${getStatusClasses()}`}
        >
          <input
            type="checkbox"
            checked={task.status === 'done'}
            className="absolute h-full w-full cursor-pointer opacity-0"
            onChange={() => HandleTaskCheckBoxClick(task.id)}
          />
          {task.status === 'done' && <CheckIcon />}
          {task.status === 'in_progress' && (
            <LoaderIcon className="animate-spin" />
          )}
        </label>
        {task.title}
      </div>

      <a href="#" className="transition hover:opacity-75">
        <DetailsIcon />
      </a>
    </div>
  )
}

export default TaskItem
