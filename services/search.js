const prisma = require('../client')

module.exports = async function search(query) {
  const result = await prisma.item.findMany({
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
