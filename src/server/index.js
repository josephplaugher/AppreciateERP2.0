const dotenv = require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const uuid = require('uuid');

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './src/views');

let port = process.env.PORT;
app.listen(port, function(){
  console.log('server started in '+ process.env.NODE_ENV + ' mode on port ' + port);
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, authorization");
  res.set("X-Powered-By", "Appreciate Corporation");
  next();
});

app.use(bodyParser.urlencoded({ extended: false })); // Parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // Parse application/json

//use sessions for user login
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    store: new FileStore(),
    secret: uuid(),
    resave: false,
    saveUninitialized: false,
    maxAge: 60000,
    cookie:{secure: app.get('env') === 'production'}
}));

const userCont = require('./controllers/userCont.js');
const transCont = require('./controllers/transCont.js');
const peopleCont = require('./controllers/peopleCont.js');
const lsCont = require('./controllers/lsCont.js');

app.use('/', userCont);

//check for existing token. This goes below the login controller
//because we dont need to check for a token on login
//app.use(checkJWT);
app.use('/', transCont);
app.use('/', peopleCont);
app.use('/', lsCont);
app.all('/*', (req, res) => {
  //console.log('sessionID: ', req.sessionID, 'userdata: ', req.session.userData);
  res.render('index');
});