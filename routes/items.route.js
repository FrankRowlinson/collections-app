const router = require('express').Router()
const prisma = require('../client')

router.get('/', async (req, res, next) => {
  const items = await prisma.item.findMany()
  res.json({items: {...items}})
})

module.exports = router