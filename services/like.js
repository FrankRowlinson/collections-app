const prisma = require('../client')

module.exports.like = async (userId, itemId) => {
  const result = await prisma.like.create({
    data: {
      user: {
        connect: {
          id: userId,
        },
      },
      item: {
        connect: {
          id: itemId,
        },
      },
    },
  })
  return result
}

module.exports.dislike = async (userId, itemId) => {
  const result = await prisma.like.delete({
    where: {
      userId_itemId: {
        userId: userId,
        itemId: itemId,
      },
    },
  })
  return result
}
