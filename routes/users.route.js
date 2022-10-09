const router = require('express').Router()
const prisma = require('../client')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const bcrypt = require('bcrypt')
const hashPassword = require('../middlewares/hashPassword')
const createUser = require('../services/createUser')
const { validateUser } = require('../middlewares/validateUser')

passport.use(
  new LocalStrategy(function verify(username, password, callback) {
    prisma.user
      .findUnique({
        where: {
          username: username,
        },
      })
      .then(async (row) => {
        if (!row) {
          return callback(null, false, {
            status: 'error',
            error: 'Incorrect username or password',
          })
        }
        const match = await bcrypt.compare(password, row.password)
        if (!match) {
          return callback(null, false, {
            status: 'error',
            error: 'Incorrect username or password',
          })
        }
        return callback(null, row)
      })
      .catch((err) => {
        callback(err)
      })
  })
)

passport.serializeUser((user, callback) => {
  process.nextTick(() => {
    callback(null, { id: user.id, username: user.username, role: user.role })
  })
})

passport.deserializeUser((user, callback) => {
  process.nextTick(() => {
    return callback(null, user)
  })
})

router.get('/', async (req, res, next) => {
  req.user
    ? res.json({
        id: req.user.id,
        username: req.user.username,
        role: req.user.role,
      })
    : res.json({ role: 'GUEST' })
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

module.exports = router
