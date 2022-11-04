const router = require('express').Router()
const { checkUserAccess } = require('../middlewares/authorization')
const getComments = require('../services/getComments')
const createComment = require('../services/createComment')

router.get('/', async (req, res, next) => {
  const comments = await getComments(req.query.itemId)
  res.json({ comments })
})

router.post('/', checkUserAccess, async (req, res, next) => {
  const result = await createComment(
    req.user.id,
    req.body.itemId,
    req.body.text
  )
  res.json({ result })
})

module.exports = router
