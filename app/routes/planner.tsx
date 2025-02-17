import { useOutletContext } from '@remix-run/react'
import React, { useEffect, useState } from 'react'
import { Scheduler } from '~/modules/planner/components/Scheduler'
import { ACCESS_TOKEN_STORAGE_KEY } from '~/modules/shared/constants'
import { Tables } from '~/modules/shared/models'

export default function Planner() {
  const { supabase } = useOutletContext<OutletContextType>()
  // const userAccessToken = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY)

  const [addTask, setAddTask] = useState<Record<string, string>>({
    title: '',
    description: '',
    priority: '',
    status: ''
  })
  const [tasks, setTasks] = useState<Tables<'tasks'>[]>([])
  const [taskAdded, setTaskAdded] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { data, error } = await supabase.from('tasks').insert({
      title: addTask.title,
      description: addTask.description,
      priority: addTask.priority,
      status: addTask.status
    })

    if (error) {
      console.log(error)
      return error
    }

    if (data) {
      setTaskAdded(!taskAdded)
    }
  }

  useEffect(() => {
    supabase
      .from('tasks')
      .select()
      .then((data) => setTasks(data.data))
  }, [taskAdded])

  return (
    <div className='flex h-screen w-screen justify-between gap-4'>
      <form
        className='flex flex-col gap-4'
        onSubmit={handleSubmit}
      >
        <input
          type='text'
          className='input'
          placeholder='Enter your title'
          onChange={(e) => setAddTask({ ...addTask, title: e.target.value })}
        />
        <input
          type='text'
          className='input'
          placeholder='Enter your description'
          onChange={(e) =>
            setAddTask({ ...addTask, description: e.target.value })
          }
        />
        <select
          className='select'
          onChange={(e) => setAddTask({ ...addTask, priority: e.target.value })}
        >
          <option value='low'>Low</option>
          <option value='medium'>Medium</option>
          <option value='high'>High</option>
        </select>
        <select
          className='select'
          onChange={(e) => setAddTask({ ...addTask, status: e.target.value })}
        >
          <option value='pending'>Pending</option>
          <option value='in_progress'>In Progress</option>
          <option value='completed'>Completed</option>
        </select>
        <button
          className='btn btn-primary'
          type='submit'
        >
          Add Task
        </button>
      </form>
      <Scheduler />
    </div>
  )
}
