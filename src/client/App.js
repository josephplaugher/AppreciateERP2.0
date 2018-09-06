import * as ReactForm from 'reactform-appco';
import React from 'react'
import axios from 'axios'
import checkLoginState from 'Util/CheckLoginState'
import Home from './mainmenu/home'
import 'css/main.css'
import 'css/userNotify.css'

const Form = ReactForm.Form;
const Input = ReactForm.Input;
const Button = ReactForm.Button;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoggedIn: false,
    }
    this.response = this.response.bind(this);
  }

  response = (res) => {
    console.log('response callback', res.userData);
    console.log ('test error: ', res.error);
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
            <Home userData={this.state.userData} />
          ) : (
              <div id="sign-in">
                <div id="logoBox"><img src={require('./AppreciateLogo.png')} alt="Appreciate Logo" /></div>
                <Form formTitle="Sign In" action="http://localhost:3004/login" response={this.response} >
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

export default App;