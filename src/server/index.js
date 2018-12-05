const dotenv = require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const login = require('./model/users/login');
const userCont = require('./controllers/userCont.js');
const transCont = require('./controllers/transCont.js');
const peopleCont = require('./controllers/peopleCont.js');
const lsCont = require('./controllers/lsCont.js');

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './src/views');

let port = process.env.PORT;
app.listen(port, function(){
  console.log('server started in '+ process.env.NODE_ENV + ' mode on port ' + port);
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.BASE_URL);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, authorization");
  res.set("X-Powered-By", "Appreciate Corporation");
  next();
});

app.use(bodyParser.urlencoded({ extended: false })); // Parse application/x-www-form-urlencoded
app.use(cookieParser());
app.use(bodyParser.json()); // Parse application/json

const auth = (req) => {
  console.log('cookie: ', req.cookies, 'token: ', req.headers.authorization)
  var token;
  if(req.headers.authorization) {
    token = jwt.verify(req.headers.authorization, 'shhhhh');
  }
  if(typeof req.cookies['AppreciateCoCookie'] === 'undefined' || typeof token === 'undefined' ) {
    return false;
  } else {
    return true;
  }
}

//login route is first as it does not require a cookie or token
app.post('/login', (req, res) => {
  const Login = new login(req, res);
  Login.getUserData();
});
//for all other routes, first check the cookie and token
app.use('/', (req, res, next) => {
  let Auth = auth(req);
  if(Auth) {
    console.log('authorized')
    next();
  } else {
    console.log('not authorized')
    res.render('unauth');
  }
  
});

app.use('/', transCont);
app.use('/', peopleCont);
app.use('/', lsCont);
app.all('/*', (req, res) => {
  res.render('index');
});