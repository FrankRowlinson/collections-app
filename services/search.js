const prisma = require('../client')

module.exports = async function search(query) {
  const result = await prisma.item.findMany({
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
