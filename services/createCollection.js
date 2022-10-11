const prisma = require('../client')

module.exports = async function createCollection(data, userid) {
  await prisma.collection.create({
    data: {
      name: data.collectionName,
      type: {
        connect: { name: data.collectionType },
      },
      author: {
        connect: {
          id: userid,
        },
      },
      img: data.imgLink || null,
      description: data.description,
      fields: {
        create: {
          fields: {
            createMany: {
              data:
                data.customField.map((el) => ({
                  fieldName: el.name,
                  type: el.type,
                })) || null,
            },
          },
        },
      },
    },
  })
}
