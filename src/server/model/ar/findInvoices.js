const Query = require('./../../util/Query')
const pg = require('../../util/postgres')
const userConn = pg.userConn;

const FindInvoices = (req, res) => {
  QB = new QueryBuilder(`
    SELECT invnum, creditnum, invdate,
    invdue, total, customerid, customer, status 
    FROM invoices 
    WHERE header = 't'`,'');
  let d = 1;
  for(var val in req.body){
    if(req.body[val] !== '') { 
        QB.addCondition(" AND " + [val] + " = $" + d );
      d ++;
  }}

  var popInputs = [];
  for(var param in req.body) {
    if(req.body[param] !== '') { 
      popInputs.push(req.body[param]);
  }}

  let prepare = QB.build(); 
  const Connection = userConn(req.headers['dbconn']); //db connection
  Connection.connect(); //activate the connection

  Connection.query({ "text": prepare, "values": popInputs })
    .then(data => {
      this.res.status(200).json({ table: data.rows, userNotify: {} })
    })
    .catch(e => {
      this.res.status(200).json({ table: [], userNotify: { error: 'Something went wrong, we are looking into it.' } })
      console.error(e.stack)
    })
}

module.exports = FindInvoices;