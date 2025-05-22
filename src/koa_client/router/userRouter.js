const Router = require('@koa/router')
const userController = require('../controller/userController')
const userServerUrlMappingResolver = require('../config/server/userServerUrlMappingResolver')

const userRouter = new Router()

userRouter.post(userServerUrlMappingResolver.login, userController.login)

module.exports = userRouter
