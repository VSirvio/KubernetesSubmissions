import express from 'express'
import { DataTypes, Model, Sequelize } from 'sequelize'

const PORT = process.env.PORT
const TODOS_PATH = process.env.TODOS_PATH
const DATABASE_URL = process.env.DATABASE_URL

process.on('SIGINT', () => process.exit())
process.on('SIGTERM', () => process.exit())

const sequelize = new Sequelize(DATABASE_URL, { logging: false })

class Todo extends Model {}
Todo.init(
  { task: DataTypes.STRING },
  { sequelize, modelName: 'Todo' }
)

await sequelize.sync()

const app = express()

app.use(express.json())

app.get(TODOS_PATH, async (req, res) => {
  const todos = await Todo.findAll()
  res.json(todos)
})

app.post(TODOS_PATH, async (req, res) => {
  const newTodo = req.body
  const createdTodo = await Todo.create(newTodo)
  res.status(201).json(createdTodo)
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
