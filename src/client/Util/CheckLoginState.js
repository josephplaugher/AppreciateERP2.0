import Ajax from './Ajax'
import SetUrl from './SetUrl'

const checkLoginState = () => {
  return new Promise((resolve, reject) => {
    const AppCoToken = sessionStorage.getItem('AppCoToken')
    //console.log('appco token', AppCoToken)
    if (AppCoToken !== null) {
      Ajax.get(SetUrl() + '/checkLoginState')
        .catch(e => {
          reject('error checking login state: ', e)
        })
        .then(resp => {
          const token = resp.headers.token
          const authorized = resp.headers.authorized
          console.log('headers, ', resp.headers)
          console.log('authorized: ', authorized)
          console.log('token', token)
          if (
            typeof token !== 'null' &&
            typeof token !== 'undefined' &&
            authorized !== 'false'
          ) {
            let userData = JSON.parse(sessionStorage.getItem('AppCoUser'))
            sessionStorage.setItem('AppCoToken', token)
            resolve({
              isLoggedIn: true,
              userData: userData
            })
          } else {
            console.log('not authorized')
            sessionStorage.removeItem('AppCoUser')
            sessionStorage.removeItem('AppCoToken')
            resolve({
              isLoggedIn: false,
              userData: {}
            })
          }
        })
    }
  })
}

export default checkLoginState
