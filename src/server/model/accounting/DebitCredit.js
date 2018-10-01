const Query = require('./../../util/Query');

function DebitCredit(req, res){
    this.inputs = req.body;
    this.res = res;
    this.today = new today();
}

DebitCredit.prototype.run = function(debitQuery, creditQuery) {
    var i = this.inputs;
    if(typeof debitQuery !== 'undefined') {
        var Debit = new Query(`INSERT INTO sys_gl 
            (journ_num, transtype, date,  time, description, 
            debit, acctno, acctname, empid) 
            VALUES ($1, 'JE', $2, $3, $4, $5, $6, $7, $8)`,
            [i.journ_num, i.date, i.description, i.debit, i.acctno, i.acctname, i.empid]);
        Debit.runInputQuery();
    }
    if(typeof creditQuery !== 'undefined') {
        var Credit = new Query(`INSERT INTO sys_gl 
            (journ_num, transtype, date,  time, description, 
            credit, acctno, acctname, empid) 
            VALUES ($1, 'JE', $2, $3, $4, $5, $6, $7, $8)`,
            [i.journ_num, i.date, i.description, i.credit, i.acctno, i.acctname, i.empid]);
        Credit.runInputQuery();
    }
}