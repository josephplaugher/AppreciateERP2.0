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
        <p>Signed in as {this.props.lname}, {this.props.fname}</p>
        <Button id="sign out" className="submit" value="Sign Out" />
      </div>
      )
    }
}

export default User;