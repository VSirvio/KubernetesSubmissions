import express from 'express'
import { DataTypes, Model, Sequelize } from 'sequelize'

const PORT = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL

process.on('SIGINT', () => process.exit())
process.on('SIGTERM', () => process.exit())

const sequelize = new Sequelize(DATABASE_URL, { logging: false })

try {
  await sequelize.authenticate()
} catch (err) {
  console.error(`Unable to connect to the database: ${err}`)
  process.exit(1)
}

class PongNumber extends Model {}
PongNumber.init(
  { pongNumber: DataTypes.INTEGER },
  { sequelize, modelName: 'PongNumber' },
)

await sequelize.sync()

console.log('Connection has been established successfully')

const fetchPongNumber = async () => {
  let databaseEntries = await PongNumber.findAll()
  if (databaseEntries.length === 0) {
    databaseEntries = [await PongNumber.create({ pongNumber: 0 })]
  }
  return databaseEntries[0].pongNumber
}

const app = express()

app.get('/', async (req, res) => {
  const pongNumber = await fetchPongNumber()
  await PongNumber.update({ pongNumber: pongNumber + 1 }, { where: {} })
  res.send(`pong ${pongNumber}`)
})

app.get('/pings', async (req, res) => {
  res.send(await fetchPongNumber())
})

app.get('/healthz', (req, res) => {
  res.end()
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
