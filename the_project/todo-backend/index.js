import express from 'express'
import morgan from 'morgan'
import { DataTypes, Model, Sequelize } from 'sequelize'

const PORT = process.env.PORT
const TODOS_PATH = process.env.TODOS_PATH
const DATABASE_URL = process.env.DATABASE_URL

process.on('SIGINT', () => process.exit())
process.on('SIGTERM', () => process.exit())

const sequelize = new Sequelize(DATABASE_URL, { logging: false })

class Todo extends Model {}
Todo.init(
  {
    task: {
      type: DataTypes.STRING,
    },
    done: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { sequelize, modelName: 'Todo' },
)

const app = express()

morgan.token('body', (req, res) => JSON.stringify(req.body))

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/', (req, res) => {
  res.send('todo-backend root endpoint')
})

app.get(TODOS_PATH, async (req, res) => {
  const todos = await Todo.findAll()
  res.json(todos)
})

app.post(TODOS_PATH, async (req, res) => {
  const newTodo = req.body

  if (typeof newTodo !== 'object') {
    res.status(400).send('Request body should be a JSON object')
    return
  }

  if (typeof newTodo.task !== 'string') {
    res.status(400).send('Request body should contain a "task" property of type "string"')
    return
  }

  if (newTodo.task.length > 140) {
    res.status(400).send('Task should not contain more than 140 characters')
    return
  }

  const createdTodo = await Todo.create(newTodo)
  res.status(201).json(createdTodo)
})

app.put(TODOS_PATH + '/:id', async (req, res) => {
    const id = req.params.id
    await Todo.update(
      { done: true },
      { where: { id: id } },
    )
    res.end()
})

app.get('/healthz', async (req, res) => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    res.end()
    return
  } catch {
    res.status(500).end()
    return
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
