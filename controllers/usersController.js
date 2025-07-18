const pool = require('../config/db')

class UserController {
    async getUsers(req, res) {
        const { sort = 'asc' } = req.query
        
        try {
            const result = await pool.query(`select * from users order by username ${sort}`)
            res.status(200).json(result.rows)
        } catch (e) {
            return res.status(500).json({ error: e.message })
        } 
    }

    async getUserById(req, res) {
        const { id } = req.params
        
            if (!id) {
                return res.status(400).json('ID берілмеді')
            }
        
            try {
                const result = await pool.query(
                    'select id, username from users where id=$1', [id]
                )
        
                if (result.rows.length === 0) {
                    return res.status(404).json({ error: 'Пайдаланушы табылмады' })
                }
        
                res.status(200).json({ user: result.rows[0] })
            } catch {
                return res.status(500).json({ error: e.message })
            }
    }
}

module.exports = new UserController()