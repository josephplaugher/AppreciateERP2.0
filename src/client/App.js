import React from 'react'
import Login from './Login'
import Ajax from 'Util/Ajax'
import SetUrl from 'Util/SetUrl'
import EB from 'Util/EB'
import checkLoginState from 'Util/CheckLoginState'
import Home from './mainmenu/home'
import 'css/main.css'
import 'css/userNotify.css'

class AppreciateCo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoggedIn: false,
      userData: {}
    }
    this.setLoginState = this.setLoginState.bind(this)
    this.response = this.response.bind(this)
    this.signOut = this.signOut.bind(this)
    this.setLoginState()
  }

  setLoginState = () => {
    // console.log('set login state')
    // console.log('checking false string vs bool')
    // console.log('string: ', 'false')
    // console.log('boolean: ', false)
    // console.log('string: ', 'true')
    // console.log('boolean: ', true)
    let auth = checkLoginState()
    auth.then(res => {
      console.log('check login state resp: ', res)
      if (res.isLoggedIn === true) {
        this.setState({
          isLoggedIn: res.isLoggedIn,
          userData: res.userData
        })
      } else {
        this.setState({
          isLoggedIn: false,
          userData: {}
        })
      }
    })
  }

  signOut = () => {
    console.log('signing out')
    sessionStorage.removeItem(process.env.USER_DATA_LABEL)
    sessionStorage.removeItem(process.env.TOKEN_NAME)
    this.setState({
      isLoggedIn: false,
      userData: {}
    })
    Ajax.get(SetUrl() + '/user/logout')
  }

  response = res => {
    if (typeof res.userData !== 'undefined') {
      sessionStorage.setItem(
        process.env.USER_DATA_LABEL,
        JSON.stringify(res.userData)
      )
      sessionStorage.setItem(process.env.TOKEN_NAME, res.token)
      this.setState({
        token: res.token,
        userNotify: res.userNotify,
        userData: res.userData,
        isLoggedIn: true
      })
    }
    if (typeof res.error !== 'undefined') {
      console.error('submit error: ', res.error)
    }
  }

  render() {
    return (
      <div id="container">
        <div id="logoBox">
          <img src={SetUrl() + '/AppreciateLogo.png'} alt="Appreciate Logo" />
        </div>
        <div>
          {this.state.isLoggedIn ? (
            <EB comp="Home">
              <Home userData={this.state.userData} signOut={this.signOut} />
            </EB>
          ) : (
            <EB comp="Login">
              <Login response={this.response} />
            </EB>
          )}
        </div>
      </div>
    )
  }
}

export default AppreciateCo
