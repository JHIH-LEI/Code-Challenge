const express = require('express')
const app = express()
const PORT = 3000
const { createWriteStream } = require('fs')
const { pipeline } = require('stream')
const { promisify } = require('util')
const sharp = require('sharp')
const { validateFormate, getPathname } = require('./tools/helpers')

app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.post('/api/image', validateFormate, async (req, res) => {
  try {
    const streamPipeline = promisify(pipeline)
    const { image } = res.locals
    const pathname = getPathname(image)

    const flipImage = sharp()
      .flip(true)
      .flop(true)
      .toBuffer((err, buffer, info) => { })

    await streamPipeline(image.body || image, flipImage, createWriteStream(`images/${pathname}.png`))
    res.send('done')
  } catch (err) {
    console.warn(err)
    res.status('500').json(err)
  }
})

app.listen(PORT, () => console.log(`listening on port ${PORT}`))

module.exports = app