const db = require('./../../util/postgres');
const userConn = db.userConn; 

function NewAcct(req, res) {
    this.req = req;
    this.res = res;
}

NewAcct.prototype.start = function() {
    //this class assumes validation is happening in the index file prior to this route executing
    const Connection = userConn(this.req.headers['dbconn']); //db connection
    Connection.connect(); //activate the connection
    //create the primary account
    switch(this.req.body.type) {
        case 'Fixed Asset':
        case 'Intangible Asset':
            this.Asset(Connection);
            break;
        case 'Subsidiary':
            this.Subsidiary(Connection);
            break;
        default:
            this.Regular(Connection);
            break;
    }
}

NewAcct.prototype.Asset = function(Connection) {
    let i = this.req.body;
    let Query = {
      "text":`
        INSERT INTO sys_coa 
        (acctno, acctname, description, type, cor_acctno, cor_acctname) 
        VALUES ($1,$2,$3,$4,$5,$6),($5,$6,$7,'Contra Asset',$1,$2)`,
       "values": [i.acctno,i.acctname,i.description,i.type,i.cor_acctno,i.cor_acctname,i.cor_description] 
    }
    Connection.query(Query)
      .then(data => {
        this.res.status(200).json({ userNotify: {success:'Accounts Created' }});
      }) 
      .catch(e => console.error(e.stack))
}

NewAcct.prototype.Subsidiary = function(Connection) {
    let i = this.req.body;
    let Query = {
      "text":`
        INSERT INTO sys_coa 
        (acctno, acctname, description, type, parent_acctno, parent_acctname) 
        VALUES ($1,$2,$3,$4,$5,$6),($5,$6,$7,'Subsidiary',$1,$2)`,
       "values": [i.acctno,i.acctname,i.description,i.type,i.parent_acctno,i.parent_acctname] 
    }
    Connection.query(Query)
      .then(data => {
        this.res.status(200).json({ userNotify: {success:'Account Created' }});
      }) 
      .catch(e => console.error(e.stack))
}

NewAcct.prototype.Regular = function(Connection) {
    let i = this.req.body;
    let Query = {
      "text":`
        INSERT INTO sys_coa 
        (acctno, acctname, description, type) 
        VALUES ($1,$2,$3,$4)`,
       "values": [i.acctno,i.acctname,i.description,i.type] 
    }
    Connection.query(Query)
      .then(data => {
        this.res.status(200).json({ userNotify: {success:'Account Created' }});
      }) 
      .catch(e => console.error(e.stack))
}

module.exports = NewAcct;