import fs from 'fs'
import multer from 'multer'
const uploadFolder = 'public'

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    const [_, dirname] = req.path.split('/')
    const filePath = `${uploadFolder}/images/${dirname ? `${dirname}/` : ''}`
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, { recursive: true })
    }
    callback(null, uploadFolder)
  },
  filename: function (req, file, callback) {
    const [_, dirname] = req.path.split('/')
    const filePath = `images/${
      dirname ? `${dirname}/` : ''
    }${new Date().getTime()}-${file.originalname}`

    if (file.fieldname === 'files' || file.fieldname === 'images')
      req.body[file.fieldname] = !req.body[file.fieldname]
        ? [filePath]
        : [...req.body[file.fieldname], filePath]
    else req.body[file.fieldname] = filePath

    callback(null, filePath)
  },
})

export const fileUploadMiddleware = multer({ storage }).fields([
  { name: 'files', maxCount: 5 },
  { name: 'images', maxCount: 5 },
  { name: 'thumbnail', maxCount: 1 },
  { name: 'avatar', maxCount: 1 },
])
