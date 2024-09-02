import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Input from './Input'
import Button from './Button'
import { CSSTransition } from 'react-transition-group'
import './AddTaskDialog.css'
import { v4 } from 'uuid'
import TimeSelect from './TimeSelect'
import PropTypes from 'prop-types'
import { toast } from 'sonner'
import { LoaderIcon } from '../assets/icons/index'

// eslint-disable-next-line react/prop-types
const AddTaskDialog = ({ isOpen, handleClose, onSubmiteSuccess }) => {
  const [time, setTime] = useState('morning') // Inicializa como 'morning'
  const [errors, setErrors] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const nodeRef = useRef()
  const titleRef = useRef()
  const descriptionRef = useRef()

  useEffect(() => {
    setTime('morning')
  }, [isOpen])

  const handleSaveClick = async () => {
    setIsLoading(true)
    const newErros = []
    const title = titleRef.current.value
    const description = descriptionRef.current.value

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
    setErrors(newErros)
    if (newErros.length > 0) {
      return setIsLoading(false)
    }

    const task = { id: v4(), title, time, description, status: 'not_started' }
    const response = await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
    })
    if (!response.ok) {
      setIsLoading(false)
      return toast.error('Erro ao adicionar tarefa. Por favor, tente novamente')
    }
    onSubmiteSuccess(task)
    setIsLoading(false)
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
              <h2 className="text-xl font-semibold text-brand-dark-blue">
                Nova tarefa
              </h2>
              <p className="m-4 mt-1 text-brand-text-gray">
                Inisira as informações abaixo
              </p>

              <div className="flex w-[336px] flex-col space-y-4">
                <Input
                  id="title"
                  label={'Título'}
                  placeholder="Insira o título da tarefa"
                  errorMessage={titleError?.message}
                  ref={titleRef}
                  disabled={isLoading}
                />

                <TimeSelect
                  value={time}
                  onChange={(event) => setTime(event.target.value)}
                  errorMessage={timeError?.message}
                  disabled={isLoading}
                />

                <Input
                  id="description"
                  label={'Descrição'}
                  placeholder="Descreva a tarefa"
                  errorMessage={descriptionError?.message}
                  ref={descriptionRef}
                  disabled={isLoading}
                />

                <div className="flex gap-3">
                  <Button
                    size={'large'}
                    className="w-full"
                    color="secondary"
                    onClick={handleClose}
                  >
                    Canelar
                  </Button>
                  <Button
                    color="primary"
                    size={'large'}
                    className="w-full"
                    onClick={handleSaveClick}
                    disabled={isLoading}
                  >
                    {isLoading && <LoaderIcon className="animate-spin" />}
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

AddTaskDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

export default AddTaskDialog
