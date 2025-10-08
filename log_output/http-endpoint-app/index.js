import express from 'express'
import fs from 'fs/promises'

process.on('SIGINT', () => process.exit())
process.on('SIGTERM', () => process.exit())

const app = express()

app.get('/', async (req, res) => {
  try {
    const fileData = await fs.readFile('/usr/src/app/files/logfile', 'utf8')
    res.send(fileData)
  } catch (err) {
    console.error(`File I/O failed: ${err}`)
    res.sendStatus(500)
  }
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
})
