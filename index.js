const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const authRouter = require('./routes/authRoute')
const userRouter = require('./routes/userRouter')
const postRouter = require('./routes/postRouter')

require('dotenv').config()
const app = express()
app.use('/uploads', express.static('uploads'))

app.use(cors({
    origin: 'http://localhost:5173'
}))

app.use(helmet())
app.use(express.json())

const PORT = process.env.PORT || 3002

app.use('/api', authRouter)
app.use('/api', userRouter)
app.use('/api', postRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})