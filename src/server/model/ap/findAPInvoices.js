const QueryBuilder = require('../../util/QueryBuilder')
const pg = require('../../util/postgres')
const userConn = pg.userConn;

const FindAPInvoices = (req, res) => {
  const Connection = userConn(req.headers['dbconn']); //db connection
  Connection.connect(); //activate the connection

  QB = new QueryBuilder(`
    SELECT invnum, invdate,
    duedate, total, supplierid, supplier, status 
    FROM bills 
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

  Connection.query({"text":prepare,"values":popInputs})
    .then(data => {
        res.status(200).json({ table: data.rows, userNotify: {} })
    })
    .catch(e => {
        res.status(200).json({ table: [], userNotify: {error: 'Something went wrong, we are looking into it.'} })
        console.error(e.stack)
    })
}

module.exports = FindAPInvoices;