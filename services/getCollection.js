const prisma = require('../client')

module.exports = async function getCollection(id) {
  const collection = await prisma.collection.findUnique({
    where: {
      id: id,
    },
  })
  return collection
}
