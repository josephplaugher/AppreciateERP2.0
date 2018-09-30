import * as ReactForm from 'reactform-appco'
import React from 'react'
import EB from 'Util/EB'
import checkLoginState from 'Util/CheckLoginState'
import Home from './mainmenu/home'
import 'css/main.css'
import 'css/userNotify.css'

const Form = ReactForm.Form;
const Input = ReactForm.Input;
const Button = ReactForm.Button;

class AppreciateCo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoggedIn: false,
      userData: {}
    }
    this.setLoginState();
    this.response = this.response.bind(this);
  }

  setLoginState = () => {
    let auth = checkLoginState();
    auth.then((userData) => {
      if (userData === 'not logged in') {
        this.setState({ 
          isLoggedIn:false,
          userData: {} 
        });
      } else {
        this.setState({ 
          isLoggedIn: true,
          userData: userData 
        });
      }
    });
  }

  response = (res) => {
    if(typeof res.userData !== 'undefined') {
      sessionStorage.setItem('AppCoUser', JSON.stringify(res.userData));
      this.setState({
          userNotify: res.userNotify,
          userData: res.userData,
          isLoggedIn: true
      });
    }
    if(res.error !== 'undefined') {
      console.error('submit error: ', res.error);
    }
  }

  render() {

    return (
      <div id="container">
        <div>
          {this.state.isLoggedIn ? (
          <EB comp="Home">
            <Home userData={this.state.userData} />
          </EB>
          ) : (
              <div id="sign-in">
                <div id="logoBox"><img src={require('./AppreciateLogo.png')} alt="Appreciate Logo" /></div>
                <Form formTitle="Sign In" action="http://localhost:3004/users/login" response={this.response} >
                  <Input name="email" label="Email" /><br />
                  <Input name="password" label="Password" />
                  <div className="buttondiv">
                    <Button id="submit" value="Sign In" />
                  </div>

                </Form>
              </div>
            )}
        </div>
      </div>
    )
  }

}

export default AppreciateCo;