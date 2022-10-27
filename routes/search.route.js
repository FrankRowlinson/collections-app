const router = require('express').Router()
const prisma = require('../client')
const search = require('../services/search')

router.get('/', async (req, res, next) => {
  const items = await search.full(req.query.search)
  res.json({ items })
})

router.get('/bytag', async (req, res, next) => {
  const items = await search.byTag(req.query.tag)
  res.json({ items })
})

module.exports = router
