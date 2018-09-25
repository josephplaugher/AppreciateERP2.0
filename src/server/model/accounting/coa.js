const db = require('./../../util/postgres');
const userConn = db.userConn;

coa = (req, res) => {
  userConn.query('SELECT acctname, acctno, description, type, subtype FROM sys_coa ORDER BY acctno ASC')
      .then(data => {
        res.status(200).json({ table: data.rows });}) 
      .catch(e => console.error(e.stack))
}

module.exports = coa;