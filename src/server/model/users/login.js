const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcrypt');
const db = require('./../../util/postgres');
const loginConn = db.loginConn;

login = (req, res) => {
    const query = {
      "text": "SELECT company_id, customerid, empid, status, email, company_name, lname, fname, password, admin, industry, maintcode FROM login WHERE email = $1 ",
      "values" : [req.body.email]
    };
    loginConn.query(query)
      .then(data => module.exports.checkPassword(req,res,data))
      .catch(e => console.error(e.stack))
}

checkPassword = (req,res,data) => {
  if(data.rows[0]) {
    //if the email resulted in a user entry, compare password hashes
    var dbhash = data.rows[0].password;
    //if the password was hashed in PHP it will contain a '$2y$' hash.
    //if hashed in Node, it will contain a '$2a$a' hash.
    //if the former, we replace it before verifying.
    if(dbhash.includes('$2y$')) { dbhash = dbhash.replace(/^\$2y(.+)$/i, '$2a$1');}
    //compaare the hashes
    bcrypt.compare(req.body.password, dbhash, (error, result) => {
        if(error)
          throw new Error(error);
        else if(result == false) {
          res.status(200).json({ success: false, userNotify: 'That email or password is invalid' });
        } else if(result == true){
          delete data.rows[0].password;//ensure the pw hash isn't sent along to the client
          req.session.userData = {};//set the session values for this user
          for(prop in data.rows[0]) {
            req.session.userData[prop] = data.rows[0][prop];
            //console.log('key: ',prop, 'val: ', data.rows[0][prop]);
          }
          res.status(200).json({ userNotify: {}, userData: data.rows[0] });
        }    
    });
  }else{
    //if no matching entry was found, report an error
    res.status(200).json({ success: false, userNotify: 'That email or password is invalid' });
  }
}

logout = (req, res) => {

}

module.exports =  {login, checkPassword, logout}