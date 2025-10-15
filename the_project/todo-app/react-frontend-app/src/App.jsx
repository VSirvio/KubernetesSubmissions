import { useEffect, useState } from 'react'

const App = () => {
  const [todos, setTodos] = useState([])
  const [newTask, setNewTask] = useState('')

  useEffect(async () => {
    setTodos(await (await fetch('/api/todos')).json())
  }, [])

  const addTodo = async (event) => {
    event.preventDefault()
    const newTodo = { task: newTask }
    await fetch(
      '/api/todos',
      {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTodo),
      },
    )
    setTodos(todos.concat(newTodo))
    setNewTask('')
  }

  return (
    <>
      <h1>The project App</h1>
      <img src="image.jpg" />
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={newTask}
          onChange={event => setNewTask(event.target.value)}
          maxLength="140"
        />
        <button type="submit">Create todo</button>
      </form>
      <ul>
        {todos.map(todo => <li>{todo.task}</li>)}
      </ul>
      <div>DevOps with Kubernetes 2025</div>
    </>
  )
}

export default App
