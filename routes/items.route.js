const router = require('express').Router()
const { upload } = require('../config/multer.config')
const { checkUserAccess } = require('../middlewares/authorization')
const { processFormData } = require('../middlewares/processFormData')
const createItem = require('../services/createItem')
const getItems = require('../services/getItems')
const deleteItems = require('../services/deleteItems')

//get items
router.get('/', async (req, res, next) => {
  const items = await getItems.many(req.query.ids)
  res.json({ items })
})

router.get('/recent', async (req, res, next) => {
  const items = await getItems.recent()
  res.json({ items })
})

router.get('/unique', async (req, res, next) => {
  const item = await getItems.unique(req.query.id)
  res.json({ item })
})

router.get('/favourite', async (req, res, next) => {
  const items = await getItems.favourite(req.query.id)
  res.json({ items })
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

module.exports = router
