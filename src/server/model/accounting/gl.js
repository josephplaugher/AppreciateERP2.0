const Query = require('../../util/Query')
const QueryBuilder = require('../../util/QueryBuilder')

const GL = (req, res) => {
  QB = new QueryBuilder(`
  SELECT transid, docdate, ledgerdate, debit, credit, acctname, acctno, transtype 
  FROM sys_gl WHERE transid IS NOT NULL`,'');
  let d = 1;
  if(req.body.docstartdate !== '' && req.body.docenddate !== '') { 
    QB.addCondition(' AND docdate BETWEEN $1 AND $2');
    d++;
    d++;
  }
  if(req.body.ledgerstartdate !== '' && req.body.ledgerenddate !== '') { 
    let f = d + 1;
    QB.addCondition(' AND ledgerdate BETWEEN = $' + d + ' AND $' + f);
    d++;
    d++;
  }

  if(req.body.docstartdate !== '' ^ req.body.docenddate !== '') { 
    if(req.body.docstartdate !== '') {
      QB.addCondition(' AND docdate >= $' + d);
    }
    if(req.body.docenddate !== '') {
      QB.addCondition(' AND docdate <= $' + d);
    }
    d++;
  }

  if(req.body.ledgerstartdate !== '' ^ req.body.ledgerenddate !== '') { 
    if(req.body.ledgerstartdate !== '') {
      QB.addCondition(' AND ledgerdate >= $' + d);
    }
    if(req.body.ledgerenddate !== '') {
      QB.addCondition(' AND ledgerdate < $' + d);
    }
    d++;
  }

  for(var name in req.body){
    let v = req.body[name];
    let r = name;
    //console.log('val, ',v, 'param, ', r)
    if(v !== '' && r !== 'ledgerstartdate' && r !== 'ledgerenddate' && r !== 'docstartdate' && r !== 'docenddate') { 
      //console.log('in the IF: val, ',v, 'param, ', r)
      QB.addCondition(" AND " + r + " = $" + d );
    d ++;
  }}

  var popInputs = [];
  for(var param in req.body) {
    if(req.body[param] !== '') { 
      popInputs.push(req.body[param]);
  }}

  let prepare = QB.build(); 
  //console.log('the query', prepare, 'the inputs', popInputs);
  const find = new Query(prepare,popInputs);
  find.runQuery(res);
}

module.exports = GL;