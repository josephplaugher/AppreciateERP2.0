const db = require('./../postgres.js');
const userConn = db.userConn;
const Table = require('./JsonToTable');

const reportToTable = Table.reportToTable;

GL = (req, res) => {
  const query = {
    "text": "SELECT transid, date, debit, credit, acctname, acctno, transtype FROM sys_gl WHERE date BETWEEN $1 AND $2 order by transid DESC",
    "values": [req.body.startdate,req.body.enddate]
  }
    userConn.query(query)
      .then(data => res.status(200).json({ table: data.rows }))
      .catch(e => console.error(e.stack))
}

module.exports = GL;