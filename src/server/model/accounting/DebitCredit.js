const Log = require('./../../util/Log')
const Query = require('./../../util/Query')
// const userConn = db.userConn
const GenID = require('./../../util/GenID')

function DebitCredit(dbconn, inputs) {
	this.dbconn = dbconn // database connect for use throughout the class
	this.inputs = inputs
	this.today = new Date()
}

//run this method if we're doing a standard journal entry
DebitCredit.prototype.journNum = function() {
	return new Promise((resolve, reject) => {
		let ID = GenID('journ_num', this.dbconn)
		ID.then((id) => {
			resolve((this.inputs['journ_num'] = id))
		}).catch((error) => console.error('get je number error: ', error))
	})
}

DebitCredit.prototype.runDebit = function() {
	console.log('run debit')
	console.log('dbconn in runDebit: ', this.dbconn)
	var i = this.inputs
	//console.log('the inputs', i)
	// prettier-ignore
	var Debit = new Query(`INSERT INTO sys_gl 
            (journ_num, transtype, docdate, ledgerdate, time, description, 
            debit, acctno, acctname, payee_payer_id, empid, cashyn) 
            VALUES ($1, $2, $3, $4, DEFAULT, $5, $6, $7, $8, $9, $10, $11)`,
        [i.journ_num, i.transtype, i.docdate, this.today, i.description, i.debit,
        i.acctno, i.acctname, i.payee_payer_id, i.empid, i.cashyn]);
	return new Promise((resolve, reject) => {
		Debit.runInputQuery(this.dbconn)
			.then((result) => {
				resolve(result)
			})
			.catch((error) => {
				reject(error)
			})
	})
}

DebitCredit.prototype.runCredit = function() {
	console.log('run credit')
	var i = this.inputs
	//console.log('the inputs', i)
	// prettier-ignore
	var Credit = new Query(`INSERT INTO sys_gl 
            (journ_num, transtype, docdate, ledgerdate, time, description, 
            credit, acctno, acctname, payee_payer_id, empid, cashyn) 
            VALUES ($1, $2, $3, $4, DEFAULT, $5, $6, $7, $8, $9, $10, $11)`,
        [i.journ_num, i.transtype, i.docdate, this.today, i.description, i.credit, 
            i.acctno, i.acctname, i.payee_payer_id, i.empid, i.cashyn]);
	return new Promise((resolve, reject) => {
		Credit.runInputQuery(this.dbconn)
			.then((result) => {
				resolve(result)
			})
			.catch((error) => {
				reject(error)
			})
	})
}

module.exports = DebitCredit
