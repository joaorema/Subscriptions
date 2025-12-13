'use client' 

import { useFormState } from 'react-dom'
import { loginAction } from './loginuser' // We will create this file next

const initialState = {
  message: '',
}

export default function LoginPage() {
  // 2. This hook connects the Server Action to our UI state
  const [state, formAction] = useFormState(loginAction, initialState)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16">
      <h1 className="text-3xl font-bold mb-6">Login</h1>

      <form action={formAction} className="mb-8 flex flex-col gap-4 border p-8 bg-white shadow rounded">
        
        <input 
          type="text" 
          name="username" 
          placeholder="Username" 
          className="border p-2 rounded text-black w-64"
          required
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          className="border p-2 rounded text-black w-64"
          required
        />

        <button 
          type="submit" 
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 font-bold"
        >
          Login
        </button>

        {/* 3. Display the error message here */}
        {state?.message && (
          <p className="text-red-500 text-sm font-bold text-center mt-2">
            {state.message}
          </p>
        )}
      </form>

      <div className="text-sm text-gray-600">
        Don't have an account? <a href="/register" className="text-blue-600 underline">Register here</a>
      </div>
    </div>
  )
}