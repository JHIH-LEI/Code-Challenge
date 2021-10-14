const validUrl = require('valid-url')
const fetch = require('node-fetch')

async function validateFormate(req, res, next) {
  try {
    const { imageURL } = req.body
    if (!validUrl.isUri(imageURL)) return res.status('401').json('請輸入正確的網址格式')
    const image = await fetch(imageURL)
    const contentType = image.headers.get('content-type')
    if (!contentType.includes('image')) return res.status('401').json('請輸入圖片網址')
    res.locals.image = image
    next()
  } catch (err) {
    console.warn(err)
    res.status('404').json(err)
  }
}

module.exports = { validateFormate }