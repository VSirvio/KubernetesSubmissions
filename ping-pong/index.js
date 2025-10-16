import express from 'express'

const PORT = process.env.PORT

process.on('SIGINT', () => process.exit())
process.on('SIGTERM', () => process.exit())

let pongNumber = 0

const app = express()

app.get('/pingpong', (req, res) => {
  res.send(`pong ${pongNumber}`)
  pongNumber++
})

app.get('/pings', (req, res) => {
  res.send(pongNumber)
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
