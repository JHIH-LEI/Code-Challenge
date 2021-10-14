# Image Processing Code Challenge

# Task
Stream an image from a url to your computer and flip it along the Y and X axis.[image](https://images.unsplash.com/photo-1631086459990-06bc4d7ad6cf)

[you can see challenge from here](https://gist.github.com/skylinezum/7e92b87c07570c26bf624c7176874480)

# Feature
User can provide URL to download source, image will auto flip and flop.


# Route


| Method | Route | Body |
| -------- | -------- | -------- |
|   POST   | /api/image    | imageURL=putYourURLHere     |

# Status Code

* 200 - done，代表成功處理圖片
* 400 - 請輸入正確的網址格式 or 請輸入圖片網址
* 404 - 會附帶錯誤訊息，目前已知當URL為data:image/png;base64這種開頭的，就會跳錯，要求要用https
* 500 - 會附帶錯誤訊息

# Environment & Packges
* Must use Node 12.x up version

## Node & Express
```
"node":"v12.13.0"
"express":"4.16.0"
```

## Stream
Use Node.js build-in package
* [pipeline & input](https://nodejs.org/docs/latest-v12.x/api/stream.html#stream_stream_pipeline_streams_callback)
* [output (createWriteStream)](https://nodejs.org/docs/latest-v12.x/api/fs.html#fs_fs_createwritestream_path_options)

## Image Processing Packages
```
"node-fetch": "^2.6.1"
"sharp": "^0.29.1"
```

## Validate
```
"valid-url": "^1.0.9"
```
* 專案中有寫helper來驗證抓到的檔案格式
## Test
```
"mocha": "^9.1.2"
"supertest": "^6.1.6"
```

## Dev
```
"nodemon": "^2.0.13"
```

# Installation & Usage

## Installation

```
git clone https://github.com/JHIH-LEI/Code-Challenge.git
```

### Add a images folder

![](https://i.imgur.com/pDUfFn8.png)

* Must use exactly same folder name

### Download Packages
```
npm install
```

* Notice: If you use Mac M1 please see [sharp-Prebuilt sharp and libvips binarie](https://sharp.pixelplumbing.com/install#apple-m1) to config

### Run APP
```
npm run start
```
or
```
npm run dev
```
![](https://i.imgur.com/na0voO6.png)
### Test
```
npm run test
```
## Usage Steps:
1. Open [postman](https://www.postman.com/downloads/) and type below URL
```
http://localhost:3000/api/image
```
* Make sure you use POST method
2. Type image source(must be url)
![](https://i.imgur.com/YKtQkY3.png)
3. Send request
![](https://i.imgur.com/G8a4IHC.png)
![](https://i.imgur.com/EHsujha.png)
(if success you will see "done" and image will in the images folder)

# Notice
* 目前未加上壓縮處理，如果內存過多會爆，需要做額外處理，未來可使用：
1. 設限圖片大小
2. 控制input stream的大小，避免源消耗來不及 
3. nodejs內置的[zlib](https://nodejs.org/api/zlib.html)套件來實現壓縮
```
const zlib = require('zlib')
pipeline
input->zlib.createGzip()->output
```
* Sharp套件對M1開發者相對不友善，需要額外做設定，未來可考慮使用其他套件，如[jimp](https://www.npmjs.com/package/jimp)。
