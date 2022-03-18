const multer = require('multer')
const path = require('path')
const fs = require('fs')
const config = require('./config')

const uploadFile = (folder) => {
  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
      const dir = path.join(__dirname, `../../public/storage/${folder}/`)
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
      }
      cb(null, dir)
    },
    filename: (_req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`
      const extension = file.originalname.split('.').pop()
      cb(null, `${uniqueSuffix}.${extension}`)
    }
  })
  return multer({ storage })
}

const getFileUrl = async (folder, filename) => {
  const host = config.get('server.host')
  return `${host}/storage/${folder}/${filename}`
}

module.exports = { uploadFile, getFileUrl }
