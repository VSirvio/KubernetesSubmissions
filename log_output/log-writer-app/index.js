import fs from 'fs/promises'
import { v4 as uuidv4 } from 'uuid'

process.on('SIGINT', () => process.exit())
process.on('SIGTERM', () => process.exit())

const randomString = uuidv4()

setInterval(async () => {
  const statusMessage = `${new Date().toISOString()}: ${randomString}`

  console.log(statusMessage)

  try {
    await fs.writeFile('/usr/src/app/files/logfile', statusMessage, 'utf8')
  } catch (err) {
    console.error(`File I/O failed: ${err}`)
  }
}, 5000)
