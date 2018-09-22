import * as ReactForm from 'reactform-appco'
import React from 'react'
import EB from 'Util/EB'
import axios from 'axios'
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
      isLoggedIn: true,
      userData: {lname: 'Joe'}
    }
    this.response = this.response.bind(this);
  }

  response = (res) => {
      this.setState({
          success: res.userData.success,
          userNotify: res.userNotify,
          userData: res.userData,
          isLoggedIn: true
      });
    if(res.error) {
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