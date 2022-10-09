const router = require('express').Router()
const prisma = require('../client')
const { FieldType } = require('@prisma/client')
const { validateUser } = require('../middlewares/validateUser')

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

router.post('/', validateUser, async (req, res, next) => {
  // TODO
})

module.exports = router
