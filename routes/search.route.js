const router = require('express').Router()
const prisma = require('../client')
const search = require('../services/search')

router.get('/', async (req, res, next) => {
  const items = await search(req.query.search)
  res.json({ items })
})

module.exports = router
