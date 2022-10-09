module.exports.validateUser = (req, res, next) => {
  req.user ? next() : res.json({ status: 'error', error: 'no access' })
}

module.exports.validateAdmin = (req, res, next) => {
  req.user
    ? req.user.role === 'ADMIN'
      ? next()
      : res.json({ status: 'error', error: 'no admin rights' })
    : res.json({ status: 'error', error: 'no user' })
}
