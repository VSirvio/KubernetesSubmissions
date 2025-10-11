import express from 'express'
import fs from 'fs'
import fsp from 'fs/promises'
import { Readable } from 'stream'
import { finished } from 'stream/promises'

const PORT = process.env.PORT || '3000'

process.on('SIGINT', () => process.exit())
process.on('SIGTERM', () => process.exit())

const downloadFile = async (from, to) => {
  const response = await fetch(from)
  const writeStream = fs.createWriteStream(to)
  await finished(Readable.fromWeb(response.body).pipe(writeStream))
}

const app = express()

app.use(express.static('static'))

app.get('/', async (req, res) => {
  let fileStat = null
  let errored = false
  try {
    fileStat = await fsp.stat('static/image.jpg')
  } catch {
    errored = true
  }

  if (errored || Date.now() - fileStat.mtime > 600000) {
    await downloadFile('https://picsum.photos/256', 'static/image.jpg')
  }

  res.send('<h1>The project App</h1><img src="image.jpg"><br><br><div>DevOps with Kubernetes 2025</div')
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
