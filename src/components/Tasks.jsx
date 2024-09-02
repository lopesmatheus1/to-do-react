import React, { useState } from 'react'
import Button from './Button'
import {
  AddIcon,
  TrashIcon,
  SunIcon,
  CloudSun,
  MoonIcon,
} from '../assets/icons/'
import TaskSeparator from './TaskSeparator'
import TASKS from '../constants/task'
import TaskItem from './TaskItem'
import { toast } from 'sonner'
import AddTaskDialog from './AddTaskDialog'

const Tasks = () => {
  const [tasks, setTasks] = useState(TASKS)
  const [addTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false)

  const morningTasks = tasks.filter((task) => task.time === 'morning')
  const afternoonTasks = tasks.filter((task) => task.time === 'afternoon')
  const eveningTasks = tasks.filter((task) => task.time === 'evening')

  const handleTaskDeleteClick = (taskId) => {
    const newTasks = tasks.filter((task) => task.id !== taskId)
    setTasks(newTasks)
    toast.success('Tarefa deletada com sucesso')
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

  const handleAddTaskSubmit = (task) => {
    setTasks([...tasks, task])
    toast.success('Tarefa adicionada!')
  }

  return (
    <div className="w-full space-y-6 px-8 py-16">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-brand-primary">
            Minhas tarefas
          </span>
          <h2 className="text-xl font-semibold">Minhas Tarefas</h2>
        </div>

        <div className="flex items-center gap-4">
          <Button color="colorless" onClick={() => setTasks([])}>
            Limpar tarefas
            <TrashIcon />
          </Button>
          <Button onClick={() => setAddTaskDialogIsOpen(true)}>
            Nova Tarefa
            <AddIcon />
          </Button>

          <AddTaskDialog
            isOpen={addTaskDialogIsOpen}
            handleClose={() => setAddTaskDialogIsOpen(false)}
            handleSubmit={handleAddTaskSubmit}
          ></AddTaskDialog>
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
          <TaskSeparator text="Noite" icon={<MoonIcon />} />

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
