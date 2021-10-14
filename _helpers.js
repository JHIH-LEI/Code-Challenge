async function validateFormateForTest(req, res, next) {
  try {
    const { createReadStream } = require('fs')
    const processedImageForTest = createReadStream('test/fixtures/before.png')
    res.locals.image = processedImageForTest
    next()
  } catch (err) {
    console.warn(err)
  }
}

module.exports = { validateFormateForTest }