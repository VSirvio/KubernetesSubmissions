import express from 'express'
import fs from 'fs/promises'

process.on('SIGINT', () => process.exit())
process.on('SIGTERM', () => process.exit())

const app = express()

app.get('/', async (req, res) => {
  try {
    const information = await fs.readFile('/usr/src/app/config/information.txt', 'utf8')
    const MESSAGE = process.env.MESSAGE || 'ERROR'
    const statusMessage = await fs.readFile('/usr/src/app/files/logfile', 'utf8')
    const pongNumber = await (await fetch('http://ping-pong-svc:2345/pings')).text()

    res.set('Content-Type', 'text/plain')
    res.send(`file content: ${information}
env variable: MESSAGE=${MESSAGE}
${statusMessage}
Ping / Pongs: ${pongNumber}`)
  } catch (err) {
    console.error(`File I/O failed: ${err}`)
    res.sendStatus(500)
  }
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
})
