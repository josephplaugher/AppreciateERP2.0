
const jwt = require('jsonwebtoken');

const Auth = (req, res, next) => {
    const authorized = 'authorized';
    const cookieName = 'AppreciateCoCookie';
    if (req.cookies['AppreciateCoCookie'] && req.headers.csrf) {//check if cookie and token exist
      const cookie = req.cookies['AppreciateCoCookie'];
      const csrf = req.headers.csrf;
      //if cookie and token exist and the token is valid, check that they are the same
      if (cookie.token === csrf) {
        var verifiedToken;
        try {
          verifiedToken = jwt.verify(csrf, 'shhhhh');
        } catch (error) {
          res.header(authorized, false);
          res.headers('token', null);
          res.clearCookie('AppreciateCoCookie');
          next();
        }
        //upon authentication, renew the token and the cookie
        var token = jwt.sign({ userData: verifiedToken }, 'shhhhh', {expiresIn: "60000ms"});
        res.header(authorized, true);
        res.header('token', token)
        res.cookie('AppreciateCoCookie', {token: token}, {maxAge: 60000, httpOnly: true})
        next();
      } else {
        res.header(authorized, false);
        res.header('token', null);
        next();
      }
      
    } else {
      res.header(authorized, false);
      res.header('token', null);
      next();
    }
  }

  module.exports = Auth;