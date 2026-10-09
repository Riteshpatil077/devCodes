import { useState } from 'react'
import AddTodo from './components/AddTodo'
import Todos from './components/Todos'

function App() {

  return (
    <div className="min-h-screen bg-neutral-900 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white text-center mt-8">Learn Redux Toolkit</h1>
        <AddTodo />
        <Todos />
      </div>
    </div>
  )
}

export default App
