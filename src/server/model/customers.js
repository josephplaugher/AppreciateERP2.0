const db = require('./../postgres.js');
const client = db.userConn;

allCust = (req, res) => {
    const query = "SELECT name, id FROM customers";
    client.query(query)
      .then(data => res.status(200).json({ message: data.rows }))
      .catch(e => console.error(e.stack))
}

custById = (req, res) => {
    const query = "SELECT name, id FROM customers WHERE id = $1";
    const vals = [req.params.id];
    client.query(query, vals)
      .then(data => res.status(200).json({ message: data.rows[0] }))
      .catch(e => console.error(e.stack))
}

module.exports = {allCust, custById};