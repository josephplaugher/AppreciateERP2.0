const QueryBuilder = require('../../util/QueryBuilder')
const pg = require('../../util/postgres')
const userConn = pg.userConn;

function FindSuppliers(req, res) {
  this.req = req;
  this.res = res;
}

FindSuppliers.prototype.Find = function() {
  if(typeof this.req.body === undefined ) {
    this.AllSuppliers();
  } else {
    this.ByCriteria();
  }
}

FindSuppliers.prototype.AllSuppliers = function() {
    const query = `
    SELECT 
      id, name, contact, phone, email, street, city, state, zip
    FROM Suppliers`;
    client.query(query)
      .then(data => this.res.status(200).json({ message: data.rows }))
      .catch(e => console.error(e.stack))
}

FindSuppliers.prototype.ByCriteria = function() {
  const Connection = userConn(req.headers['dbconn']); //db connection
  Connection.connect(); //activate the connection

    QB = new QueryBuilder(`
    SELECT 
      id, name, contact, phone, email, street, city, state, zip
    FROM Suppliers
    WHERE id IS NOT NULL `,'ORDER BY name ASC');
    let d = 1;
    for(var val in this.req.body){
      if(this.req.body[val] !== '') { 
          QB.addCondition(" AND " + [val] + " = $" + d );
        d ++;
    }}
  
    var popInputs = [];
    for(var param in this.req.body) {
      if(this.req.body[param] !== '') { 
        popInputs.push(this.req.body[param]);
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

module.exports = FindSuppliers;