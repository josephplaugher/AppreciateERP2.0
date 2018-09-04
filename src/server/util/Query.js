const db = require('./../postgres.js');
const userConn = db.userConn;

function Query(prepare, values) {
    this.prepare = prepare;
    this.values = values;
    this.query = {"text":this.prepare, "values":this.values};
}

Query.prototype.runQuery = function(res) {
        userConn.query(this.query)
        .then(data => res.status(200).json({ success: data.rows, userNotify: {} }))
        .catch(e => console.error(e.stack))
}

module.exports = Query;