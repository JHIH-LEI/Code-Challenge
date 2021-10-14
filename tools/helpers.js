const validUrl = require('valid-url')
const fetch = require('node-fetch')
const { createReadStream } = require('fs')
const processedImageForTest = createReadStream('test/fixtures/before.png')

async function validateFormate(req, res, next) {
  try {
    if (process.env.NODE_ENV === 'test') return validateFormateForTest(req, res, next)
    const { imageURL } = req.body
    if (!validUrl.isUri(imageURL)) return res.status('400').json('請輸入正確的網址格式')
    const image = await fetch(imageURL)
    const contentType = image.headers.get('content-type')
    if (!contentType.includes('image')) return res.status('400').json('請輸入圖片網址')
    res.locals.image = image
    next()
  } catch (err) {
    console.warn(err)
    res.status('404').json(err)
  }
}

async function validateFormateForTest(req, res, next) {
  try {
    res.locals.image = processedImageForTest
    next()
  } catch (err) {
    console.warn(err)
  }
}


module.exports = { validateFormate, validateFormateForTest }