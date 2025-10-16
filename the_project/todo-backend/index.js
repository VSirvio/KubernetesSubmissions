import express from 'express'

const PORT = process.env.PORT
const TODOS_PATH = process.env.TODOS_PATH

process.on('SIGINT', () => process.exit())
process.on('SIGTERM', () => process.exit())

const todos = []

const app = express()

app.use(express.json())

app.get(TODOS_PATH, (req, res) => {
  res.json(todos)
})

app.post(TODOS_PATH, (req, res) => {
  const newTodo = req.body
  todos.push(newTodo)
  res.status(201).json(newTodo)
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
