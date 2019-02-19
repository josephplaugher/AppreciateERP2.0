
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
        AND (clr = 'true' OR clr = '') ORDER BY ledgerdate DESC`,
        "values": [i.bankno,i.stmtenddate]
    }
    Connection.query(query)
        .then(data => res.status(200).json({ table: data.rows, userNotify: {} }))
        .catch(e => console.error('Bank Rec query error: ',e.stack))
}

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

const setClearedState = (req,res) => {
    const Connection = userConn(req.headers['dbconn']); //db connection
    Connection.connect(); //activate the connection

    console.log('set clear: ', req.params)
    var query;
    if(req.params.checked === 'true') {
        query = {
            "text":`UPDATE sys_gl
            SET clr = 'true'
            WHERE transid = $1`,
            "values": [req.params.transid]
        }
    } else {
        query = {
            "text":`UPDATE sys_gl
            SET clr = ''
            WHERE transid = $1`,
            "values": [req.params.transid]
        } 
    }
    Connection.query(query)
        .then(data => res.status(200).json({ success: true}))
        .catch(e => console.error('clear trans query error: ',e.stack))
}

const setRec = (req,res) => {

}
    
module.exports = {bankRec,getLastRecBal,setClearedState,setRec};