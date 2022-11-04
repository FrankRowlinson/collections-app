const router = require('express').Router()
const prisma = require('../client')
const getTagsForCloud = require('../services/getTagsForCloud')

router.get('/', async (req, res, next) => {
  const tags = await prisma.tag.findMany()
  res.json({ tags })
})

router.get('/cloud', async (req, res, next) => {
  const tags = await getTagsForCloud()
  res.json({ tags })
})

module.exports = router