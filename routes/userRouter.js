const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/users', authMiddleware, userController.getUsers)
router.get('/users/:id', authMiddleware, userController.getUserById)
// Профиль алатын роут
router.get('/profile', authMiddleware, userController.getProfile)

module.exports = router