import React from 'react'
import Button from './Button'
import AddIcon from '../assets/icons/Add.svg?react'
import TrashIcon from '../assets/icons/trash.svg?react'

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
    </div>
  )
}

export default Tasks
