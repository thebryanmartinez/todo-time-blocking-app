import { useOutletContext } from '@remix-run/react'
import React, { useState } from 'react'

export default function Signup() {
  const { supabase } = useOutletContext()

  const [name, setName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [email, setEmail] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          name: name
        }
      }
    })

    if (error) {
      console.log(error)
      return error
    }

    console.log(data)
    return data
  }

  return (
    <div>
      <form
        className='flex h-screen w-screen flex-col items-center justify-center gap-4'
        onSubmit={handleSubmit}
      >
        <input
          className='input'
          onChange={(event) => setName(event.target.value)}
          value={name}
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
        <input
          className='input'
          onChange={(event) => setConfirmPassword(event.target.value)}
          value={confirmPassword}
          type='text'
          placeholder='Confirm your password'
        />
        <input
          className='input'
          onChange={(event) => setEmail(event.target.value)}
          value={email}
          type='text'
          placeholder='Enter your email'
        />
        <button className='btn btn-primary'>Sign Up</button>
      </form>
    </div>
  )
}
