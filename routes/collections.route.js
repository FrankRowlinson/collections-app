const router = require('express').Router()
const prisma = require('../client')
const { upload } = require('../config/multer.config')
const { FieldType } = require('@prisma/client')
const { processFormData } = require('../middlewares/processFormData')
const {
  checkUserAccess,
  checkAdminPermissions,
} = require('../middlewares/authorization')
const createCollection = require('../services/createCollection')
const getCollection = require('../services/getCollection')
const getBiggestCollections = require('../services/getBiggestCollections')
const getUserCollections = require('../services/getUserCollections')
const getCollectionFields = require('../services/getCollectionFields')
const manageCollection = require('../services/manageCollection')

// get all collections
router.get(
  '/',
  checkUserAccess,
  checkAdminPermissions,
  async (req, res, next) => {
    const collections = await prisma.collection.findMany()
    res.json({ collections: collections })
  }
)

router.get('/fields/:id', checkUserAccess, async (req, res, next) => {
  try {
    const fields = await getCollectionFields(req.params.id)
    res.json({ fields })
  } catch (err) {
    console.log(err)
    next(err)
  }
})
// get field props for create collection form
router.get('/props', checkUserAccess, async (req, res, next) => {
  const collectionTypes = await prisma.collectionType.findMany()
  const fieldTypes = Object.keys(FieldType)
  res.json({ fieldTypes, collectionTypes })
})

// get five biggest collections (by amount of items)
router.get('/biggest', async (req, res, next) => {
  try {
    const collections = await getBiggestCollections()
    res.json({ collections })
  } catch (err) {
    next(err)
  }
})

router.get('/userCollections/', checkUserAccess, async (req, res, next) => {
  try {
    const collections = await getUserCollections(req.user.id)
    res.json({ collections })
  } catch (err) {
    next(err)
  }
})

router.get('/userCollections/:id', async (req, res, next) => {
  try {
    const collections = await getUserCollections(req.params.id)
    res.json({ collections: collections })
  } catch (err) {
    next(err)
  }
})

// get single collection by id
router.get('/byId/:id', async (req, res, next) => {
  try {
    const collection = await getCollection(req.params.id)
    if (collection) {
      res.json({ status: 'ok', collection })
    } else {
      res.json({ status: 'error', error: 'Collection not found' })
    }
  } catch (err) {
    next(err)
  }
})

// create collection
router.post(
  '/',
  checkUserAccess,
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

// delete collection
router.delete('/delete', checkUserAccess, async (req, res, next) => {
  const result = await manageCollection.delete(req.query.id)
  res.json({ status: 'ok', message: 'collection deleted' })
})

module.exports = router
