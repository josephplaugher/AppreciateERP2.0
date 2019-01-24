const Query = require('../../util/Query')
const QueryBuilder = require('../../util/QueryBuilder')

const GL = (req, res) => {
  QB = new QueryBuilder(`
  SELECT transid, docdate, ledgerdate, debit, credit, acctname, acctno, transtype 
  FROM sys_gl 
  WHERE acctname IS NOT NULL`,'ORDER BY transid DESC');
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
  console.log('the query', prepare, 'the inputs', popInputs);
  const find = new Query(prepare,popInputs);
  find.runQuery(res);
}

module.exports = GL;