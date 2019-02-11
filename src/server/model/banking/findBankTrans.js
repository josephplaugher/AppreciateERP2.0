
const pg = require('../../util/postgres')
const userConn = pg.userConn;

const findBankTrans = (req,res) => {
    const Connection = userConn(req.headers['dbconn']); //db connection
    Connection.connect(); //activate the connection

    var i = req.body;
    const query = {
        "text": "SELECT transid, date, sys_gl.debit AS deposit, sys_gl.credit AS withdrawal, acctname, acctno, transtype, description FROM sys_gl WHERE date BETWEEN $1 AND $2 AND acctno = $3 AND acctname = $4 order by transid DESC",
        "values": [i.startdate,i.enddate, i.bankno, i.bankname]
    }
    Connection.query(query)
        .then(data => res.status(200).json({ table: data.rows, userNotify: '' }))
        .catch(e => console.error(e.stack))
}
    
module.exports = findBankTrans;