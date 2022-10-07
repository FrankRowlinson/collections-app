const bcrypt = require('bcrypt')

const saltRounds = 10

module.exports = async function hashPassword(req, res, next) {
  const { password } = req.body
  bcrypt.hash(password, saltRounds, (err, encrypted) => {
    if (err) {
      res.json({status: "error", error: "Server error"})
    } else {
      req.body.password = encrypted
      next()
    }
  })
}
