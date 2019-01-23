const db = require('./../../util/postgres');
const userConn = db.userConn;

GL = (req, res) => {
  console.log('gl')
  const query = {
    "text": `SELECT transid, docdate, ledgerdate, debit, credit, acctname, acctno, transtype 
    FROM sys_gl 
    WHERE docdate BETWEEN $1 AND $2 
    OR ledgerdate BETWEEN $3 AND $4 
    OR acctname = $5 
    OR acctno = $6
    ORDER BY transid DESC`,
    "values": [req.body.docstartdate,
                req.body.docenddate,
                req.body.ledgerstartdate,
                req.body.ledgerenddate,
                req.body.acctname,
                req.body.acctno
              ]
  }
    userConn.query(query)
      .then(data => res.status(200).json({ table: data.rows }))
      .catch(e => console.error(e.stack))
}

module.exports = GL;