const QueryBuilder = require('../../util/QueryBuilder')
const db = require('../../util/postgres');
const userConn = db.userConn;   

const GL = (req, res) => {
  const Connection = userConn(req.headers['dbconn']); //db connection
  Connection.connect(); //activate the connection

  var i = req.body;
  var baseQuery;
  if(typeof i.bankname !== 'undefined') {
    baseQuery = `SELECT transid, docdate, ledgerdate, debit, credit, acctname, acctno, transtype 
    FROM sys_gl WHERE sys_coa.type = 'Bank' `;
  } else {
    baseQuery = `SELECT transid, docdate, ledgerdate, debit, credit, acctname, acctno, transtype 
    FROM sys_gl WHERE transid IS NOT NULL`;
  }
  QB = new QueryBuilder(baseQuery,'');
  let d = 1;
  if(i.docstartdate !== '' && i.docenddate !== '') { 
    QB.addCondition(' AND docdate BETWEEN $1 AND $2');
    d++;
    d++;
  }
  if(i.ledgerstartdate !== '' && i.ledgerenddate !== '') { 
    let f = d + 1;
    QB.addCondition(' AND ledgerdate BETWEEN = $' + d + ' AND $' + f);
    d++;
    d++;
  }

  if(i.docstartdate !== '' ^ i.docenddate !== '') { 
    if(i.docstartdate !== '') {
      QB.addCondition(' AND docdate >= $' + d);
    }
    if(i.docenddate !== '') {
      QB.addCondition(' AND docdate <= $' + d);
    }
    d++;
  }

  if(i.ledgerstartdate !== '' ^ i.ledgerenddate !== '') { 
    if(i.ledgerstartdate !== '') {
      QB.addCondition(' AND ledgerdate >= $' + d);
    }
    if(i.ledgerenddate !== '') {
      QB.addCondition(' AND ledgerdate < $' + d);
    }
    d++;
  }

  for(var name in i){
    let v = i[name];
    let r = name;
    //console.log('val, ',v, 'param, ', r)
    if(v !== '' && r !== 'ledgerstartdate' && r !== 'ledgerenddate' && r !== 'docstartdate' && r !== 'docenddate') { 
      //console.log('in the IF: val, ',v, 'param, ', r)
      QB.addCondition(" AND " + r + " = $" + d );
    d ++;
  }}

  var popInputs = [];
  for(var param in i) {
    if(i[param] !== '') { 
      popInputs.push(i[param]);
  }}

  let prepare = QB.build(); 
  //console.log('the query', prepare, 'the inputs', i);
  Connection.query({"text":prepare,"values":popInputs})
    .then(data => {
        res.status(200).json({ table: data.rows, userNotify: {} })
    })
    .catch(e => {
        res.status(200).json({ table: [], userNotify: {error: 'Something went wrong, we are looking into it.'} })
        console.error(e.stack)
    })
}

module.exports = GL;