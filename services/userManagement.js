const prisma = require('../client')

module.exports.deleteUsers = async (ids) => {
  if (!ids) { return }
  const result = await prisma.user.deleteMany({
    where: {
      id: { in: ids },
    },
  })
  return result
}

module.exports.blockUsers = async (ids) => {
  if (!ids) { return }
  const result = await prisma.user.updateMany({
    where: {
      id: { in: ids },
    },
    data: {
      hasAccess: false,
    },
  })
  return result
}

module.exports.unblockUsers = async (ids) => {
  if (!ids) { return }
  const result = await prisma.user.updateMany({
    where: {
      id: { in: ids },
    },
    data: {
      hasAccess: true,
    },
  })
  return result
}

module.exports.changeUsersRole = async (ids, role) => {
  if (!ids) { return }
  const result = await prisma.user.updateMany({
    where: {
      id: { in: ids },
    },
    data: {
      role: role,
    },
  })
  return result
}
