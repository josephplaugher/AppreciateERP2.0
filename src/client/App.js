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
  }
/*
  componentDidMount() {
    if (checkLoginState() === true) {
      this.setState({
        userData: JSON.parse(sessionStorage.getItem('AppreciateUser')),
        isLoggedIn: true
      });
    }
  }

  onChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleLoginSubmit(event) {
    event.preventDefault();
    var formData = {
      email: this.state.username,
      password: this.state.password
    }
    if (formData.email === '' || formData.password === '') {
      this.setState({
        userNotify: 'Please enter your email address and password. If you dont have an account you can sign up.'
      })
    } else {
      axios({
        url: 'http://localhost:3004/login',
        method: 'post',
        data: formData,
        config: { headers: { 'Content-Type': 'multipart/form-data' } },
        responseType: 'json'
      })
        .then((res) => {
          if (res.data.success === true) {
            this.setState({
              userData: res.data.userData,
              isLoggedIn: true
            });
            sessionStorage.setItem('AppreciateUser', JSON.stringify(res.data.userData));
            sessionStorage.setItem('AppreciateJWT', res.data.token);
          }
          if (res.data.success === false) {
            this.setState({
              userNotify: res.data.userNotify
            });
          };
        })
    }
  }
  */

  render() {
    const userNotify = this.state;
    return (
      <div id="container">
        <div>
          {this.state.isLoggedIn ? (
            <Home userData={this.state.userData} />
          ) : (
              <div id="sign-in">
                <div id="logoBox"><img src={require('./AppreciateLogo.png')} alt="Appreciate Logo" /></div>
                <Form formTitle="Sign In" route="http://localhost:3004/login" >
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