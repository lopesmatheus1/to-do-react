import React, { useState } from 'react'
import Button from './Button'
import AddIcon from '../assets/icons/Add.svg?react'
import TrashIcon from '../assets/icons/trash.svg?react'
import SunIcon from '../assets/icons/sun.svg?react'
import CloudSun from '../assets/icons/cloud-sun.svg?react'
import Moon from '../assets/icons/moon.svg?react'
import TaskSeparator from './TaskSeparator'
import TASKS from '../constants/task'
import TaskItem from './TaskItem'

const Tasks = () => {
  const [tasks, setTasks] = useState(TASKS)

  const morningTasks = tasks.filter((task) => task.time === 'morning')
  const afternoonTasks = tasks.filter((task) => task.time === 'afternoon')
  const eveningTasks = tasks.filter((task) => task.time === 'evening')

  const handleTaskDeleteClick = (taskId) => {
    const newTasks = tasks.filter((task) => task.id !== taskId)
    setTasks(newTasks)
  }

  const handleTaskCheckBoxClick = (taskId) => {
    const newTasks = tasks.map((task) => {
      if (task.id !== taskId) {
        return task
      }

      if (task.status === 'not_started') {
        return { ...task, status: 'in_progress' }
      }

      if (task.status === 'in_progress') {
        return { ...task, status: 'done' }
      }

      if (task.status === 'done') {
        return { ...task, status: 'not_started' }
      }
    })
    setTasks(newTasks)
  }

  return (
    <div className="w-full space-y-6 px-8 py-16">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-[#00ADB5]">
            Minhas tarefas
          </span>
          <h2 className="text-xl font-semibold">Minhas Tarefas</h2>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="colorless">
            Limpar tarefas
            <TrashIcon />
          </Button>
          <Button>
            Nova Tarefa
            <AddIcon />
          </Button>
        </div>
      </div>

      {/*LISTA DE TAREFAS*/}

      <div className="rounded-xl bg-white p-6">
        {/*MANHÃ*/}
        <div className="space-y-3">
          <TaskSeparator text="Manhã" icon={<SunIcon />} />

          {/* TAREFAS MANHÃ */}
          {morningTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckBoxClick={handleTaskCheckBoxClick}
              handleDeleteClick={handleTaskDeleteClick}
            />
          ))}
        </div>

        {/*TARDE*/}
        <div className="my-6 space-y-3">
          <TaskSeparator text="Tarde" icon={<CloudSun />} />

          {/* TAREFAS TARDE */}
          {afternoonTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckBoxClick={handleTaskCheckBoxClick}
              handleDeleteClick={handleTaskDeleteClick}
            />
          ))}
        </div>

        {/*NOITE*/}
        <div className="space-y-3">
          <TaskSeparator text="Noite" icon={<Moon />} />

          {/* TAREFAS NOITE */}
          {eveningTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckBoxClick={handleTaskCheckBoxClick}
              handleDeleteClick={handleTaskDeleteClick}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tasks
