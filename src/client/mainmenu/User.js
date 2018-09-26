import React, { Component } from 'react'
import {Button} from 'reactform-appco'
import 'css/user.css';
import 'css/form.css';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }

    render() {
      return (
      <div id="user">
        <p>Logged in as {this.props.lname}</p>
        <Button id="sign out" className="submit" value="Sign Out" />
      </div>
      )
    }
}

export default User;