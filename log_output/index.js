import express from 'express'
import { v4 as uuidv4 } from 'uuid'

process.on('SIGINT', () => process.exit())
process.on('SIGTERM', () => process.exit())

const randomString = uuidv4();

const generateStatusMessage = () => `${new Date().toISOString()}: ${randomString}`

setInterval(() => console.log(generateStatusMessage()), 5000)

const app = express()

app.get('/', (req, res) => {
  res.send(generateStatusMessage())
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
})
