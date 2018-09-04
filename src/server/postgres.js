const { Pool } = require('pg')

const userConn = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: '1000',
    password: 'tesla1985',
    port: 5432
})
userConn.connect();

const loginConn = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'appreciateprod',
    password: 'tesla1985',
    port: 5432
})
loginConn.connect();

module.exports = { userConn, loginConn};