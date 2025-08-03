const db = require('../config/db')

class PostController {
    async createPost(req, res) {
        const { title, content } = req.body
        const image = req.file ? `/uploads/${req.file.filename}` : null

        try {
            const query = `
                INSERT INTO posts (title, content, image)
                VALUES ($1, $2, $3)
                RETURNING *
            `
            
            const values = [title, content, image]
            const result = await db.query(query, values)

            res.status(201).json({
                message: 'Пост базаға сақталды ✅',
                post: result.rows[0],
            })
        } catch (err) {
            console.error(err)
            res.status(500).json({ message: `Қате орын алды ${err.messgae}` })
        }
    }

    async getPosts(req, res) {
        try {
            const result = await db.query('select * from posts')
            res.json(result.rows)
        } catch (e) {
            console.error(err)
            res.status(500).json({ message: `Қате орын алды ${err.messgae}` })
        }
    }
}

module.exports = new PostController()