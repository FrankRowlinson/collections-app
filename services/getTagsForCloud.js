const prisma = require('../client')

module.exports = async () => {
  const result = await prisma.tag.findMany({
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
    take: 40,
  })
  return result
}
