const router = require('express').Router()
const { checkUserAccess } = require('../middlewares/authorization')
const { like, dislike } = require('../services/like')

router.post('/', checkUserAccess, async (req, res, next) => {
  const result = await like(req.user.id, req.body.itemId)
  res.json(result ? { status: 'ok', action: 'liked' } : { status: 'error' })
})

router.delete('/', checkUserAccess, async (req, res, next) => {
  const result = await dislike(req.user.id, req.query.itemId)
  res.json(result ? { status: 'ok', action: 'disliked' } : { status: 'error' })
})

module.exports = router