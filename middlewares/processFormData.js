const { uploadImage } = require('../services/cloudinaryUtils')
const { Readable } = require('stream')

async function uploadToCloud(file) {
  console.log("we're at uploadToCloud")
  const stream = new Readable()
  stream.push(file.buffer)
  stream.push(null)
  return uploadImage(stream)
}

module.exports.processFormData = async function (req, res, next) {
  const data = JSON.parse(req.body.data)
  if (req.file) {
    await uploadToCloud(req.file).then((res) => {
      console.log(res)
      req.data = { ...data, imgLink: res.secure_url }
    }).catch((err) => console.log(err))
  } else {
    req.data = data
  }
  next()
}
