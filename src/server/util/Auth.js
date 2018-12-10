
const jwt = require('jsonwebtoken');

const Auth = (req, res, next) => {
    const authorized = 'authorized';
    if (req.cookies['AppreciateCoCookie'] && req.headers.csrf) {//check if cookie and token exist
      const cookie = req.cookies['AppreciateCoCookie'];
      const csrf = req.headers.csrf;
      //if cookie and token exist and the token is valid, check that they are the same
      if (cookie.token === csrf) {
        res.header(authorized, true);
        next();
      } else {
        res.header(authorized, false);
        next();
      }
      try {
        token = jwt.verify(csrf, 'shhhhh');
      } catch (error) {
        res.header(authorized, false);
        next();
      }
    } else {
      res.header(authorized, false);
      next();
    }
  }

  module.exports = Auth;