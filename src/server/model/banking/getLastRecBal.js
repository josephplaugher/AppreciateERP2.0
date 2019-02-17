const pg = require('../../util/postgres')
const userConn = pg.userConn;

const getLastRecBal = (req,res) => {
    const Connection = userConn(req.headers['dbconn']); //db connection
    Connection.connect(); //activate the connection

    const query = {
        "text":`SELECT 
            clearedbal 
        FROM bankrec 
        WHERE bankno = $1
        ORDER BY stmtenddate ASC
        LIMIT 1`,
        "values": [req.params.bankno]
    }
    Connection.query(query)
        .then(data => res.status(200).json({ recData: data.rows[0], userNotify: {} }))
        .catch(e => console.error('Bank Rec query error: ',e.stack))
}
    
module.exports = getLastRecBal;