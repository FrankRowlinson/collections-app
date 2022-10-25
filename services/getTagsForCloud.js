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
    take: 50,
  })
  return result
}
