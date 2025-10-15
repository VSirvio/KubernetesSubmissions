import express from 'express'

const PORT = process.env.PORT || '3000'

process.on('SIGINT', () => process.exit())
process.on('SIGTERM', () => process.exit())

const todos = []

const app = express()

app.use(express.json())

app.get('/api/todos', (req, res) => {
  res.json(todos)
})

app.post('/api/todos', (req, res) => {
  const newTodo = req.body
  todos.push(newTodo)
  res.status(201).json(newTodo)
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
