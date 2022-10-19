const prisma = require('../client')

module.exports = async function createUser(data) {
  try {
    await prisma.user.create({
      data: {
        username: data.username,
        password: data.password,
        email: data.email,
        role: 'ADMIN'
      },
    })
    return { status: 'ok' }
  } catch(err) {
    return {status: "error", error: "UsernameOrEmailAlreadyExists"}
  }
}
