const prisma = require('../client')

module.exports = async function getCollectionFields(id) {
  const result = await prisma.collectionFields.findUnique({
    select: { fields: true },
    where: {
      collectionId: id,
    },
  })
  return result
}
