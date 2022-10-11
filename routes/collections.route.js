const router = require('express').Router()
const prisma = require('../client')
const { upload } = require('../config/multer.config')
const { FieldType } = require('@prisma/client')
const { validateUser } = require('../middlewares/validateUser')
const { processFormData } = require('../middlewares/processFormData')
const createCollection = require('../services/createCollection')
const getCollection = require('../services/getCollection')
const getBiggestCollections = require('../services/getBiggestCollections')
const getUserCollections = require('../services/getUserCollections')
const getCollectionFields = require('../services/getCollectionFields')

// get all collections
router.get('/', validateUser, async (req, res, next) => {
  const collections = await prisma.collection.findMany()
  res.json({collections: collections})
})

router.get('/fields/:id', validateUser, async (req, res, next) => {
  try {
    const fields = await getCollectionFields(req.params.id)
    res.json({fields: fields})
  } catch (err) {
    console.log(err)
    next(err)
  }
})
// get field props for create collection form
router.get('/props', validateUser, async (req, res, next) => {
  const collectionTypes = await prisma.collectionType.findMany()
  const fieldTypes = Object.keys(FieldType)
  res.json({ fieldTypes, collectionTypes })
})

// get five biggest collections (by amount of items)
router.get('/biggest', async (req, res, next) => {
  try {
    const collections = await getBiggestCollections()
    res.json({collections})
  } catch (err) {
    next(err)
  }
})

router.get('/userCollections/', validateUser, async (req, res, next) => {
  try {
    const collections = await getUserCollections(req.user.id)
    res.json({collections})
  } catch (err) {
    next(err)
  }
})

router.get('/userCollections/:id', async (req, res, next) => {
  try {
    const collections = await getUserCollections(req.params.id)
    res.json({collections: collections})
  } catch (err) {
    next(err)
  }
})

// get single collection by id
router.get('/byId/:id', async (req, res, next) => {
  try {
    const collection = await getCollection(req.params.id)
    res.json(collection)
  } catch (err) {
    next(err)
  }
})


// create collection
router.post(
  '/',
  validateUser,
  upload.single('img'),
  processFormData,
  async (req, res, next) => {
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
