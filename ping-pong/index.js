import express from 'express'
import fs from 'fs/promises'

process.on('SIGINT', () => process.exit())
process.on('SIGTERM', () => process.exit())

let pongNumber = 0

const writePongNumberToFile = async () => {
  try {
    await fs.writeFile('/usr/src/app/pongs-dir/pongs', pongNumber.toString(), 'utf8')
  } catch (err) {
    console.error(`File I/O failed: ${err}`)
  }
}

await writePongNumberToFile()

const app = express()

app.get('/pingpong', async (req, res) => {
  res.send(`pong ${pongNumber}`)
  await writePongNumberToFile()
  pongNumber++
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
})
