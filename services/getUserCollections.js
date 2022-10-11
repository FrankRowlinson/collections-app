const prisma = require('../client')

module.exports = async function getUserCollections(id) {
  const result = await prisma.collection.findMany({
    where: {
      authorId: id
    }
  })
  return result
}