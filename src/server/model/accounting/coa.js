const Log = require('./../../util/Log')
const db = require('./../../util/postgres')
const userConn = db.userConn

get = (req, res) => {
	const Connection = userConn(req.headers['dbconn']) //db connection
	Connection.connect() //activate the connection
	Connection.query(
		'SELECT acctname, acctno, description, type, subtype, status FROM sys_coa ORDER BY acctno ASC'
	)
		.then((data) => {
			//Log.Info({ message: req.headers })
			res.status(200).json({ table: data.rows })
		})
		.catch((e) => {
			Log.error({ message: error.stack })
		})
}

edit = (req, res) => {
	const Connection = userConn(req.headers['dbconn']) //db connection
	Connection.connect() //activate the connection
	let Query = {
		text: `
      UPDATE sys_coa 
      SET (description, acctname) = ($1, $2)
      WHERE acctno = $3
      RETURNING description, acctname `,
		values: [req.body.description, req.body.acctname, req.body.acctno]
	}
	Connection.query(Query)
		.then((data) => {
			res
				.status(200)
				.json({ newValues: data.rows[0], userNotify: 'Account Updated' })
		})
		.catch((e) => console.error(e.stack))
}

disable = (req, res) => {
	const Connection = userConn(req.headers['dbconn']) //db connection
	Connection.connect() //activate the connection

	let Query = {
		text: `
      UPDATE sys_coa 
      SET status = 'disabled'
      WHERE acctno = $1`,
		values: [req.params.acctno]
	}
	Connection.query(Query)
		.then((data) => {
			res.status(200).json({
				userNotify:
					'Account Disabled. This account cannot be used until enabled again.'
			})
		})
		.catch((e) => console.error(e.stack))
}

enable = (req, res) => {
	const Connection = userConn(req.headers['dbconn']) //db connection
	Connection.connect() //activate the connection

	console.log('acctno: ', req.params.acctno)
	let Query = {
		text: `
      UPDATE sys_coa 
      SET status = 'Active'
      WHERE acctno = $1`,
		values: [req.params.acctno]
	}
	Connection.query(Query)
		.then((data) => {
			console.log('disable: ', data)
			res.status(200).json({ userNotify: 'Account Enabled.' })
		})
		.catch((e) => console.error(e.stack))
}

deleteAcct = (req, res) => {
	const Connection = userConn(req.headers['dbconn']) //db connection
	Connection.connect() //activate the connection

	//check to see if any transactions exist
	let check = {
		text: `
      select acctno from sys_gl WHERE acctno = $1`,
		values: [req.params.acctno]
	}
	Connection.query(check)
		.then((data) => {
			//if there are transcations, tell the user no
			if (data.rowCount > 0) {
				res.status(200).json({
					deleted: false,
					userNotify: `This account has existing transactions, 
          it cannot be deleted. You can disable it to 
          prevent further charges.`
				})
			} else {
				//if there are none, go ahead and delete the account
				let Query = {
					text: `
                delete from sys_coa WHERE acctno = $1`,
					values: [req.params.acctno]
				}
				Connection.query(Query)
					.then((data) => {
						res.status(200).json({
							deleted: true,
							userNotify: 'Account Deleted.'
						})
					})
					.catch((e) => console.error(e.stack))
			}
		})
		.catch((e) => console.error(e.stack))
}

module.exports = { get, edit, disable, enable, deleteAcct }
