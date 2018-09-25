const db = require('./../../util/postgres');
const userConn = db.userConn;
const Table = require('../JsonToTable.js');

const reportToTable = Table.reportToTable;

GL = (req, res) => {
  const query = {
    "text": `SELECT transid, itemdate, gldate, debit, credit, acctname, acctno, transtype 
    FROM sys_gl 
    WHERE itemdate BETWEEN $1 AND $2 
    OR gldate BETWEEN $3 AND $4 
    OR acctname = $5 
    OR acctno = $6
    ORDER BY transid DESC`,
    "values": [req.body.itemstartdate,
                req.body.itemenddate,
                req.body.glstartdate,
                req.body.glenddate,
                req.body.acctname,
                req.body.acctno
              ]
  }
    userConn.query(query)
      .then(data => res.status(200).json({ table: data.rows }))
      .catch(e => console.error(e.stack))
}

module.exports = GL;