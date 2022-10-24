const prisma = require('../client')

module.exports = async function getComments(itemId) {
  const result = await prisma.comment.findMany({
    where: {
      itemId: itemId,
    },
    include: {
      author: {
        select: {
          username: true,
          role: true,
        },
      },
    },
    orderBy: {
      createdAt: 'asc',
    },
  })
  return result
}
