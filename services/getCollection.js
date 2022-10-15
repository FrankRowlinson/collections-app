const prisma = require('../client')

module.exports = async function getCollection(id) {
  const collection = await prisma.collection.findUnique({
    where: {
      id: id,
    },
    include: {
      items: {
        include: {
          tags: true,
          fields: {
            include: {
              numberFields: true,
              booleanFields: true,
              textFields: true,
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
