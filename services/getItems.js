const prisma = require('../client')

module.exports = async function getItems(ids) {
  let result
  console.log(ids)
  if (ids) {
    result = await prisma.item.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    })
  } else {
    result = await prisma.item.findMany()
  }
  return result
}
