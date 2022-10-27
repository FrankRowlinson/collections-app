const prisma = require('../client')

module.exports = async function getCollection(id) {
  const collection = await prisma.collection.findUnique({
    where: {
      id: id,
    },
    include: {
      author: {
        select: { username: true, id: true },
      },
      items: {
        include: {
          tags: true,
          fields: {
            include: {
              stringFields: true,
              dateFields: true,
            },
          },
        },
      },
    },
  })
  return collection
}
