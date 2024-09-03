import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { Right, ArrowLeft, TrashIcon, LoaderIcon } from '../assets/icons/index'

import Button from '../components/Button'

import Input from '../components/Input'
import TimeSelect from '../components/TimeSelect'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'

/* eslint-disable react/react-in-jsx-scope */

const TaskDetailsPage = () => {
  const { taskId } = useParams()
  const [task, setTask] = useState()
  const navigate = useNavigate()

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm()

  const handleBackClick = () => {
    navigate(-1)
  }

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'GET',
      })
      const data = await response.json()
      setTask(data)
      reset(data)
    }
    fetchTask()
  }, [taskId, reset])

  const handleDeleteClick = async () => {
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      return toast.error('Ocorreu um erro ao deletar tarefa')
    }
    toast.success('Tarefa deletada com sucesso!')
    navigate(-1)
  }

  const handleSaveClick = async (data) => {
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        title: data.title.trim(),
        description: data.description.trim(),
        time: data.time,
      }),
    })
    if (!response.ok) {
      return toast.error('Ocorreu um erro ao salvar a tarefa')
    }
    const newTask = await response.json()
    setTask(newTask)

    toast.success('Tarefa salva com sucesso')
  }

  return (
    <div className="flex">
      <Sidebar />

      <div className="w-full px-8 py-16">
        <form className="space-y-6" onSubmit={handleSubmit(handleSaveClick)}>
          {/* BARRA TOP */}
          <div className="flex w-full justify-between">
            {/* PARTE DA ESQUERDA */}
            <div>
              <button
                onClick={handleBackClick}
                className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary"
              >
                <ArrowLeft />
              </button>
              <div className="flex items-center gap-1 text-xs">
                <Link className="cursor-pointer text-brand-text-gray" to="/">
                  Minhas tarefas
                </Link>
                <Right className="text-brand-text-gray" />
                <span className="font-semibold text-brand-primary">
                  {task?.title}
                </span>
              </div>
              <h1 className="mt-2 text-xl font-semibold text-brand-dark-blue">
                {task?.title}
              </h1>
            </div>
            {/* PARTE DA DIREITA */}
            <Button
              onClick={handleDeleteClick}
              className="h-fit self-end"
              color="danger"
              type="button"
            >
              <TrashIcon />
              Deletar Tarefa
            </Button>
          </div>
          <div className="space-y-6 rounded-xl bg-brand-white p-6">
            <div>
              <Input
                id="title"
                label="Título"
                {...register('title', {
                  required: 'O título é obrigatório.',
                  validate: (value) => {
                    if (!value.trim()) {
                      return toast('O título é obrigatório.')
                    }
                    return true
                  },
                })}
                errorMessage={errors?.title?.message}
              />
            </div>

            <div>
              <TimeSelect
                {...register('time', {
                  required: 'O horário é obrigatório',
                  validate: (value) => {
                    if (!value.trim()) {
                      return toast('O horário é obrigatório.')
                    }
                    return true
                  },
                })}
                errorMessage={errors?.time?.message}
              ></TimeSelect>
            </div>
            <div>
              <Input
                id="description"
                label="Descrição"
                {...register('description', {
                  required: 'A descrição é obrigatória.',
                  validate: (value) => {
                    if (!value.trim()) {
                      return toast('A descrição é obrigatório.')
                    }
                    return true
                  },
                })}
                errorMessage={errors?.description?.message}
              />
            </div>
          </div>
          <div className="flex w-full justify-end gap-3">
            <Button
              color="primary"
              size="large"
              className="bg-opacity-30"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting && <LoaderIcon className="animate-spin" />}
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskDetailsPage
