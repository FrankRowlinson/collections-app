const router = require('express').Router()
const prisma = require('../client')
const { upload } = require('../config/multer.config')
const { validateUser } = require('../middlewares/validateUser')
const { processFormData } = require('../middlewares/processFormData')
const createItem = require('../services/createItem')

router.get('/', async (req, res, next) => {
  const items = await prisma.item.findMany()
  res.json({ items: { ...items } })
})

router.post(
  '/',
  validateUser,
  upload.single('img'),
  processFormData,
  async (req, res, next) => {
    try {
      const item = createItem(req.data, req.user.id)
      res.json({
        status: 'ok',
        message: 'item created',
        item_id: item.id,
      })
    } catch (err) {
      console.log(err)
    }
  }
)

router.get('/tags', async (req, res, next) => {
  const tags = await prisma.tag.findMany()
  res.json({ tags })
})

module.exports = router
