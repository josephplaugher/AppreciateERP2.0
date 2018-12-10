import * as ReactForm from 'reactform-appco'
import React from 'react'
import ValRules from 'Util/ValRules'
import EB from 'Util/EB'
import checkLoginState from 'Util/CheckLoginState'
import Home from './mainmenu/home'
import 'css/main.scss'
import 'css/userNotify.scss'

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
    this.setLoginState = this.setLoginState.bind(this);
    this.response = this.response.bind(this);
    this.setLoginState();
  }

  setLoginState = () => {
    const AppCoToken = sessionStorage.getItem('AppCoToken');
    if(AppCoToken !== null) {
      let auth = checkLoginState();
      auth.then( authorized => {
        if(authorized) {
          let userData = JSON.parse(sessionStorage.getItem('AppCoUser'));
          this.setState({ 
            isLoggedIn: true,
            userData: userData 
          });
        } else {
          sessionStorage.removeItem('AppCoUser');
          sessionStorage.removeItem('AppCoToken');
          this.setState({ 
            isLoggedIn: false,
            userData: {} 
          });
        }
      });
    }
  }

  response = (res) => {
    if(typeof res.userData !== 'undefined') {
      sessionStorage.setItem('AppCoUser', JSON.stringify(res.userData));
      sessionStorage.setItem('AppCoToken', res.token);
      this.setState({
          token: res.token,
          userNotify: res.userNotify,
          userData: res.userData,
          isLoggedIn: true
      });
    }
    if(typeof res.error !== 'undefined') {
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
                <Form formTitle="Sign In" 
                  action={`${process.env.BASE_URL}/login`}
                  valRules={ValRules} response={this.response} >
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