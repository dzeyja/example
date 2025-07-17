const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const requestLimit = require('./middlewares/requestLimit')
const authController = require('./controllers/authController')
const userController = require('./controllers/usersController')

require('dotenv').config()
const authMiddleware = require('./middlewares/authMiddleware')
const usersController = require('./controllers/usersController')
const app = express()

app.use(cors({
    origin: 'http://localhost:5173'
}))
app.use(helmet())
app.use(express.json())

const PORT = process.env.PORT || 3002

app.post('/api/register', authController.register)
app.post('/api/login', requestLimit, authController.login)
app.get('/api/users', requestLimit,  usersController.getUsers)
app.get('/api/users/:id', authMiddleware, userController.getUserById)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})