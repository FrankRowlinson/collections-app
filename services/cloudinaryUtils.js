const cloudinary = require('../config/cloudinary.config')

module.exports.uploadImage = async (stream) => {
  console.log("we're at uploadImage")
  return new Promise((resolve, reject) => {
    const writableStream = cloudinary.uploader.upload_stream(
      {
        folder: 'collections',
      },
      (err, res) => {
        if (err) {
          return reject(err)
        }
        return resolve(res)
      }
    )
    stream.pipe(writableStream)
  })
}
