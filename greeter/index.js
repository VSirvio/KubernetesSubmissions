import express from 'express'

process.on('SIGINT', () => process.exit())
process.on('SIGTERM', () => process.exit())

const app = express()

app.get('/', (req, res) => {
  res.set('Content-Type', 'text/plain')
  res.send('Hello from version 2')
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
})
