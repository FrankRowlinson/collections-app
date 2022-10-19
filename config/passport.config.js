const passport = require('passport')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const prisma = require('../client')

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
}

function verifyJwt(jwt_payload, callback) {
  prisma.user
    .findUnique({
      where: { id: jwt_payload.id },
    })
    .then((row) => {
      if (!row || Date(jwt_payload.lastLogout) !== Date(row.lastLogout)) {
        return callback(null, false, {
          error: 'user deleted or you logged out',
        })
      }
      return callback(null, row)
    })
    .catch((err) => callback(err, false))
}

function verifyLocal(username, password, callback) {
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

const strategyLocal = new LocalStrategy(verifyLocal)
const strategyJwt = new JwtStrategy(options, verifyJwt)

passport.use(strategyLocal)
passport.use(strategyJwt)

passport.serializeUser((user, callback) => {
  callback(null, { id: user.id, username: user.username, role: user.role })
})

passport.deserializeUser((user, callback) => {
  return callback(null, user)
})
