const userService = require('../service/userService')
const { v1: uuidv1 } = require('uuid')

class UserController {
  async userLogin(username, password) {
    const userId = username
    const userSessionId = uuidv1()

    await userService.storeUserId(userSessionId, userId)
  }

  async userLogout(userSessionId) {
    await userService.removeUserSessionByUserSessionId(userSessionId)
  }

  async userOtherOperation(userSessionId) {
    const userId = await userService.getUserIdFromUserSessionByUserSessionId(userSessionIdz)
    console.log(`userId from UserController: ${userId}`)
    await userService.resetUserSessionExpirationTime(userSessionId)
  }
}

module.exports = new UserController()
