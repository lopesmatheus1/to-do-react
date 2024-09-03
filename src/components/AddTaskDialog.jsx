/* eslint-disable react/react-in-jsx-scope */
import { useRef } from 'react'
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
import { useForm } from 'react-hook-form'

// eslint-disable-next-line react/prop-types
const AddTaskDialog = ({
  isOpen,
  handleClose,
  onSubmiteSuccess,
  onSubmiteError,
}) => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      title: '',
      time: 'morning',
      description: '',
    },
  })

  const nodeRef = useRef()

  const handleCancelClick = () => {
    reset({
      title: '',
      time: 'morning',
      description: '',
    })
    handleClose()
  }

  const handleSaveClick = async (data) => {
    const task = {
      id: v4(),
      title: data.title.trim(),
      time: data.time,
      description: data.description.trim(),
      status: 'not_started',
    }

    const response = await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
    })
    if (!response.ok) {
      return onSubmiteError()
    }
    onSubmiteSuccess(task)
    handleClose()
    reset({ title: '', time: 'morning', description: '' })
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
              <h2 className="text-xl font-semibold text-brand-dark-blue">
                Nova tarefa
              </h2>
              <p className="m-4 mt-1 text-brand-text-gray">
                Inisira as informações abaixo
              </p>

              <form onSubmit={handleSubmit(handleSaveClick)}>
                <div className="flex w-[336px] flex-col space-y-4">
                  <Input
                    id="title"
                    label={'Título'}
                    placeholder="Insira o título da tarefa"
                    disabled={isSubmitting}
                    errorMessage={errors?.title?.message}
                    {...register('title', {
                      required: 'O título é obrigatório',
                      validate: (value) => {
                        if (!value.trim()) {
                          return toast('O título é obrigatório')
                        }
                        return true
                      },
                    })}
                  />
                  <TimeSelect
                    disabled={isSubmitting}
                    errorMessage={errors?.time?.message}
                    {...register('time', { required: true })}
                  />
                  <Input
                    id="description"
                    label={'Descrição'}
                    disabled={isSubmitting}
                    placeholder="Descreva a tarefa"
                    errorMessage={errors?.description?.message}
                    {...register('description', {
                      required: 'A descrição é obrigatória',
                      validate: (value) => {
                        if (!value.trim()) {
                          return toast('A descrição é obrigatória')
                        }
                        return true
                      },
                    })}
                  />
                  <div className="flex gap-3">
                    <Button
                      size={'large'}
                      className="w-full"
                      color="secondary"
                      type="button"
                      onClick={handleCancelClick}
                    >
                      Canelar
                    </Button>
                    <Button
                      color="primary"
                      size={'large'}
                      className="w-full"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting && <LoaderIcon className="animate-spin" />}
                      Salvar
                    </Button>
                  </div>
                </div>
              </form>
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
  onSubmiteSuccess: PropTypes.func,
  onSubmiteError: PropTypes.func,
  handleClose: PropTypes.func.isRequired,
}

export default AddTaskDialog
