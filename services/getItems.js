const prisma = require('../client')

module.exports.many = async (ids) => {
  if (!ids) {
    return
  }
  const result = await prisma.item.findMany({
    where: {
      id: {
        in: ids,
      },
    },
    select: {
      id: true,
      name: true,
      img: true,
      likes: true,
      author: {
        select: {
          username: true,
        },
      },
      partOf: {
        select: {
          name: true,
          type: {
            select: {
              name: true,
            },
          },
        },
      },
      createdAt: true,
    },
  })
  return result
}

module.exports.recent = async () => {
  const result = await prisma.item.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    take: 20,
  })
  return result
}

module.exports.unique = async (id) => {
  const result = await prisma.item.findUnique({
    where: {
      id: id,
    },
    include: {
      author: {
        select: {
          username: true,
        },
      },
      partOf: {
        select: {
          name: true,
          type: true,
        },
      },
      likes: true,
      fields: {
        include: {
          numberFields: true,
          booleanFields: true,
          textFields: true,
          stringFields: true,
          dateFields: true,
        },
      },
      tags: true,
    },
  })
  return result
}
