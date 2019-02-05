const db = require('./../../util/postgres');
const userConn = db.userConn;

get = (req, res) => {
  userConn.query('SELECT acctname, acctno, description, type, subtype FROM sys_coa ORDER BY acctno ASC')
      .then(data => {
        res.status(200).json({ table: data.rows });
      }) 
      .catch(e => console.error(e.stack))
}

edit = (req, res) => {
  console.log('req: ', req.body)
  let Query = {
    "text":`
      UPDATE sys_coa 
      SET (description, acctname) = ($1, $2)
      WHERE acctno = $3
      RETURNING description, acctname `,
     "values": [req.body.description, req.body.acctname, req.body.acctno] 
  }
  userConn.query(Query)
    .then(data => {
      res.status(200).json({ newValues: data.rows[0], userNotify: 'Account Updated' });
    }) 
    .catch(e => console.error(e.stack))
}

module.exports = {get, edit};