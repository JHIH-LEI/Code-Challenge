const request = require('supertest')
const assert = require('assert')
const app = require('../../app')
const { readFileSync, unlinkSync, existsSync } = require('fs')

// 測試：給予一張圖片，經路由處理後，是否會等於預期翻轉的結果
describe('#flip and flop image', () => {

  describe('POST /api/images', () => {
    // 刪除圖片
    before(() => {
      if (existsSync('images/image.png')) {
        unlinkSync('images/image.png')
      }
    })

    it(' - successfully ', (done) => {
      request(app)
        .post('/api/image')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)

          const processedResult = readFileSync('images/image.png')
          const expectedImage = readFileSync('test/fixtures/after.png')

          assert.deepStrictEqual(processedResult, expectedImage)

          return done()
        })
    })
  })

  after(() => {
    if (existsSync('images/image.png')) {
      unlinkSync('images/image.png')
    }
  })
})