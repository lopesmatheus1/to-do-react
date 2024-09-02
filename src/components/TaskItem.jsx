/* eslint-disable react/prop-types */
import React from 'react'
import {
  CheckIcon,
  LoaderIcon,
  DetailsIcon,
  TrashIcon,
} from '../assets/icons/index'
import Button from './Button'

const TaskItem = ({ task, handleCheckBoxClick, handleDeleteClick }) => {
  const getStatusClasses = () => {
    if (task.status === 'done') {
      return 'bg-brand-primary   text-brand-primary  '
    }

    if (task.status === 'in_progress') {
      return 'bg-brand-process text-brand-process'
    }

    if (task.status === 'not_started') {
      return 'bg-brand-dark-blue bg-opacity-10 text-brand-dark-blue'
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
            onChange={() => handleCheckBoxClick(task.id)}
          />
          {task.status === 'done' && <CheckIcon />}
          {task.status === 'in_progress' && (
            <LoaderIcon className="animate-spin" />
          )}
        </label>
        {task.title}
      </div>

      <div className="flex items-center gap-3">
        <a href="#" className="transition hover:opacity-75">
          <DetailsIcon />
        </a>
        <Button
          onClick={() => handleDeleteClick(task.id)}
          color="colorless"
          className="text-brand-text-gray"
        >
          <TrashIcon />
        </Button>
      </div>
    </div>
  )
}

export default TaskItem
