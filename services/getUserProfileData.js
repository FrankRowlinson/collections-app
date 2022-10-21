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
      collections: {
        select: {
          id: true,
          name: true,
          img: true,
          description: true,
          type: { select: { name: true } },
          _count: {
            select: { items: true },
          },
        },
      },
    },
  })
  return result
}
