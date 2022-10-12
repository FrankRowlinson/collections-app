const router = require('express').Router()
const prisma = require('../client')

router.get('/', async (req, res, next) => {
  const items = await prisma.item.findMany()
  res.json({ items: { ...items } })
})

router.get('/tags', async (req, res, next) => {
  const tags = await prisma.tag.findMany()
  res.json({ tags })
})

module.exports = router
