import express from 'express'

const PORT = process.env.PORT || '3000'

process.on('SIGINT', () => process.exit())
process.on('SIGTERM', () => process.exit())

const app = express()

app.get('/', (req, res) => {
  res.send('<h1>Hello world!</h1>')
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
