const prisma = require('../client')

module.exports = async function getBiggestCollections() {
  const result = await prisma.collection.findMany({
    include: {
      _count: {
        select: {
          items: true,
        },
      },
    },
    orderBy: {
      items: {
        _count: 'desc',
      },
    },
    take: 5,
  })
  return result
}
