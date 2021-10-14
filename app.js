const express = require('express')
const app = express()
const PORT = 3000
const { createWriteStream } = require('fs')
const { pipeline } = require('stream')
const sharp = require('sharp')
const { promisify } = require('util')
const { validateFormate } = require('./tools/helper')

app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.post('/image', validateFormate, async (req, res) => {
  try {
    const streamPipeline = promisify(pipeline)
    const { image } = res.locals
    const { pathname } = new URL(image.url)

    const flipIMG = sharp()
      .flip(true)
      .flop(true)
      .toBuffer((err, buffer, info) => { })

    await streamPipeline(image.body, flipIMG, createWriteStream(`images/${pathname}.png`))
    res.send('done')
  } catch (err) {
    console.warn(err)
    res.status('500').json(err)
  }
})

app.listen(PORT, () => console.log(`listening on port ${PORT}`))
