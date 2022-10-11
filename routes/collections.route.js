const router = require('express').Router()
const prisma = require('../client')
const { upload } = require('../config/multer.config')
const { FieldType } = require('@prisma/client')
const { validateUser } = require('../middlewares/validateUser')
const { processFormData } = require('../middlewares/processFormData')
const createCollection = require('../services/createCollection')
const getCollection = require('../services/getCollection')

router.get('/', validateUser, async (req, res, next) => {
  const collections = await prisma.collection.findMany()
  res.json({ collections: { ...collections } })
})

router.get('/props', validateUser, async (req, res, next) => {
  const collectionTypes = await prisma.collectionType.findMany()
  const fieldTypes = Object.keys(FieldType)
  console.log('1')
  res.json({ fieldTypes, collectionTypes })
})

router.get('/:id', async (req, res, next) => {
  try {
    const collection = await getCollection(req.query.id)
    res.json(collection)
  } catch (err) {
    next(err)
  }
})

router.post(
  '/',
  validateUser,
  upload.single('img'),
  processFormData,
  async (req, res, next) => {
    console.log("we're at route")
    try {
      const collection = await createCollection(req.data, req.user.id)
      res.json({
        status: 'ok',
        message: 'collection created',
        collection_id: collection.id,
      })
    } catch (err) {
      console.log(err)
    }
  }
)

module.exports = router
