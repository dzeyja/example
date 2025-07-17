const Router = require('express')
const router = new Router()
const userController = require('../controllers/usersController')

router.get('/users', userController.getUsers)
router.get('/users/:id', userController.getUserById)

module.exports = router
