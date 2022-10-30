const prisma = require('../client')

const collectionsPerPage = 8

module.exports = async function getUserCollections(id, page) {
  const result = await prisma.collection.findMany({
    where: {
      authorId: id,
    },
    select: {
      id: true,
      name: true,
      img: true,
      type: { select: { name: true } },
    },
    take: collectionsPerPage,
    skip: collectionsPerPage * (page - 1),
  })
  return result
}
