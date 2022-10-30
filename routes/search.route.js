const router = require('express').Router()
const prisma = require('../client')
const search = require('../services/search')

router.get('/', async (req, res, next) => {
  const items = await search.full(req.query.search, req.query.page)
  res.json({ items, cursor: parseInt(req.query.page) + 1 })
})

router.get('/bytag', async (req, res, next) => {
  const items = await search.byTag(req.query.tag, req.query.page)
  res.json({ items, cursor: parseInt(req.query.page) + 1 })
})

module.exports = router
