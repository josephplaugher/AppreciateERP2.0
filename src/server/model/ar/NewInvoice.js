const Query = require('./../../util/Query');

NewInvoice = (req, res) => {
    res.status(200).json({ success: true, userNotify: 'this is your new invoice number...' });
    /*
    const query = {
      "text": "INSERT into invoices() ",
      "values" : [req.body.email]
    };
    loginConn.query(query)
      .then(data => module.exports.checkPassword(req,res,data))
      .catch(e => console.error(e.stack))
      */
}

module.exports = NewInvoice;