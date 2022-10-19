const router = require('express').Router()
const prisma = require('../client')
const passport = require('passport')
const hashPassword = require('../middlewares/hashPassword')
const generateToken = require('../middlewares/generateToken')
const {
  checkUserAccess,
  checkAdminPermissions,
} = require('../middlewares/authorization')
const createUser = require('../services/createUser')
const {
  deleteUsers,
  blockUsers,
  unblockUsers,
  changeUsersRole,
} = require('../services/userManagement')

router.get('/', async (req, res, next) => {
  res.json(req.user)
})

router.get(
  '/list',
  checkUserAccess,
  checkAdminPermissions,
  async (req, res, next) => {
    const users = await prisma.user.findMany()
    res.json({ users })
  }
)

router.post('/', hashPassword, async (req, res, next) => {
  const status = await createUser(req.body)
  res.json(status)
})

router.post(
  '/auth',
  (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (!user) return res.json({ status: 'error', error: 'wrong' })
      req.user = user
      next()
    })(req, res, next)
  },
  checkUserAccess,
  generateToken,
  (req, res) => {
    res.cookie('token', req.token).json({ status: 'ok' })
  }
)

router.post('/logout', (req, res, next) => {
  if (req.user) {
    prisma.user
      .update({
        where: { id: req.user.id },
        data: { lastLogout: new Date(Date.now()).toISOString() },
      })
      .then(() => {
        res
          .cookie('token', '', { expires: Number(Date(null)) })
          .send({ status: 'ok' })
      })
  } else {
    res.json({ status: 'error', error: "you're not logged in" })
  }
})

// manage status and roles
router.delete(
  '/delete',
  checkUserAccess,
  checkAdminPermissions,
  async (req, res, next) => {
    const response = await deleteUsers(req.query.ids)
    res.json(response)
  }
)

router.patch(
  '/block',
  checkUserAccess,
  checkAdminPermissions,
  async (req, res, next) => {
    const response = await blockUsers(req.body.ids)
    res.json(response)
  }
)

router.patch(
  '/unblock',
  checkUserAccess,
  checkAdminPermissions,
  async (req, res, next) => {
    const response = await unblockUsers(req.body.ids)
    res.json(response)
  }
)

router.patch(
  '/changerole',
  checkUserAccess,
  checkAdminPermissions,
  async (req, res, next) => {
    const response = await changeUsersRole(req.body.ids, req.body.role)
    res.json(response)
  }
)

module.exports = router
