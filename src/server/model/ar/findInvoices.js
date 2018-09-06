const Query = require('./../../util/Query')
const QueryBuilder = require('./../../util/QueryBuilder')

const FindInvoices = (req, res) => {
  QB = new QueryBuilder("SELECT invnum, creditnum, invdate, invdue, total, customerid, customer, status FROM invoices WHERE header = 't'",'');
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
  const findInvoiceQuery = new Query(prepare,popInputs);
    try {
      findInvoiceQuery.runQuery(res);
    } catch (er) {
      console.log('sql error', er);
    }
}

module.exports = FindInvoices;