
const pg = require('../../util/postgres')
const userConn = pg.userConn;

const bankRec = (req,res) => {
    const Connection = userConn(req.headers['dbconn']); //db connection
    Connection.connect(); //activate the connection

    var i = req.body;
    const query = {
        "text":`SELECT 
            transid, ledgerdate, description, payee_payer, docno, clr, debit, credit
        FROM sys_gl WHERE acctno = $1 AND ledgerdate <= $2
        AND (clr = 'clr' OR clr IS NULL) ORDER BY ledgerdate DESC`,
        "values": [i.bankno,i.stmtenddate]
    }
    Connection.query(query)
        .then(data => res.status(200).json({ table: data.rows, userNotify: {} }))
        .catch(e => console.error('Bank Rec query error: ',e.stack))
}
    
module.exports = bankRec;