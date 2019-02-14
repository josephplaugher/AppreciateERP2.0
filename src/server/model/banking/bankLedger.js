
const pg = require('../../util/postgres')
const userConn = pg.userConn;

const bankLedger = (req,res) => {
    const Connection = userConn(req.headers['dbconn']); //db connection
    Connection.connect(); //activate the connection

    var i = req.body;
    const query = {
        "text":`SELECT 
            transid,transtype,docdate,docno,ledgerdate,acctno,acctname,description,debit,credit,clr
        FROM sys_gl 
        WHERE 
            acctno = $1 AND ledgerdate BETWEEN $2 AND $3 ORDER BY ledgerdate DESC`,
        "values": [i.bankno,i.startdate,i.enddate]
    }
    Connection.query(query)
        .then(data => res.status(200).json({ table: data.rows, userNotify: {} }))
        .catch(e => console.error('Bank legder query error: ',e.stack))
}
    
module.exports = bankLedger;