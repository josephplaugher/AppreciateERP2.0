import React from 'react'
import FormClass from 'Util/FormClass'
import Input from 'Util/Input'
import Button from 'Util/Button'
import LoginVal from './LoginVal'

class Login extends FormClass {
    constructor(props) {
        super(props);
        this.useLiveSearch = false
        this.route = '/login'
        this.valRules = LoginVal
        this.state = {
            email: '',
            password: '',
            formData: {
                email: '',
                password: ''
            },
            userNotify: {
                success: '',
                email: '',
                password: ''
            }
        }
        this.response = this.response.bind(this)
    }

    response = (res) => {
        // the FormClass referes to this.response so I need to delegate
        // that action to this.props.response from the Parent component
        this.props.response(res.data)    
    }

    render() {

        return (
            <div id="sign-in">
                <p className="formTitle">Sign In</p>
                <form onSubmit={this.onSubmit} >
                    <Input name="email" label="Email" value={this.state.email} onChange={this.onChange} error={this.state.userNotify.email}/>
                    <Input name="password" label="Password" value={this.state.password} onChange={this.onChange} error={this.state.userNotify.password}/>
                    <div className="buttondiv">
                        <Button id="submit" value="Sign In" />
                    </div>
                {this.state.userNotify.success}
                </form>
            </div>
        )
    }
}

export default Login