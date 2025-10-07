import express from 'express'

process.on('SIGINT', () => process.exit())
process.on('SIGTERM', () => process.exit())

let pongNumber = 0

const app = express()

app.get('/pingpong', (req, res) => {
  res.send(`pong ${pongNumber++}`)
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
})
