const router = require('express').Router()
const prisma = require('../client')

router.get('/', async (req, res) => {
  // NOT ADDED AUTH VERIFICATION, SERIOUS SECURITY RISKS
  const users = await prisma.user.findMany()
  res.json({users: {...users}})
})

module.exports = router