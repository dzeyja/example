const pool = require('../config/db')
const bcrypt = require('bcrypt')
const generateToken = require('../utilites/generateToke')

class AuthController {
    async register(req, res) {
        const { username, password } = req.body 

        if (!username || !password) {
            return res.status(400).json({ error: 'Деректер толық енгізілмеді ' })
        }

        try {
            // Егер username дерекқордағы username мен сәйке келсе онда қате қайтар
            const existingUser = await pool.query('select * from users where username=$1', [username])

            if (existingUser.rows.length > 0) {
                return res.status(409).json({ error: 'Бұндай пайдаланушы бар' })
            }

            const hashedPassword = await bcrypt.hash(password, 12)

            const result = await pool.query(
                'insert into users (username, password) values ($1, $2) returning id, username',
                [username, hashedPassword]    
            )

            res.status(201).json({ message: 'Пайдаланушы сәтті тіркелді', user: result.rows[0] })
        } catch(e) {
            return res.status(500).json({ error: e.message })
        }
    }

    async login(req, res) {
        const { username, password } = req.body

        if (!username || !password) {
            return res.status(400).json({ error: 'Деректер толық енгізілмеді ' })
        }

        try {
            const result = await pool.query('select * from users where username = $1', [username])

            const user = result.rows[0]

            if (!user) {
                return res.status(404).json({ error: 'Пайдаланушы табылмады' })
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(401).json({ error: 'Пайдаланушының аты немесе парольі дұрыс емес' })
            }   

            const token = generateToken(user)

            res.status(200).json(
                { 
                    message: 'Пайдаланшы сәтті кірді', 
                    token, 
                    user: { 
                        id: user.id, 
                        username: user.username 
                    } 
                })        
        } catch (error) {
            return res.status(500).json({ error: e.message })
        }
    }
}

module.exports = new AuthController()