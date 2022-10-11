const prisma = require('../client')

module.exports = async function getCollection(id) {
  const collection = await prisma.collection.findUnique({
    where: {
      id: req.query.id,
    },
  })
  return collection
}
