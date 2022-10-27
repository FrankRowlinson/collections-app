const prisma = require('../client')

module.exports = async function createItem(data, userid) {
  const item = await prisma.item.create({
    data: {
      name: data.itemName,
      img: data.imgLink || null,
      partOf: {
        connect: {
          id: data.collectionId,
        },
      },
      author: {
        connect: {
          id: userid,
        },
      },
      tags: {
        connectOrCreate: data.tags.map((el) => ({
          where: {
            name: el,
          },
          create: {
            name: el,
          },
        })),
      },
      fields: {
        create: {
          stringFields: {
            createMany: {
              data: data.formattedFields.STRING,
            },
          },
          numberFields: {
            createMany: {
              data: data.formattedFields.NUMBER.map((el) => ({
                value: parseInt(el.value),
                fieldName: el.fieldName,
              })),
            },
          },
          booleanFields: {
            createMany: {
              data: data.formattedFields.BOOLEAN,
            },
          },
          textFields: {
            createMany: {
              data: data.formattedFields.TEXT,
            },
          },
          dateFields: {
            createMany: {
              data: data.formattedFields.DATE.map((el) => ({
                value: new Date(el.value),
                fieldName: el.fieldName,
              })),
            },
          },
        },
      },
    },
  })
  return item
}
