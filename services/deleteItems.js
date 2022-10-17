const prisma = require('../client')

module.exports = async function deleteItems(ids, role, userId) {
  let result
  if (role === 'ADMIN') {
    result = await deleteItemsByAdmin(ids)
  } else {
    result = await deleteItemsByAuthor(ids)
  }
  result.count === 0
    ? { status: 'error', error: "No items selected or you're not the author" }
    : { status: 'ok', message: `${result.count} item(s) deleted` }
}

async function deleteItemsByAdmin(ids) {
  const result = await prisma.item.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  })
  return result
}

async function deleteItemsByAuthor(ids, authorId) {
  const result = await prisma.item.deleteMany({
    where: {
      AND: [
        {
          id: { in: ids },
        },
        {
          authorId: authorId,
        },
      ],
    },
  })
  return result
}
