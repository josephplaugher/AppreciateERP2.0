const DebitCredit = require('./../accounting/DebitCredit')
const Log = require('./../../util/Log')

const db = require('./../../util/postgres')
const userConn = db.userConn

function JournalEntry(req, res) {
	this.inputs = req.body
	this.req = req
	this.res = res
	this.acctnames = []
	this.acctnos = []
	this.dorcs = []
	this.amounts = []
}

JournalEntry.prototype.preProcess = function() {
	for (var key in this.inputs) {
		if (key.substring(0, 6) === 'acctno') {
			this.acctnos.push(this.inputs[key])
		}
		if (key.substring(0, 6) === 'amount') {
			this.amounts.push(this.inputs[key])
		}
		if (key.substring(0, 4) === 'dorc') {
			this.dorcs.push(this.inputs[key])
		}
	}

	let i = 0
	for (i = 0; i < this.acctnos.length; i++) {
		//console.log('len of i is', i, 'and len of acctnos is ', this.acctnos.length)
		//console.log('acctno in getAcctName loop', this.acctnos[i])
		// promise function to retrieve account names
		let acctname = this.getAcctName(this.acctnos[i])
		acctname.then((name) => {
			// get account names that correspond to the provided account numbers
			this.acctnames.push(name)
			// once the final line item has run, run the journal entries
		})
	}
	this.createEntry()
}

JournalEntry.prototype.getAcctName = function(acctno) {
	return new Promise((resolve, reject) => {
		const Connection = userConn(this.req.headers['dbconn']) //db connection
		Connection.connect() //activate the connection
		let Query = {
			text: `SELECT acctname FROM sys_coa WHERE acctno = $1`,
			values: [acctno]
		}
		Connection.query(Query)
			.then((data) => {
				//console.log('sql res: ', data.rows[0])
				resolve(data.rows[0].acctname)
			})
			.catch((error) => {
				Log.error({ message: 'get acct name query. ' + error.stack })
				reject(error)
			})
	})
}

JournalEntry.prototype.createEntry = function() {
	console.log('dbConn in creatEntry: ', this.req.headers['dbconn'])
	const Entry = new DebitCredit(this.req.headers['dbconn'], this.inputs) //create the entry object
	Entry.journNum() // assign a journal entry number
	var inputs = {
		transtype: 'Journal Entry',
		docdate: this.inputs.docdate,
		description: this.inputs.description,
		empid: 'testID_change_this',
		cashyn: 'No'
	}
	var i = 0
	console.log('input obj before entry loop: ', inputs)
	console.log('dorc pop?: ', this.dorcs)
	for (i = 0; i < this.acctnos.length; i++) {
		inputs.acctname = this.acctnames[i]
		inputs.acctno = this.acctnos[i]
		if (this.dorcs[i] === 'Credit') {
			delete inputs.debit
			inputs.credit = this.amounts[i]
			console.log('debit inputs: ', inputs)
			Entry.runCredit()
		}
		if (this.dorcs[i] === 'Debit') {
			delete inputs.credit
			inputs.credit = this.amounts[i]
			console.log('credit inputs: ', inputs)
			Entry.runDebit()
		}
	}
}

module.exports = JournalEntry
