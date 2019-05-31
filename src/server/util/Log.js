const winston = require('winston')

const HOST = () => {
	if (process.env.NODE_ENV === 'production') {
		return 'https://logs.appco.tech'
	} else {
		return 'localhost'
	}
}

const HttpOptions = {
	host: HOST(),
	port: 3026,
	path: '/logError',
	ssl: process.env.NODE_ENV === 'production'
}

let Log = winston.createLogger({
	format: winston.format.json(),
	transports: [new winston.transports.Http(HttpOptions)]
})

if (process.env.NODE_ENV !== 'production') {
	Log.add(
		new winston.transports.Console({
			format: winston.format.json()
		})
	)
}

module.exports = Log
