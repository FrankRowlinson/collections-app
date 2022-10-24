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
const getUserProfileData = require('../services/getUserProfileData')

const cookieOptions = {
  sameSite: process.env.MODE === 'dev' ? 'lax' : 'none',
  secure: process.env.MODE !== 'dev',
}

router.get('/', async (req, res, next) => {
  res.json(req.user)
})

router.get('/profile', async (req, res, next) => {
  const result = await getUserProfileData(req.query.id || req.user.id)
  res.json(result)
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
    res
      .cookie('token', req.token, {
        ...cookieOptions,
      })
      .json({ status: 'ok' })
  }
)

router.post('/logout', (req, res, next) => {
  if (req.user.id) {
    prisma.user
      .update({
        where: { id: req.user.id },
        data: { lastLogout: new Date(Date.now()).toISOString() },
      })
      .then(() => {
        res
          .cookie('token', '', {
            expires: Number(Date(null)),
            ...cookieOptions,
          })
          .send({ status: 'ok' })
      })
  } else {
    res
      .cookie('token', '', {
        expires: Number(Date(null)),
        ...cookieOptions,
      })
      .send({ status: 'ok' })
  }
})

// manage status and roles
router.delete(
  '/delete',
  checkUserAccess,
  checkAdminPermissions,
  async (req, res, next) => {
    const response = {}
    try {
      if (req.query.ids.includes(req.user.id)) {
        response.triggerLogout = true
      }
      const result = await deleteUsers(req.query.ids)
      response.result = result
      res.json(response)
    } catch (err) {
      next(err)
    }
  }
)

router.patch(
  '/block',
  checkUserAccess,
  checkAdminPermissions,
  async (req, res, next) => {
    try {
      const response = {}
      if (req.body.ids.includes(req.user.id)) {
        response.triggerLogout = true
      }
      const result = await blockUsers(req.body.ids)
      response.result = result
      res.json(response)
    } catch (err) {
      next(err)
    }
  }
)

router.patch(
  '/unblock',
  checkUserAccess,
  checkAdminPermissions,
  async (req, res, next) => {
    const result = await unblockUsers(req.body.ids)
    res.json({ result })
  }
)

router.patch(
  '/changerole',
  checkUserAccess,
  checkAdminPermissions,
  async (req, res, next) => {
    try {
      const response = {}
      if (req.body.role === 'USER' && req.body.ids.includes(req.user.id)) {
        response.triggerLogout = true
      }
      const result = await changeUsersRole(req.body.ids, req.body.role)
      response.result = result
      res.json(response)
    } catch (err) {
      next(err)
    }
  }
)

module.exports = router
