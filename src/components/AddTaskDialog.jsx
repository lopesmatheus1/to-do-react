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
  const [time, setTime] = useState('morning') // Inicializa como 'morning'
  const [title, setTitle] = useState('')
  const [description, setDesciption] = useState('')
  const [errors, setErrors] = useState([])

  useEffect(() => {
    setTime('morning')
    setTitle('')
    setDesciption('')
  }, [isOpen])

  const nodeRef = useRef()

  const handleSaveClick = () => {
    const newErros = []

    if (!title.trim()) {
      newErros.push({
        inputName: 'title',
        message: 'O título é obrigatório.',
      })
    }

    if (!time.trim()) {
      newErros.push({
        inputName: 'time',
        message: 'O horário é obrigatório.',
      })
    }

    if (!description.trim()) {
      newErros.push({
        inputName: 'description',
        message: 'A descrição é obrigatório.',
      })
    }

    if (newErros.length > 0) {
      setErrors(newErros)
      console.log(newErros)
      return
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

  const titleError = errors.find((error) => error.inputName === 'title')
  const timeError = errors.find((error) => error.inputName === 'time')
  const descriptionError = errors.find(
    (error) => error.inputName === 'description'
  )

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
                  errorMessage={titleError?.message}
                />

                <TimeSelect
                  value={time}
                  onChange={(event) => setTime(event.target.value)}
                  errorMessage={timeError?.message}
                />

                <Input
                  id="description"
                  label={'Descrição'}
                  placeholder="Descreva a tarefa"
                  onChange={(event) => setDesciption(event.target.value)}
                  errorMessage={descriptionError?.message}
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
