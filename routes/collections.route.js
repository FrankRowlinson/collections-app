const router = require('express').Router()
const prisma = require('../client')

router.get('/', async (req, res, next) => {
  const collections = await prisma.collection.findMany()
  res.json({ collections: { ...collections } })
})

module.exports = router
