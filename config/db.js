const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'postgresql://daulet:0PhYUl1mwvl2mnMkUHpnlfc0n5QIsIVT@dpg-d27t31s9c44c73fd21mg-a.oregon-postgres.render.com/example_db_wp04',
    ssl: { rejectUnauthorized: false }
})

module.exports = pool
