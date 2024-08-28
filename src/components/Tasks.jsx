import React from 'react'
import Button from './Button'
import AddIcon from '../assets/icons/Add.svg?react'
import TrashIcon from '../assets/icons/trash.svg?react'
import SunIcon from '../assets/icons/sun.svg?react'
import CloudSun from '../assets/icons/cloud-sun.svg?react'
import Moon from '../assets/icons/moon.svg?react'
import TaskSeparator from './TaskSeparator'

const Tasks = () => {
  return (
    <div className="w-full px-8 py-16">
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
        </div>

        {/*TARDE*/}
        <div className="my-6 space-y-3">
          <TaskSeparator text="Tarde" icon={<CloudSun />} />
        </div>

        {/*NOITE*/}
        <div className="space-y-3">
          <TaskSeparator text="Noite" icon={<Moon />} />
        </div>
      </div>
    </div>
  )
}

export default Tasks
