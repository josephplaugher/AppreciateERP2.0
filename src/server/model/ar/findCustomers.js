const QueryBuilder = require('../../util/QueryBuilder')
const pg = require('../../util/postgres')
const userConn = pg.userConn;

function FindCustomers(req, res) {
  this.req = req;
  this.res = res;
}

FindCustomers.prototype.Find = function () {
  if (typeof this.req.body === undefined) {
    this.AllCustomers();
  } else {
    this.ByCriteria();
  }
}

FindCustomers.prototype.AllCustomers = function () {
  const query = `
    SELECT 
      id, name, contact, phone, email, street, city, state, zip
    FROM customers`;
  client.query(query)
    .then(data => this.res.status(200).json({ message: data.rows }))
    .catch(e => console.error(e.stack))
}

FindCustomers.prototype.ByCriteria = function () {
  let id = this.req.body.customerid
  let name = this.req.body.customer
  this.req.body.id = id
  this.req.body.name = name
  delete this.req.body.customerid
  delete this.req.body.customer
  //console.log('req: ', this.req.body)
  QB = new QueryBuilder(`
    SELECT 
      id, name, contact, phone, email, street, city, state, zip
    FROM customers
    WHERE id IS NOT NULL `, ' ORDER BY name ASC');
  let d = 1;
  for (var val in this.req.body) {
    if (this.req.body[val] !== '') {
      QB.addCondition(" AND " + [val] + " = $" + d);
      d++;
    }
  }

  var popInputs = [];
  for (var param in this.req.body) {
    if (this.req.body[param] !== '') {
      popInputs.push(this.req.body[param]);
    }
  }

  let prepare = QB.build();
  //console.log('the query', prepare, 'the inputs', i);
  userConn.query({ "text": prepare, "values": popInputs })
    .then(data => {
      this.res.status(200).json({ table: data.rows, userNotify: {} })
    })
    .catch(e => {
      this.res.status(200).json({ table: [], userNotify: { error: 'Something went wrong, we are looking into it.' } })
      console.error(e.stack)
    })
}

module.exports = FindCustomers;