import React, { Component } from 'react'
import 'css/user.css';

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
      </div>
      )
    }
}

export default User;