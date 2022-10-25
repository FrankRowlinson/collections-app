const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (req, res, next) => {
  const user = req.user
  console.log(req.headers.cookie.slice(4))
  if (!user) {
    res.json({ status: 'error', error: 'Wrong username or password' })
  } else {
    req.token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        hasAccess: user.hasAccess,
        lastLogout: user.lastLogout,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '14d',
      }
    )
    next()
  }
}
