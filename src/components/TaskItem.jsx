/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import {
  CheckIcon,
  LoaderIcon,
  DetailsIcon,
  TrashIcon,
} from '../assets/icons/index'
import PropTypes from 'prop-types'
import Button from './Button'
import { toast } from 'sonner'

const TaskItem = ({ task, handleCheckBoxClick, onDeleteSuccess }) => {
  const [deleteIsLoading, setDeleteIsLoading] = useState(false)

  const handleDeleteClick = async () => {
    setDeleteIsLoading(true)
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      setDeleteIsLoading(false)
      return toast.error('Erro ao deletar tarefa. Por favor, tente novamente!')
    }
    onDeleteSuccess(task.id)
    setDeleteIsLoading(false)
  }

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
            <LoaderIcon className="animate-spin text-brand-white" />
          )}
        </label>
        {task.title}
      </div>

      <div className="flex items-center gap-3">
        <a href="#" className="transition hover:opacity-75">
          <DetailsIcon />
        </a>
        <Button
          onClick={handleDeleteClick}
          disabled={deleteIsLoading}
          color="colorless"
        >
          {deleteIsLoading ? (
            <LoaderIcon className="animate-spin text-brand-text-gray" />
          ) : (
            <TrashIcon className="text-brand-text-gray" />
          )}
        </Button>
      </div>
    </div>
  )
}

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    time: PropTypes.oneOf(['morning', 'afternoon', 'evening']).isRequired,
    status: PropTypes.oneOf(['not_started', 'done', 'in_progress']).isRequired,
  }).isRequired,

  handleCheckBoxClick: PropTypes.func.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
}

export default TaskItem
