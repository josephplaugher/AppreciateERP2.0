const db = require('./../../util/postgres');
const userConn = db.userConn;

editCustomer = (req, res) => {
  const Connection = userConn(req.headers['dbconn']); //db connection
  Connection.connect(); //activate the connection
  const i = req.body
  let Query = {
    "text": `
        UPDATE customers
        SET (name, contact, phone, email, street, city, state, zip) 
        = ($1,$2,$3,$4,$5,$6,$7,$8)
        WHERE id = $9 `,
    "values": [i.name,
    i.contact,
    i.phone,
    i.email,
    i.street,
    i.city,
    i.state,
    i.zip,
    i.id]
  }
  Connection.query(Query)
    .then(data => {
      res.status(200).json({ userNotify: 'Customer Updated' });
    })
    .catch(e => console.error(e.stack))
}

module.exports = editCustomer;