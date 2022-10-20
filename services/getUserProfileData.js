const prisma = require('../client')

module.exports = async (id) => {
  const result = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      username: true,
      role: true,
      createdAt: true,
      _count: {
        select: { items: true, comments: true },
      },
      collections: true,
    },
  })
  return result
}
