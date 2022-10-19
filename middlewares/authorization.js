module.exports.checkUserAccess = (req, res, next) => {
  if (req.user.hasAccess) {
    return next()
  }
  return res.json({ status: 'error', error: 'blocked' })
}

module.exports.checkAdminPermissions = (req, res, next) => {
  if (req.user.role === 'ADMIN') {
    return next()
  }
  return res.json({ status: 'error', error: 'access denied' })
}
