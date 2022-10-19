const router = require('express').Router()
const prisma = require('../client')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const bcrypt = require('bcrypt')
const hashPassword = require('../middlewares/hashPassword')
const createUser = require('../services/createUser')
const { validateUser, validateAdmin } = require('../middlewares/validateUser')
const {
  deleteUsers,
  blockUsers,
  unblockUsers,
  changeUsersRole,
} = require('../services/userManagement')

router.get('/', async (req, res, next) => {
  req.user
    ? res.json({
        id: req.user.id,
        username: req.user.username,
        role: req.user.role,
      })
    : res.json({ role: 'GUEST' })
})

router.get('/list', validateUser, validateAdmin, async (req, res, next) => {
  const users = await prisma.user.findMany()
  res.json({ users })
})

router.post('/', hashPassword, async (req, res, next) => {
  const status = await createUser(req.body)
  res.json(status)
})

router.post('/auth', passport.authenticate('local'), function (req, res) {
  if (req.user) {
    res.json({ status: 'ok' })
  } else {
    res.json({ status: 'error', error: 'Wrong username or password' })
  }
})

router.post('/logout', validateUser, (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err)
    }
    res.json({ status: 'ok' })
  })
})

// manage status and roles
router.delete(
  '/delete',
  validateUser,
  validateAdmin,
  async (req, res, next) => {
    const response = await deleteUsers(req.query.ids)
    res.json(response)
  }
)

router.patch('/block', validateUser, validateAdmin, async (req, res, next) => {
  const response = await blockUsers(req.body.ids)
  res.json(response)
})

router.patch(
  '/unblock',
  validateUser,
  validateAdmin,
  async (req, res, next) => {
    const response = await unblockUsers(req.body.ids)
    res.json(response)
  }
)

router.patch(
  '/changerole',
  validateUser,
  validateAdmin,
  async (req, res, next) => {
    const response = await changeUsersRole(req.body.ids, req.body.role)
    res.json(response)
  }
)

module.exports = router
