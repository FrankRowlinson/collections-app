const prisma = require('../client')

const select = {
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
}

module.exports.full = async (query) => {
  const result = await prisma.item.findMany({
    select: { ...select },
    where: {
      OR: [
        {
          name: {
            search: query,
          },
        },
        {
          tags: {
            some: {
              name: {
                search: query,
              },
            },
          },
        },
        {
          comments: {
            some: {
              text: {
                search: query,
              },
            },
          },
        },
        {
          partOf: {
            name: {
              search: query,
            },
          },
        },
        {
          partOf: {
            type: {
              name: {
                search: query,
              },
            },
          },
        },
      ],
    },
  })
  return result
}

module.exports.byTag = async (query) => {
  const result = await prisma.item.findMany({
    select: { ...select },
    where: {
      tags: {
        some: {
          name: {
            search: query,
          },
        },
      },
    },
  })
  return result
}
