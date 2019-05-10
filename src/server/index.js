const dotenv = require('dotenv').config()
const SetUrl = require('./util/SetUrl')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cookieParser = require('cookie-parser')
const Auth = require('./util/Auth')
const login = require('./model/users/login')
const logout = require('./model/users/logout')
const userCont = require('./controllers/userCont.js')
const transCont = require('./controllers/transCont.js')
const peopleCont = require('./controllers/peopleCont.js')
const stmtCont = require('./controllers/stmtCont')
const lsCont = require('./controllers/lsCont.js')
const bankCont = require('./controllers/bankCont')

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.set('views', './src/views')

let port = process.env.PORT
app.listen(port, function() {
	console.log(
		'server started in ' + process.env.NODE_ENV + ' mode on port ' + port
	)
})

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', SetUrl())
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
	res.header('Access-Control-Allow-Headers', 'Content-Type, authorization')
	res.set('X-Powered-By', 'Appreciate Corporation')
	next()
})

app.use(bodyParser.urlencoded({ extended: false })) // Parse application/x-www-form-urlencoded
app.use(cookieParser())
app.use(bodyParser.json()) // Parse application/json

const checkAuth = (req, res, next) => {
	let auth = new Auth(req, res, next)
	return auth
}

//login route does not require a cookie or token
app.post('/login', (req, res) => {
	const Login = new login(req, res)
	Login.getUserData()
})
app.get('/user/logout', logout)

app.get('/checkLoginState', checkAuth, (req, res) => {
	res.status(200).json({ checkLoginState: 'done' })
})

//all these routes require a valid cookie and token
app.use('/', checkAuth, transCont)
app.use('/', checkAuth, bankCont)
app.use('/', checkAuth, peopleCont)
app.use('/', checkAuth, lsCont)
app.use('/', checkAuth, stmtCont)
//this route renders the UI. The UI will check for the cookie and token
//and log the user out if they don't exist.
app.all('/*', (req, res) => {
	res.render('index')
})
