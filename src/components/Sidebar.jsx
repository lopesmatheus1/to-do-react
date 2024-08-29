import React from 'react'
import SidebarButton from './SidebarButton'
import { HomeIcon, TaskIcon } from '../assets/icons/'

const Sidebar = () => {
  return (
    <div className="h-screen w-80 bg-white">
      <div className="space-y-4 px-8 py-6">
        <h1 className="text-xl font-semibold text-[#00ADB5]">Task Manager</h1>
        <p>
          Um simples{' '}
          <span className="text-[#00ADB5]">
            Um simples organizador de tarefas
          </span>
        </p>
      </div>

      <div className="flex flex-col gap-2 p-2">
        <SidebarButton variant="unselected">
          <HomeIcon />
          Inicio
        </SidebarButton>
        <SidebarButton variant="selected">
          <TaskIcon className="text-[#00ADB5]" />
          Minhas Tarefas
        </SidebarButton>
      </div>
    </div>
  )
}

export default Sidebar
