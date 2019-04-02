const jwt = require('jsonwebtoken')

const Auth = (req, res, next) => {
  console.log('auth')
  const authorized = 'authorized'
  const cookieName = process.env.COOKIE_NAME
  //console.log('the cookie token: ', req.cookies[cookieName].token)
  //console.log('the csrf token: ', req.headers.csrf)
  if (req.cookies[cookieName] && req.headers.csrf) {
    console.log('cookie and token are present')
    //check if cookie and token exist
    //console.log('cookie and token exist')
    const cookie = req.cookies[cookieName]
    const csrf = req.headers.csrf
    //if cookie and token exist and the token is valid, check that they are the same
    if (cookie.token === csrf) {
      //console.log('cookie and token match')
      var verifiedToken
      try {
        verifiedToken = jwt.verify(csrf, process.env.JWT_SECRET)
      } catch (error) {
        console.log('fail 0')
        res.header(authorized, 'false')
        res.header('token', null)
        res.clearCookie(cookieName)
        next()
      }
      //console.log('csrf token: ', verifiedToken)
      //console.log('raw token: ', token)
      //upon authentication, renew the token and the cookie
      req.headers['dbconn'] = verifiedToken.userData.company_id
      delete verifiedToken.exp
      var token = jwt.sign(verifiedToken, process.env.JWT_SECRET, {
        expiresIn: '1h'
      })
      res.cookie(
        process.env.COOKIE_NAME,
        { token: token },
        {
          expires: new Date(Date.now() + 60 * 60 * 1000),
          maxAge: 60 * 60 * 1000,
          httpOnly: true,
          secure: process.env.NODE_ENV === true
        }
      )
      res.header(authorized, true)
      res.header('token', token)
      next()
    } else {
      console.log('fail 1')
      res.header(authorized, 'false')
      res.header('token', null)
      next()
    }
  } else {
    console.log('fail 2')
    res.header(authorized, 'false')
    res.header('token', null)
    next()
  }
}

module.exports = Auth
