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

  const todoDone = id => async (event) => {
    event.preventDefault()
    await fetch(
      `/api/todos/${id}`,
      { method: 'PUT' },
    )
    setTodos(todos.map(todo => todo.id === id ? {...todo, done: true} : todo))
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
      <h2>Todo</h2>
      <ul>
        {todos.filter(todo => !todo.done).map(todo => (
          <li>
            {todo.task}
            <form onSubmit={todoDone(todo.id)}>
              <button type="submit">Mark as done</button>
            </form>
          </li>
        ))}
      </ul>
      <h2>Done</h2>
      <ul>
        {todos.filter(todo => todo.done).map(todo => <li>{todo.task}</li>)}
      </ul>
      <div>DevOps with Kubernetes 2025</div>
    </>
  )
}

export default App
