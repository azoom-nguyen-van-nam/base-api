import fs from 'fs'
import path from 'path'

const generateLinkImage = image => {
  const domain = process.env.DOMAIN
  return `${domain}/${image}`
}

const getPathImageFromLink = linkImage => {
  const domain = process.env.DOMAIN
  return linkImage.replace(`${domain}/`, '')
}

const removeUploadedImage = imagePath => {
  return fs.unlink(path.join(path.resolve('public'), `${imagePath}`), err => {
    if (err) {
      throw Error('Error when delete image')
    }
  })
}

export { generateLinkImage, removeUploadedImage, getPathImageFromLink }
