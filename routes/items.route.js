const router = require('express').Router()
const prisma = require('../client')
const { upload } = require('../config/multer.config')
const { processFormData } = require('../middlewares/processFormData')
const createItem = require('../services/createItem')
const getItems = require('../services/getItems')
const deleteItems = require('../services/deleteItems')
const { checkUserAccess } = require('../middlewares/authorization')
const { like, dislike } = require('../services/like')

//get items
router.get('/', async (req, res, next) => {
  const items = await getItems.many(req.query.ids)
  res.json({ items })
})

router.get('/unique', async (req, res, next) => {
  const item = await getItems.unique(req.query.id)
  res.json({ item })
})

// create or delete
router.delete('/', checkUserAccess, async (req, res, next) => {
  const result = await deleteItems(req.body.ids, req.user.role, req.user.id)
  res.json(result)
})

router.post(
  '/',
  checkUserAccess,
  upload.single('img'),
  processFormData,
  async (req, res, next) => {
    try {
      const item = await createItem(req.data, req.user.id)
      res.json({
        status: 'ok',
        message: 'item created',
        itemId: item.id,
      })
    } catch (err) {
      console.log(err)
    }
  }
)

// likes
router.post('/like', checkUserAccess, async (req, res, next) => {
  const result = await like(req.user.id, req.body.itemId)
  res.json(result ? { status: 'ok', action: 'liked' } : { status: 'error' })
})

router.delete('/like', checkUserAccess, async (req, res, next) => {
  const result = await dislike(req.user.id, req.query.itemId)
  res.json(result ? { status: 'ok', action: 'disliked' } : { status: 'error' })
})

// tags
router.get('/tags', async (req, res, next) => {
  const tags = await prisma.tag.findMany()
  res.json({ tags })
})

module.exports = router
