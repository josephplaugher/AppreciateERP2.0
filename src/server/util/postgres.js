const { Pool } = require('pg')

var db_host;
if(process.env.NODE_ENV === 'production') {
    db_host = process.env.DB_HOST_PROD
} else {
    db_host = process.env.DB_HOST_DEV
}

const setUserDB = (dbnumber) => {
    return '1000' //dbnumber
}

const userConn = new Pool({
    user: process.env.DB_USERNAME,
    host: db_host,
    database: setUserDB(),
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
})
userConn    
    .connect()
    .catch( error => {
        console.log('db conn error: ',error)
    })

const loginConn = new Pool({
    user: process.env.DB_USERNAME,
    host: db_host,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
})
loginConn
    .connect()
    .catch( error => {
        console.log('db conn error: ',error)
    })

module.exports = { userConn, loginConn, setUserDB};