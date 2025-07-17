const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const requestLimit = require('./middlewares/requestLimit')
const userController = require('./controllers/usersController')
const authRouter = require('./routes/authRoutes')
const userRoutes = require('./routes/authRoutes')

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

app.use('/api', authRouter)
app.use('/api', userRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})