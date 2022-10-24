const prisma = require('../client')

module.exports = async function createComment(userId, itemId, text) {
  const result = await prisma.comment.create({
    data: {
      author: {
        connect: {
          id: userId,
        },
      },
      item: {
        connect: {
          id: itemId,
        },
      },
      text: text,
    },
  })
}
