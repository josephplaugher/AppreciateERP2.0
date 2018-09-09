import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import User from './User'
import Accounting from './accounting'
import Banking from './banking'
import 'css/main.css'
import 'css/logo.css'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }

  render() {
    const userData = this.props.userData;
    return (
      <div id="home-container">
        <div id="logoBox"><img src={require('./AppreciateLogo_1_H.png')} alt="Appreciate Logo"/></div> 
        <User lname={userData.lname} />
        <Router>
        <div id="nav-pane">
          <Link to="/ui/accounting" id="accounting" className="nav">Accounting</Link>
            <Route path="/ui/accounting" component={Accounting}/>
          <br/><Link to="/ui/banking" id="banking" className="nav">Banking</Link>
            <Route path="/ui/banking" component={Banking}/>
        
        </div>
        </Router>  
      </div>
    )
  }

}

export default Home;