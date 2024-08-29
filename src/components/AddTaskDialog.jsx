import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Input from './Input'
import Button from './Button'
import { CSSTransition } from 'react-transition-group'
import './AddTaskDialog.css'
import { v4 } from 'uuid'
import TimeSelect from './TimeSelect'

// eslint-disable-next-line react/prop-types
const AddTaskDialog = ({ isOpen, handleClose, handleSubmit }) => {
  const [time, setTime] = useState('')
  const [title, setTitle] = useState('morning')
  const [description, setDesciption] = useState('')

  useEffect(() => {
    setTime('')
    setTitle('')
    setDesciption('')
  }, [isOpen])

  const nodeRef = useRef()

  const handleSaveClick = () => {
    if (!title.trim() || !description.trim()) {
      return alert('Preencha todos os campos')
    }
    handleSubmit({
      id: v4(),
      title,
      time,
      description,
      status: 'not_started',
    })

    handleClose()
  }

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
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
                <TimeSelect
                  value={time}
                  onChange={(event) => setTime(event.target.value)}
                />

                <Input
                  id="description"
                  label={'Descrição'}
                  placeholder="Descreva a tarefa"
                  onChange={(event) => setDesciption(event.target.value)}
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
                  <Button
                    size={'large'}
                    className="w-full"
                    onClick={handleSaveClick}
                  >
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
