const db = require('./../postgres.js');
const userConn = db.userConn;

coa = (req, res) => {
  userConn.query('SELECT acctname, acctno, description, type FROM sys_coa ORDER BY acctno ASC')
      .then(data => {
        console.log(data.rows)
        res.status(200).json({ success: data.rows });}) 
      .catch(e => console.error(e.stack))
}

module.exports = coa;