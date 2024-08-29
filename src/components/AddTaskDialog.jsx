/* eslint-disable react/prop-types */
import React, { useRef } from 'react'
import { createPortal } from 'react-dom'
import Input from './Input'
import Button from './Button'
import { CSSTransition } from 'react-transition-group'
import './AddTaskDialog.css'

const AddTaskDialog = ({ isOpen, handleClose }) => {
  const nodeRef = useRef()
  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={500}
      classNames={'add-task-dialog'}
      unmountOnExit
    >
      <div>
        {createPortal(
          <div
            ref={nodeRef}
            className="fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur-sm"
          >
            {/* DIALOG */}
            <div className="rounded-xl bg-white p-5 text-center shadow">
              <h2 className="text-xl font-semibold text-[#35383E]">
                Nova tarefa
              </h2>
              <p className="text=[#9A9C9F] m-4 mt-1">
                Inisira as informações abaixo
              </p>
              <div className="flex w-[336px] flex-col space-y-4">
                <Input
                  id="title"
                  label={'Título'}
                  placeholder="Insira o título da tarefa"
                />
                <Input id="time" label={'Horário'} placeholder="Selecione" />
                <Input
                  id="description"
                  label={'Descrição'}
                  placeholder="Descreva a tarefa"
                />
                <div className="flex gap-3">
                  <Button
                    size={'large'}
                    className="w-full"
                    variant="secondary"
                    onClick={handleClose}
                  >
                    Canelar
                  </Button>
                  <Button size={'large'} className="w-full">
                    Salvar
                  </Button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}{' '}
      </div>
    </CSSTransition>
  )
}

export default AddTaskDialog
