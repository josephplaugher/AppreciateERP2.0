const db = require('../../util/postgres.js');
const userConn = db.userConn;

EnterDeposit = (req, res) => {
  var i = req.body;
  const creditQuery = {
    "text": "INSERT INTO sys_gl (docno, description, credit, date, payee_payer, payee_payer_id, acctname, acctno,transtype, empid)" +
      "VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
    "values": [i.docno, i.description, i.amount, i.date, i.customer, i.customerid, i.acctname, i.acctno, i.transtype, i.empid]
  };
  userConn.query(creditQuery)
    .then(data => module.exports.debitQuery(req, res))
    .catch(e => console.error(e.stack))
}

debitQuery = (req, res) => {
  var i = req.body;
  const debitQuery = {
    "text": "INSERT INTO sys_gl (docno, description, debit, date, payee_payer, payee_payer_id, acctname, acctno,transtype, empid)"+
    "VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
    "values" : [i.docno, i.description, i.amount, i.date, i.customer, i.customerid, i.acctname, i.acctno, i.transtype, i.empid]
  };
  userConn.query(debitQuery)
    .then(data => res.status(200).json({ success: true, userNotify: 'Deposit Entered Successfully' }))
    .catch(e => console.error(e.stack))
}

module.exports = { EnterDeposit, debitQuery};