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

module.exports.edit = async (id, data) => {
  if (!id) {
    return
  }
  const result = await prisma.collection.update({
    where: {
      id: id,
    },
    data: {
      name: data.name,
      description: data.description,
    },
  })
  return result
}
