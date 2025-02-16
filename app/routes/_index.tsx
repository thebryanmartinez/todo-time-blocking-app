import type { MetaFunction } from '@remix-run/node'
import { Link, useOutletContext } from '@remix-run/react'
import { useState } from 'react'

export const meta: MetaFunction = () => {
  return [
    { title: 'Todo Time Blocking App' },
    { name: 'description', content: 'Welcome to Remix!' }
  ]
}

export default function Index() {
  const { supabase } = useOutletContext()
  const [user, setUser] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { data, error } = await supabase.auth.signInWithPassword({
      email: user,
      password: password
    })

    if (error) {
      console.log(error)
      return error
    }

    console.log(data)
  }
  return (
    <div className='flex h-screen w-screen flex-col items-center justify-center gap-4'>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-4'
      >
        <input
          className='input'
          onChange={(event) => setUser(event.target.value)}
          value={user}
          type='text'
          placeholder='Enter your name'
        />
        <input
          className='input'
          onChange={(event) => setPassword(event.target.value)}
          value={password}
          type='text'
          placeholder='Enter your password'
        />
        <button className='btn btn-primary'>Log In</button>
      </form>
      <Link
        className='btn btn-link'
        to='/signup'
      >
        Sign Up
      </Link>
    </div>
  )
}
