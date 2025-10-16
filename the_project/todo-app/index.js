import express from 'express'
import fs from 'fs'
import fsp from 'fs/promises'
import { Readable } from 'stream'
import { finished } from 'stream/promises'

const PORT = process.env.PORT
const FRONTEND_ROOT_DIR = process.env.FRONTEND_ROOT_DIR
const RANDOM_PICTURE_URL = process.env.RANDOM_PICTURE_URL
const PICTURE_SAVE_DIR = process.env.PICTURE_SAVE_DIR
const PICTURE_FILE_NAME = process.env.PICTURE_FILE_NAME
const PICTURE_CHANGE_TIME_IN_MINUTES = process.env.PICTURE_CHANGE_TIME_IN_MINUTES

process.on('SIGINT', () => process.exit())
process.on('SIGTERM', () => process.exit())

const downloadFile = async (from, to) => {
  const response = await fetch(from)
  const writeStream = fs.createWriteStream(to)
  await finished(Readable.fromWeb(response.body).pipe(writeStream))
}

const app = express()

app.use(express.static(FRONTEND_ROOT_DIR))

app.use(async (req, res, next) => {
  let fileStat = null
  let errored = false
  try {
    fileStat = await fsp.stat(`${PICTURE_SAVE_DIR}/${PICTURE_FILE_NAME}`)
  } catch {
    errored = true
  }

  if (errored || Date.now() - fileStat.mtime > PICTURE_CHANGE_TIME_IN_MINUTES * 60000) {
    await downloadFile(RANDOM_PICTURE_URL, `${PICTURE_SAVE_DIR}/${PICTURE_FILE_NAME}`)
  }

  next()
})

app.use(express.static(PICTURE_SAVE_DIR))

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
