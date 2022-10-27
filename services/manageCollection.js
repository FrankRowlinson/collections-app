const prisma = require('../client')

module.exports.delete = async (id) => {
  if (!id) {
    return
  }
  const result = await prisma.collection.delete({
    where: {
      id: id,
    },
  })
  return result
}
