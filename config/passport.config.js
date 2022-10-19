const passport  = require('passport')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local')
const prisma = require('../client')

function verify(username, password, callback) {
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
}

const strategy = new LocalStrategy(verify)

passport.use(strategy)

passport.serializeUser((user, callback) => {
  callback(null, { id: user.id, username: user.username, role: user.role })
})

passport.deserializeUser((user, callback) => {
  return callback(null, user)
})
