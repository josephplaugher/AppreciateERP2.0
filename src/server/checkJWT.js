const jwt = require('jsonwebtoken'); 
const config = require('./config');

const checkJWT = (req, res, next) => {
    // check header or url parameters or post parameters for token
    var token = req.headers['authorization'];
    console.log('headers',req.headers);
    console.log('rec token: ',token);
    // decode token
    if (token) {

    // verifies secret and checks exp
    jwt.verify(req.headers.token, config.APIcode, function(err, decoded) {      
        if (err) {
        return res.status(200).json({ success: false, message: 'Failed to authenticate token.' });    
        } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
        }
    });

    } else {

    // if there is no token
    // return an error
    res.status(403).json({ 
        success: false, 
        message: 'No token provided.' 
    });

    }
}

module.exports = checkJWT;