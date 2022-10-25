const passport = require('passport')

module.exports.checkJwt = (req, res, next) => {
  passport.authenticate('jwt', (err, user, info) => {
    console.log(err, user, info)
    if (!user) {
      req.user = { role: 'GUEST' }
    } else {
      req.user = { id: user.id, role: user.role, username: user.username, hasAccess: user.hasAccess }
    }
    next()
  })(req, res, next)
}
